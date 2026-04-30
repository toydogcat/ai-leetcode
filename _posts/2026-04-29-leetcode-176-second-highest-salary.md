---
title: "LeetCode #176: Second Highest Salary (第二高的薪水)"
categories:
  - Database
tags:
  - Medium
  - SQL
---

## 題目描述
表: `Employee`
- `id` (int)
- `salary` (int)

查詢並返回 `Employee` 表中第二高的薪水。如果不存在第二高的薪水，查詢應返回 `null` 。

## 解題心得：處理重複與不存在的情況
這題看似簡單，但有兩個重點需要處理：
1. **重複薪水**：如果最高薪水有兩個人拿，第二高的薪水應該是除了最高薪水以外的下一個數值。所以必須使用 `DISTINCT`。
2. **不存在的情況**：如果表中只有一個員工，查詢必須返回 `null` 而不是空集。

**解決方案**：
1. **子查詢法**：使用 `LIMIT 1 OFFSET 1` 並將整個查詢作為一個子查詢放在 `SELECT` 中，這樣當子查詢無結果時，外部會自動返回 `null`。
2. **IFNULL 法**：使用 `IFNULL(..., null)`。

## 程式碼實作

### SQL (MySQL)
```sql
SELECT (
    SELECT DISTINCT salary 
    FROM Employee 
    ORDER BY salary DESC 
    LIMIT 1 OFFSET 1
) AS SecondHighestSalary;
```
> [!TIP]
> 將查詢括在括號內作為一個標量子查詢 (Scalar Subquery) 是處理「無結果時返回 NULL」最簡單的方法。
