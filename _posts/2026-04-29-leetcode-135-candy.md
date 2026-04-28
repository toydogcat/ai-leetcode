---
title: "LeetCode #135: Candy"
categories:
  - Greedy
  - Array
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
`n` 個孩子站成一排。每個孩子都有一個評分 `ratings`。
你需要按照以下要求給這些孩子分發糖果：
1. 每個孩子至少分配到 1 個糖果。
2. 相鄰兩個孩子評分更高的孩子會獲得更多的糖果。
計算至少需要準備多少顆糖果。

## 解題心得：左右兼顧
這題的策略是「兩次掃描」：
1. **左往右掃描：** 確保如果右邊比左邊評分高，右邊糖果 = 左邊 + 1。
2. **右往左掃描：** 確保如果左邊比右邊評分高，左邊糖果 = max(原本的, 右邊 + 1)。

最後把所有人的糖果加起來就是答案。

### Python
```python
class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        res = [1] * n
        
        # 左往右
        for i in range(1, n):
            if ratings[i] > ratings[i-1]:
                res[i] = res[i-1] + 1
                
        # 右往左
        for i in range(n-2, -1, -1):
            if ratings[i] > ratings[i+1]:
                res[i] = max(res[i], res[i+1] + 1)
                
        return sum(res)
```

### C++
```cpp
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> candies(n, 1);
        
        for (int i = 1; i < n; ++i) {
            if (ratings[i] > ratings[i - 1]) {
                candies[i] = candies[i - 1] + 1;
            }
        }
        
        for (int i = n - 2; i >= 0; --i) {
            if (ratings[i] > ratings[i + 1]) {
                candies[i] = max(candies[i], candies[i + 1] + 1);
            }
        }
        
        int total = 0;
        for (int c : candies) total += c;
        return total;
    }
};
```
