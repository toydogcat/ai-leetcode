---
title: "LeetCode #185: Department Top Three Salaries (部門前三高薪水)"
categories:
  - Database
tags:
  - Hard
  - SQL
---

## 題目描述
表: `Employee`
- `id`, `name`, `salary`, `departmentId`

表: `Department`
- `id`, `name`

公司的主管們想要知道每個部門中哪些員工能夠掙到前三高的薪水。一個部門的前三高薪水是指在該部門的所有薪水中，前三個不重複的薪水值。

## 解題心得：部門內的 DENSE_RANK
這題是 [184. Department Highest Salary](file:///home/toymsi/documents/projects/Github/ai-leetcode/_posts/2026-04-30-leetcode-184-department-highest-salary.md) 的進階版，也是資料庫題目中的 Hard 題型。

**核心邏輯**：
我們需要對每個部門內部的薪水進行排名。
1. **視窗函數**：使用 `DENSE_RANK()`。
2. **分組排名**：使用 `PARTITION BY departmentId` 確保排名是在各個部門內部進行的。
3. **過濾**：篩選出排名 $\le 3$ 的行。

## 程式碼實作

### SQL (MySQL)
```sql
SELECT 
    d.name AS Department, 
    temp.name AS Employee, 
    temp.salary AS Salary
FROM (
    SELECT 
        name, 
        salary, 
        departmentId,
        DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) AS rnk
    FROM Employee
) AS temp
JOIN Department d ON temp.departmentId = d.id
WHERE temp.rnk <= 3;
```
> [!TIP]
> `DENSE_RANK()` 處理了題目要求的「不重複的薪水值」：如果前三高中有並列的，它們會被賦予相同的排名。
