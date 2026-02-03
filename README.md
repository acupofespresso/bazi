# 八字排盘工具 / BaZi Paipan Tool

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)](https://nodejs.org/)

一个专业的八字命理排盘工具，基于精确的历法算法，支持四柱排盘、五行分析、十神推算、真太阳时修正。

A professional BaZi (Chinese Four Pillars) fortune-telling tool with Four Pillars generation, Five Elements analysis, Ten Gods calculation, and True Solar Time correction.

## 快速开始 / Quick Start

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 开始使用
node dist/index.js 1990-01-15 14:30
```

## 输出示例 / Output Example

```
┌─────────────────────────────────────────┐
│              八字排盘 (V2)               │
├─────────────────────────────────────────┤
│ 公历：1990年01月15日 14:30              │
│ 农历：己巳年 腊月十九 癸未时                  │
├─────────────────────────────────────────┤
│    年柱      月柱      日柱      _时柱_    │
│    正印      正官      日主      伤官    │
│    己巳        丁丑        庚辰        癸未      │
│    正财      己土      戊土      己土    │
│   (丙戊庚 )    (癸辛  )    (乙癸  )    (丁乙  )   │
│    偏 戊 偏     伤 辛        乙 癸        才 乙    │
├─────────────────────────────────────────┤
│ 五行：金1 木0 水1 火2 土4              │
│ 纳音：大林木                           │
└─────────────────────────────────────────┘
```

## 功能特性 / Features

🎋 **四柱排盘** - 年月日时四柱干支，支持公历农历互转
🔮 **十神推算** - 精确推算天干十神（正官、偏财等）
⚖️ **五行分析** - 金木水火土五行统计与纳音显示
⏰ **真太阳时** - 支持地理位置修正，包含经度差与时差方程 (EoT) 修正
🏙️ **城市数据库** - 内置 3,200+ 中国城市经纬度数据，支持名称搜索
📅 **精确历法** - 基于天文历法算法，确保节气时刻计算精度达秒级

## 完整文档 / Full Documentation

详细使用说明请查看 [SKILL.md](./SKILL.md)

For detailed usage instructions, see [SKILL.md](./SKILL.md)

## 使用示例 / Usage Examples

```bash
# 基本用法
node dist/index.js 1990-01-15 14:30

# 农历输入
node dist/index.js --lunar 1989-12-19 14:30

# 指定性别
node dist/index.js 1990-01-15 14:30 男

# 真太阳时排盘（新功能）
node dist/index.js 1990-01-15 14:30 --city 北京 --tst
node dist/index.js 1990-01-15 14:30 --city 乌鲁木齐 --tst
node dist/index.js 1990-01-15 14:30 --lng 87.6 --tst

# 查看支持的城市
node dist/index.js --list-cities

# 运行示例
./examples.sh
./examples-tst.sh
```

## 技术栈 / Tech Stack

- **TypeScript** - 类型安全
- **Node.js** - 运行环境
- **lunar-javascript** - 核心算法库

## 开发 / Development

```bash
# 安装依赖
npm install

# 开发模式
npm run dev 1990-01-15 14:30

# 构建
npm run build

# 测试
npm test

# 运行示例
npm run examples
```

## 项目结构 / Project Structure

```
bazi/
├── src/              # 源代码
│   ├── index.ts      # 主入口
│   ├── paipan.ts     # 排盘逻辑
│   ├── formatter.ts  # 格式化
│   └── types.ts      # 类型定义
├── dist/             # 编译输出
├── SKILL.md          # 完整文档
└── examples.sh       # 示例脚本
```

## 版本历史 / Version History

### v2.0.0 (Core Refinement) ✅
- **高精度时间修正**: 实现了真太阳时计算，引入时差方程 (EoT) 和经度修正。
- **海量地理数据**: 数据库由 85 个城市扩展至 3,219 个中国行政区划坐标。
- **排盘细节增强**: 新增地支藏干显示、补全地支及藏干对应的十神关系。
- **神煞系统集成**: 初步集成年、月、日、时四柱神煞判定。
- **系统集成支持**: 新增 `--json` 参数，支持标准 JSON 格式输出，方便 Agent 及 Web 调用。
- **CLI 交互升级**: 支持更加灵活的命令行参数，增加城市模糊搜索功能。
- **UI 表格美化**: 优化 ASCII 表格输出，支持藏干与十神的对齐显示。

### v1.0.0 (Initial Release) ✅
- 基础排盘逻辑实现。
- 十神、五行统计及纳音算法。
- 公农历互转基础支持。

## 开发路线图 / Roadmap

项目采用分阶段开发模式，目前已完成基础架构和排盘细节增强。

### 阶段 1: 核心计算与高精度修正 (已完成 ✅)
- [x] **基础排盘**: 四柱干支计算、公历农历互转、五行统计、纳音
- [x] **真太阳时**: 支持经度时差 + 时差方程 (EoT) 修正，精度达 ±30s
- [x] **城市数据库**: 集成 3,200+ 中国城市坐标数据，支持名称搜索
- [x] **交互界面**: 结构化 ASCII 表格输出，清晰的修正详情展示

### 阶段 2: 排盘细节完善 (已完成 ✅)
- [x] **地支藏干**: 在四柱下展示地支所藏天干
- [x] **副星神煞**: 集成桃花、驿马、天医等常用神煞判定
- [x] **补全十神**: 补充地支及其藏干对应的十神关系
- [x] **JSON 输出**: 支持标准 JSON 格式输出，方便系统集成

### 阶段 3: 运势推算与深度分析 (规划中)
- [ ] **大运排盘**: 根据性别与起运时间，排出十年大运及起运岁数
- [ ] **流年流月**: 支持指定年份、月份的干支运势排盘
- [ ] **格局判定**: 自动识别正格（正官、七杀等）及特殊格局
- [ ] **旺衰分析**: 实现根据令、势、地、气判定的日主强弱统计

### 阶段 4: 专家系统与报告导出 (远景 🚀)
- [ ] **喜用神建议**: 根据格局和旺衰自动推算喜用神、忌神
- [ ] **PDF 生成**: 支持将排盘及分析结果导出为精美的 PDF 报告
- [ ] **规则可配置**: 支持不同流派（如子平、盲派）的算法规则切换

## 注意事项 / Notes

⚠️ 本工具仅供传统文化学习和研究使用
⚠️ 时辰至关重要，请确保出生时间准确
⚠️ 月柱以节气为准，不是农历月份

## License

ISC License

---

**声明:** 本工具仅供学习研究，不构成任何人生建议。命运掌握在自己手中！

**Disclaimer:** This tool is for study and research only. Your destiny is in your own hands!
