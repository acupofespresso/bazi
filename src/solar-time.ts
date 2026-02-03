import { LocationInfo, TrueSolarTimeResult } from './types';

/**
 * 计算时差方程（Equation of Time）
 * 基于地球椭圆轨道和地轴倾斜的影响
 *
 * @param date 日期
 * @returns 时差方程修正值（分钟）
 */
function calculateEquationOfTime(date: Date): number {
  // 计算当年第几天
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000) + 1;

  // 计算角度参数
  const b = 2 * Math.PI * (dayOfYear - 81) / 365;

  // 使用更精确的傅里叶级数展开公式
  // 这个公式的精度可以达到±30秒
  const eot = 9.87 * Math.sin(2 * b)
            - 7.53 * Math.cos(b)
            - 1.5 * Math.sin(b);

  return eot;
}

/**
 * 计算真太阳时
 *
 * 真太阳时 = 平太阳时 + 经度修正 + 时差方程修正
 *
 * @param date 原始日期时间（平太阳时，通常是北京时间）
 * @param longitude 经度（东经为正）
 * @param timezone 时区偏移（默认+8，北京时间）
 * @returns 真太阳时计算结果
 */
export function calculateTrueSolarTime(
  date: Date,
  longitude: number,
  timezone: number = 8
): TrueSolarTimeResult {
  // 1. 计算经度时差
  // 时区标准经度 = 时区 × 15度
  // 例如：东八区（UTC+8）的标准经度是 120°E
  const standardLongitude = timezone * 15;

  // 经度时差 = (本地经度 - 标准经度) × 4分钟/度
  // 东边的地方太阳早升起，时间应该加上；西边的要减去
  const longitudeDiff = (longitude - standardLongitude) * 4;

  // 2. 计算时差方程修正
  // 由于地球椭圆轨道和地轴倾斜，真太阳时和平太阳时有差异
  const equationOfTime = calculateEquationOfTime(date);

  // 3. 计算总修正量
  const totalMinutes = longitudeDiff + equationOfTime;

  // 4. 应用修正
  const adjustedTime = new Date(date.getTime() + totalMinutes * 60000);

  return {
    originalTime: date,
    adjustedTime,
    longitudeDiff: Math.round(longitudeDiff * 10) / 10,
    equationOfTime: Math.round(equationOfTime * 10) / 10,
    totalAdjustment: Math.round(totalMinutes * 10) / 10
  };
}

/**
 * 计算带地理位置的真太阳时
 *
 * @param date 原始日期时间
 * @param location 地理位置信息
 * @returns 真太阳时计算结果
 */
export function calculateTrueSolarTimeWithLocation(
  date: Date,
  location: LocationInfo
): TrueSolarTimeResult {
  const result = calculateTrueSolarTime(
    date,
    location.longitude,
    location.timezone || 8
  );

  return {
    ...result,
    location
  };
}

/**
 * 格式化时间修正说明
 *
 * @param result 真太阳时计算结果
 * @returns 格式化的说明文本
 */
export function formatTrueSolarTimeInfo(result: TrueSolarTimeResult): string {
  const lines: string[] = [];

  if (result.location?.city) {
    lines.push(`出生地：${result.location.city}（东经${result.location.longitude}°）`);
  } else {
    lines.push(`出生地：东经${result.location?.longitude || '未知'}°`);
  }

  const formatTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}年${month}月${day}日 ${hour}:${minute}`;
  };

  lines.push(`北京时间：${formatTime(result.originalTime)}`);
  lines.push(`真太阳时：${formatTime(result.adjustedTime)}`);

  // 修正量说明
  const adjustParts: string[] = [];
  if (result.longitudeDiff !== 0) {
    adjustParts.push(`经度差${result.longitudeDiff > 0 ? '+' : ''}${result.longitudeDiff.toFixed(1)}分钟`);
  }
  if (result.equationOfTime !== 0) {
    adjustParts.push(`时差方程${result.equationOfTime > 0 ? '+' : ''}${result.equationOfTime.toFixed(1)}分钟`);
  }

  if (adjustParts.length > 0) {
    lines.push(`时间修正：${adjustParts.join('，')}，共${result.totalAdjustment > 0 ? '+' : ''}${result.totalAdjustment.toFixed(1)}分钟`);
  }

  return lines.join('\n');
}
