---
title: "LeetCode #184: Department Highest Salary (部門最高薪水)"
categories:
  - Database
tags:
  - Medium
  - SQL
---

## 題目描述
表: `Employee`
- `id`, `name`, `salary`, `departmentId`

表: `Department`
- `id`, `name`

寫一個解決方案，找出每個部門中薪水最高的員工。

## 解題心得：分組過濾
這題的難點在於，你不僅要找出最高薪水，還要找出對應的人。

**核心邏輯**：
1. **子查詢**：先找出每個部門及其對應的最高薪水：
   `SELECT departmentId, MAX(salary) FROM Employee GROUP BY departmentId`
2. **多列匹配**：在外部查詢中，使用 `IN` 語句匹配 `(departmentId, salary)` 元組。
3. **連接部門名稱**：最後將結果與 `Department` 表進行 `JOIN` 以獲取部門名稱。

## 程式碼實作

### SQL (MySQL)
```sql
SELECT 
    d.name AS Department, 
    e.name AS Employee, 
    e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE (e.departmentId, e.salary) IN (
    SELECT departmentId, MAX(salary)
    FROM Employee
    GROUP BY departmentId
);
```
> [!IMPORTANT]
> 這種「多列 IN (多列子查詢)」的方法非常強大，可以用於各種分組篩選需求。
