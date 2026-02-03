import { Pillars } from './types';

/**
 * 判定规则定义
 */
type Rule = (pillars: Pillars, target: 'year' | 'month' | 'day' | 'hour') => string | null;

export class ShenShaEngine {
    /**
     * 计算单柱神煞
     */
    static getShenSha(pillars: Pillars, target: 'year' | 'month' | 'day' | 'hour'): string[] {
        const results: string[] = [];
        const rules: Rule[] = [
            this.checkTaoHua,
            this.checkYiMa,
            this.checkTianYiGuiRen,
            this.checkTianYi,
            this.checkLuShen,
            this.checkHuaGai,
            this.checkYueDe,
            this.checkWenChang,
            this.checkYangRen,
            this.checkJieSha,
            this.checkWangShen,
            this.checkJiangXing
        ];

        for (const rule of rules) {
            const name = rule.call(this, pillars, target);
            if (name) {
                results.push(name);
            }
        }

        return results;
    }

    /**
     * 桃花 (咸池)
     * 基准：年支或日支
     * 规则：寅午戌见卯, 申子辰见酉, 亥卯未见子, 巳酉丑见午
     */
    private static checkTaoHua(pillars: Pillars, target: 'year' | 'month' | 'day' | 'hour'): string | null {
        const map: Record<string, string> = {
            '寅': '卯', '午': '卯', '戌': '卯',
            '申': '酉', '子': '酉', '辰': '酉',
            '亥': '子', '卯': '子', '未': '子',
            '巳': '午', '酉': '午', '丑': '午'
        };

        const targetZhi = pillars[target].zhi;
        // 检查年支基准
        if (map[pillars.year.zhi] === targetZhi) return '桃花';
        // 检查日支基准
        if (map[pillars.day.zhi] === targetZhi) return '桃花';

        return null;
    }

    /**
     * 驿马
     * 基准：年支或日支
     * 规则：寅午戌见申, 申子辰见寅, 亥卯未见巳, 巳酉丑见亥
     */
    private static checkYiMa(pillars: Pillars, target: 'year' | 'month' | 'day' | 'hour'): string | null {
        const map: Record<string, string> = {
            '寅': '申', '午': '申', '戌': '申',
            '申': '寅', '子': '寅', '辰': '寅',
            '亥': '巳', '卯': '巳', '未': '巳',
            '巳': '亥', '酉': '亥', '丑': '亥'
        };

        const targetZhi = pillars[target].zhi;
        if (map[pillars.year.zhi] === targetZhi) return '驿马';
        if (map[pillars.day.zhi] === targetZhi) return '驿马';

        return null;
    }

    /**
     * 华盖
     * 基准：年支或日支
     * 规则：寅午戌见戌, 申子辰见辰, 亥卯未见未, 巳酉丑见丑
     */
    private static checkHuaGai(pillars: Pillars, target: 'year' | 'month' | 'day' | 'hour'): string | null {
        const map: Record<string, string> = {
            '寅': '戌', '午': '戌', '戌': '戌',
            '申': '辰', '子': '辰', '辰': '辰',
            '亥': '未', '卯': '未', '未': '未',
            '巳': '丑', '酉': '丑', '丑': '丑'
        };

        const targetZhi = pillars[target].zhi;
        if (map[pillars.year.zhi] === targetZhi) return '华盖';
        if (map[pillars.day.zhi] === targetZhi) return '华盖';
        return null;
    }

    /**
     * 将星
     * 基准：年支或日支
     * 规则：寅午戌见午, 申子辰见子, 亥卯未见卯, 巳酉丑见酉
     */
    private static checkJiangXing(pillars: Pillars, target: 'year' | 'month' | 'day' | 'hour'): string | null {
        const map: Record<string, string> = {
            '寅': '午', '午': '午', '戌': '午',
            '申': '子', '子': '子', '辰': '子',
            '亥': '卯', '卯': '卯', '未': '卯',
            '巳': '酉', '酉': '酉', '丑': '酉'
        };

        const targetZhi = pillars[target].zhi;
        if (map[pillars.year.zhi] === targetZhi) return '将星';
        if (map[pillars.day.zhi] === targetZhi) return '将星';
        return null;
    }

    /**
     * 劫煞
     * 基准：年支或日支
     * 规则：申子辰见巳, 寅午戌见亥, 亥卯未见申, 巳酉丑见寅
     */
    private static checkJieSha(pillars: Pillars, target: 'year' | 'month' | 'day' | 'hour'): string | null {
        const map: Record<string, string> = {
            '申': '巳', '子': '巳', '辰': '巳',
            '寅': '亥', '午': '亥', '戌': '亥',
            '亥': '申', '卯': '申', '未': '申',
            '巳': '寅', '酉': '寅', '丑': '寅'
        };

        const targetZhi = pillars[target].zhi;
        if (map[pillars.year.zhi] === targetZhi) return '劫煞';
        if (map[pillars.day.zhi] === targetZhi) return '劫煞';
        return null;
    }

    /**
     * 亡神
     * 基准：年支或日支
     * 规则：申子辰见亥, 寅午戌见巳, 亥卯未见寅, 巳酉丑见申
     */
    private static checkWangShen(pillars: Pillars, target: 'year' | 'month' | 'day' | 'hour'): string | null {
        const map: Record<string, string> = {
            '申': '亥', '子': '亥', '辰': '亥',
            '寅': '巳', '午': '巳', '戌': '巳',
            '亥': '寅', '卯': '寅', '未': '寅',
            '巳': '申', '酉': '申', '丑': '申'
        };

        const targetZhi = pillars[target].zhi;
        if (map[pillars.year.zhi] === targetZhi) return '亡神';
        if (map[pillars.day.zhi] === targetZhi) return '亡神';
        return null;
    }

    /**
     * 天乙贵人
     * 基准：日干
     * 规则：甲戊庚牛羊, 乙己鼠猴乡, 丙丁猪鸡位, 壬癸兔蛇藏, 六辛逢马虎
     */
    private static checkTianYiGuiRen(pillars: Pillars, target: 'year' | 'month' | 'day' | 'hour'): string | null {
        const dayGan = pillars.day.gan;
        const targetZhi = pillars[target].zhi;

        const map: Record<string, string[]> = {
            '甲': ['丑', '未'],
            '戊': ['丑', '未'],
            '庚': ['丑', '未'],
            '乙': ['子', '申'],
            '己': ['子', '申'],
            '丙': ['亥', '酉'],
            '丁': ['亥', '酉'],
            '壬': ['卯', '巳'],
            '癸': ['卯', '巳'],
            '辛': ['午', '寅']
        };

        if (map[dayGan]?.includes(targetZhi)) return '天乙';

        return null;
    }

    /**
     * 天医
     * 基准：月支
     * 规则：月支前一位地支
     */
    private static checkTianYi(pillars: Pillars, target: 'year' | 'month' | 'day' | 'hour'): string | null {
        const monthZhi = pillars.month.zhi;
        const targetZhi = pillars[target].zhi;
        const zhis = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

        const monthIdx = zhis.indexOf(monthZhi);
        const medicalIdx = (monthIdx - 1 + 12) % 12;

        if (zhis[medicalIdx] === targetZhi) return '天医';

        return null;
    }

    /**
     * 禄神
     * 基准：日干
     * 规则：甲禄在寅, 乙禄在卯, 丙戊禄在巳, 丁己禄在午, 庚禄在申, 辛禄在酉, 壬禄在亥, 癸禄在子
     */
    private static checkLuShen(pillars: Pillars, target: 'year' | 'month' | 'day' | 'hour'): string | null {
        const dayGan = pillars.day.gan;
        const targetZhi = pillars[target].zhi;

        const map: Record<string, string> = {
            '甲': '寅',
            '乙': '卯',
            '丙': '巳',
            '戊': '巳',
            '丁': '午',
            '己': '午',
            '庚': '申',
            '辛': '酉',
            '壬': '亥',
            '癸': '子'
        };

        if (map[dayGan] === targetZhi) return '禄神';

        return null;
    }

    /**
     * 羊刃
     * 基准：日干
     * 规则：甲刃在卯, 乙刃在寅, 丙戊刃在午, 丁己刃在巳, 庚刃在酉, 辛刃在申, 壬刃在子, 癸刃在亥
     */
    private static checkYangRen(pillars: Pillars, target: 'year' | 'month' | 'day' | 'hour'): string | null {
        const dayGan = pillars.day.gan;
        const targetZhi = pillars[target].zhi;

        const map: Record<string, string> = {
            '甲': '卯',
            '乙': '寅',
            '丙': '午',
            '戊': '午',
            '丁': '巳',
            '己': '巳',
            '庚': '酉',
            '辛': '申',
            '壬': '子',
            '癸': '亥'
        };

        if (map[dayGan] === targetZhi) return '羊刃';
        return null;
    }

    /**
     * 文昌贵人
     * 基准：日干
     * 规则：甲乙巳午报君知, 丙戊申宮丁己鸡, 庚猪辛鼠壬逢虎, 癸人见兔入云梯
     */
    private static checkWenChang(pillars: Pillars, target: 'year' | 'month' | 'day' | 'hour'): string | null {
        const dayGan = pillars.day.gan;
        const targetZhi = pillars[target].zhi;

        const map: Record<string, string> = {
            '甲': '巳',
            '乙': '午',
            '丙': '申',
            '戊': '申',
            '丁': '酉',
            '己': '酉',
            '庚': '亥',
            '辛': '子',
            '壬': '寅',
            '癸': '卯'
        };

        if (map[dayGan] === targetZhi) return '文昌';
        return null;
    }

    /**
     * 月德贵人
     * 基准：月支
     * 规则：寅午戌月见丙, 申子辰月见壬, 亥卯未月见甲, 巳酉丑月见庚
     */
    private static checkYueDe(pillars: Pillars, target: 'year' | 'month' | 'day' | 'hour'): string | null {
        const monthZhi = pillars.month.zhi;
        const targetGan = pillars[target].gan;

        const map: Record<string, string> = {
            '寅': '丙', '午': '丙', '戌': '丙',
            '申': '壬', '子': '壬', '辰': '壬',
            '亥': '甲', '卯': '甲', '未': '甲',
            '巳': '庚', '酉': '庚', '丑': '庚'
        };

        if (map[monthZhi] === targetGan) return '月德';
        return null;
    }
}
