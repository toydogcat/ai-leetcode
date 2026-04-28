---
title: "LeetCode #54: Spiral Matrix"
categories:
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個 `m` 行 `n` 列的矩陣 `matrix` ，請按照 **順時針螺旋順序** ，返回矩陣中的所有元素。

## 解題心得：地圖邊界的動態縮減
這題跟 59 題是一對雙胞胎，只是這題是「讀取」螺旋矩陣。

**核心邏輯：四指針邊界法**
1. **界定疆域**：準備 `top`, `bottom`, `left`, `right` 四個邊界。
2. **順時針行軍**：
   - 第一動：從左往右走完第一行。走完後，這一行沒用了，`top` 往下移。
   - 第二動：從上往下走完最右列。走完後，這一列沒用了，`right` 往左移。
   - 第三動：從右往左走完最後一行。走完後，這一行沒用了，`bottom` 往上移。
   - 第四動：從下往上走完最左列。走完後，這一列沒用了，`left` 往右移。
3. **小心陷阱**：在第三和第四步之前，必須檢查是否還有剩餘的行或列可走（即 `top <= bottom` 和 `left <= right`），否則會重複走過已經走過的路。

### Python
```python
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        res = []
        if not matrix: return res
        top, bottom = 0, len(matrix) - 1
        left, right = 0, len(matrix[0]) - 1
        
        while top <= bottom and left <= right:
            for i in range(left, right + 1): res.append(matrix[top][i])
            top += 1
            for i in range(top, bottom + 1): res.append(matrix[i][right])
            right -= 1
            if top <= bottom:
                for i in range(right, left - 1, -1): res.append(matrix[bottom][i])
                bottom -= 1
            if left <= right:
                for i in range(bottom, top - 1, -1): res.append(matrix[i][left])
                left += 1
        return res
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<int> spiralOrder(std::vector<std::vector<int>>& matrix) {
        std::vector<int> res;
        int top = 0, bottom = matrix.size() - 1;
        int left = 0, right = matrix[0].size() - 1;
        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) res.push_back(matrix[top][i]);
            if (++top > bottom) break;
            for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);
            if (--right < left) break;
            for (int i = right; i >= left; i--) res.push_back(matrix[bottom][i]);
            if (--bottom < top) break;
            for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);
            left++;
        }
        return res;
    }
};
```
