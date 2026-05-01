---
title: "LeetCode #300: Longest Increasing Subsequence (最長遞增子序列)"
categories:
  - Array
  - Binary Search
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個整數數組 `nums`，找到其中最長嚴格遞增子序列的長度。

**子序列** 是由數組派生而來的序列，刪除（或不刪除）數組中的元素而不改變其餘元素的順序。例如，`[3,6,2,7]` 是數組 `[0,3,1,6,2,2,7]` 的子序列。

**範例 1:**
```
輸入: nums = [10,9,2,5,3,7,101,18]
輸出: 4
解釋: 最長遞增子序列是 [2,3,7,101]，因此長度為 4。
```

**範例 2:**
```
輸入: nums = [0,1,0,3,2,3]
輸出: 4
```

**範例 3:**
```
輸入: nums = [7,7,7,7,7,7,7]
輸出: 1
```

## 解題心得：二分搜尋與耐心排序 (Binary Search & Patience Sorting)
最長遞增子序列（LIS）有兩種主流解法：
1. **動態規劃（Dynamic Programming）**：
   - 設 `dp[i]` 是以 `nums[i]` 為結尾的最長遞增子序列長度。
   - `dp[i] = max(dp[j]) + 1`，其中 $0 \le j < i$ 且 `nums[j] < nums[i]`。
   - 時間複雜度為 $O(N^2)$。
2. **二分搜尋法（Binary Search）**：
   - 建立一個維護遞增子序列的數組 `tails`（也常被稱為耐心排序法）。
   - 遍歷 `nums` 中的每個數字：
     - 如果這個數字比 `tails` 的最後一個元素還大，說明它可以擴展現有的遞增序列，我們直接將其添加到末尾。
     - 如果這個數字小於等於 `tails` 中的最後一個元素，我們使用 **二分搜尋** 找出 `tails` 中第一個大於等於該數字的位置，並用該數字替換它。
   - 最終，`tails` 數組的長度就是整個數組的最長遞增子序列（LIS）的長度。
   - 時間複雜度可降為 $O(N \log N)$。

- **時間複雜度**: $O(N \log N)$，因為我們對 $N$ 個數字都執行了一次二分搜尋。
- **空間複雜度**: $O(N)$，用於儲存 `tails` 數組。

## 程式碼實作

### Python
```python
import bisect

class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        # tails[i] 表示長度為 i + 1 的遞增子序列末尾元素的最小值
        tails = []
        
        for num in nums:
            # 藉由二分搜尋找到 tails 中第一個大於等於 num 的位置
            idx = bisect.bisect_left(tails, num)
            
            if idx == len(tails):
                tails.append(num)
            else:
                tails[idx] = num
                
        return len(tails)
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int lengthOfLIS(std::vector<int>& nums) {
        if (nums.empty()) return 0;

        std::vector<int> tails;

        for (int num : nums) {
            // 使用 std::lower_bound 來找到第一個大於等於 num 的元素
            auto it = std::lower_bound(tails.begin(), tails.end(), num);

            if (it == tails.end()) {
                tails.push_back(num);
            } else {
                *it = num;
            }
        }

        return tails.size();
    }
};
```
