---
title: "LeetCode #180: Consecutive Numbers (連續出現的數字)"
categories:
  - Database
tags:
  - Medium
  - SQL
---

## 題目描述
表: `Logs`
- `id` (int)
- `num` (varchar)

找出所有至少連續出現三次的數字。返回的結果表中的數據可以按 **任意順序** 排列。

## 解題心得：自連接或視窗函數
這題的目標是檢測同一個數字是否在連續的 ID 中出現了三次。

**方法 1：自連接 (Self Join)**
我們將 `Logs` 表與自己連接兩次：
- `l1` 代表當前行。
- `l2` 代表 `id` 為 `l1.id + 1` 的行。
- `l3` 代表 `id` 為 `l1.id + 2` 的行。
- 檢查 `l1.num = l2.num` 且 `l2.num = l3.num`。

**方法 2：視窗函數 (Lead/Lag)**
使用 `LEAD` 函數獲取下一行和下下行的數值，然後進行比較。這種方法更現代且性能通常更好。

## 程式碼實作

### SQL (MySQL) - 自連接法
```sql
SELECT DISTINCT
    l1.Num AS ConsecutiveNums
FROM
    Logs l1,
    Logs l2,
    Logs l3
WHERE
    l1.Id = l2.Id - 1
    AND l2.Id = l3.Id - 1
    AND l1.Num = l2.Num
    AND l2.Num = l3.Num;
```

### SQL (MySQL) - 視窗函數法
```sql
SELECT DISTINCT num AS ConsecutiveNums
FROM (
    SELECT 
        num,
        LEAD(num, 1) OVER (ORDER BY id) AS next1,
        LEAD(num, 2) OVER (ORDER BY id) AS next2
    FROM Logs
) AS temp
WHERE num = next1 AND next1 = next2;
```
