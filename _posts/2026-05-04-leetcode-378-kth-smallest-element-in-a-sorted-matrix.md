---
title: "LeetCode #378: Kth Smallest Element in a Sorted Matrix (有序矩陣中第 K 小的元素)"
categories:
  - Binary Search
  - Heap (Priority Queue)
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個 `n x n` 的矩陣，其中每行和每列元素均按升序排序。尋找矩陣中第 `k` 小的元素。

## 解題心得
使用 **值域二分搜尋**：
- 矩陣的最小值為 `left = matrix[0][0]`，最大值為 `right = matrix[n-1][n-1]`。
- 我們對值域進行二分：
  - 計算中間值 `mid`。
  - 撰寫一個輔助函數，在 $O(N)$ 時間內統計矩陣中不大於 `mid` 的元素個數 `count`（利用矩陣排序列的特性，從左下角向右上角前進）。
  - 若 `count < k`，說明第 `k` 小的元素在右半邊，`left = mid + 1`。
  - 否則，`right = mid`。
- 時間複雜度為 $O(N \log(\text{max\_val} - \text{min\_val}))$，空間複雜度為 $O(1)$，效率極高。

- **時間複雜度**: O(N \log(MAX - MIN))
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def kthSmallest(self, matrix: List[List[int]], k: int) -> int:
        n = len(matrix)
        
        def count_not_greater(mid):
            count = 0
            row, col = n - 1, 0
            while row >= 0 and col < n:
                if matrix[row][col] <= mid:
                    count += row + 1
                    col += 1
                else:
                    row -= 1
            return count
            
        left, right = matrix[0][0], matrix[-1][-1]
        while left < right:
            mid = (left + right) // 2
            if count_not_greater(mid) < k:
                left = mid + 1
            else:
                right = mid
        return left
```

### C++
```cpp
#include <vector>

class Solution {
private:
    int countNotGreater(const std::vector<std::vector<int>>& matrix, int mid, int n) {
        int count = 0;
        int row = n - 1, col = 0;
        while (row >= 0 && col < n) {
            if (matrix[row][col] <= mid) {
                count += (row + 1);
                col++;
            } else {
                row--;
            }
        }
        return count;
    }

public:
    int kthSmallest(std::vector<std::vector<int>>& matrix, int k) {
        int n = matrix.size();
        int left = matrix[0][0];
        int right = matrix[n - 1][n - 1];

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (countNotGreater(matrix, mid, n) < k) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
};
```
