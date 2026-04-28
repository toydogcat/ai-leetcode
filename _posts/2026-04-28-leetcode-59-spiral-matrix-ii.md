---
title: "LeetCode #59: Spiral Matrix II"
categories:
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個正整數 `n` ，生成一個包含 `1` 到 $n^2$ 所有元素，且元素按順時針順序螺旋排列的 `n x n` 正方形矩陣 `matrix` 。

## 解題心得：畫圈圈的藝術
這題是 54 題的「反向操作」，我們要手動填入一個螺旋矩陣。

**核心邏輯：控制邊界**
想像你在畫一個迷宮，你要不斷地撞牆、轉彎、撞牆、轉彎。
1. **設定邊界**：上、下、左、右四個邊界。
2. **填寫順序**：
   - 從左往右填，填完後把「上邊界」往下移。
   - 從上往下填，填完後把「右邊界」往左移。
   - 從右往左填，填完後把「下邊界」往上移。
   - 從下往上填，填完後把「左邊界」往右移。
3. **循環**：只要還沒填滿，就一直轉下去。

關鍵在於每填完一條邊，就要縮小地圖範圍，直到無路可走。

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
