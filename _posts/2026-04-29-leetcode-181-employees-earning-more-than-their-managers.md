---
title: "LeetCode #181: Employees Earning More Than Their Managers (超過經理收入的員工)"
categories:
  - Database
tags:
  - Easy
  - SQL
---

## 題目描述
表: `Employee`
- `id` (int)
- `name` (varchar)
- `salary` (int)
- `managerId` (int)

編寫一個解決方案，找出收入比其經理高的員工。

## 解題心得：自連接 (Self Join)
這題的關鍵在於員工和經理都在同一個表中。

**核心邏輯**：
我們需要將 `Employee` 表與自身連接：
1. `e1` 代表員工。
2. `e2` 代表該員工的經理（即 `e1.managerId = e2.id`）。
3. 過濾條件：`e1.salary > e2.salary`。

## 程式碼實作

### SQL (MySQL)
```sql
SELECT 
    e1.name AS Employee
FROM Employee e1
JOIN Employee e2 ON e1.managerId = e2.id
WHERE e1.salary > e2.salary;
```
> [!TIP]
> 使用 `JOIN` 通常比使用 `WHERE e1.managerId = e2.id` 更符合現代 SQL 的撰寫規範。
