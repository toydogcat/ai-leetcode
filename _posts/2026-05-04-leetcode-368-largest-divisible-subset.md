---
title: "LeetCode #368: Largest Divisible Subset (最大整除子集)"
categories:
  - Array
  - Math
  - Dynamic Programming
  - Sorting
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個無重複正整數陣列 `nums`，找出其中最大的子集，使得子集中任意兩個元素 `(u, v)` 滿足 `u % v == 0` 或 `v % u == 0`。

## 解題心得
1. 將陣列 `nums` 進行升序排序。排序後，若 `nums[i] % nums[j] == 0`，則 `nums[i]` 可以整除 `nums[j]` 子集中的所有元素。
2. 定義動態規劃：`dp[i]` 表示以 `nums[i]` 為最大元素的最大整除子集長度。
3. 狀態轉移：`dp[i] = max(dp[j] + 1)`，其中 `j < i` 且 `nums[i] % nums[j] == 0`。
4. 為了重建子集，我們維護一個 `parent` 陣列記錄轉移路徑。最後從 `dp` 的最大值出發，逆向追踪並重建最大子集。

- **時間複雜度**: O(N^2)
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        if not nums: return []
        nums.sort()
        n = len(nums)
        dp = [1] * n
        parent = [-1] * n
        
        max_len = 0
        max_idx = 0
        
        for i in range(n):
            for j in range(i):
                if nums[i] % nums[j] == 0 and dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    parent[i] = j
            if dp[i] > max_len:
                max_len = dp[i]
                max_idx = i
                
        # 重建路徑
        ans = []
        curr = max_idx
        while curr != -1:
            ans.append(nums[curr])
            curr = parent[curr]
        return ans[::-1]
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<int> largestDivisibleSubset(std::vector<int>& nums) {
        if (nums.empty()) return {};
        std::sort(nums.begin(), nums.end());
        int n = nums.size();
        std::vector<int> dp(n, 1);
        std::vector<int> parent(n, -1);

        int max_len = 0;
        int max_idx = 0;

        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < i; ++j) {
                if (nums[i] % nums[j] == 0 && dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    parent[i] = j;
                }
            }
            if (dp[i] > max_len) {
                max_len = dp[i];
                max_idx = i;
            }
        }

        std::vector<int> ans;
        int curr = max_idx;
        while (curr != -1) {
            ans.push_back(nums[curr]);
            curr = parent[curr];
        }
        std::reverse(ans.begin(), ans.end());
        return ans;
    }
};
```
