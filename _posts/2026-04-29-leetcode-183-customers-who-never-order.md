---
title: "LeetCode #183: Customers Who Never Order (從不訂購的客戶)"
categories:
  - Database
tags:
  - Easy
  - SQL
---

## 題目描述
表: `Customers`
- `id` (int)
- `name` (varchar)

表: `Orders`
- `id` (int)
- `customerId` (int)

寫一個解決方案，找出所有從不訂購任何東西的客戶。

## 解題心得：找出不在集合中的元素
這題有幾種經典的 SQL 做法。

**方法 1：NOT IN**
找出所有有下單的 `customerId`，然後查詢 `id` 不在這個集合中的客戶。

**方法 2：LEFT JOIN + IS NULL**
將 `Customers` 與 `Orders` 進行左連接，如果某個客戶沒有訂單，則連接後的訂單表字段（如 `Orders.id`）會是 `NULL`。

## 程式碼實作

### SQL (MySQL) - 方法 1
```sql
SELECT name AS Customers
FROM Customers
WHERE id NOT IN (SELECT customerId FROM Orders);
```

### SQL (MySQL) - 方法 2 (更優雅)
```sql
SELECT c.name AS Customers
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customerId
WHERE o.id IS NULL;
```
> [!TIP]
> 在大數據量下，`LEFT JOIN` 通常比 `NOT IN` 性能更好。
