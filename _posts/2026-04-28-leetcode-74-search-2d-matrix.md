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

## 題目描述
給你一個滿足下述兩條屬性的 `m x n` 整數矩陣：
1. 每行中的整數從左到右按非遞減順序排列。
2. 每行的第一個整數大於前一行的最後一個整數。
給你一個整數 `target` ，如果 `target` 在矩陣中，返回 `true` ；否則，返回 `false` 。

## 解題心得：拉直後的二分搜索
這題看起來是個二維問題，但因為「每一行的開頭都比前一行的結尾大」，所以這個矩陣本質上就是一個 **「排好序的一維長數組」**。

**核心邏輯：**
1. **虛擬轉化**：我們不需要真的把矩陣攤平，只需要在腦海中想像它是一條線。
2. **座標換算**：
   - 假設長度是 $N$，寬度是 $M$。
   - 一維索引 `mid` 對應的行座標就是 `mid / M`。
   - 一維索引 `mid` 對應的列座標就是 `mid % M`。
3. **常規二分**：換算完之後，直接套用標準的二分搜索法即可。

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
