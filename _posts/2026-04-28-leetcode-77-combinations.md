---
title: "LeetCode #77: Combinations"
categories:
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
經典回溯法，從 $n$ 個數中選 $k$ 個。

### Python
```python
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        res = []
        def backtrack(start, path):
            if len(path) == k:
                res.append(list(path))
                return
            for i in range(start, n + 1):
                path.append(i)
                backtrack(i + 1, path)
                path.pop()
        backtrack(1, [])
        return res
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<std::vector<int>> combine(int n, int k) {
        std::vector<std::vector<int>> res;
        std::vector<int> path;
        backtrack(res, path, 1, n, k);
        return res;
    }
    void backtrack(std::vector<std::vector<int>>& res, std::vector<int>& path, int start, int n, int k) {
        if (path.size() == k) {
            res.push_back(path); return;
        }
        for (int i = start; i <= n; i++) {
            path.push_back(i);
            backtrack(res, path, i + 1, n, k);
            path.pop_back();
        }
    }
};
```
