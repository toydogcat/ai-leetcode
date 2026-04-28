---
title: "LeetCode #122: Best Time to Buy and Sell Stock II"
categories:
  - Array
tags:
  - Medium
  - Greedy
  - Python
  - C++
---

## 題目描述
給你一個整數數組 `prices` ，其中 `prices[i]` 表示某支股票第 `i` 天的價格。
在每一天，你可以決定是否購買和/或出售股票。你在任何時候 **最多** 只能持有 **一股** 股票。你也可以先購買，然後在 **同一天** 出售。
返回你能獲得的 **最大** 利潤。

## 解題心得：落袋為安
這題與 #121 不同的是，你可以交易多次。
既然可以無限次交易，最貪心的做法就是：**只要明天比今天貴，我今天就買，明天就賣！**
這種做法能把所有「上升波段」的利潤全部吃掉。

### Python
```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_profit = 0
        for i in range(1, len(prices)):
            # 只要今天的價格比昨天高，就把差值賺起來
            if prices[i] > prices[i-1]:
                max_profit += prices[i] - prices[i-1]
        return max_profit
```

### C++
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int max_profit = 0;
        for (int i = 1; i < prices.size(); ++i) {
            if (prices[i] > prices[i - 1]) {
                max_profit += prices[i] - prices[i - 1];
            }
        }
        return max_profit;
    }
};
```
