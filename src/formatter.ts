import { BaziResult } from './types';

/**
 * 计算字符串显示宽度（中文2个字符，英文1个字符）
 */
function getDisplayWidth(str: string): number {
  let width = 0;
  for (const char of str) {
    width += char.charCodeAt(0) > 255 ? 2 : 1;
  }
  return width;
}

/**
 * 填充字符串到指定显示宽度
 */
function padToWidth(str: string, targetWidth: number): string {
  const currentWidth = getDisplayWidth(str);
  const padding = targetWidth - currentWidth;
  return str + ' '.repeat(Math.max(0, padding));
}

/**
 * 格式化输出八字排盘结果
 */
export function formatBaziResult(result: BaziResult): string {
  const lines: string[] = [];

  // 顶部边框
  lines.push('┌─────────────────────────────────────────┐');
  lines.push('│              八字排盘                    │');
  lines.push('├─────────────────────────────────────────┤');

  // 如果使用了真太阳时，显示详细信息
  if (result.trueSolarTime) {
    const tst = result.trueSolarTime;
    const loc = tst.location;

    // 出生地信息
    if (loc?.city) {
      lines.push(`│ 出生地：${padToWidth(`${loc.city}（东经${loc.longitude}°）`, 37)}│`);
    } else {
      lines.push(`│ 出生地：${padToWidth(`东经${loc?.longitude || '未知'}°`, 37)}│`);
    }

    // 时间信息
    const formatTime = (date: Date): string => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      const h = String(date.getHours()).padStart(2, '0');
      const min = String(date.getMinutes()).padStart(2, '0');
      return `${y}年${m}月${d}日 ${h}:${min}`;
    };

    lines.push(`│ 北京时间：${padToWidth(formatTime(tst.originalTime), 33)}│`);
    lines.push(`│ 真太阳时：${padToWidth(formatTime(tst.adjustedTime), 33)}│`);

    // 时间修正说明
    const adjustParts: string[] = [];
    if (Math.abs(tst.longitudeDiff) >= 0.1) {
      adjustParts.push(`经度${tst.longitudeDiff > 0 ? '+' : ''}${tst.longitudeDiff.toFixed(1)}分`);
    }
    if (Math.abs(tst.equationOfTime) >= 0.1) {
      adjustParts.push(`时差${tst.equationOfTime > 0 ? '+' : ''}${tst.equationOfTime.toFixed(1)}分`);
    }

    if (adjustParts.length > 0) {
      const adjustText = `共${tst.totalAdjustment > 0 ? '+' : ''}${tst.totalAdjustment.toFixed(1)}分钟（${adjustParts.join('，')}）`;
      lines.push(`│ 时间修正：${padToWidth(adjustText, 33)}│`);
    }

    lines.push('├─────────────────────────────────────────┤');
  }

  // 日期信息
  lines.push(`│ 公历：${padToWidth(result.solar, 37)}│`);
  lines.push(`│ 农历：${padToWidth(result.lunar, 37)}│`);
  lines.push('├─────────────────────────────────────────┤');

  // 四柱标题
  lines.push('│   年柱    月柱    日柱    时柱         │');

  // 四柱干支
  const pillarsLine = `│   ${result.pillars.year}    ${result.pillars.month}    ${result.pillars.day}    ${result.pillars.hour}           │`;
  lines.push(pillarsLine);

  // 十神
  const shiShenLine = `│   ${result.shiShen.year.padEnd(4, ' ')}  ${result.shiShen.month.padEnd(4, ' ')}  ${result.shiShen.day.padEnd(4, ' ')}  ${result.shiShen.hour.padEnd(4, ' ')}       │`;
  lines.push(shiShenLine);

  lines.push('├─────────────────────────────────────────┤');

  // 五行统计
  const wuXingLine = `│ 五行：金${result.wuXing.金} 木${result.wuXing.木} 水${result.wuXing.水} 火${result.wuXing.火} 土${result.wuXing.土}`;
  lines.push(wuXingLine.padEnd(43, ' ') + '│');

  // 纳音
  lines.push(`│ 纳音：${padToWidth(result.naYin, 37)}│`);

  // 如果使用了真太阳时，添加提示
  if (result.trueSolarTime) {
    lines.push('│                                         │');
    lines.push(`│ ${padToWidth('⚠️  注意：已按真太阳时修正时柱', 37)}│`);
  }

  // 底部边框
  lines.push('└─────────────────────────────────────────┘');

  return lines.join('\n');
}

/**
 * 简单的单行输出格式
 */
export function formatBaziSimple(result: BaziResult): string {
  return `${result.solar} | ${result.pillars.year} ${result.pillars.month} ${result.pillars.day} ${result.pillars.hour} | 五行：金${result.wuXing.金}木${result.wuXing.木}水${result.wuXing.水}火${result.wuXing.火}土${result.wuXing.土}`;
}
