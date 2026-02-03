#!/bin/bash

echo "=== 真太阳时功能测试 ==="
echo ""

echo "【示例 1】基础排盘（不使用真太阳时）"
node dist/index.js 1990-01-15 14:30
echo ""

echo "【示例 2】北京真太阳时排盘"
node dist/index.js 1990-01-15 14:30 --city 北京 --tst
echo ""

echo "【示例 3】乌鲁木齐真太阳时排盘（大时差示例）"
node dist/index.js 1990-01-15 14:30 --city 乌鲁木齐 --tst
echo ""

echo "【示例 4】上海真太阳时排盘"
node dist/index.js 1990-01-15 14:30 --city 上海 --tst
echo ""

echo "【示例 5】使用经度直接指定（拉萨）"
node dist/index.js 1990-01-15 14:30 --lng 91.1 --tst
echo ""

echo "【示例 6】对比：同一时间不同地点"
echo "北京时间 14:30 在不同城市的真太阳时："
echo ""
echo "北京（东经116.4°）："
node dist/index.js 1990-01-15 14:30 --city 北京 --tst | grep "真太阳时\|时柱"
echo ""
echo "上海（东经121.5°）："
node dist/index.js 1990-01-15 14:30 --city 上海 --tst | grep "真太阳时\|时柱"
echo ""
echo "乌鲁木齐（东经87.6°）："
node dist/index.js 1990-01-15 14:30 --city 乌鲁木齐 --tst | grep "真太阳时\|时柱"
echo ""
echo "拉萨（东经91.1°）："
node dist/index.js 1990-01-15 14:30 --city 拉萨 --tst | grep "真太阳时\|时柱"
echo ""

echo "=== 城市功能测试 ==="
echo ""

echo "【示例 7】列出所有支持的城市（前20个）"
node dist/index.js --list-cities | head -10
echo ""

echo "【示例 8】搜索城市"
node dist/index.js --search 深圳
echo ""

echo "【示例 9】错误处理：没有提供位置信息"
node dist/index.js 1990-01-15 14:30 --tst 2>&1 | head -8
echo ""
