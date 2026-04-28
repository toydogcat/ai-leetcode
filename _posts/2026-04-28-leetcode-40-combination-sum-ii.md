---
title: "LeetCode #40: Combination Sum II"
categories:
  - Array
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
1. 對數組排序。
2. 遞迴時下一個起點為 `i + 1`。
3. 如果當前元素與前一個相同則跳過（去重）。

### Python
```python
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res = []
        def backtrack(remain, path, start):
            if remain == 0:
                res.append(list(path))
                return
            for i in range(start, len(candidates)):
                if i > start and candidates[i] == candidates[i-1]: continue
                if candidates[i] > remain: break
                path.append(candidates[i])
                backtrack(remain - candidates[i], path, i + 1)
                path.pop()
        backtrack(target, [], 0)
        return res
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> combinationSum2(std::vector<int>& candidates, int target) {
        std::sort(candidates.begin(), candidates.end());
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
            if (i > start && candidates[i] == candidates[i-1]) continue;
            if (candidates[i] > target) break;
            path.push_back(candidates[i]);
            backtrack(res, path, candidates, target - candidates[i], i + 1);
            path.pop();
        }
    }
};
```
