---
title: "LeetCode #254: Factor Combinations (因子的組合)"
categories:
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
寫一個函數，輸入一個整數 `n`，返回其所有可能的因子組合。
因子必須在 `[2, n-1]` 之間。例如 `n = 12`，返回 `[[2,6], [2,2,3], [3,4]]`。

## 解題心得：回溯 (Backtracking)
這是一個典型的拆解問題，可以使用回溯法來窮舉所有組合。

**核心邏輯：**
1. **遞迴函數**：`backtrack(target, start, path)`。
   - `target`：當前剩餘需要拆解的數。
   - `start`：為了避免重複組合（如 `[2, 6]` 和 `[6, 2]`），因子必須遞增，`start` 記錄當前最小可選因子。
2. **遍歷範圍**：從 `start` 到 `sqrt(target)`。
   - 如果 `target % i == 0`：
     - 將 `i` 加入 `path`。
     - 將 `[path + [target // i]]` 加入結果集（這是一個包含兩個以上因子的組合）。
     - 遞迴調用 `backtrack(target // i, i, path)` 繼續拆解餘數。
     - 回溯：將 `i` 從 `path` 中彈出。

- **時間複雜度**: 指數級。
- **空間複雜度**: $O(\log N)$。

## 程式碼實作

### Python
```python
class Solution:
    def getFactors(self, n: int) -> List[List[int]]:
        res = []
        
        def backtrack(target, start, path):
            # 從 start 遍歷到 sqrt(target)
            i = start
            while i * i <= target:
                if target % i == 0:
                    # 加入當前因子對 [i, target // i]
                    res.append(path + [i, target // i])
                    # 繼續拆解 target // i
                    backtrack(target // i, i, path + [i])
                i += 1
                
        backtrack(n, 2, [])
        return res
```

### C++
```cpp
#include <vector>
#include <cmath>

class Solution {
public:
    std::vector<std::vector<int>> getFactors(int n) {
        std::vector<std::vector<int>> res;
        std::vector<int> path;
        backtrack(n, 2, path, res);
        return res;
    }

    void backtrack(int target, int start, std::vector<int>& path, std::vector<std::vector<int>>& res) {
        for (int i = start; i <= sqrt(target); i++) {
            if (target % i == 0) {
                path.push_back(i);
                // 組合1: [i, target / i]
                std::vector<int> currentPath = path;
                currentPath.push_back(target / i);
                res.push_back(currentPath);
                
                // 遞迴進一步拆解
                backtrack(target / i, i, path, res);
                path.pop_back();
            }
        }
    }
};
```
