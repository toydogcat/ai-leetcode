---
title: "LeetCode #262: Trips and Users (行程和用戶)"
categories:
  - Database
tags:
  - Hard
  - SQL
---

## 題目描述
`Trips` 表：
- `id` (int)
- `client_id` (int)
- `driver_id` (int)
- `city_id` (int)
- `status` (enum: 'completed', 'cancelled_by_driver', 'cancelled_by_client')
- `request_at` (date)

`Users` 表：
- `users_id` (int)
- `banned` (enum: 'Yes', 'No')
- `role` (enum: 'client', 'driver', 'partner')

**取消率（Cancellation Rate）** 的定義是：由非禁止用戶（非禁止的客戶和司機）發起的被取消請求（客戶或司機取消）除以該日非禁止用戶發起的請求總數。

編寫一個解決方案，找出 **2013-10-01** 至 **2013-10-03** 期間非禁止用戶的每日取消率。取消率需四捨五入到小數點後兩位。

## 解題心得：多重條件過濾與計數
這是一道典型的 SQL 題目，需要對多個表格進行過濾和聚合處理。

**核心步驟**：
1. **過濾非禁止用戶**：
   - 篩選 `client_id` 不在 `Users` 表中被禁止（`banned = 'Yes'`）的用戶。
   - 篩選 `driver_id` 不在 `Users` 表中被禁止（`banned = 'Yes'`）的用戶。
2. **過濾日期**：
   - 時間範圍限定在 `'2013-10-01'` 與 `'2013-10-03'` 之間。
3. **計算取消率**：
   - 每日統計：使用 `GROUP BY request_at`。
   - 分子：`status != 'completed'` 的行程數量。
   - 分母：當日總行程數量。
4. **輸出調整**：
   - 使用 `ROUND(..., 2)` 處理小數點。

- **時間複雜度**: $O(N)$，掃描表格所有行進行過濾與分組。
- **空間複雜度**: $O(1)$，傳回固定日期的統計資料。

## 程式碼實作

### SQL (MySQL)
```sql
SELECT 
    t.request_at AS Day,
    ROUND(
        SUM(IF(t.status != 'completed', 1, 0)) / COUNT(*), 
        2
    ) AS `Cancellation Rate`
FROM Trips t
JOIN Users u1 ON t.client_id = u1.users_id AND u1.banned = 'No'
JOIN Users u2 ON t.driver_id = u2.users_id AND u2.banned = 'No'
WHERE t.request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY t.request_at;
```
