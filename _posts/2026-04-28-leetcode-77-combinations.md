---
title: "LeetCode #77: Combinations"
categories:
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定兩個整數 `n` 和 `k`，返回範圍 `[1, n]` 中所有可能的 `k` 個數的組合。你可以按 **任意順序** 返回答案。

## 解題心得：限定人數的選拔
這題跟 78 題「子集」很像，差別在於這題限制了籃子裡 **必須剛好放 k 個球**。

**核心邏輯：**
1. **剪枝 (Pruning) 優化**：這是一個很重要的進階技巧。如果我們發現剩下的球就算全部拿走，也湊不滿 `k` 個了，那我們就沒必要再往下找了。
2. **回溯路徑**：我們用一個列表記錄當前選了哪些數。一旦數量達到 `k`，就存入結果；否則就繼續往後選更大的數。

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
