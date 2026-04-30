---
title: "LeetCode #198: House Robber (打家劫舍)"
categories:
  - Dynamic Programming
  - Array
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
你是一個專業的小偷，計劃偷竊沿街的房屋。每間房內都藏有一定的現金，影響你偷竊的唯一制約因素就是相鄰的房屋裝有相互連通的防盜系統，**如果兩間相鄰的房屋在同一晚上被小偷闖入，系統就會自動報警**。

給定一個代表每個房屋存放金額的非負整數陣列，計算你 **不觸動警報裝置的情況下** ，一夜之內能夠偷竊到的最高金額。

## 解題心得：基礎動態規劃
這是動態規劃 (DP) 的入門經典題。

**核心邏輯：選或不選**
對於第 $i$ 間房子，你有兩個選擇：
1. **偷這間房**：那麼你不能偷第 $i-1$ 間房，你的總收益是 `nums[i] + 前 i-2 間房的最大收益`。
2. **不偷這間房**：你的總收益就是 `前 i-1 間房的最大收益`。

**狀態轉移方程**：
`dp[i] = max(dp[i-1], nums[i] + dp[i-2])`

**優化**：
我們發現 `dp[i]` 只依賴於前兩個狀態，所以可以用兩個變數來滾動更新，節省空間。

- **時間複雜度**: $O(n)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        if not nums: return 0
        
        prev_max = 0 # dp[i-2]
        curr_max = 0 # dp[i-1]
        
        for x in nums:
            # 滾動更新
            temp = curr_max
            curr_max = max(curr_max, prev_max + x)
            prev_max = temp
            
        return curr_max
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int rob(std::vector<int>& nums) {
        int prevMax = 0;
        int currMax = 0;
        
        for (int x : nums) {
            int temp = currMax;
            currMax = std::max(currMax, prevMax + x);
            prevMax = temp;
        }
        
        return currMax;
    }
};
```
