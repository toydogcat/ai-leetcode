---
title: "LeetCode #78: Subsets"
categories:
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
回溯法，每一步都將當前路徑加入結果中。

### Python
```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = []
        def backtrack(start, path):
            res.append(list(path))
            for i in range(start, len(nums)):
                path.append(nums[i])
                backtrack(i + 1, path)
                path.pop()
        backtrack(0, [])
        return res
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<std::vector<int>> subsets(std::vector<int>& nums) {
        std::vector<std::vector<int>> res;
        std::vector<int> path;
        backtrack(res, path, 0, nums);
        return res;
    }
    void backtrack(std::vector<std::vector<int>>& res, std::vector<int>& path, int start, std::vector<int>& nums) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            backtrack(res, path, i + 1, nums);
            path.pop_back();
        }
    }
};
```
