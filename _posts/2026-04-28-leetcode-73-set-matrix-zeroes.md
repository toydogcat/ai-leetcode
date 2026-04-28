---
title: "LeetCode #73: Set Matrix Zeroes"
categories:
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
使用矩陣的第一行和第一列作為標記位，記錄對應的行或列是否需要置零。

### Python
```python
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        rows, cols = len(matrix), len(matrix[0])
        first_row_has_zero = any(matrix[0][c] == 0 for c in range(cols))
        first_col_has_zero = any(matrix[r][0] == 0 for r in range(rows))
        
        for r in range(1, rows):
            for c in range(1, cols):
                if matrix[r][c] == 0:
                    matrix[0][c] = matrix[r][0] = 0
        
        for r in range(1, rows):
            for c in range(1, cols):
                if matrix[0][c] == 0 or matrix[r][0] == 0:
                    matrix[r][c] = 0
        
        if first_row_has_zero:
            for c in range(cols): matrix[0][c] = 0
        if first_col_has_zero:
            for r in range(rows): matrix[r][0] = 0
```

### C++
```cpp
#include <vector>

class Solution {
public:
    void setZeroes(std::vector<std::vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        bool firstRow = false, firstCol = false;
        for (int i = 0; i < m; i++) if (matrix[i][0] == 0) firstCol = true;
        for (int j = 0; j < n; j++) if (matrix[0][j] == 0) firstRow = true;
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) matrix[i][0] = matrix[0][j] = 0;
            }
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
            }
        }
        if (firstCol) for (int i = 0; i < m; i++) matrix[i][0] = 0;
        if (firstRow) for (int j = 0; j < n; j++) matrix[0][j] = 0;
    }
};
```
