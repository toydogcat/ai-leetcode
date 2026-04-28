---
title: "LeetCode #73: Set Matrix Zeroes"
categories:
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個 `m x n` 的矩陣，如果一個元素為 **0** ，則將其所在行和列的所有元素都設為 **0** 。請使用 **原地** 算法。

## 解題心得：利用邊界當筆記本
這題如果開一個新矩陣來做很簡單，但題目要求「原地」且盡量省空間。

**核心邏輯：**
1. **不能看到 0 就馬上塗黑**：如果你直接把整行變 0，那原本這行裡別的 0 的資訊就弄丟了。
2. **利用第一行和第一列**：我們遍歷整個矩陣，如果發現 `matrix[i][j] == 0`，我們就把「第 i 行的開頭」和「第 j 列的開頭」都改成 0。這就像是在牆上做標記：「這行跟這列之後都要拆了」。
3. **最後處理**：標記完了，再根據第一行和第一列的「筆記」，把裡面的元素通通變 0。
4. **細節提示**：第一行和第一列本身會不會變 0？我們需要額外兩個變數來記錄第一行/列原本有沒有 0。

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
