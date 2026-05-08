---
title: "LeetCode #309: Best Time to Buy and Sell Stock with Cooldown (買賣股票的最佳時機含冷凍期)"
categories:
  - Array
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個整數陣列 `prices`，其中 `prices[i]` 表示第 `i` 天的股票價格。
你可以盡可能多地完成交易（多次買賣），但你必須遵守以下規則：
- 賣出股票後，你無法在第二天買入股票（即冷凍期為 1 天）。

## 解題心得
這是一個典型的狀態機動態規劃（State Machine DP）。我們定義每一天結束時的三種狀態：
1. `hold[i]`：當天結束後手中持有股票的最大收益。
   `hold[i] = max(hold[i-1], reset[i-1] - prices[i])` (繼續持有，或從冷凍期結束狀態買入)
2. `sold[i]`：當天結束後剛好賣出股票的最大收益。
   `sold[i] = hold[i-1] + prices[i]`
3. `reset[i]`：當天結束後處於冷凍期或無股票也無操作的狀態。
   `reset[i] = max(reset[i-1], sold[i-1])` (繼續休息，或剛結束冷凍期)

- **時間複雜度**: O(N)
- **空間複雜度**: O(1) 僅需使用滾動陣列優化空間

## 程式碼實作

### Python
```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if not prices:
            return 0
        hold = -float('inf')
        sold = 0
        reset = 0
        
        for price in prices:
            prev_sold = sold
            sold = hold + price
            hold = max(hold, reset - price)
            reset = max(reset, prev_sold)
            
        return max(sold, reset)
```

### C++
```cpp
#include <vector>
#include <algorithm>
#include <climits>

class Solution {
public:
    int maxProfit(std::vector<int>& prices) {
        if (prices.empty()) return 0;
        int hold = INT_MIN;
        int sold = 0;
        int reset = 0;

        for (int price : prices) {
            int prev_sold = sold;
            sold = (hold == INT_MIN) ? INT_MIN : hold + price;
            hold = std::max(hold, reset - price);
            reset = std::max(reset, prev_sold);
        }
        return std::max(sold, reset);
    }
};
```
