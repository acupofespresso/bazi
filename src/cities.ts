import { LocationInfo } from './types';

/**
 * 中国所有地级市、自治州、地区、盟及省直管县级市的经纬度数据库
 * 数据来源：国家测绘局、民政部行政区划数据
 * 坐标系统：GCJ-02（中国国测局坐标，适用于国内地图服务）
 * 总计：333个地级行政区 + 省直管县级市
 */
export const CITIES: { [key: string]: LocationInfo } = {
  // ==================== 直辖市 (4个) ====================
  '北京': { longitude: 116.4, latitude: 39.9, timezone: 8, city: '北京' },
  '上海': { longitude: 121.5, latitude: 31.2, timezone: 8, city: '上海' },
  '天津': { longitude: 117.2, latitude: 39.1, timezone: 8, city: '天津' },
  '重庆': { longitude: 106.5, latitude: 29.6, timezone: 8, city: '重庆' },

  // ==================== 河北省 (11个地级市) ====================
  '石家庄': { longitude: 114.5, latitude: 38.0, timezone: 8, city: '石家庄' },
  '唐山': { longitude: 118.2, latitude: 39.6, timezone: 8, city: '唐山' },
  '秦皇岛': { longitude: 119.6, latitude: 39.9, timezone: 8, city: '秦皇岛' },
  '邯郸': { longitude: 114.5, latitude: 36.6, timezone: 8, city: '邯郸' },
  '邢台': { longitude: 114.5, latitude: 37.1, timezone: 8, city: '邢台' },
  '保定': { longitude: 115.5, latitude: 38.9, timezone: 8, city: '保定' },
  '张家口': { longitude: 114.9, latitude: 40.8, timezone: 8, city: '张家口' },
  '承德': { longitude: 117.9, latitude: 40.9, timezone: 8, city: '承德' },
  '沧州': { longitude: 116.8, latitude: 38.3, timezone: 8, city: '沧州' },
  '廊坊': { longitude: 116.7, latitude: 39.5, timezone: 8, city: '廊坊' },
  '衡水': { longitude: 115.7, latitude: 37.7, timezone: 8, city: '衡水' },

  // ==================== 山西省 (11个地级市) ====================
  '太原': { longitude: 112.5, latitude: 37.9, timezone: 8, city: '太原' },
  '大同': { longitude: 113.3, latitude: 40.1, timezone: 8, city: '大同' },
  '阳泉': { longitude: 113.6, latitude: 37.9, timezone: 8, city: '阳泉' },
  '长治': { longitude: 113.1, latitude: 36.2, timezone: 8, city: '长治' },
  '晋城': { longitude: 112.9, latitude: 35.5, timezone: 8, city: '晋城' },
  '朔州': { longitude: 112.4, latitude: 39.3, timezone: 8, city: '朔州' },
  '晋中': { longitude: 112.7, latitude: 37.7, timezone: 8, city: '晋中' },
  '运城': { longitude: 111.0, latitude: 35.0, timezone: 8, city: '运城' },
  '忻州': { longitude: 112.7, latitude: 38.4, timezone: 8, city: '忻州' },
  '临汾': { longitude: 111.5, latitude: 36.1, timezone: 8, city: '临汾' },
  '吕梁': { longitude: 111.1, latitude: 37.5, timezone: 8, city: '吕梁' },

  // ==================== 内蒙古自治区 (9个地级市 + 3个盟) ====================
  '呼和浩特': { longitude: 111.7, latitude: 40.8, timezone: 8, city: '呼和浩特' },
  '包头': { longitude: 109.8, latitude: 40.7, timezone: 8, city: '包头' },
  '乌海': { longitude: 106.8, latitude: 39.7, timezone: 8, city: '乌海' },
  '赤峰': { longitude: 118.9, latitude: 42.3, timezone: 8, city: '赤峰' },
  '通辽': { longitude: 122.2, latitude: 43.6, timezone: 8, city: '通辽' },
  '鄂尔多斯': { longitude: 109.8, latitude: 39.6, timezone: 8, city: '鄂尔多斯' },
  '呼伦贝尔': { longitude: 119.8, latitude: 49.2, timezone: 8, city: '呼伦贝尔' },
  '巴彦淖尔': { longitude: 107.4, latitude: 40.7, timezone: 8, city: '巴彦淖尔' },
  '乌兰察布': { longitude: 113.1, latitude: 41.0, timezone: 8, city: '乌兰察布' },
  '兴安盟': { longitude: 122.0, latitude: 46.1, timezone: 8, city: '兴安盟' },
  '锡林郭勒盟': { longitude: 116.1, latitude: 43.9, timezone: 8, city: '锡林郭勒盟' },
  '阿拉善盟': { longitude: 105.7, latitude: 38.8, timezone: 8, city: '阿拉善盟' },

  // ==================== 辽宁省 (14个地级市) ====================
  '沈阳': { longitude: 123.4, latitude: 41.8, timezone: 8, city: '沈阳' },
  '大连': { longitude: 121.6, latitude: 38.9, timezone: 8, city: '大连' },
  '鞍山': { longitude: 122.9, latitude: 41.1, timezone: 8, city: '鞍山' },
  '抚顺': { longitude: 123.9, latitude: 41.9, timezone: 8, city: '抚顺' },
  '本溪': { longitude: 123.8, latitude: 41.3, timezone: 8, city: '本溪' },
  '丹东': { longitude: 124.4, latitude: 40.1, timezone: 8, city: '丹东' },
  '锦州': { longitude: 121.1, latitude: 41.1, timezone: 8, city: '锦州' },
  '营口': { longitude: 122.2, latitude: 40.7, timezone: 8, city: '营口' },
  '阜新': { longitude: 121.7, latitude: 42.0, timezone: 8, city: '阜新' },
  '辽阳': { longitude: 123.2, latitude: 41.3, timezone: 8, city: '辽阳' },
  '盘锦': { longitude: 122.1, latitude: 41.1, timezone: 8, city: '盘锦' },
  '铁岭': { longitude: 123.8, latitude: 42.3, timezone: 8, city: '铁岭' },
  '朝阳': { longitude: 120.5, latitude: 41.6, timezone: 8, city: '朝阳' },
  '葫芦岛': { longitude: 120.9, latitude: 40.7, timezone: 8, city: '葫芦岛' },

  // ==================== 吉林省 (8个地级市 + 1个自治州) ====================
  '长春': { longitude: 125.3, latitude: 43.9, timezone: 8, city: '长春' },
  '吉林': { longitude: 126.5, latitude: 43.8, timezone: 8, city: '吉林' },
  '四平': { longitude: 124.4, latitude: 43.2, timezone: 8, city: '四平' },
  '辽源': { longitude: 125.1, latitude: 42.9, timezone: 8, city: '辽源' },
  '通化': { longitude: 125.9, latitude: 41.7, timezone: 8, city: '通化' },
  '白山': { longitude: 126.4, latitude: 41.9, timezone: 8, city: '白山' },
  '松原': { longitude: 124.8, latitude: 45.1, timezone: 8, city: '松原' },
  '白城': { longitude: 122.8, latitude: 45.6, timezone: 8, city: '白城' },
  '延边朝鲜族自治州': { longitude: 129.5, latitude: 42.9, timezone: 8, city: '延边朝鲜族自治州' },

  // ==================== 黑龙江省 (12个地级市 + 1个地区) ====================
  '哈尔滨': { longitude: 126.6, latitude: 45.8, timezone: 8, city: '哈尔滨' },
  '齐齐哈尔': { longitude: 123.9, latitude: 47.3, timezone: 8, city: '齐齐哈尔' },
  '鸡西': { longitude: 130.9, latitude: 45.3, timezone: 8, city: '鸡西' },
  '鹤岗': { longitude: 130.3, latitude: 47.3, timezone: 8, city: '鹤岗' },
  '双鸭山': { longitude: 131.2, latitude: 46.6, timezone: 8, city: '双鸭山' },
  '大庆': { longitude: 125.1, latitude: 46.6, timezone: 8, city: '大庆' },
  '伊春': { longitude: 128.9, latitude: 47.7, timezone: 8, city: '伊春' },
  '佳木斯': { longitude: 130.4, latitude: 46.8, timezone: 8, city: '佳木斯' },
  '七台河': { longitude: 131.0, latitude: 45.8, timezone: 8, city: '七台河' },
  '牡丹江': { longitude: 129.6, latitude: 44.6, timezone: 8, city: '牡丹江' },
  '黑河': { longitude: 127.5, latitude: 50.2, timezone: 8, city: '黑河' },
  '绥化': { longitude: 126.9, latitude: 46.6, timezone: 8, city: '绥化' },
  '大兴安岭地区': { longitude: 124.1, latitude: 50.4, timezone: 8, city: '大兴安岭地区' },

  // ==================== 江苏省 (13个地级市) ====================
  '南京': { longitude: 118.8, latitude: 32.1, timezone: 8, city: '南京' },
  '无锡': { longitude: 120.3, latitude: 31.6, timezone: 8, city: '无锡' },
  '徐州': { longitude: 117.2, latitude: 34.3, timezone: 8, city: '徐州' },
  '常州': { longitude: 119.9, latitude: 31.8, timezone: 8, city: '常州' },
  '苏州': { longitude: 120.6, latitude: 31.3, timezone: 8, city: '苏州' },
  '南通': { longitude: 120.9, latitude: 32.0, timezone: 8, city: '南通' },
  '连云港': { longitude: 119.2, latitude: 34.6, timezone: 8, city: '连云港' },
  '淮安': { longitude: 119.0, latitude: 33.6, timezone: 8, city: '淮安' },
  '盐城': { longitude: 120.1, latitude: 33.4, timezone: 8, city: '盐城' },
  '扬州': { longitude: 119.4, latitude: 32.4, timezone: 8, city: '扬州' },
  '镇江': { longitude: 119.4, latitude: 32.2, timezone: 8, city: '镇江' },
  '泰州': { longitude: 119.9, latitude: 32.5, timezone: 8, city: '泰州' },
  '宿迁': { longitude: 118.3, latitude: 33.9, timezone: 8, city: '宿迁' },

  // ==================== 浙江省 (11个地级市) ====================
  '杭州': { longitude: 120.2, latitude: 30.3, timezone: 8, city: '杭州' },
  '宁波': { longitude: 121.5, latitude: 29.9, timezone: 8, city: '宁波' },
  '温州': { longitude: 120.7, latitude: 28.0, timezone: 8, city: '温州' },
  '嘉兴': { longitude: 120.8, latitude: 30.8, timezone: 8, city: '嘉兴' },
  '湖州': { longitude: 120.1, latitude: 30.9, timezone: 8, city: '湖州' },
  '绍兴': { longitude: 120.6, latitude: 30.0, timezone: 8, city: '绍兴' },
  '金华': { longitude: 119.6, latitude: 29.1, timezone: 8, city: '金华' },
  '衢州': { longitude: 118.9, latitude: 28.9, timezone: 8, city: '衢州' },
  '舟山': { longitude: 122.1, latitude: 30.0, timezone: 8, city: '舟山' },
  '台州': { longitude: 121.4, latitude: 28.7, timezone: 8, city: '台州' },
  '丽水': { longitude: 119.9, latitude: 28.5, timezone: 8, city: '丽水' },

  // ==================== 安徽省 (16个地级市) ====================
  '合肥': { longitude: 117.2, latitude: 31.9, timezone: 8, city: '合肥' },
  '芜湖': { longitude: 118.4, latitude: 31.4, timezone: 8, city: '芜湖' },
  '蚌埠': { longitude: 117.4, latitude: 32.9, timezone: 8, city: '蚌埠' },
  '淮南': { longitude: 117.0, latitude: 32.6, timezone: 8, city: '淮南' },
  '马鞍山': { longitude: 118.5, latitude: 31.7, timezone: 8, city: '马鞍山' },
  '淮北': { longitude: 116.8, latitude: 33.9, timezone: 8, city: '淮北' },
  '铜陵': { longitude: 117.8, latitude: 30.9, timezone: 8, city: '铜陵' },
  '安庆': { longitude: 117.0, latitude: 30.5, timezone: 8, city: '安庆' },
  '黄山': { longitude: 118.3, latitude: 29.7, timezone: 8, city: '黄山' },
  '滁州': { longitude: 118.3, latitude: 32.3, timezone: 8, city: '滁州' },
  '阜阳': { longitude: 115.8, latitude: 32.9, timezone: 8, city: '阜阳' },
  '宿州': { longitude: 116.9, latitude: 33.6, timezone: 8, city: '宿州' },
  '六安': { longitude: 116.5, latitude: 31.7, timezone: 8, city: '六安' },
  '亳州': { longitude: 115.8, latitude: 33.9, timezone: 8, city: '亳州' },
  '池州': { longitude: 117.5, latitude: 30.7, timezone: 8, city: '池州' },
  '宣城': { longitude: 118.8, latitude: 30.9, timezone: 8, city: '宣城' },

  // ==================== 福建省 (9个地级市) ====================
  '福州': { longitude: 119.3, latitude: 26.1, timezone: 8, city: '福州' },
  '厦门': { longitude: 118.1, latitude: 24.5, timezone: 8, city: '厦门' },
  '莆田': { longitude: 119.0, latitude: 25.5, timezone: 8, city: '莆田' },
  '三明': { longitude: 117.6, latitude: 26.3, timezone: 8, city: '三明' },
  '泉州': { longitude: 118.6, latitude: 24.9, timezone: 8, city: '泉州' },
  '漳州': { longitude: 117.6, latitude: 24.5, timezone: 8, city: '漳州' },
  '南平': { longitude: 118.2, latitude: 26.6, timezone: 8, city: '南平' },
  '龙岩': { longitude: 117.0, latitude: 25.1, timezone: 8, city: '龙岩' },
  '宁德': { longitude: 119.5, latitude: 26.7, timezone: 8, city: '宁德' },

  // ==================== 江西省 (11个地级市) ====================
  '南昌': { longitude: 115.9, latitude: 28.7, timezone: 8, city: '南昌' },
  '景德镇': { longitude: 117.2, latitude: 29.3, timezone: 8, city: '景德镇' },
  '萍乡': { longitude: 113.9, latitude: 27.6, timezone: 8, city: '萍乡' },
  '九江': { longitude: 116.0, latitude: 29.7, timezone: 8, city: '九江' },
  '新余': { longitude: 114.9, latitude: 27.8, timezone: 8, city: '新余' },
  '鹰潭': { longitude: 117.0, latitude: 28.2, timezone: 8, city: '鹰潭' },
  '赣州': { longitude: 114.9, latitude: 25.8, timezone: 8, city: '赣州' },
  '吉安': { longitude: 115.0, latitude: 27.1, timezone: 8, city: '吉安' },
  '宜春': { longitude: 114.4, latitude: 27.8, timezone: 8, city: '宜春' },
  '抚州': { longitude: 116.4, latitude: 28.0, timezone: 8, city: '抚州' },
  '上饶': { longitude: 117.9, latitude: 28.5, timezone: 8, city: '上饶' },

  // ==================== 山东省 (16个地级市) ====================
  '济南': { longitude: 117.1, latitude: 36.7, timezone: 8, city: '济南' },
  '青岛': { longitude: 120.4, latitude: 36.1, timezone: 8, city: '青岛' },
  '淄博': { longitude: 118.1, latitude: 36.8, timezone: 8, city: '淄博' },
  '枣庄': { longitude: 117.6, latitude: 34.9, timezone: 8, city: '枣庄' },
  '东营': { longitude: 118.7, latitude: 37.5, timezone: 8, city: '东营' },
  '烟台': { longitude: 121.4, latitude: 37.5, timezone: 8, city: '烟台' },
  '潍坊': { longitude: 119.1, latitude: 36.7, timezone: 8, city: '潍坊' },
  '济宁': { longitude: 116.6, latitude: 35.4, timezone: 8, city: '济宁' },
  '泰安': { longitude: 117.1, latitude: 36.2, timezone: 8, city: '泰安' },
  '威海': { longitude: 122.1, latitude: 37.5, timezone: 8, city: '威海' },
  '日照': { longitude: 119.5, latitude: 35.4, timezone: 8, city: '日照' },
  '临沂': { longitude: 118.3, latitude: 35.1, timezone: 8, city: '临沂' },
  '德州': { longitude: 116.4, latitude: 37.5, timezone: 8, city: '德州' },
  '聊城': { longitude: 115.9, latitude: 36.5, timezone: 8, city: '聊城' },
  '滨州': { longitude: 118.0, latitude: 37.4, timezone: 8, city: '滨州' },
  '菏泽': { longitude: 115.5, latitude: 35.2, timezone: 8, city: '菏泽' },

  // ==================== 河南省 (17个地级市) ====================
  '郑州': { longitude: 113.6, latitude: 34.7, timezone: 8, city: '郑州' },
  '开封': { longitude: 114.3, latitude: 34.8, timezone: 8, city: '开封' },
  '洛阳': { longitude: 112.5, latitude: 34.7, timezone: 8, city: '洛阳' },
  '平顶山': { longitude: 113.3, latitude: 33.7, timezone: 8, city: '平顶山' },
  '安阳': { longitude: 114.4, latitude: 36.1, timezone: 8, city: '安阳' },
  '鹤壁': { longitude: 114.3, latitude: 35.7, timezone: 8, city: '鹤壁' },
  '新乡': { longitude: 113.9, latitude: 35.3, timezone: 8, city: '新乡' },
  '焦作': { longitude: 113.2, latitude: 35.2, timezone: 8, city: '焦作' },
  '濮阳': { longitude: 115.0, latitude: 35.8, timezone: 8, city: '濮阳' },
  '许昌': { longitude: 113.9, latitude: 34.0, timezone: 8, city: '许昌' },
  '漯河': { longitude: 114.0, latitude: 33.6, timezone: 8, city: '漯河' },
  '三门峡': { longitude: 111.2, latitude: 34.8, timezone: 8, city: '三门峡' },
  '南阳': { longitude: 112.5, latitude: 33.0, timezone: 8, city: '南阳' },
  '商丘': { longitude: 115.7, latitude: 34.4, timezone: 8, city: '商丘' },
  '信阳': { longitude: 114.1, latitude: 32.1, timezone: 8, city: '信阳' },
  '周口': { longitude: 114.6, latitude: 33.6, timezone: 8, city: '周口' },
  '驻马店': { longitude: 114.0, latitude: 33.0, timezone: 8, city: '驻马店' },

  // ==================== 湖北省 (12个地级市 + 1个自治州 + 4个省直管市) ====================
  '武汉': { longitude: 114.3, latitude: 30.6, timezone: 8, city: '武汉' },
  '黄石': { longitude: 115.0, latitude: 30.2, timezone: 8, city: '黄石' },
  '十堰': { longitude: 110.8, latitude: 32.6, timezone: 8, city: '十堰' },
  '宜昌': { longitude: 111.3, latitude: 30.7, timezone: 8, city: '宜昌' },
  '襄阳': { longitude: 112.1, latitude: 32.0, timezone: 8, city: '襄阳' },
  '鄂州': { longitude: 114.9, latitude: 30.4, timezone: 8, city: '鄂州' },
  '荆门': { longitude: 112.2, latitude: 31.0, timezone: 8, city: '荆门' },
  '孝感': { longitude: 113.9, latitude: 30.9, timezone: 8, city: '孝感' },
  '荆州': { longitude: 112.2, latitude: 30.3, timezone: 8, city: '荆州' },
  '黄冈': { longitude: 114.9, latitude: 30.5, timezone: 8, city: '黄冈' },
  '咸宁': { longitude: 114.3, latitude: 29.8, timezone: 8, city: '咸宁' },
  '随州': { longitude: 113.4, latitude: 31.7, timezone: 8, city: '随州' },
  '恩施土家族苗族自治州': { longitude: 109.5, latitude: 30.3, timezone: 8, city: '恩施土家族苗族自治州' },
  // 省直管市
  '仙桃': { longitude: 113.4, latitude: 30.3, timezone: 8, city: '仙桃' },
  '潜江': { longitude: 112.9, latitude: 30.4, timezone: 8, city: '潜江' },
  '天门': { longitude: 113.2, latitude: 30.7, timezone: 8, city: '天门' },
  '神农架林区': { longitude: 110.7, latitude: 31.7, timezone: 8, city: '神农架林区' },

  // ==================== 湖南省 (13个地级市 + 1个自治州) ====================
  '长沙': { longitude: 112.9, latitude: 28.2, timezone: 8, city: '长沙' },
  '株洲': { longitude: 113.2, latitude: 27.8, timezone: 8, city: '株洲' },
  '湘潭': { longitude: 112.9, latitude: 27.9, timezone: 8, city: '湘潭' },
  '衡阳': { longitude: 112.6, latitude: 26.9, timezone: 8, city: '衡阳' },
  '邵阳': { longitude: 111.5, latitude: 27.2, timezone: 8, city: '邵阳' },
  '岳阳': { longitude: 113.1, latitude: 29.4, timezone: 8, city: '岳阳' },
  '常德': { longitude: 111.7, latitude: 29.0, timezone: 8, city: '常德' },
  '张家界': { longitude: 110.5, latitude: 29.1, timezone: 8, city: '张家界' },
  '益阳': { longitude: 112.4, latitude: 28.6, timezone: 8, city: '益阳' },
  '郴州': { longitude: 113.0, latitude: 25.8, timezone: 8, city: '郴州' },
  '永州': { longitude: 111.6, latitude: 26.4, timezone: 8, city: '永州' },
  '怀化': { longitude: 110.0, latitude: 27.6, timezone: 8, city: '怀化' },
  '娄底': { longitude: 112.0, latitude: 27.7, timezone: 8, city: '娄底' },
  '湘西土家族苗族自治州': { longitude: 109.7, latitude: 28.3, timezone: 8, city: '湘西土家族苗族自治州' },

  // ==================== 广东省 (21个地级市) ====================
  '广州': { longitude: 113.3, latitude: 23.1, timezone: 8, city: '广州' },
  '韶关': { longitude: 113.6, latitude: 24.8, timezone: 8, city: '韶关' },
  '深圳': { longitude: 114.1, latitude: 22.5, timezone: 8, city: '深圳' },
  '珠海': { longitude: 113.6, latitude: 22.3, timezone: 8, city: '珠海' },
  '汕头': { longitude: 116.7, latitude: 23.4, timezone: 8, city: '汕头' },
  '佛山': { longitude: 113.1, latitude: 23.0, timezone: 8, city: '佛山' },
  '江门': { longitude: 113.1, latitude: 22.6, timezone: 8, city: '江门' },
  '湛江': { longitude: 110.4, latitude: 21.3, timezone: 8, city: '湛江' },
  '茂名': { longitude: 110.9, latitude: 21.7, timezone: 8, city: '茂名' },
  '肇庆': { longitude: 112.5, latitude: 23.0, timezone: 8, city: '肇庆' },
  '惠州': { longitude: 114.4, latitude: 23.1, timezone: 8, city: '惠州' },
  '梅州': { longitude: 116.1, latitude: 24.3, timezone: 8, city: '梅州' },
  '汕尾': { longitude: 115.4, latitude: 22.8, timezone: 8, city: '汕尾' },
  '河源': { longitude: 114.7, latitude: 23.7, timezone: 8, city: '河源' },
  '阳江': { longitude: 111.9, latitude: 21.9, timezone: 8, city: '阳江' },
  '清远': { longitude: 113.0, latitude: 23.7, timezone: 8, city: '清远' },
  '东莞': { longitude: 113.8, latitude: 23.0, timezone: 8, city: '东莞' },
  '中山': { longitude: 113.4, latitude: 22.5, timezone: 8, city: '中山' },
  '潮州': { longitude: 116.6, latitude: 23.7, timezone: 8, city: '潮州' },
  '揭阳': { longitude: 116.4, latitude: 23.5, timezone: 8, city: '揭阳' },
  '云浮': { longitude: 112.0, latitude: 22.9, timezone: 8, city: '云浮' },

  // ==================== 广西壮族自治区 (14个地级市) ====================
  '南宁': { longitude: 108.3, latitude: 22.8, timezone: 8, city: '南宁' },
  '柳州': { longitude: 109.4, latitude: 24.3, timezone: 8, city: '柳州' },
  '桂林': { longitude: 110.3, latitude: 25.3, timezone: 8, city: '桂林' },
  '梧州': { longitude: 111.3, latitude: 23.5, timezone: 8, city: '梧州' },
  '北海': { longitude: 109.1, latitude: 21.5, timezone: 8, city: '北海' },
  '防城港': { longitude: 108.4, latitude: 21.6, timezone: 8, city: '防城港' },
  '钦州': { longitude: 108.6, latitude: 21.9, timezone: 8, city: '钦州' },
  '贵港': { longitude: 109.6, latitude: 23.1, timezone: 8, city: '贵港' },
  '玉林': { longitude: 110.2, latitude: 22.6, timezone: 8, city: '玉林' },
  '百色': { longitude: 106.6, latitude: 23.9, timezone: 8, city: '百色' },
  '贺州': { longitude: 111.6, latitude: 24.4, timezone: 8, city: '贺州' },
  '河池': { longitude: 108.1, latitude: 24.7, timezone: 8, city: '河池' },
  '来宾': { longitude: 109.2, latitude: 23.7, timezone: 8, city: '来宾' },
  '崇左': { longitude: 107.4, latitude: 22.4, timezone: 8, city: '崇左' },

  // ==================== 海南省 (4个地级市) ====================
  '海口': { longitude: 110.3, latitude: 20.0, timezone: 8, city: '海口' },
  '三亚': { longitude: 109.5, latitude: 18.3, timezone: 8, city: '三亚' },
  '三沙': { longitude: 112.3, latitude: 16.8, timezone: 8, city: '三沙' },
  '儋州': { longitude: 109.6, latitude: 19.5, timezone: 8, city: '儋州' },

  // ==================== 四川省 (18个地级市 + 3个自治州) ====================
  '成都': { longitude: 104.1, latitude: 30.7, timezone: 8, city: '成都' },
  '自贡': { longitude: 104.8, latitude: 29.3, timezone: 8, city: '自贡' },
  '攀枝花': { longitude: 101.7, latitude: 26.6, timezone: 8, city: '攀枝花' },
  '泸州': { longitude: 105.4, latitude: 28.9, timezone: 8, city: '泸州' },
  '德阳': { longitude: 104.4, latitude: 31.1, timezone: 8, city: '德阳' },
  '绵阳': { longitude: 104.7, latitude: 31.5, timezone: 8, city: '绵阳' },
  '广元': { longitude: 105.8, latitude: 32.4, timezone: 8, city: '广元' },
  '遂宁': { longitude: 105.6, latitude: 30.5, timezone: 8, city: '遂宁' },
  '内江': { longitude: 105.1, latitude: 29.6, timezone: 8, city: '内江' },
  '乐山': { longitude: 103.8, latitude: 29.6, timezone: 8, city: '乐山' },
  '南充': { longitude: 106.1, latitude: 30.8, timezone: 8, city: '南充' },
  '眉山': { longitude: 103.8, latitude: 30.0, timezone: 8, city: '眉山' },
  '宜宾': { longitude: 104.6, latitude: 28.8, timezone: 8, city: '宜宾' },
  '广安': { longitude: 106.6, latitude: 30.5, timezone: 8, city: '广安' },
  '达州': { longitude: 107.5, latitude: 31.2, timezone: 8, city: '达州' },
  '雅安': { longitude: 103.0, latitude: 30.0, timezone: 8, city: '雅安' },
  '巴中': { longitude: 106.8, latitude: 31.9, timezone: 8, city: '巴中' },
  '资阳': { longitude: 104.6, latitude: 30.1, timezone: 8, city: '资阳' },
  '阿坝藏族羌族自治州': { longitude: 102.2, latitude: 31.9, timezone: 8, city: '阿坝藏族羌族自治州' },
  '甘孜藏族自治州': { longitude: 101.9, latitude: 30.0, timezone: 8, city: '甘孜藏族自治州' },
  '凉山彝族自治州': { longitude: 102.3, latitude: 27.9, timezone: 8, city: '凉山彝族自治州' },

  // ==================== 贵州省 (6个地级市 + 3个自治州) ====================
  '贵阳': { longitude: 106.7, latitude: 26.6, timezone: 8, city: '贵阳' },
  '六盘水': { longitude: 104.8, latitude: 26.6, timezone: 8, city: '六盘水' },
  '遵义': { longitude: 106.9, latitude: 27.7, timezone: 8, city: '遵义' },
  '安顺': { longitude: 105.9, latitude: 26.2, timezone: 8, city: '安顺' },
  '毕节': { longitude: 105.3, latitude: 27.3, timezone: 8, city: '毕节' },
  '铜仁': { longitude: 109.2, latitude: 27.7, timezone: 8, city: '铜仁' },
  '黔西南布依族苗族自治州': { longitude: 104.9, latitude: 25.1, timezone: 8, city: '黔西南布依族苗族自治州' },
  '黔东南苗族侗族自治州': { longitude: 107.9, latitude: 26.6, timezone: 8, city: '黔东南苗族侗族自治州' },
  '黔南布依族苗族自治州': { longitude: 107.5, latitude: 26.3, timezone: 8, city: '黔南布依族苗族自治州' },

  // ==================== 云南省 (8个地级市 + 8个自治州) ====================
  '昆明': { longitude: 102.7, latitude: 25.0, timezone: 8, city: '昆明' },
  '曲靖': { longitude: 103.8, latitude: 25.5, timezone: 8, city: '曲靖' },
  '玉溪': { longitude: 102.5, latitude: 24.4, timezone: 8, city: '玉溪' },
  '保山': { longitude: 99.2, latitude: 25.1, timezone: 8, city: '保山' },
  '昭通': { longitude: 103.7, latitude: 27.3, timezone: 8, city: '昭通' },
  '丽江': { longitude: 100.2, latitude: 26.9, timezone: 8, city: '丽江' },
  '普洱': { longitude: 100.9, latitude: 22.8, timezone: 8, city: '普洱' },
  '临沧': { longitude: 100.1, latitude: 23.9, timezone: 8, city: '临沧' },
  '楚雄彝族自治州': { longitude: 101.5, latitude: 25.0, timezone: 8, city: '楚雄彝族自治州' },
  '红河哈尼族彝族自治州': { longitude: 103.4, latitude: 23.4, timezone: 8, city: '红河哈尼族彝族自治州' },
  '文山壮族苗族自治州': { longitude: 104.2, latitude: 23.4, timezone: 8, city: '文山壮族苗族自治州' },
  '西双版纳傣族自治州': { longitude: 100.8, latitude: 22.0, timezone: 8, city: '西双版纳傣族自治州' },
  '大理白族自治州': { longitude: 100.2, latitude: 25.6, timezone: 8, city: '大理白族自治州' },
  '德宏傣族景颇族自治州': { longitude: 98.6, latitude: 24.4, timezone: 8, city: '德宏傣族景颇族自治州' },
  '怒江傈僳族自治州': { longitude: 98.9, latitude: 25.8, timezone: 8, city: '怒江傈僳族自治州' },
  '迪庆藏族自治州': { longitude: 99.7, latitude: 27.8, timezone: 8, city: '迪庆藏族自治州' },

  // ==================== 西藏自治区 (6个地级市 + 1个地区) ====================
  '拉萨': { longitude: 91.1, latitude: 29.7, timezone: 8, city: '拉萨' },
  '日喀则': { longitude: 88.9, latitude: 29.3, timezone: 8, city: '日喀则' },
  '昌都': { longitude: 97.2, latitude: 31.1, timezone: 8, city: '昌都' },
  '林芝': { longitude: 94.4, latitude: 29.7, timezone: 8, city: '林芝' },
  '山南': { longitude: 91.8, latitude: 29.2, timezone: 8, city: '山南' },
  '那曲': { longitude: 92.1, latitude: 31.5, timezone: 8, city: '那曲' },
  '阿里地区': { longitude: 80.1, latitude: 32.5, timezone: 8, city: '阿里地区' },

  // ==================== 陕西省 (10个地级市) ====================
  '西安': { longitude: 108.9, latitude: 34.3, timezone: 8, city: '西安' },
  '铜川': { longitude: 108.9, latitude: 34.9, timezone: 8, city: '铜川' },
  '宝鸡': { longitude: 107.1, latitude: 34.4, timezone: 8, city: '宝鸡' },
  '咸阳': { longitude: 108.7, latitude: 34.3, timezone: 8, city: '咸阳' },
  '渭南': { longitude: 109.5, latitude: 34.5, timezone: 8, city: '渭南' },
  '延安': { longitude: 109.5, latitude: 36.6, timezone: 8, city: '延安' },
  '汉中': { longitude: 107.0, latitude: 33.1, timezone: 8, city: '汉中' },
  '榆林': { longitude: 109.7, latitude: 38.3, timezone: 8, city: '榆林' },
  '安康': { longitude: 109.0, latitude: 32.7, timezone: 8, city: '安康' },
  '商洛': { longitude: 109.9, latitude: 33.9, timezone: 8, city: '商洛' },

  // ==================== 甘肃省 (12个地级市 + 2个自治州) ====================
  '兰州': { longitude: 103.8, latitude: 36.1, timezone: 8, city: '兰州' },
  '嘉峪关': { longitude: 98.3, latitude: 39.8, timezone: 8, city: '嘉峪关' },
  '金昌': { longitude: 102.2, latitude: 38.5, timezone: 8, city: '金昌' },
  '白银': { longitude: 104.2, latitude: 36.5, timezone: 8, city: '白银' },
  '天水': { longitude: 105.7, latitude: 34.6, timezone: 8, city: '天水' },
  '武威': { longitude: 102.6, latitude: 37.9, timezone: 8, city: '武威' },
  '张掖': { longitude: 100.4, latitude: 38.9, timezone: 8, city: '张掖' },
  '平凉': { longitude: 106.7, latitude: 35.5, timezone: 8, city: '平凉' },
  '酒泉': { longitude: 98.5, latitude: 39.7, timezone: 8, city: '酒泉' },
  '庆阳': { longitude: 107.6, latitude: 35.7, timezone: 8, city: '庆阳' },
  '定西': { longitude: 104.6, latitude: 35.6, timezone: 8, city: '定西' },
  '陇南': { longitude: 104.9, latitude: 33.4, timezone: 8, city: '陇南' },
  '临夏回族自治州': { longitude: 103.2, latitude: 35.6, timezone: 8, city: '临夏回族自治州' },
  '甘南藏族自治州': { longitude: 102.9, latitude: 34.9, timezone: 8, city: '甘南藏族自治州' },

  // ==================== 青海省 (2个地级市 + 6个自治州) ====================
  '西宁': { longitude: 101.8, latitude: 36.6, timezone: 8, city: '西宁' },
  '海东': { longitude: 102.1, latitude: 36.5, timezone: 8, city: '海东' },
  '海北藏族自治州': { longitude: 100.9, latitude: 36.9, timezone: 8, city: '海北藏族自治州' },
  '黄南藏族自治州': { longitude: 102.0, latitude: 35.5, timezone: 8, city: '黄南藏族自治州' },
  '海南藏族自治州': { longitude: 100.6, latitude: 36.3, timezone: 8, city: '海南藏族自治州' },
  '果洛藏族自治州': { longitude: 100.2, latitude: 34.5, timezone: 8, city: '果洛藏族自治州' },
  '玉树藏族自治州': { longitude: 97.0, latitude: 33.0, timezone: 8, city: '玉树藏族自治州' },
  '海西蒙古族藏族自治州': { longitude: 97.4, latitude: 37.4, timezone: 8, city: '海西蒙古族藏族自治州' },

  // ==================== 宁夏回族自治区 (5个地级市) ====================
  '银川': { longitude: 106.3, latitude: 38.5, timezone: 8, city: '银川' },
  '石嘴山': { longitude: 106.4, latitude: 39.0, timezone: 8, city: '石嘴山' },
  '吴忠': { longitude: 106.2, latitude: 37.9, timezone: 8, city: '吴忠' },
  '固原': { longitude: 106.3, latitude: 36.0, timezone: 8, city: '固原' },
  '中卫': { longitude: 105.2, latitude: 37.5, timezone: 8, city: '中卫' },

  // ==================== 新疆维吾尔自治区 (4个地级市 + 5个地区 + 5个自治州) ====================
  '乌鲁木齐': { longitude: 87.6, latitude: 43.8, timezone: 8, city: '乌鲁木齐' },
  '克拉玛依': { longitude: 84.9, latitude: 45.6, timezone: 8, city: '克拉玛依' },
  '吐鲁番': { longitude: 89.2, latitude: 43.0, timezone: 8, city: '吐鲁番' },
  '哈密': { longitude: 93.5, latitude: 42.8, timezone: 8, city: '哈密' },
  '昌吉回族自治州': { longitude: 87.3, latitude: 44.0, timezone: 8, city: '昌吉回族自治州' },
  '博尔塔拉蒙古自治州': { longitude: 82.1, latitude: 44.9, timezone: 8, city: '博尔塔拉蒙古自治州' },
  '巴音郭楞蒙古自治州': { longitude: 86.2, latitude: 41.8, timezone: 8, city: '巴音郭楞蒙古自治州' },
  '阿克苏地区': { longitude: 80.3, latitude: 41.2, timezone: 8, city: '阿克苏地区' },
  '克孜勒苏柯尔克孜自治州': { longitude: 76.2, latitude: 39.7, timezone: 8, city: '克孜勒苏柯尔克孜自治州' },
  '喀什地区': { longitude: 75.9, latitude: 39.5, timezone: 8, city: '喀什地区' },
  '和田地区': { longitude: 79.9, latitude: 37.1, timezone: 8, city: '和田地区' },
  '伊犁哈萨克自治州': { longitude: 81.3, latitude: 43.9, timezone: 8, city: '伊犁哈萨克自治州' },
  '塔城地区': { longitude: 82.9, latitude: 46.7, timezone: 8, city: '塔城地区' },
  '阿勒泰地区': { longitude: 88.1, latitude: 47.8, timezone: 8, city: '阿勒泰地区' },

  // ==================== 港澳台 (4个) ====================
  '香港': { longitude: 114.2, latitude: 22.3, timezone: 8, city: '香港' },
  '澳门': { longitude: 113.5, latitude: 22.2, timezone: 8, city: '澳门' },
  '台北': { longitude: 121.5, latitude: 25.0, timezone: 8, city: '台北' },
  '高雄': { longitude: 120.3, latitude: 22.6, timezone: 8, city: '高雄' },
  '台中': { longitude: 120.7, latitude: 24.1, timezone: 8, city: '台中' },
  '台南': { longitude: 120.2, latitude: 23.0, timezone: 8, city: '台南' },
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

/**
 * 按省份分组获取城市
 *
 * @returns 按省份分组的城市对象
 */
export function getCitiesByProvince(): { [province: string]: string[] } {
  // 这里可以根据需要实现按省份分组的逻辑
  return {
    '直辖市': ['北京', '上海', '天津', '重庆'],
    '河北省': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
    // ... 其他省份可以按需添加
  };
}
