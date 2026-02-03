import { calculateBazi } from './paipan';
import { formatBaziResult } from './formatter';
import { BaziInput, LocationInfo } from './types';
import { getCityLocation, getSupportedCities, searchCities, getCityCount } from './cities';

/**
 * 解析输入参数
 * 支持格式：
 * - 1990-01-15 14:30
 * - 1990/01/15 14:30
 * - 1990 1 15 14 30
 * - 1990-01-15 14:30 --city 北京
 * - 1990-01-15 14:30 --lng 116.4
 * - 1990-01-15 14:30 --location 116.4,39.9
 * - 1990-01-15 14:30 --tst (使用真太阳时)
 */
export function parseInput(args: string[]): BaziInput | null {
  try {
    let year: number, month: number, day: number, hour: number, minute: number = 0;
    let isLunar = false;
    let gender: '男' | '女' | undefined;
    let location: LocationInfo | undefined;
    let useTrueSolarTime = false;

    // 复制args避免修改原数组
    const argsCopy = [...args];

    // 检查是否有 --lunar 标志
    const lunarIndex = argsCopy.indexOf('--lunar');
    if (lunarIndex !== -1) {
      isLunar = true;
      argsCopy.splice(lunarIndex, 1);
    }

    // 检查性别参数
    if (argsCopy.includes('男')) {
      gender = '男';
      argsCopy.splice(argsCopy.indexOf('男'), 1);
    } else if (argsCopy.includes('女')) {
      gender = '女';
      argsCopy.splice(argsCopy.indexOf('女'), 1);
    }

    // 检查是否使用真太阳时
    const tstIndex = argsCopy.indexOf('--tst');
    const trueSolarTimeIndex = argsCopy.indexOf('--true-solar-time');
    if (tstIndex !== -1) {
      useTrueSolarTime = true;
      argsCopy.splice(tstIndex, 1);
    } else if (trueSolarTimeIndex !== -1) {
      useTrueSolarTime = true;
      argsCopy.splice(trueSolarTimeIndex, 1);
    }

    // 解析城市参数
    const cityIndex = argsCopy.indexOf('--city');
    if (cityIndex !== -1 && argsCopy[cityIndex + 1]) {
      const cityName = argsCopy[cityIndex + 1];
      const cityLocation = getCityLocation(cityName);
      if (cityLocation) {
        location = cityLocation;
        argsCopy.splice(cityIndex, 2);
      } else {
        console.error(`错误：未找到城市"${cityName}"的地理信息`);
        const similar = searchCities(cityName);
        if (similar.length > 0) {
          console.error(`您是否要找：${similar.slice(0, 5).join('、')}`);
        }
        return null;
      }
    }

    // 解析经度参数
    const lngIndex = argsCopy.indexOf('--lng');
    if (lngIndex !== -1 && argsCopy[lngIndex + 1]) {
      const lng = parseFloat(argsCopy[lngIndex + 1]);
      if (!isNaN(lng)) {
        location = { longitude: lng };
        argsCopy.splice(lngIndex, 2);
      }
    }

    // 解析经纬度参数
    const locationIndex = argsCopy.indexOf('--location');
    if (locationIndex !== -1 && argsCopy[locationIndex + 1]) {
      const [lng, lat] = argsCopy[locationIndex + 1].split(',').map(Number);
      if (!isNaN(lng)) {
        location = {
          longitude: lng,
          latitude: isNaN(lat) ? undefined : lat
        };
        argsCopy.splice(locationIndex, 2);
      }
    }

    // 检查是否 JSON 输出
    const jsonIndex = argsCopy.indexOf('--json');
    let isJson = false;
    if (jsonIndex !== -1) {
      isJson = true;
      argsCopy.splice(jsonIndex, 1);
    }

    // 解析日期时间
    if (argsCopy.length >= 1) {
      // 处理 1990-01-15 或 1990/01/15 格式
      const dateStr = argsCopy[0];
      if (dateStr.includes('-') || dateStr.includes('/')) {
        const dateParts = dateStr.split(/[-\/]/).map(Number);
        if (dateParts.length !== 3) {
          return null;
        }
        [year, month, day] = dateParts;

        // 处理时间部分
        if (argsCopy.length >= 2 && !argsCopy[1].startsWith('--')) {
          const timeStr = argsCopy[1];
          if (timeStr.includes(':')) {
            const timeParts = timeStr.split(':').map(Number);
            hour = timeParts[0];
            minute = timeParts[1] || 0;
          } else {
            hour = parseInt(timeStr);
          }
        } else {
          hour = 12; // 默认中午12点
        }
      } else {
        // 处理 1990 1 15 14 30 格式
        if (argsCopy.length < 4) {
          return null;
        }
        year = parseInt(argsCopy[0]);
        month = parseInt(argsCopy[1]);
        day = parseInt(argsCopy[2]);
        hour = parseInt(argsCopy[3]);
        minute = argsCopy.length >= 5 ? parseInt(argsCopy[4]) : 0;
      }
    } else {
      return null;
    }

    // 验证输入
    if (
      isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) ||
      year < 1900 || year > 2100 ||
      month < 1 || month > 12 ||
      day < 1 || day > 31 ||
      hour < 0 || hour > 23
    ) {
      return null;
    }

    return {
      year,
      month,
      day,
      hour,
      minute,
      gender,
      isLunar,
      location,
      useTrueSolarTime,
      // @ts-ignore (扩展类型以支持临时标志)
      isJson
    };
  } catch (error) {
    return null;
  }
}

/**
 * 获取帮助信息
 */
function getHelpMessage(): string {
  return `八字排盘工具 (V2)

使用方法：
  bazi <日期> <时间> [选项]

示例：
  基础排盘：
    bazi 1990-01-15 14:30
    bazi --lunar 1989-12-19 14:30 男
    bazi 1990-01-15 14:30 --json

  真太阳时排盘：
    bazi 1990-01-15 14:30 --city 北京 --tst
    bazi 1990-01-15 14:30 --lng 87.6 --tst

选项：
  --lunar            使用农历日期
  --gender <男/女>    指定性别（或直接输入 男/女）
  --city <城市名>     指定出生城市（需配合--tst使用）
  --lng <经度>       指定经度（东经为正，需配合--tst使用）
  --tst              使用真太阳时修正
  --json             输出 JSON 格式数据
  --list-cities      列出支持的城市
  --search <关键词>   搜索城市

日期格式：
  公历：YYYY-MM-DD 或 YYYY/MM/DD
  时间：HH:MM 或 HH (24小时制)

真太阳时说明：
  真太阳时考虑了地球经度差异和时差方程，更符合传统命理的要求。`;
}

/**
 * 主函数：执行八字排盘
 */
export function runBazi(args: string[]): string {
  // 处理特殊命令
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    return getHelpMessage();
  }

  // 列出城市
  if (args.includes('--list-cities')) {
    const cities = getSupportedCities();
    const columns = 5;
    const rows: string[] = [];
    for (let i = 0; i < cities.length; i += columns) {
      rows.push(cities.slice(i, i + columns).join('、'));
    }
    return `支持的城市列表（共${cities.length}个）：\n\n${rows.join('\n')}`;
  }

  // 搜索城市
  const searchIndex = args.indexOf('--search');
  if (searchIndex !== -1 && args[searchIndex + 1]) {
    const keyword = args[searchIndex + 1];
    const results = searchCities(keyword);
    if (results.length === 0) {
      return `未找到包含"${keyword}"的城市`;
    }
    return `找到${results.length}个匹配的城市：\n${results.join('、')}`;
  }

  // 解析输入
  const input = parseInput(args);

  if (!input) {
    return '输入格式错误，请使用：bazi 1990-01-15 14:30\n或使用 bazi --help 查看详细帮助';
  }

  // 如果指定了真太阳时但没有提供位置信息，给出提示
  if (input.useTrueSolarTime && !input.location) {
    return `错误：使用真太阳时需要提供位置信息`;
  }

  try {
    // 计算八字
    const result = calculateBazi(input);

    // @ts-ignore
    if (input.isJson) {
      return JSON.stringify(result, null, 2);
    }

    // 格式化输出
    return formatBaziResult(result);
  } catch (error) {
    return `计算八字时出错：${error instanceof Error ? error.message : String(error)}`;
  }
}

// 如果作为命令行工具直接运行
if (require.main === module) {
  const args = process.argv.slice(2);
  console.log(runBazi(args));
}
