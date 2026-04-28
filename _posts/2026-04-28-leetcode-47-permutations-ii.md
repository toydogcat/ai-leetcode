---
title: "LeetCode #47: Permutations II"
categories:
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
排序後，在回溯時判斷如果當前數字與前一個相同且前一個未被使用，則跳過。

### Python
```python
class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        def backtrack(path, used):
            if len(path) == len(nums):
                res.append(list(path))
                return
            for i in range(len(nums)):
                if used[i] or (i > 0 and nums[i] == nums[i-1] and not used[i-1]):
                    continue
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
    std::vector<std::vector<int>> permuteUnique(std::vector<int>& nums) {
        std::vector<std::vector<int>> res;
        std::sort(nums.begin(), nums.end());
        do {
            res.push_back(nums);
        } while (std::next_permutation(nums.begin(), nums.end()));
        return res;
    }
};
```
