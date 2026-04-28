---
title: "LeetCode #121: Best Time to Buy and Sell Stock"
categories:
  - Array
tags:
  - Easy
  - Dynamic Programming
  - Python
  - C++
---

## 題目描述
給定一個數組 `prices` ，它的第 `i` 個元素 `prices[i]` 表示一支給定股票第 `i` 天的價格。
你只能選擇 **某一天** 買入這隻股票，並在 **未來的某一個不同的日子** 賣出該股票。設計一個算法來計算你所能獲取的最大利潤。

## 解題心得：低買高賣的藝術
這題的核心在於：我們需要找到一個最低的買入點，然後在它之後找一個最高的賣出點。
我們只需要遍歷一次數組：
1. 紀錄目前的 **最低價格 (min_price)**。
2. 計算今天賣出能賺多少錢：`今天的價格 - min_price`。
3. 更新 **最大利潤 (max_profit)**。

### Python
```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit, price - min_price)
        return max_profit
```

### C++
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int min_price = INT_MAX;
        int max_profit = 0;
        for (int price : prices) {
            min_price = min(min_price, price);
            max_profit = max(max_profit, price - min_price);
        }
        return max_profit;
    }
};
```
