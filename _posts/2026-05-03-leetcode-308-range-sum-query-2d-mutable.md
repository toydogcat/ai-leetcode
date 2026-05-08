---
title: "LeetCode #308: Range Sum Query 2D - Mutable (二維區域和檢索 - 矩陣可修改)"
categories:
  - Design
  - Binary Indexed Tree
  - Matrix
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個二維矩陣 `matrix`，支援：
1. 更新單個元素的值 `update(row, col, val)`。
2. 計算子矩陣 `sumRegion(row1, col1, row2, col2)` 的元素之和。

## 解題心得
本題是 1D 樹狀陣列在 2D 上的延伸。我們可以使用 **二維樹狀陣列 (2D Binary Indexed Tree)** 來高效解決：
- 二維樹狀陣列可以在 $O(\log M \cdot \log N)$ 的時間內更新與查詢子矩陣。
- `update` 操作：在 `(row + 1, col + 1)` 累加變化量（差值），並沿著 2D 樹狀路徑更新所有相關節點。
- `sumRegion` 操作：利用 2D 容斥原理，呼叫 `query(row2 + 1, col2 + 1) - query(row1, col2 + 1) - query(row2 + 1, col1) + query(row1, col1)`。

- **時間複雜度**: 修改 $O(\log M \cdot \log N)$，查詢 $O(\log M \cdot \log N)$
- **空間複雜度**: O(M \times N)

## 程式碼實作

### Python
```python
class NumMatrix:
    def __init__(self, matrix: List[List[int]]):
        if not matrix or not matrix[0]: return
        self.m, self.n = len(matrix), len(matrix[0])
        self.matrix = [[0]*self.n for _ in range(self.m)]
        self.tree = [[0]*(self.n + 1) for _ in range(self.m + 1)]
        for r in range(self.m):
            for c in range(self.n):
                self.update(r, c, matrix[r][c])

    def update(self, row: int, col: int, val: int) -> None:
        delta = val - self.matrix[row][col]
        self.matrix[row][col] = val
        i = row + 1
        while i <= self.m:
            j = col + 1
            while j <= self.n:
                self.tree[i][j] += delta
                j += j & (-j)
            i += i & (-i)

    def query(self, row, col):
        s = 0
        i = row
        while i > 0:
            j = col
            while j > 0:
                s += self.tree[i][j]
                j -= j & (-j)
            i -= i & (-i)
        return s

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return (self.query(row2 + 1, col2 + 1) - 
                self.query(row1, col2 + 1) - 
                self.query(row2 + 1, col1) + 
                self.query(row1, col1))
```

### C++
```cpp
#include <vector>

class NumMatrix {
private:
    std::vector<std::vector<int>> tree;
    std::vector<std::vector<int>> matrix;
    int m, n;

    int query(int row, int col) {
        int sum = 0;
        for (int i = row; i > 0; i -= i & (-i)) {
            for (int j = col; j > 0; j -= j & (-j)) {
                sum += tree[i][j];
            }
        }
        return sum;
    }

public:
    NumMatrix(std::vector<std::vector<int>>& mat) {
        if (mat.empty() || mat[0].empty()) return;
        m = mat.size();
        n = mat[0].size();
        matrix.resize(m, std::vector<int>(n, 0));
        tree.resize(m + 1, std::vector<int>(n + 1, 0));
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                update(r, c, mat[r][c]);
            }
        }
    }
    
    void update(int row, int col, int val) {
        int delta = val - matrix[row][col];
        matrix[row][col] = val;
        for (int i = row + 1; i <= m; i += i & (-i)) {
            for (int j = col + 1; j <= n; j += j & (-j)) {
                tree[i][j] += delta;
            }
        }
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        return query(row2 + 1, col2 + 1) - query(row1, col2 + 1) - query(row2 + 1, col1) + query(row1, col1);
    }
};
```
