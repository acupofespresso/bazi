#!/bin/bash

echo "=== 八字排盘测试示例 ==="
echo ""

echo "示例 1: 公历日期"
node dist/index.js 1990-01-15 14:30
echo ""

echo "示例 2: 另一个公历日期"
node dist/index.js 1985-06-20 09:00
echo ""

echo "示例 3: 农历日期"
node dist/index.js --lunar 1989-12-19 14:30
echo ""

echo "示例 4: 不同时辰"
node dist/index.js 2000-08-08 06:00
echo ""

echo "示例 5: 带性别"
node dist/index.js 1995-03-15 18:30 女
echo ""
