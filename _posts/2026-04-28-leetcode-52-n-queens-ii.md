---
title: "LeetCode #52: N-Queens II"
categories:
  - Backtracking
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
`n` 皇后問題研究的是如何將 `n` 個皇后放置在 `n x n` 的棋盤上，並且使皇后彼此之間不能相互攻擊。給你一個整數 `n` ，返回 `n` 皇后問題不同的解決方案的 **數量** 。

## 解題心得：只記個數，不記地圖
這題是 51 題的簡化版。我們不需要求出具體的棋盤長什麼樣子，只需要求「有幾種解」。

**核心邏輯：**
1. **位運算優化 (進階)**：雖然可以用 51 題的集合法，但求數量時，很多高手會用位運算 (`bitmask`) 來極速檢查衝突。
2. **基本思路不變**：依然是逐行回溯。每成功走到最後一行，計數器就 `+1`。

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
