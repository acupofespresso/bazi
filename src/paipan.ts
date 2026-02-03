import { Solar, Lunar } from 'lunar-javascript';
import { BaziInput, BaziResult, Pillars, ShiShen, WuXing, TrueSolarTimeResult } from './types';
import { calculateTrueSolarTimeWithLocation } from './solar-time';

/**
 * 五行对照表
 */
const WU_XING_MAP: { [key: string]: string } = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
  '子': '水', '亥': '水',
  '寅': '木', '卯': '木',
  '巳': '火', '午': '火',
  '申': '金', '酉': '金',
  '丑': '土', '辰': '土', '未': '土', '戌': '土'
};

/**
 * 统计五行数量
 */
function countWuXing(pillars: Pillars): WuXing {
  const wuXing: WuXing = { 金: 0, 木: 0, 水: 0, 火: 0, 土: 0 };

  // 遍历四柱的每个字
  const allChars = [
    ...pillars.year.split(''),
    ...pillars.month.split(''),
    ...pillars.day.split(''),
    ...pillars.hour.split('')
  ];

  allChars.forEach(char => {
    const element = WU_XING_MAP[char];
    if (element) {
      wuXing[element as keyof WuXing]++;
    }
  });

  return wuXing;
}

/**
 * 核心排盘函数
 */
export function calculateBazi(input: BaziInput): BaziResult {
  let { year, month, day, hour, minute = 0, second = 0 } = input;
  const { isLunar = false, location, useTrueSolarTime = false } = input;

  let trueSolarTimeResult: TrueSolarTimeResult | undefined;

  // 如果提供了位置信息且需要使用真太阳时
  if (location && useTrueSolarTime && !isLunar) {
    // 创建原始时间的Date对象
    const originalDate = new Date(year, month - 1, day, hour, minute, second);

    // 计算真太阳时
    trueSolarTimeResult = calculateTrueSolarTimeWithLocation(originalDate, location);

    // 使用修正后的时间进行排盘
    const adjusted = trueSolarTimeResult.adjustedTime;
    year = adjusted.getFullYear();
    month = adjusted.getMonth() + 1;
    day = adjusted.getDate();
    hour = adjusted.getHours();
    minute = adjusted.getMinutes();
    second = adjusted.getSeconds();
  }

  // 创建Solar或Lunar对象
  let lunar: Lunar;

  if (isLunar) {
    // 如果输入的是农历
    lunar = Lunar.fromYmdHms(year, month, day, hour, minute, second);
  } else {
    // 如果输入的是公历
    const solar = Solar.fromYmdHms(year, month, day, hour, minute, second);
    lunar = solar.getLunar();
  }

  // 获取八字对象
  const eightChar = lunar.getEightChar();

  // 获取四柱
  const pillars: Pillars = {
    year: eightChar.getYear(),
    month: eightChar.getMonth(),
    day: eightChar.getDay(),
    hour: eightChar.getTime()
  };

  // 获取十神（每个柱的天干十神）
  const shiShen: ShiShen = {
    year: eightChar.getYearShiShenGan() || '',
    month: eightChar.getMonthShiShenGan() || '',
    day: '日主',
    hour: eightChar.getTimeShiShenGan() || ''
  };

  // 统计五行
  const wuXing = countWuXing(pillars);

  // 获取纳音
  const naYin = eightChar.getYearNaYin();

  // 格式化日期
  const solar = lunar.getSolar();
  const solarStr = `${solar.getYear()}年${solar.getMonth()}月${solar.getDay()}日 ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  const lunarStr = `${lunar.getYearInGanZhi()}年 ${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} ${lunar.getTimeInGanZhi().split(' ')[0]}时`;

  return {
    solar: solarStr,
    lunar: lunarStr,
    pillars,
    shiShen,
    wuXing,
    naYin,
    trueSolarTime: trueSolarTimeResult
  };
}
