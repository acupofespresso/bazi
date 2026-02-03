# 阶段 2 设计方案：排盘细节完善 (Phase 2 Design)

本文档概述了八字排盘工具第二阶段的实现方案。该阶段的目标是在基础排盘的基础上，增加更深层次的命理数据展示，并提供结构化的数据输出接口。

## 1. 核心任务目标

1.  **地支藏干展示**：在四柱下方展示地支所隐藏的天干（主气、余气、墓库）。
2.  **十神系统补全**：计算地支主气及其藏干相对于日干的十神关系。
3.  **常用神煞集成**：增加桃花、驿马、天医、月德等核心神煞的自动判定。
4.  **JSON 数据输出**：为 CLI 增加 `--json` 参数，支持标准 JSON 格式输出以供系统集成。

---

## 2. 详细设计方案

### 2.1 数据模型扩展 (Data Models)

在 `src/types.ts` 中扩展 `BaziData` 接口：

```typescript
export interface PillarData {
  gan: string;          // 天干
  zhi: string;          // 地支
  shishenGan: string;   // 天干十神
  shishenZhi: string;   // 地支十神（主气）
  hiddens: {
    gan: string;        // 藏干
    shishen: string;    // 藏干十神
  }[];
  shensha: string[];    // 该柱所含神煞
}

export interface BaziResult {
  // ... 基础信息 (公历, 农历, 真太阳时修正信息)
  pillars: {
    year: PillarData;
    month: PillarData;
    day: PillarData;
    hour: PillarData;
  };
  totalElements: Record<string, number>; // 五行统计
  nayins: string[];                      // 纳音
}
```

### 2.2 藏干与十神逻辑

利用 `lunar-javascript` 的 `EightChar` 对象：
- **藏干获取**：调用 `eightChar.getYearHideGan()` 等。
- **十神判定**：
    - 天干：`eightChar.getYearShiShenGan()`。
    - 地支（主气）：`eightChar.getYearShiShenZhi()`。
    - **藏干十神**：需要基于日干（Day Stem）进行扩展映射。SDK 通常提供 `Relative` 或 `ShiShen` 工具类。

### 2.3 神煞系统设计

神煞种类繁多，阶段 2 优先实现以下高频神煞：
- **年/日支相关**：桃花（咸池）、驿马、将星、华盖、劫煞、亡神。
- **月支/天干相关**：天德贵人、月德贵人、天医。
- **日干相关**：天乙贵人、文昌贵人、羊刃、禄神。

**实现方式**：
在 `paipan.ts` 中增加 `calculateShenSha` 方法，遍历四柱并调用 `eightChar.getShenSha()` 获取 SDK 计算好的神煞列表，并按柱归类。

---

## 3. 展现形式改进 (UI/UX)

### 3.1 终端 ASCII 表格 (ASCII Table)

更新 `formatter.ts` 的渲染逻辑，增加藏干行：

```
┌─────────────────────────────────────────┐
│              八字排盘 (V2)               │
├─────────────────────────────────────────┤
│   年柱    月柱    日柱    时柱         │
│   己巳    丁丑    庚辰    癸未         │
│   正印    正官    日主    伤官         │ (天干十神)
│  (丙戊庚) (己癸辛) (乙戊癸) (己丁乙)   │ (地支藏干)
│   劫分伤  才杀印  官才杀  才官官       │ (藏干十神)
├─────────────────────────────────────────┤
│ 神煞：                                  │
│ 年柱: 驿马, 劫煞                        │
│ 日柱: 华盖, 天乙                        │
├─────────────────────────────────────────┤
│ 五行：金1 木0 水1 火2 土4               │
└─────────────────────────────────────────┘
```

### 3.2 机器可读输出 (JSON Mode)

当用户输入 `node dist/index.js --json` 时：
- 核心逻辑：`console.log(JSON.stringify(baziResult, null, 2))`
- 优势：支持将此 Skill 作为其他 AI Agent 或 Web 后端的 API 插件。

---

## 4. 实施路径 (Implementation Roadmap)

1.  **Step 1**: 修改 `types.ts` 和 `paipan.ts`，利用 SDK 提取藏干和十神数据。
2.  **Step 2**: 在 `formatter.ts` 中实现更复杂的表格布局逻辑，支持动态行高。
3.  **Step 3**: 集成神煞计算逻辑。
4.  **Step 4**: 在 `index.ts` 中添加 `--json` 参数解析与逻辑分支。
