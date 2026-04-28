---
title: "LeetCode #74: Search a 2D Matrix"
categories:
  - Matrix
  - Binary Search
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
將二維矩陣看作一維有序數組，進行一次二分搜索。索引 $idx$ 對應的座標為 $(idx / n, idx \% n)$。

### Python
```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        m, n = len(matrix), len(matrix[0])
        l, r = 0, m * n - 1
        while l <= r:
            mid = (l + r) // 2
            val = matrix[mid // n][mid % n]
            if val == target: return True
            elif val < target: l = mid + 1
            else: r = mid - 1
        return False
```

### C++
```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int l = 0, r = m * n - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (matrix[mid / n][mid % n] == target) return true;
            if (matrix[mid / n][mid % n] < target) l = mid + 1;
            else r = mid - 1;
        }
        return false;
    }
};
```
