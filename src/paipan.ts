/// <reference path="./lunar-javascript.d.ts" />
import { Solar, Lunar } from 'lunar-javascript';
import { BaziInput, BaziResult, Pillars, PillarData, WuXing, TrueSolarTimeResult } from './types';
import { calculateTrueSolarTimeWithLocation } from './solar-time';
import { ShenShaEngine } from './shensha';

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
  '丑': '土', '辰': '土',
  '未': '土', '戌': '土'
};

/**
 * 统计五行数量
 */
function countWuXing(pillars: Pillars): WuXing {
  const wuXing: WuXing = { 金: 0, 木: 0, 水: 0, 火: 0, 土: 0 };

  const check = (char: string) => {
    const element = WU_XING_MAP[char];
    if (element) {
      wuXing[element as keyof WuXing]++;
    }
  };

  const processPillar = (p: PillarData) => {
    check(p.gan);
    check(p.zhi);
  };

  processPillar(pillars.year);
  processPillar(pillars.month);
  processPillar(pillars.day);
  processPillar(pillars.hour);

  return wuXing;
}

/**
 * 核心排盘函数
 */
export function calculateBazi(input: BaziInput): BaziResult {
  let { year, month, day, hour, minute = 0, second = 0 } = input;
  const { isLunar = false, location, useTrueSolarTime = false, gender } = input;

  let trueSolarTimeResult: TrueSolarTimeResult | undefined;

  // 如果提供了位置信息且需要使用真太阳时
  if (location && useTrueSolarTime && !isLunar) {
    const originalDate = new Date(year, month - 1, day, hour, minute, second);
    trueSolarTimeResult = calculateTrueSolarTimeWithLocation(originalDate, location);
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
    lunar = Lunar.fromYmdHms(year, month, day, hour, minute, second);
  } else {
    const solar = Solar.fromYmdHms(year, month, day, hour, minute, second);
    lunar = solar.getLunar();
  }

  const eightChar = lunar.getEightChar();
  // 设置性别
  if (gender) {
    eightChar.setSect(gender === '男' ? 1 : 0);
  }

  const getPillarData = (
    gan: string,
    zhi: string,
    shishenGan: string,
    shishensZhi: string[],
    hiddens: string[],
    shensha: string[]
  ): PillarData => {
    return {
      gan,
      zhi,
      shishenGan: shishenGan || (gan === eightChar.getDayGan() ? '日主' : ''),
      shishenZhi: shishensZhi[0] || '',
      hiddens: hiddens.map((h, index) => ({
        gan: h,
        shishen: shishensZhi[index] || ''
      })),
      shensha
    };
  };

  const pillars: Pillars = {
    year: getPillarData(
      eightChar.getYearGan(),
      eightChar.getYearZhi(),
      eightChar.getYearShiShenGan(),
      eightChar.getYearShiShenZhi(),
      eightChar.getYearHideGan(),
      []
    ),
    month: getPillarData(
      eightChar.getMonthGan(),
      eightChar.getMonthZhi(),
      eightChar.getMonthShiShenGan(),
      eightChar.getMonthShiShenZhi(),
      eightChar.getMonthHideGan(),
      []
    ),
    day: getPillarData(
      eightChar.getDayGan(),
      eightChar.getDayZhi(),
      '日主',
      eightChar.getDayShiShenZhi(),
      eightChar.getDayHideGan(),
      []
    ),
    hour: getPillarData(
      eightChar.getTimeGan(),
      eightChar.getTimeZhi(),
      eightChar.getTimeShiShenGan(),
      eightChar.getTimeShiShenZhi(),
      eightChar.getTimeHideGan(),
      []
    )
  };

  // 注入神煞信息 (因为某些神煞判定需要全柱信息)
  pillars.year.shensha = ShenShaEngine.getShenSha(pillars, 'year');
  pillars.month.shensha = ShenShaEngine.getShenSha(pillars, 'month');
  pillars.day.shensha = ShenShaEngine.getShenSha(pillars, 'day');
  pillars.hour.shensha = ShenShaEngine.getShenSha(pillars, 'hour');

  // 统计五行
  const wuXing = countWuXing(pillars);

  // 获取纳音
  const naYin = eightChar.getYearNaYin();

  const solar = lunar.getSolar();
  const solarStr = `${solar.getYear()}年${solar.getMonth()}月${solar.getDay()}日 ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  const lunarStr = `${lunar.getYearInGanZhi()}年 ${lunar.getMonthInChinese()}月${lunar.getDayInChinese()} ${lunar.getTimeInGanZhi().split(' ')[0]}时`;

  return {
    solar: solarStr,
    lunar: lunarStr,
    pillars,
    wuXing,
    naYin,
    trueSolarTime: trueSolarTimeResult,
    gender
  };
}
