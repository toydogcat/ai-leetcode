---
title: "LeetCode #59: Spiral Matrix II"
categories:
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
與 54 題螺旋遍歷相反，我們按順序填入數字。

### Python
```python
class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        matrix = [[0] * n for _ in range(n)]
        top, bottom, left, right = 0, n - 1, 0, n - 1
        num = 1
        while num <= n * n:
            for i in range(left, right + 1):
                matrix[top][i] = num; num += 1
            top += 1
            for i in range(top, bottom + 1):
                matrix[i][right] = num; num += 1
            right -= 1
            for i in range(right, left - 1, -1):
                matrix[bottom][i] = num; num += 1
            bottom -= 1
            for i in range(bottom, top - 1, -1):
                matrix[i][left] = num; num += 1
            left += 1
        return matrix
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<std::vector<int>> generateMatrix(int n) {
        std::vector<std::vector<int>> matrix(n, std::vector<int>(n));
        int top = 0, bottom = n - 1, left = 0, right = n - 1;
        int num = 1;
        while (num <= n * n) {
            for (int i = left; i <= right; i++) matrix[top][i] = num++;
            top++;
            for (int i = top; i <= bottom; i++) matrix[i][right] = num++;
            right--;
            for (int i = right; i >= left; i--) matrix[bottom][i] = num++;
            bottom--;
            for (int i = bottom; i >= top; i--) matrix[i][left] = num++;
            left++;
        }
        return matrix;
    }
};
```
