---
title: "LeetCode #90: Subsets II"
categories:
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
排序後，在回溯時判斷：如果當前數字與前一個相同且前一個未被包含在當前層中，則跳過以避免重複子集。

### Python
```python
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        def backtrack(start, path):
            res.append(list(path))
            for i in range(start, len(nums)):
                if i > start and nums[i] == nums[i-1]: continue
                path.append(nums[i])
                backtrack(i + 1, path)
                path.pop()
        backtrack(0, [])
        return res
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> subsetsWithDup(std::vector<int>& nums) {
        std::sort(nums.begin(), nums.end());
        std::vector<std::vector<int>> res;
        std::vector<int> path;
        backtrack(res, path, 0, nums);
        return res;
    }
    void backtrack(std::vector<std::vector<int>>& res, std::vector<int>& path, int start, std::vector<int>& nums) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            path.push_back(nums[i]);
            backtrack(res, path, i + 1, nums);
            path.pop_back();
        }
    }
};
```
