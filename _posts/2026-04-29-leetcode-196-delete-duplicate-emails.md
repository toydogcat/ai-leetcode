---
title: "LeetCode #196: Delete Duplicate Emails (刪除重複的電子郵件)"
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

編寫一個解決方案，刪除所有重複的電子郵件，只保留每個郵箱中 `id` 最小的那一個。
注意：你需要編寫一個 `DELETE` 語句，而不是 `SELECT` 語句。

## 解題心得：自連接刪除
這題要求我們直接修改數據庫，通常使用自連接來定位「不是最小 ID」的重複行。

**核心邏輯**：
1. 將 `Person` 表與自身連接，別名為 `p1` 和 `p2`。
2. 連接條件：`p1.email = p2.email`。
3. 過濾條件：`p1.id > p2.id`。
   - 這意味著 `p1` 是那個 ID 較大（重複）的行。
4. 執行 `DELETE p1`。

## 程式碼實作

### SQL (MySQL)
```sql
DELETE p1 
FROM Person p1, Person p2
WHERE p1.email = p2.email AND p1.id > p2.id;
```
> [!IMPORTANT]
> 在 `DELETE` 語句中使用別名時，語法是 `DELETE p1 FROM Person p1...`。這會刪除 `p1` 中符合條件的行。
