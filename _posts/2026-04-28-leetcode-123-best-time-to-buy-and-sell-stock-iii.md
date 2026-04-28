---
title: "LeetCode #123: Best Time to Buy and Sell Stock III"
categories:
  - Array
tags:
  - Hard
  - Dynamic Programming
  - Python
  - C++
---

## 題目描述
給定一個數組，它的第 `i` 個元素表示一支給定股票第 `i` 天的價格。
設計一個算法來計算你所能獲取的最大利潤。你最多可以完成 **兩筆** 交易。
注意：你不能同時參與多筆交易（你必須在再次購買前出售掉之前的股票）。

## 解題心得：四種狀態的切換
這題限制了最多兩次交易。我們可以定義四個變量來代表四個狀態：
1. `buy1`: 第一次買入後的餘額（越接近 0 越好，即付出越少）。
2. `sell1`: 第一次賣出後的利潤。
3. `buy2`: 第二次買入後的餘額（利用第一次賣出的錢去買）。
4. `sell2`: 第二次賣出後的總利潤。

我們在遍歷每一天的價格時，動態更新這四個狀態，最後 `sell2` 就是答案。

### Python
```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # 初始化：buy 是花錢，sell 是賺錢
        buy1, sell1 = float('-inf'), 0
        buy2, sell2 = float('-inf'), 0
        
        for price in prices:
            buy1 = max(buy1, -price)
            sell1 = max(sell1, buy1 + price)
            buy2 = max(buy2, sell1 - price)
            sell2 = max(sell2, buy2 + price)
            
        return sell2
```

### C++
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int buy1 = INT_MIN, sell1 = 0;
        int buy2 = INT_MIN, sell2 = 0;
        
        for (int price : prices) {
            buy1 = max(buy1, -price);
            sell1 = max(sell1, buy1 + price);
            buy2 = max(buy2, sell1 - price);
            sell2 = max(sell2, buy2 + price);
        }
        
        return sell2;
    }
};
```
