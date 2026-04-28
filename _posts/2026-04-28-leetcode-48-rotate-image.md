---
title: "LeetCode #48: Rotate Image"
categories:
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個 `n x n` 的二維矩陣 `matrix` 表示一個圖像。請你將圖像順時針旋轉 90 度。你必須在 **原地** 旋轉圖像，這意味著你需要直接修改輸入的二維矩陣。請不要使用另一個矩陣來旋轉圖像。

## 解題心得：拆解旋轉動作
直接轉 90 度很難一步到位，但我們可以把它拆成兩個簡單的對稱動作。

**核心邏輯：**
1. **對角線對調**：沿著左上到右下的對角線，把對稱的元素交換（例如 `matrix[i][j]` 與 `matrix[j][i]` 交換）。
2. **左右翻轉**：把每一行左右顛倒（例如 `[1,2,3]` 變成 `[3,2,1]`）。
3. **結果**：這兩步做完，你會驚奇地發現，矩陣已經完美地順時針轉了 90 度！

這就像是翻煎餅，先斜著折疊一下，再左右翻過來，就達到了旋轉的效果。這種方法不需要額外空間，完全符合「原地修改」的要求。

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
