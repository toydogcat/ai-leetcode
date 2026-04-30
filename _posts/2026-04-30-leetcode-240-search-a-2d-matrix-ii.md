---
title: "LeetCode #240: Search a 2D Matrix II (搜索二維矩陣 II)"
categories:
  - Array
  - Binary Search
  - Divide and Conquer
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
編寫一個高效的算法來搜索 `m x n` 矩陣 `matrix` 中的一個目標值 `target` 。該矩陣具有以下特性：
- 每行的元素從左到右升序排列。
- 每列的元素從上到下升序排列。

## 解題心得：Z 字型搜索 (右上角/左下角出發)
這題的關鍵在於尋找一個起點，使得每次比較都能排除一行或一列。

**核心邏輯：**
1. **從右上角 (0, n-1) 出發**：
   - 如果當前值 `matrix[r][c] == target`，返回 `true`。
   - 如果 `matrix[r][c] > target`：說明當前列下方的所有元素都大於 `target`，排除這一列，`c--`。
   - 如果 `matrix[r][c] < target`：說明當前行左側的所有元素都小於 `target`，排除這一行，`r++`。
2. **終止條件**：走出矩陣邊界。

為什麼不從左上角出發？因為左上角向右和向下都是變大，無法做出唯一決策。

- **時間複雜度**: $O(M + N)$，其中 $M$ 為行數，$N$ 為列數。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix or not matrix[0]: return False
        
        m, n = len(matrix), len(matrix[0])
        # 從右上角出發
        r, c = 0, n - 1
        
        while r < m and c >= 0:
            if matrix[r][c] == target:
                return True
            elif matrix[r][c] > target:
                c -= 1 # 排除當前列
            else:
                r += 1 # 排除當前行
                
        return False
```

### C++
```cpp
#include <vector>

class Solution {
public:
    bool searchMatrix(std::vector<std::vector<int>>& matrix, int target) {
        int m = matrix.size();
        if (m == 0) return false;
        int n = matrix[0].size();
        
        int r = 0, c = n - 1;
        while (r < m && c >= 0) {
            if (matrix[r][c] == target) return true;
            else if (matrix[r][c] > target) c--;
            else r++;
        }
        return false;
    }
};
```
