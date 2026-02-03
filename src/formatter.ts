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
  const p = result.pillars;

  // 顶部边框
  lines.push('┌─────────────────────────────────────────┐');
  lines.push('│              八字排盘 (V2)               │');
  lines.push('├─────────────────────────────────────────┤');

  // 如果使用了真太阳时，显示详细信息
  if (result.trueSolarTime) {
    const tst = result.trueSolarTime;
    const loc = tst.location;

    if (loc?.city) {
      lines.push(`│ 出生地：${padToWidth(`${loc.city}（经度${loc.longitude}°）`, 37)}│`);
    } else {
      lines.push(`│ 出生地：${padToWidth(`经度${loc?.longitude || '未知'}°`, 37)}│`);
    }

    const formatTime = (date: Date): string => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      const h = String(date.getHours()).padStart(2, '0');
      const min = String(date.getMinutes()).padStart(2, '0');
      return `${y}-${m}-${d} ${h}:${min}`;
    };

    lines.push(`│ 北京时间：${padToWidth(formatTime(tst.originalTime), 33)}│`);
    lines.push(`│ 真太阳时：${padToWidth(formatTime(tst.adjustedTime), 33)}│`);

    if (Math.abs(tst.totalAdjustment) >= 0.1) {
      const adjustText = `${tst.totalAdjustment > 0 ? '+' : ''}${tst.totalAdjustment.toFixed(1)}分钟 (EOT:${tst.equationOfTime.toFixed(1)}m)`;
      lines.push(`│ 时间修正：${padToWidth(adjustText, 33)}│`);
    }

    lines.push('├─────────────────────────────────────────┤');
  }

  // 日期信息
  lines.push(`│ 公历：${padToWidth(result.solar, 37)}│`);
  lines.push(`│ 农历：${padToWidth(result.lunar, 37)}│`);
  lines.push('├─────────────────────────────────────────┤');

  // 四柱标题
  lines.push('│    年柱      月柱      日柱      时柱    │');

  // 十神 (天干)
  const getShishenPadded = (ss: string) => padToWidth(ss, 4);
  lines.push(`│    ${getShishenPadded(p.year.shishenGan)}      ${getShishenPadded(p.month.shishenGan)}      ${getShishenPadded(p.day.shishenGan)}      ${getShishenPadded(p.hour.shishenGan)}    │`);

  // 四柱干支
  lines.push(`│    ${p.year.gan}${p.year.zhi}        ${p.month.gan}${p.month.zhi}        ${p.day.gan}${p.day.zhi}        ${p.hour.gan}${p.hour.zhi}      │`);

  // 十神 (地支主气)
  lines.push(`│    ${getShishenPadded(p.year.shishenZhi)}      ${getShishenPadded(p.month.shishenZhi)}      ${getShishenPadded(p.day.shishenZhi)}      ${getShishenPadded(p.hour.shishenZhi)}    │`);

  // 藏干
  const getHiddens = (pillar: any) => pillar.hiddens.map((h: any) => h.gan).join('');
  lines.push(`│   (${padToWidth(getHiddens(p.year), 4)})    (${padToWidth(getHiddens(p.month), 4)})    (${padToWidth(getHiddens(p.day), 4)})    (${padToWidth(getHiddens(p.hour), 4)})   │`);

  // 藏干十神 (简写)
  const getHiddenShishen = (pillar: any) => pillar.hiddens.map((h: any) => h.shishen.substring(0, 1)).join(' ');
  lines.push(`│    ${padToWidth(getHiddenShishen(p.year), 5)}     ${padToWidth(getHiddenShishen(p.month), 5)}     ${padToWidth(getHiddenShishen(p.day), 5)}     ${padToWidth(getHiddenShishen(p.hour), 5)}    │`);

  lines.push('├─────────────────────────────────────────┤');

  // 神煞
  const allShensha = [
    { name: '年', list: p.year.shensha },
    { name: '月', list: p.month.shensha },
    { name: '日', list: p.day.shensha },
    { name: '时', list: p.hour.shensha }
  ].filter(s => s.list.length > 0);

  if (allShensha.length > 0) {
    lines.push('│ 神煞：                                  │');
    allShensha.forEach(s => {
      const prefix = ` ${s.name}柱：`;
      const content = s.list.join('、');
      const fullText = prefix + content;

      // 简单截断处理防止表格爆裂
      const maxWidth = 38;
      let displayStr = fullText;
      if (getDisplayWidth(fullText) > maxWidth) {
        // 粗略截断，优化体验需要更复杂的拆分逻辑
        displayStr = fullText.substring(0, 20) + '...';
      }

      lines.push(`│${padToWidth(displayStr, 41)}│`);
    });
    lines.push('├─────────────────────────────────────────┤');
  }

  // 五行统计
  const wx = result.wuXing;
  const wuXingLine = `│ 五行：金${wx.金} 木${wx.木} 水${wx.水} 火${wx.火} 土${wx.土}`;
  lines.push(wuXingLine.padEnd(43, ' ') + '│');

  // 纳音
  lines.push(`│ 纳音：${padToWidth(result.naYin, 37)}│`);

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
