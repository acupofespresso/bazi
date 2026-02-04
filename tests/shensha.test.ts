import { ShenShaEngine, Pillars } from '@/index';

/**
 * 极简测试工具
 */
function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(`Test Failed: ${message}`);
    }
    console.log(`✅ ${message}`);
}

/**
 * 模拟四柱数据
 */
function createMockPillars(year: [string, string], month: [string, string], day: [string, string], hour: [string, string]): Pillars {
    const createPillar = (gz: [string, string]) => ({
        gan: gz[0],
        zhi: gz[1],
        shishenGan: '',
        shishenZhi: '',
        hiddens: [],
        shensha: []
    });
    return {
        year: createPillar(year),
        month: createPillar(month),
        day: createPillar(day),
        hour: createPillar(hour)
    };
}

/**
 * 测试用例
 */
function runTests() {
    console.log('开始执行神煞判定逻辑测试...\n');

    // --- MVP 已验证 ---
    // 1. 桃花
    const p1 = createMockPillars(['庚', '午'], ['丁', '丑'], ['庚', '辰'], ['乙', '酉']);
    assert(ShenShaEngine.getShenSha(p1, 'hour').includes('桃花'), '时柱应包含桃花');

    // 2. 驿马
    const p2 = createMockPillars(['戊', '寅'], ['甲', '寅'], ['丙', '午'], ['丙', '申']);
    assert(ShenShaEngine.getShenSha(p2, 'hour').includes('驿马'), '时柱应包含驿马');

    // 3. 天乙贵人
    const p3 = createMockPillars(['辛', '亥'], ['庚', '子'], ['甲', '子'], ['癸', '未']);
    assert(ShenShaEngine.getShenSha(p3, 'hour').includes('天乙'), '时柱应包含天乙贵人');

    // 4. 天医
    const p4 = createMockPillars(['庚', '戌'], ['戊', '寅'], ['丁', '亥'], ['辛', '丑']);
    assert(ShenShaEngine.getShenSha(p4, 'hour').includes('天医'), '时柱应包含天医');

    // 5. 禄神
    const p5 = createMockPillars(['甲', '寅'], ['丙', '寅'], ['甲', '子'], ['乙', '亥']);
    assert(ShenShaEngine.getShenSha(p5, 'year').includes('禄神'), '年柱应包含禄神');

    // --- 新增测试 (补全计划) ---

    // 6. 华盖 (寅午戌见戌)
    const p6 = createMockPillars(['甲', '午'], ['丙', '寅'], ['壬', '戌'], ['庚', '戌']);
    assert(ShenShaEngine.getShenSha(p6, 'day').includes('华盖'), '日柱应包含华盖 (年支午见日支戌)');

    // 7. 月德贵人 (寅午戌月见丙)
    const p7 = createMockPillars(['庚', '辰'], ['戊', '寅'], ['丙', '子'], ['癸', '巳']);
    assert(ShenShaEngine.getShenSha(p7, 'day').includes('月德'), '日柱应包含月德 (月支寅见日干丙)');

    // 8. 文昌贵人 (甲乙巳午报君知 => 甲见巳)
    const p8 = createMockPillars(['甲', '子'], ['丙', '寅'], ['甲', '辰'], ['己', '巳']);
    assert(ShenShaEngine.getShenSha(p8, 'hour').includes('文昌'), '时柱应包含文昌 (日干甲见时支巳)');

    // 9. 羊刃 (甲见卯)
    const p9 = createMockPillars(['庚', '午'], ['己', '卯'], ['甲', '申'], ['丁', '卯']);
    assert(ShenShaEngine.getShenSha(p9, 'month').includes('羊刃'), '月柱应包含羊刃 (日干甲见月支卯)');

    // 10. 劫煞 (申子辰见巳)
    const p10 = createMockPillars(['壬', '申'], ['甲', '辰'], ['丙', '子'], ['癸', '巳']);
    assert(ShenShaEngine.getShenSha(p10, 'hour').includes('劫煞'), '时柱应包含劫煞 (年支申见时支巳)');

    // 11. 亡神 (申子辰见亥)
    const p11 = createMockPillars(['壬', '申'], ['甲', '辰'], ['丙', '子'], ['己', '亥']);
    assert(ShenShaEngine.getShenSha(p11, 'hour').includes('亡神'), '时柱应包含亡神 (年支申见时支亥)');

    // 12. 将星 (寅午戌见午)
    const p12 = createMockPillars(['丙', '午'], ['庚', '寅'], ['壬', '戌'], ['甲', '午']);
    assert(ShenShaEngine.getShenSha(p12, 'hour').includes('将星'), '时柱应包含将星 (年支午见时支午)');

    // --- 进阶神煞 (V2.1) ---

    // 13. 空亡 (甲子旬中戌亥空)
    // 日柱 甲子 -> 旬空为 戌亥
    const p13 = createMockPillars(['庚', '戌'], ['丙', '戌'], ['甲', '子'], ['乙', '亥']);
    // 年支戌，月支戌，时支亥 都在空亡范围内
    assert(ShenShaEngine.getShenSha(p13, 'year').includes('空亡'), '年柱应包含空亡');
    assert(ShenShaEngine.getShenSha(p13, 'month').includes('空亡'), '月柱应包含空亡');
    assert(ShenShaEngine.getShenSha(p13, 'hour').includes('空亡'), '时柱应包含空亡');

    // 14. 天德贵人 (正丁二坤中... 六甲上)
    // 六月 (未月) 见 甲
    const p14 = createMockPillars(['甲', '子'], ['癸', '未'], ['庚', '申'], ['丙', '子']);
    assert(ShenShaEngine.getShenSha(p14, 'year').includes('天德'), '年柱应包含天德 (未月见年干甲)');

    // 15. 魁罡 (壬辰、庚戌、庚辰、戊戌 日)
    const p15 = createMockPillars(['甲', '子'], ['丙', '寅'], ['壬', '辰'], ['乙', '巳']);
    assert(ShenShaEngine.getShenSha(p15, 'day').includes('魁罡'), '日柱应包含魁罡 (壬辰日)');

    // 16. 阴阳差错 (丙子、丁丑...)
    const p16 = createMockPillars(['甲', '子'], ['丙', '寅'], ['丙', '子'], ['乙', '巳']);
    assert(ShenShaEngine.getShenSha(p16, 'day').includes('阴阳差错'), '日柱应包含阴阳差错 (丙子日)');

    // 17. 金舆 (甲龙乙蛇... 甲->辰, 乙->巳)
    const p17 = createMockPillars(['甲', '子'], ['丙', '寅'], ['甲', '申'], ['戊', '辰']);
    assert(ShenShaEngine.getShenSha(p17, 'hour').includes('金舆'), '时柱应包含金舆 (日干甲见时支辰)');

    // 18. 国印 (甲见戌, 乙见亥...)
    const p18 = createMockPillars(['甲', '子'], ['丙', '寅'], ['甲', '申'], ['壬', '戌']);
    assert(ShenShaEngine.getShenSha(p18, 'hour').includes('国印'), '时柱应包含国印 (日干甲见时支戌)');

    console.log('\n所有神煞判定测试通过！');
}

try {
    runTests();
} catch (error: any) {
    console.error(error.message);
    process.exit(1);
}
