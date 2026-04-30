---
title: "LeetCode #197: Rising Temperature (溫度上升)"
categories:
  - Database
tags:
  - Easy
  - SQL
---

## 題目描述
表: `Weather`
- `id` (int)
- `recordDate` (date)
- `temperature` (int)

編寫一個解決方案，找出與前一天（昨天）相比溫度更高的所有日期的 `id` 。

## 解題心得：日期差的處理
這題的關鍵在於如何定義「前一天」。

**核心邏輯**：
1. 將 `Weather` 表自連接。
2. 條件 1：`w1.temperature > w2.temperature`。
3. 條件 2：日期必須正好相差一天。
   - 在 MySQL 中，使用 `DATEDIFF(w1.recordDate, w2.recordDate) = 1`。
   - 或者使用 `SUBDATE` 或 `DATE_ADD`。

## 程式碼實作

### SQL (MySQL)
```sql
SELECT w1.id
FROM Weather w1, Weather w2
WHERE DATEDIFF(w1.recordDate, w2.recordDate) = 1
  AND w1.temperature > w2.temperature;
```
> [!CAUTION]
> 絕對不能簡單地用 `w1.id = w2.id + 1`，因為 ID 可能是不連續的。必須對日期進行運算。
