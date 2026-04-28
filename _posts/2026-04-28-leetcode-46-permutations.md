---
title: "LeetCode #46: Permutations"
categories:
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個不含重複數字的數組 `nums` ，返回其所有可能的全排列。你可以按任意順序返回答案。

## 解題心得：回溯法的基本功
這是學習「回溯算法」最重要的一題。

**核心邏輯：**
1. **想像一棵決策樹**：我們從第一個空位開始選數字，選了 1 之後，下一個位子只能從剩餘的 2, 3 裡選...
2. **記錄已使用的數字**：我們需要一個標記（例如 `used` 數組），記住哪些數字已經躺在我們的「當前排列」裡了。
3. **撤銷選擇**：當我們填滿一個排列後，我們要「退回」上一個格子，把剛剛放進去的數字拿出來，改放別的數字試試看。

這就像是在解一個密碼鎖，你試了一個數字組合不對（或填滿了），就撥回去試下一組。

### Python
```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res = []
        def backtrack(path, used):
            if len(path) == len(nums):
                res.append(list(path))
                return
            for i in range(len(nums)):
                if used[i]: continue
                used[i] = True
                path.append(nums[i])
                backtrack(path, used)
                path.pop()
                used[i] = False
        backtrack([], [False] * len(nums))
        return res
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> permute(std::vector<int>& nums) {
        std::vector<std::vector<int>> res;
        std::sort(nums.begin(), nums.end());
        do {
            res.push_back(nums);
        } while (std::next_permutation(nums.begin(), nums.end()));
        return res;
    }
};
```
