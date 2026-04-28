---
title: "LeetCode #48: Rotate Image"
categories:
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
先沿著主對角線翻轉，再對每一行進行反轉。

### Python
```python
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)
        # 對角線翻轉
        for i in range(n):
            for j in range(i, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        # 行反轉
        for i in range(n):
            matrix[i].reverse()
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    void rotate(std::vector<std::vector<int>>& matrix) {
        int n = matrix.size();
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                std::swap(matrix[i][j], matrix[j][i]);
            }
        }
        for (int i = 0; i < n; i++) {
            std::reverse(matrix[i].begin(), matrix[i].end());
        }
    }
};
```
