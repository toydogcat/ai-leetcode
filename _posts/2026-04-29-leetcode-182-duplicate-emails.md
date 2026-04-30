---
title: "LeetCode #182: Duplicate Emails (重複的電子郵件)"
categories:
  - Database
tags:
  - Easy
  - SQL
---

## 題目描述
表: `Person`
- `id` (int)
- `email` (varchar)

編寫一個解決方案，找出所有重複的電子郵件。

## 解題心得：理解 Group By 與 Having
這是 SQL 中處理重複數據的標準方法。

**核心邏輯**：
1. 使用 `GROUP BY email` 將相同的郵箱歸為一組。
2. 使用 `COUNT(email)` 計算每組的數量。
3. 使用 `HAVING` 子句過濾出數量大於 1 的組（注意：`WHERE` 不能與聚合函數一起使用，必須用 `HAVING`）。

## 程式碼實作

### SQL (MySQL)
```sql
SELECT email
FROM Person
GROUP BY email
HAVING COUNT(email) > 1;
```
