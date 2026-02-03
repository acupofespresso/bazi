# 真太阳时接口设计分析报告

## 问题发现

### 1. 当前接口设计缺陷

**当前接口 (src/types.ts):**
```typescript
export interface BaziInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute?: number;
  gender?: '男' | '女';
  isLunar?: boolean;
}
```

**问题：**
- ❌ 没有地理位置参数（经度、纬度）
- ❌ 无法进行真太阳时修正
- ❌ 对于严格的八字排盘，这是一个重大缺陷

### 2. lunar-javascript 库限制

根据调查：
- lunar-javascript **不支持**真太阳时自动转换
- 作者明确表示"以后也不会支持"
- 用户需要在传入时间前自己完成转换

**参考：** [GitHub Issue #52](https://github.com/6tail/lunar-javascript/issues/52)

### 3. 真太阳时的重要性

在传统八字命理中：
- **时辰**是八字的重要组成部分
- 差1个小时可能导致时柱完全不同
- 真太阳时考虑了地球经度差异

**示例：**
- 北京时间 14:30
- 在乌鲁木齐（东经87°）：真太阳时约 12:18
- 在上海（东经121°）：真太阳时约 14:34
- **时柱可能从"未时"变成"午时"！**

## 真太阳时计算原理

### 计算公式

```
真太阳时 = 北京时间 + 经度时差 + 时差方程修正
```

#### 1. 经度时差
```
经度时差(分钟) = (本地经度 - 120°) × 4
```
- 120° 是东八区（北京时间）的标准经度
- 每度经度相差4分钟

#### 2. 时差方程修正
这是最复杂的部分，因为：
- 地球公转轨道是椭圆
- 地轴倾斜23.5°
- 时差范围：-14分钟 到 +16分钟
- 一年中有4次归零点

**简化公式（精度约±1分钟）：**
```
时差方程 ≈ -0.0002786 × D + 1.9774 × sin(Ψ) - 9.3104 × sin(2Ψ)
其中：
  D = 当年1月1日到目标日期的天数
  Ψ = 2π × (D - 1) / 365.25
```

### 主要城市经度参考

| 城市 | 经度 | 时差（分钟） |
|------|------|-------------|
| 北京 | 116.4° | -14.4 |
| 上海 | 121.5° | +6.0 |
| 广州 | 113.3° | -26.8 |
| 成都 | 104.1° | -63.6 |
| 西安 | 108.9° | -44.4 |
| 乌鲁木齐 | 87.6° | -129.6 |
| 拉萨 | 91.1° | -115.6 |

## 改进建议

### 方案 1: 完整实现（推荐）

#### 1.1 扩展接口定义

```typescript
// src/types.ts
export interface LocationInfo {
  longitude: number;  // 经度（东经为正）
  latitude?: number;  // 纬度（可选，用于未来功能）
  timezone?: number;  // 时区偏移（默认+8，北京时间）
  city?: string;      // 城市名称（可选）
}

export interface BaziInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute?: number;
  second?: number;
  gender?: '男' | '女';
  isLunar?: boolean;
  location?: LocationInfo;  // 地理位置信息
  useTrueSolarTime?: boolean;  // 是否使用真太阳时（默认false）
}
```

#### 1.2 实现真太阳时转换模块

```typescript
// src/solar-time.ts
export interface TrueSolarTimeResult {
  originalTime: Date;
  adjustedTime: Date;
  longitudeDiff: number;    // 经度时差（分钟）
  equationOfTime: number;   // 时差方程修正（分钟）
  totalAdjustment: number;  // 总修正量（分钟）
}

export function calculateTrueSolarTime(
  date: Date,
  longitude: number,
  timezone: number = 8
): TrueSolarTimeResult {
  // 1. 计算经度时差
  const standardLongitude = timezone * 15; // 时区标准经度
  const longitudeDiff = (longitude - standardLongitude) * 4;

  // 2. 计算时差方程
  const equationOfTime = calculateEquationOfTime(date);

  // 3. 应用修正
  const totalMinutes = longitudeDiff + equationOfTime;
  const adjustedTime = new Date(date.getTime() + totalMinutes * 60000);

  return {
    originalTime: date,
    adjustedTime,
    longitudeDiff,
    equationOfTime,
    totalAdjustment: totalMinutes
  };
}

function calculateEquationOfTime(date: Date): number {
  // 计算当年第几天
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000) + 1;

  // 简化的时差方程
  const psi = 2 * Math.PI * (dayOfYear - 1) / 365.25;
  const eot = -0.0002786 * dayOfYear
            + 1.9774 * Math.sin(psi)
            - 9.3104 * Math.sin(2 * psi);

  return eot;
}
```

#### 1.3 更新排盘逻辑

```typescript
// src/paipan.ts
export function calculateBazi(input: BaziInput): BaziResult {
  let { year, month, day, hour, minute = 0 } = input;

  // 如果提供了位置且启用真太阳时
  if (input.location && input.useTrueSolarTime) {
    const originalDate = new Date(year, month - 1, day, hour, minute);
    const trueSolarTime = calculateTrueSolarTime(
      originalDate,
      input.location.longitude,
      input.location.timezone || 8
    );

    // 使用修正后的时间
    const adjusted = trueSolarTime.adjustedTime;
    year = adjusted.getFullYear();
    month = adjusted.getMonth() + 1;
    day = adjusted.getDate();
    hour = adjusted.getHours();
    minute = adjusted.getMinutes();
  }

  // ... 后续排盘逻辑保持不变
}
```

#### 1.4 更新CLI接口

```typescript
// src/index.ts
// 支持格式：
// bazi 1990-01-15 14:30 --location 116.4,39.9
// bazi 1990-01-15 14:30 --city 北京 --true-solar-time
// bazi 1990-01-15 14:30 --lng 116.4

export function parseInput(args: string[]): BaziInput | null {
  const input: BaziInput = {
    // ... 现有解析逻辑
  };

  // 解析位置参数
  const locationIndex = args.indexOf('--location');
  if (locationIndex !== -1 && args[locationIndex + 1]) {
    const [lng, lat] = args[locationIndex + 1].split(',').map(Number);
    input.location = { longitude: lng, latitude: lat };
    args.splice(locationIndex, 2);
  }

  // 解析经度简写
  const lngIndex = args.indexOf('--lng');
  if (lngIndex !== -1 && args[lngIndex + 1]) {
    input.location = { longitude: parseFloat(args[lngIndex + 1]) };
    args.splice(lngIndex, 2);
  }

  // 检查是否使用真太阳时
  if (args.includes('--true-solar-time') || args.includes('--tst')) {
    input.useTrueSolarTime = true;
    const idx = args.indexOf('--true-solar-time');
    if (idx !== -1) args.splice(idx, 1);
    const idx2 = args.indexOf('--tst');
    if (idx2 !== -1) args.splice(idx2, 1);
  }

  return input;
}
```

#### 1.5 内置城市数据库

```typescript
// src/cities.ts
export const CITIES: { [key: string]: LocationInfo } = {
  '北京': { longitude: 116.4, latitude: 39.9, city: '北京' },
  '上海': { longitude: 121.5, latitude: 31.2, city: '上海' },
  '广州': { longitude: 113.3, latitude: 23.1, city: '广州' },
  '深圳': { longitude: 114.1, latitude: 22.5, city: '深圳' },
  '成都': { longitude: 104.1, latitude: 30.7, city: '成都' },
  '杭州': { longitude: 120.2, latitude: 30.3, city: '杭州' },
  '西安': { longitude: 108.9, latitude: 34.3, city: '西安' },
  '重庆': { longitude: 106.5, latitude: 29.6, city: '重庆' },
  '武汉': { longitude: 114.3, latitude: 30.6, city: '武汉' },
  '南京': { longitude: 118.8, latitude: 32.1, city: '南京' },
  '天津': { longitude: 117.2, latitude: 39.1, city: '天津' },
  '乌鲁木齐': { longitude: 87.6, latitude: 43.8, city: '乌鲁木齐' },
  '拉萨': { longitude: 91.1, latitude: 29.7, city: '拉萨' },
  // ... 更多城市
};

export function getCityLocation(cityName: string): LocationInfo | null {
  return CITIES[cityName] || null;
}
```

### 方案 2: 简化实现

如果觉得完整实现太复杂，可以先实现经度修正：

```typescript
// 只计算经度时差，忽略时差方程（误差约±15分钟）
function simpleLocationCorrection(
  hour: number,
  minute: number,
  longitude: number
): { hour: number; minute: number } {
  const timeDiff = (longitude - 120) * 4; // 分钟
  const totalMinutes = hour * 60 + minute + timeDiff;

  return {
    hour: Math.floor(totalMinutes / 60) % 24,
    minute: Math.floor(totalMinutes % 60)
  };
}
```

### 方案 3: 提示用户手动修正

最简单的方案：在文档中提示用户自行修正

```markdown
## 真太阳时使用说明

如需使用真太阳时，请：
1. 查询出生地经度
2. 计算时差：(经度 - 120) × 4 分钟
3. 手动修正时间后再输入

示例：乌鲁木齐（东经87°）出生
- 时差 = (87 - 120) × 4 = -132 分钟
- 如果北京时间是 14:30，真太阳时约为 12:18
- 使用：bazi 1990-01-15 12:18
```

## 实施建议

### Phase 2A: 基础地理支持（建议优先）

1. ✅ 扩展 BaziInput 接口，添加 location 字段
2. ✅ 实现简单的经度时差修正
3. ✅ 内置常用城市数据库
4. ✅ 更新 CLI 支持 `--lng` 和 `--city` 参数
5. ✅ 在输出中显示是否使用了真太阳时修正

### Phase 2B: 完整真太阳时（可选）

1. 实现精确的时差方程计算
2. 添加时间修正详情输出
3. 支持修正值导出

### Phase 2C: 高级功能（未来）

1. 在线城市经纬度查询
2. IP地址自动定位
3. 时区自动检测

## 使用示例（改进后）

```bash
# 基础用法（不修正）
node dist/index.js 1990-01-15 14:30

# 指定经度（简单修正）
node dist/index.js 1990-01-15 14:30 --lng 87.6

# 使用城市名（简单修正）
node dist/index.js 1990-01-15 14:30 --city 乌鲁木齐

# 完整的真太阳时修正
node dist/index.js 1990-01-15 14:30 --city 上海 --true-solar-time

# 指定经纬度
node dist/index.js 1990-01-15 14:30 --location 116.4,39.9 --tst
```

## 期望输出（带真太阳时修正）

```
┌─────────────────────────────────────────┐
│              八字排盘                    │
├─────────────────────────────────────────┤
│ 出生地：乌鲁木齐（东经87.6°）           │
│ 北京时间：1990年1月15日 14:30          │
│ 真太阳时：1990年1月15日 12:18          │
│ 时间修正：-132分钟（经度差）            │
├─────────────────────────────────────────┤
│ 公历：1990年1月15日 12:18              │
│ 农历：己巳年 腊月十九 午时                  │
├─────────────────────────────────────────┤
│   年柱    月柱    日柱    时柱         │
│   己巳    丁丑    庚辰    庚午           │
│   正印    正官    日主    比肩         │
├─────────────────────────────────────────┤
│ 五行：金2 木0 水0 火2 土4              │
│ 纳音：大林木                           │
│                                         │
│ ⚠️  注意：时柱已按真太阳时修正          │
└─────────────────────────────────────────┘
```

## 参考资料

- [lunar-javascript GitHub Issue #52](https://github.com/6tail/lunar-javascript/issues/52)
- [真太阳时计算方法 - 知乎](https://zhuanlan.zhihu.com/p/885619700)
- [Java真太阳时计算](https://blog.csdn.net/weixin_40330019/article/details/140410483)
- [时差方程 - Wikipedia](https://zh.wikipedia.org/wiki/%E5%9D%87%E6%97%B6%E5%B7%AE)

## 结论

**当前接口设计确实有缺陷**，没有考虑地理位置和真太阳时修正。建议：

1. **短期**：至少在文档中说明此问题，提示用户手动修正
2. **中期**：实现 Phase 2A，支持基本的经度修正
3. **长期**：实现完整的真太阳时计算（Phase 2B）

这将使八字排盘工具更加专业和准确！
