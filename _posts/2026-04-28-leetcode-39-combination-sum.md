---
title: "LeetCode #39: Combination Sum"
categories:
  - Array
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 解題思路：回溯法
這是一個無限取用的組合問題。我們在遞迴時，下一個搜尋起點依然是當前索引。

### Python
```python
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        res = []
        def backtrack(remain, path, start):
            if remain == 0:
                res.append(list(path))
                return
            for i in range(start, len(candidates)):
                if candidates[i] > remain: continue
                path.append(candidates[i])
                backtrack(remain - candidates[i], path, i)
                path.pop()
        backtrack(target, [], 0)
        return res
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<std::vector<int>> combinationSum(std::vector<int>& candidates, int target) {
        std::vector<std::vector<int>> res;
        std::vector<int> path;
        backtrack(res, path, candidates, target, 0);
        return res;
    }
    void backtrack(std::vector<std::vector<int>>& res, std::vector<int>& path, std::vector<int>& candidates, int target, int start) {
        if (target == 0) {
            res.push_back(path);
            return;
        }
        for (int i = start; i < candidates.size(); i++) {
            if (candidates[i] <= target) {
                path.push_back(candidates[i]);
                backtrack(res, path, candidates, target - candidates[i], i);
                path.pop();
            }
        }
    }
};
```
