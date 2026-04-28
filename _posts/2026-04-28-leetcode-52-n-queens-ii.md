---
title: "LeetCode #52: N-Queens II"
categories:
  - Backtracking
tags:
  - Hard
  - Python
  - C++
---

## 解題思路
與 51 題相同，但只需返回解的總數。

### Python
```python
class Solution:
    def totalNQueens(self, n: int) -> int:
        self.res = 0
        cols, diag1, diag2 = set(), set(), set()
        def backtrack(r):
            if r == n:
                self.res += 1
                return
            for c in range(n):
                if c in cols or (r - c) in diag1 or (r + c) in diag2: continue
                cols.add(c); diag1.add(r - c); diag2.add(r + c)
                backtrack(r + 1)
                cols.remove(c); diag1.remove(r - c); diag2.remove(r + c)
        backtrack(0)
        return self.res
```

### C++
```cpp
#include <unordered_set>

class Solution {
    int res = 0;
public:
    int totalNQueens(int n) {
        std::unordered_set<int> cols, diag1, diag2;
        backtrack(0, n, cols, diag1, diag2);
        return res;
    }
    void backtrack(int r, int n, std::unordered_set<int>& cols, std::unordered_set<int>& diag1, std::unordered_set<int>& diag2) {
        if (r == n) {
            res++; return;
        }
        for (int c = 0; c < n; c++) {
            if (cols.count(c) || diag1.count(r - c) || diag2.count(r + c)) continue;
            cols.insert(c); diag1.insert(r - c); diag2.insert(r + c);
            backtrack(r + 1, n, cols, diag1, diag2);
            cols.erase(c); diag1.erase(r - c); diag2.erase(r + c);
        }
    }
};
```
