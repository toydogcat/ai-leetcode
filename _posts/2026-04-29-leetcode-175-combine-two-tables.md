---
title: "LeetCode #175: Combine Two Tables (組合兩個表)"
categories:
  - Database
tags:
  - Easy
  - SQL
---

## 題目描述
表: `Person`
- `personId` (int)
- `lastName` (varchar)
- `firstName` (varchar)

表: `Address`
- `addressId` (int)
- `personId` (int)
- `city` (varchar)
- `state` (varchar)

寫一個解決方案，報告 `Person` 表中每個人的姓、名、城市和州。如果 `personId` 的地址不在 `Address` 表中，則報告為 `null` 。

## 解題心得：理解 Join 的差異
這是資料庫題目的入門題，核心在於考察 `JOIN` 的用法。

**核心邏輯**：
題目要求「無論 `Address` 表中是否有對應資料，都要顯示 `Person` 表中的人」。
這意味著我們不能使用預設的 `INNER JOIN`（這會過濾掉沒有地址的人），而必須使用 **`LEFT JOIN`**。

- `LEFT JOIN`: 保留左表 (Person) 的所有行。
- 如果右表 (Address) 沒有匹配項，則顯示為 `null`。

## 程式碼實作

### SQL (MySQL)
```sql
SELECT 
    p.firstName, 
    p.lastName, 
    a.city, 
    a.state
FROM Person p
LEFT JOIN Address a ON p.personId = a.personId;
```
