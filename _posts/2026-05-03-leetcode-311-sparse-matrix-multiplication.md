---
title: "LeetCode #311: Sparse Matrix Multiplication (稀疏矩陣乘法)"
categories:
  - Array
  - Hash Table
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定兩個稀疏矩陣 `A` 和 `B`，返回它們相乘後的結果。你可以假設 `A` 的行數與 `B` 的列數相同。

## 解題心得
在一般的矩陣乘法中，時間複雜度為 $O(M \cdot K \cdot N)$。但是由於 `A` 和 `B` 是**稀疏矩陣**，其中包含大量的 `'0'`，我們可以調整迴圈順序來進行**跳過優化**：
- 當我們遍歷到 `A[i][k] == 0` 時，我們可以直接跳過所有與其相乘的運算，因為其任何相乘結果皆為 0。
- 這樣做能大幅減少運算量，將其最佳化到與非零元素個數成正比。

- **時間複雜度**: O(M \times K \times N) 但在稀疏陣列下常數極小
- **空間複雜度**: O(M \times N) 存放答案

## 程式碼實作

### Python
```python
class Solution:
    def multiply(self, mat1: List[List[int]], mat2: List[List[int]]) -> List[List[int]]:
        m, k = len(mat1), len(mat1[0])
        n = len(mat2[0])
        ans = [[0] * n for _ in range(m)]
        
        for i in range(m):
            for r in range(k):
                if mat1[i][r] != 0:
                    for j in range(n):
                        if mat2[r][j] != 0:
                            ans[i][j] += mat1[i][r] * mat2[r][j]
        return ans
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<std::vector<int>> multiply(std::vector<std::vector<int>>& mat1, std::vector<std::vector<int>>& mat2) {
        int m = mat1.size();
        int k = mat1[0].size();
        int n = mat2[0].size();
        std::vector<std::vector<int>> ans(m, std::vector<int>(n, 0));

        for (int i = 0; i < m; ++i) {
            for (int r = 0; r < k; ++r) {
                if (mat1[i][r] != 0) {
                    for (int j = 0; j < n; ++j) {
                        if (mat2[r][j] != 0) {
                            ans[i][j] += mat1[i][r] * mat2[r][j];
                        }
                    }
                }
            }
        }
        return ans;
    }
};
```
