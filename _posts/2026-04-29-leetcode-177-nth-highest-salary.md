---
title: "LeetCode #177: Nth Highest Salary (第 N 高的薪水)"
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

編寫一個 SQL 查詢來獲取 `Employee` 表中第 `n` 高的薪水。

## 解題心得：自定義函數與變數
這題是 [176. Second Highest Salary](file:///home/toymsi/documents/projects/Github/ai-leetcode/_posts/2026-04-30-leetcode-176-second-highest-salary.md) 的泛化版本。在 MySQL 中，我們需要定義一個函數。

**關鍵點**：
1. **OFFSET 的計算**：`LIMIT` 後面不能直接寫 `N-1` 這種表達式，所以我們必須先在函數體內定義一個新變數 `M = N - 1`。
2. **處理不存在的情況**：同樣使用子查詢或 `LIMIT` 特性。

## 程式碼實作

### SQL (MySQL)
```sql
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  DECLARE M INT;
  SET M = N - 1;
  RETURN (
      # Write your T-SQL query statement below.
      SELECT DISTINCT salary 
      FROM Employee 
      ORDER BY salary DESC 
      LIMIT 1 OFFSET M
  );
END
```
> [!IMPORTANT]
> 記得在 MySQL 中，`LIMIT` 和 `OFFSET` 的參數必須是常數或預先定義好的變數，不能是算術表達式。
