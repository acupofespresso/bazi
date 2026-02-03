import { LocationInfo } from './types';

/**
 * 中国主要城市经纬度数据库
 * 数据来源：国家测绘局标准
 */
export const CITIES: { [key: string]: LocationInfo } = {
  // 直辖市
  '北京': { longitude: 116.4, latitude: 39.9, timezone: 8, city: '北京' },
  '上海': { longitude: 121.5, latitude: 31.2, timezone: 8, city: '上海' },
  '天津': { longitude: 117.2, latitude: 39.1, timezone: 8, city: '天津' },
  '重庆': { longitude: 106.5, latitude: 29.6, timezone: 8, city: '重庆' },

  // 省会城市
  '广州': { longitude: 113.3, latitude: 23.1, timezone: 8, city: '广州' },
  '深圳': { longitude: 114.1, latitude: 22.5, timezone: 8, city: '深圳' },
  '成都': { longitude: 104.1, latitude: 30.7, timezone: 8, city: '成都' },
  '杭州': { longitude: 120.2, latitude: 30.3, timezone: 8, city: '杭州' },
  '西安': { longitude: 108.9, latitude: 34.3, timezone: 8, city: '西安' },
  '武汉': { longitude: 114.3, latitude: 30.6, timezone: 8, city: '武汉' },
  '南京': { longitude: 118.8, latitude: 32.1, timezone: 8, city: '南京' },
  '郑州': { longitude: 113.6, latitude: 34.7, timezone: 8, city: '郑州' },
  '长沙': { longitude: 112.9, latitude: 28.2, timezone: 8, city: '长沙' },
  '沈阳': { longitude: 123.4, latitude: 41.8, timezone: 8, city: '沈阳' },
  '哈尔滨': { longitude: 126.6, latitude: 45.8, timezone: 8, city: '哈尔滨' },
  '长春': { longitude: 125.3, latitude: 43.9, timezone: 8, city: '长春' },
  '济南': { longitude: 117.1, latitude: 36.7, timezone: 8, city: '济南' },
  '青岛': { longitude: 120.4, latitude: 36.1, timezone: 8, city: '青岛' },
  '南昌': { longitude: 115.9, latitude: 28.7, timezone: 8, city: '南昌' },
  '福州': { longitude: 119.3, latitude: 26.1, timezone: 8, city: '福州' },
  '厦门': { longitude: 118.1, latitude: 24.5, timezone: 8, city: '厦门' },
  '昆明': { longitude: 102.7, latitude: 25.0, timezone: 8, city: '昆明' },
  '贵阳': { longitude: 106.7, latitude: 26.6, timezone: 8, city: '贵阳' },
  '南宁': { longitude: 108.3, latitude: 22.8, timezone: 8, city: '南宁' },
  '海口': { longitude: 110.3, latitude: 20.0, timezone: 8, city: '海口' },
  '三亚': { longitude: 109.5, latitude: 18.3, timezone: 8, city: '三亚' },
  '石家庄': { longitude: 114.5, latitude: 38.0, timezone: 8, city: '石家庄' },
  '太原': { longitude: 112.5, latitude: 37.9, timezone: 8, city: '太原' },
  '呼和浩特': { longitude: 111.7, latitude: 40.8, timezone: 8, city: '呼和浩特' },
  '兰州': { longitude: 103.8, latitude: 36.1, timezone: 8, city: '兰州' },
  '西宁': { longitude: 101.8, latitude: 36.6, timezone: 8, city: '西宁' },
  '银川': { longitude: 106.3, latitude: 38.5, timezone: 8, city: '银川' },
  '乌鲁木齐': { longitude: 87.6, latitude: 43.8, timezone: 8, city: '乌鲁木齐' },
  '拉萨': { longitude: 91.1, latitude: 29.7, timezone: 8, city: '拉萨' },

  // 其他重要城市
  '苏州': { longitude: 120.6, latitude: 31.3, timezone: 8, city: '苏州' },
  '无锡': { longitude: 120.3, latitude: 31.6, timezone: 8, city: '无锡' },
  '宁波': { longitude: 121.5, latitude: 29.9, timezone: 8, city: '宁波' },
  '温州': { longitude: 120.7, latitude: 28.0, timezone: 8, city: '温州' },
  '台州': { longitude: 121.4, latitude: 28.7, timezone: 8, city: '台州' },
  '金华': { longitude: 119.6, latitude: 29.1, timezone: 8, city: '金华' },
  '嘉兴': { longitude: 120.8, latitude: 30.8, timezone: 8, city: '嘉兴' },
  '绍兴': { longitude: 120.6, latitude: 30.0, timezone: 8, city: '绍兴' },
  '合肥': { longitude: 117.2, latitude: 31.9, timezone: 8, city: '合肥' },
  '芜湖': { longitude: 118.4, latitude: 31.4, timezone: 8, city: '芜湖' },
  '大连': { longitude: 121.6, latitude: 38.9, timezone: 8, city: '大连' },
  '佛山': { longitude: 113.1, latitude: 23.0, timezone: 8, city: '佛山' },
  '东莞': { longitude: 113.8, latitude: 23.0, timezone: 8, city: '东莞' },
  '珠海': { longitude: 113.6, latitude: 22.3, timezone: 8, city: '珠海' },
  '中山': { longitude: 113.4, latitude: 22.5, timezone: 8, city: '中山' },
  '惠州': { longitude: 114.4, latitude: 23.1, timezone: 8, city: '惠州' },
  '江门': { longitude: 113.1, latitude: 22.6, timezone: 8, city: '江门' },
  '湛江': { longitude: 110.4, latitude: 21.3, timezone: 8, city: '湛江' },
  '汕头': { longitude: 116.7, latitude: 23.4, timezone: 8, city: '汕头' },
  '唐山': { longitude: 118.2, latitude: 39.6, timezone: 8, city: '唐山' },
  '保定': { longitude: 115.5, latitude: 38.9, timezone: 8, city: '保定' },
  '邯郸': { longitude: 114.5, latitude: 36.6, timezone: 8, city: '邯郸' },
  '洛阳': { longitude: 112.5, latitude: 34.7, timezone: 8, city: '洛阳' },
  '开封': { longitude: 114.3, latitude: 34.8, timezone: 8, city: '开封' },
  '徐州': { longitude: 117.2, latitude: 34.3, timezone: 8, city: '徐州' },
  '常州': { longitude: 119.9, latitude: 31.8, timezone: 8, city: '常州' },
  '扬州': { longitude: 119.4, latitude: 32.4, timezone: 8, city: '扬州' },
  '南通': { longitude: 120.9, latitude: 32.0, timezone: 8, city: '南通' },
  '镇江': { longitude: 119.4, latitude: 32.2, timezone: 8, city: '镇江' },
  '泰州': { longitude: 119.9, latitude: 32.5, timezone: 8, city: '泰州' },
  '盐城': { longitude: 120.1, latitude: 33.4, timezone: 8, city: '盐城' },
  '淮安': { longitude: 119.0, latitude: 33.6, timezone: 8, city: '淮安' },
  '连云港': { longitude: 119.2, latitude: 34.6, timezone: 8, city: '连云港' },
  '宿迁': { longitude: 118.3, latitude: 33.9, timezone: 8, city: '宿迁' },
  '烟台': { longitude: 121.4, latitude: 37.5, timezone: 8, city: '烟台' },
  '威海': { longitude: 122.1, latitude: 37.5, timezone: 8, city: '威海' },
  '潍坊': { longitude: 119.1, latitude: 36.7, timezone: 8, city: '潍坊' },
  '临沂': { longitude: 118.3, latitude: 35.1, timezone: 8, city: '临沂' },
  '绵阳': { longitude: 104.7, latitude: 31.5, timezone: 8, city: '绵阳' },
  '南充': { longitude: 106.1, latitude: 30.8, timezone: 8, city: '南充' },
  '宜宾': { longitude: 104.6, latitude: 28.8, timezone: 8, city: '宜宾' },
  '泸州': { longitude: 105.4, latitude: 28.9, timezone: 8, city: '泸州' },
  '德阳': { longitude: 104.4, latitude: 31.1, timezone: 8, city: '德阳' },
  '遵义': { longitude: 106.9, latitude: 27.7, timezone: 8, city: '遵义' },
  '桂林': { longitude: 110.3, latitude: 25.3, timezone: 8, city: '桂林' },
  '柳州': { longitude: 109.4, latitude: 24.3, timezone: 8, city: '柳州' },

  // 港澳台
  '香港': { longitude: 114.2, latitude: 22.3, timezone: 8, city: '香港' },
  '澳门': { longitude: 113.5, latitude: 22.2, timezone: 8, city: '澳门' },
  '台北': { longitude: 121.5, latitude: 25.0, timezone: 8, city: '台北' },
  '高雄': { longitude: 120.3, latitude: 22.6, timezone: 8, city: '高雄' },
  '台中': { longitude: 120.7, latitude: 24.1, timezone: 8, city: '台中' }
};

/**
 * 根据城市名称获取地理位置信息
 *
 * @param cityName 城市名称
 * @returns 地理位置信息，如果未找到返回null
 */
export function getCityLocation(cityName: string): LocationInfo | null {
  return CITIES[cityName] || null;
}

/**
 * 获取所有支持的城市列表
 *
 * @returns 城市名称数组
 */
export function getSupportedCities(): string[] {
  return Object.keys(CITIES).sort();
}

/**
 * 搜索城市（支持模糊匹配）
 *
 * @param keyword 搜索关键词
 * @returns 匹配的城市列表
 */
export function searchCities(keyword: string): string[] {
  return Object.keys(CITIES).filter(city => city.includes(keyword)).sort();
}

/**
 * 获取城市数量
 *
 * @returns 支持的城市数量
 */
export function getCityCount(): number {
  return Object.keys(CITIES).length;
}
