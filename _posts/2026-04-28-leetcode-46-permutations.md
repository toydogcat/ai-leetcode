---
title: "LeetCode #46: Permutations"
categories:
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
使用回溯法遍歷所有可能的排列。

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
