---
title: "LeetCode #221: Maximal Square (最大正方形)"
categories:
  - Array
  - Dynamic Programming
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
在一個由 `'0'` 和 `'1'` 組成的 `m x n` 二維二進制矩陣中，找到只包含 `'1'` 的最大正方形，並返回其面積。

## 解題心得：二維動態規劃
這是一個經典的空間規劃問題，可以通過動態規劃高效解決。

**核心邏輯：**
1. **定義狀態**：`dp[i][j]` 表示以 `(i, j)` 為 **右下角** 的最大正方形的邊長。
2. **狀態轉移方程**：
   - 如果 `matrix[i][j] == '1'`：
     - `dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1`
     - 為什麼？因為一個點要成為更大正方形的右下角，它的左邊、上邊和左上邊都必須已經能構成一定規模的正方形。
   - 如果 `matrix[i][j] == '0'`：
     - `dp[i][j] = 0`
3. **結果**：最大面積為 `max(dp[i][j])` 的平方。

- **時間複雜度**: $O(M \times N)$。
- **空間複雜度**: $O(M \times N)$（可優化為 $O(N)$）。

## 程式碼實作

### Python
```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        if not matrix or not matrix[0]: return 0
        
        m, n = len(matrix), len(matrix[0])
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        max_side = 0
        
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if matrix[i-1][j-1] == '1':
                    # 取左、上、左上三個位置的最小值 + 1
                    dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
                    max_side = max(max_side, dp[i][j])
                    
        return max_side * max_side
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int maximalSquare(std::vector<std::vector<char>>& matrix) {
        int m = matrix.size();
        if (m == 0) return 0;
        int n = matrix[0].size();
        
        std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));
        int maxSide = 0;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (matrix[i-1][j-1] == '1') {
                    dp[i][j] = std::min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]}) + 1;
                    maxSide = std::max(maxSide, dp[i][j]);
                }
            }
        }
        
        return maxSide * maxSide;
    }
};
```
