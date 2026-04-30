---
title: "LeetCode #188: Best Time to Buy and Sell Stock IV (買賣股票的最佳時機 IV)"
categories:
  - Array
  - Dynamic Programming
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個整數陣列 `prices` ，其中 `prices[i]` 是某隻股票第 `i` 天的價格。
再給你一個整數 `k` 。
設計一個演算法來計算你所能獲取的最大利潤。你最多可以完成 `k` 筆交易。且你不能同時參與多筆交易（即你必須在再次購買前出售掉之前的股票）。

## 解題心得：通用的股票 DP 模板
這題是股票系列的終極版本（[121](file:///home/toymsi/documents/projects/Github/ai-leetcode/_posts/2026-04-29-leetcode-121-best-time-to-buy-and-sell-stock.md), [122](file:///home/toymsi/documents/projects/Github/ai-leetcode/_posts/2026-04-29-leetcode-122-best-time-to-buy-and-sell-stock-ii.md), [123](file:///home/toymsi/documents/projects/Github/ai-leetcode/_posts/2026-04-29-leetcode-123-best-time-to-buy-and-sell-stock-iii.md) 的泛化）。

**核心邏輯：狀態機 DP**
我們需要維護 $k$ 個交易階段的狀態。
對於每一天 $i$，第 $j$ 次交易有兩種狀態：
1. `buy[j]`：第 $j$ 次買入後持有股票的最大收益。
2. `sell[j]`：第 $j$ 次賣出後手頭現金的最大收益。

**狀態轉移方程**：
- `buy[j] = max(buy[j], sell[j-1] - price)` (上次交易賣出後的錢減去買入價格)
- `sell[j] = max(sell[j], buy[j] + price)` (持有的股票加上賣出價格)

**優化**：
如果 $k \ge n/2$，則相當於可以進行無限次交易（同 LeetCode 122），直接用貪心算法即可。

- **時間複雜度**: $O(n \times k)$。
- **空間複雜度**: $O(k)$。

## 程式碼實作

### Python
```python
class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        if not prices: return 0
        n = len(prices)
        
        # 優化：如果交易次數超過天數的一半，相當於無限次交易
        if k >= n // 2:
            res = 0
            for i in range(1, n):
                if prices[i] > prices[i-1]:
                    res += prices[i] - prices[i-1]
            return res
            
        buy = [-float('inf')] * (k + 1)
        sell = [0] * (k + 1)
        
        for p in prices:
            for j in range(1, k + 1):
                buy[j] = max(buy[j], sell[j-1] - p)
                sell[j] = max(sell[j], buy[j] + p)
                
        return sell[k]
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int maxProfit(int k, std::vector<int>& prices) {
        int n = prices.size();
        if (n == 0) return 0;
        
        if (k >= n / 2) {
            int res = 0;
            for (int i = 1; i < n; i++) {
                if (prices[i] > prices[i-1]) res += prices[i] - prices[i-1];
            }
            return res;
        }
        
        std::vector<int> buy(k + 1, -1e9);
        std::vector<int> sell(k + 1, 0);
        
        for (int p : prices) {
            for (int j = 1; j <= k; j++) {
                buy[j] = std::max(buy[j], sell[j-1] - p);
                sell[j] = std::max(sell[j], buy[j] + p);
            }
        }
        
        return sell[k];
    }
};
```
