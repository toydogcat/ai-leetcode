---
title: "LeetCode #178: Rank Scores (分數排名)"
categories:
  - Database
tags:
  - Medium
  - SQL
---

## 題目描述
表: `Scores`
- `id` (int)
- `score` (decimal)

查詢並返回分數排名。排名應符合以下規則：
1. 分數應從高到低排列。
2. 如果兩個分數相等，它們應具有相同的排名。
3. 名次應該是連續的，即排名之間不應該有「空洞」。

## 解題心得：理解視窗函數
這題的核心在於區分不同的排名函數。在 SQL 中主要有三種：
1. `ROW_NUMBER()`: 1, 2, 3, 4 (純序號)
2. `RANK()`: 1, 2, 2, 4 (跳過名次)
3. **`DENSE_RANK()`**: 1, 2, 2, 3 (連續名次)

題目要求「名次應該是連續的」，所以我們必須使用 **`DENSE_RANK()`**。

## 程式碼實作

### SQL (MySQL)
```sql
SELECT 
    score, 
    DENSE_RANK() OVER (ORDER BY score DESC) AS 'rank'
FROM Scores;
```
> [!NOTE]
> `rank` 在 SQL 中可能是關鍵字，所以建議用引號 `'rank'` 括起來。
