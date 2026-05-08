---
title: "LeetCode #304: Range Sum Query 2D - Immutable (二維區域和檢索 - 矩陣不可變)"
categories:
  - Array
  - Design
  - Matrix
  - Prefix Sum
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個二維矩陣 `matrix`，處理以下多個區域和查詢：
1. 計算子矩陣 `(row1, col1)` 到 `(row2, col2)` 的元素之和。

## 解題心得
本題是 1D 前綴和的 2D 延伸。我們可以使用 **二維前綴和 (2D Prefix Sum)**：
- 設 `prefix[i][j]` 表示從 `(0, 0)` 到 `(i-1, j-1)` 的子矩陣和。
- 轉移方程：`prefix[i][j] = prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1] + matrix[i-1][j-1]`。
- 查詢時，利用容斥原理計算：
  `Sum(row1, col1, row2, col2) = prefix[row2+1][col2+1] - prefix[row1][col2+1] - prefix[row2+1][col1] + prefix[row1][col1]`。

- **時間複雜度**: 預處理 $O(M \times N)$，查詢 $O(1)$
- **空間複雜度**: O(M \times N)

## 程式碼實作

### Python
```python
class NumMatrix:
    def __init__(self, matrix: List[List[int]]):
        if not matrix or not matrix[0]:
            return
        m, n = len(matrix), len(matrix[0])
        self.prefix = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                self.prefix[i][j] = (self.prefix[i - 1][j] + 
                                     self.prefix[i][j - 1] - 
                                     self.prefix[i - 1][j - 1] + 
                                     matrix[i - 1][j - 1])

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return (self.prefix[row2 + 1][col2 + 1] - 
                self.prefix[row1][col2 + 1] - 
                self.prefix[row2 + 1][col1] + 
                self.prefix[row1][col1])
```

### C++
```cpp
#include <vector>

class NumMatrix {
private:
    std::vector<std::vector<int>> prefix;

public:
    NumMatrix(std::vector<std::vector<int>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return;
        int m = matrix.size();
        int n = matrix[0].size();
        prefix.resize(m + 1, std::vector<int>(n + 1, 0));
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                prefix[i][j] = prefix[i - 1][j] + prefix[i][j - 1] - prefix[i - 1][j - 1] + matrix[i - 1][j - 1];
            }
        }
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        return prefix[row2 + 1][col2 + 1] - prefix[row1][col2 + 1] - prefix[row2 + 1][col1] + prefix[row1][col1];
    }
};
```
