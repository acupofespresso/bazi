/**
 * 地理位置信息
 */
export interface LocationInfo {
  longitude: number;   // 经度（东经为正，西经为负）
  latitude?: number;   // 纬度（北纬为正，南纬为负，可选）
  timezone?: number;   // 时区偏移（默认+8，北京时间）
  city?: string;       // 城市名称（可选）
}

/**
 * 真太阳时计算结果
 */
export interface TrueSolarTimeResult {
  originalTime: Date;         // 原始时间
  adjustedTime: Date;         // 修正后的时间
  longitudeDiff: number;      // 经度时差（分钟）
  equationOfTime: number;     // 时差方程修正（分钟）
  totalAdjustment: number;    // 总修正量（分钟）
  location?: LocationInfo;    // 位置信息
}

/**
 * 八字输入参数
 */
export interface BaziInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute?: number;
  second?: number;
  gender?: '男' | '女';
  isLunar?: boolean;
  location?: LocationInfo;        // 地理位置信息
  useTrueSolarTime?: boolean;     // 是否使用真太阳时（默认false）
}

/**
 * 四柱信息
 */
export interface Pillars {
  year: string;    // 年柱，如：己巳
  month: string;   // 月柱，如：丁丑
  day: string;     // 日柱，如：癸酉
  hour: string;    // 时柱，如：己未
}

/**
 * 十神信息
 */
export interface ShiShen {
  year: string;
  month: string;
  day: string;
  hour: string;
}

/**
 * 五行统计
 */
export interface WuXing {
  金: number;
  木: number;
  水: number;
  火: number;
  土: number;
}

/**
 * 八字排盘结果
 */
export interface BaziResult {
  solar: string;                    // 公历，如：1990年1月15日 14:30
  lunar: string;                    // 农历，如：己巳年 腊月十九 未时
  pillars: Pillars;                 // 四柱
  shiShen: ShiShen;                 // 十神
  wuXing: WuXing;                   // 五行统计
  naYin: string;                    // 纳音，如：大林木
  trueSolarTime?: TrueSolarTimeResult;  // 真太阳时信息（如果使用）
}
