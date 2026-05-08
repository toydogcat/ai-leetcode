---
title: "LeetCode #367: Valid Perfect Square (有效的完全平方數)"
categories:
  - Math
  - Binary Search
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個正整數 `num`，如果 `num` 是一個完全平方數，則返回 `true`，否則返回 `false`。不使用任何內建庫函數（如 `sqrt`）。

## 解題心得
使用 **二分搜尋 (Binary Search)** 在範圍 `[1, num]` 尋找滿足 `mid * mid == num` 的數，或者使用 **牛頓迭代法**：`x = (x + num / x) / 2` 逼近整數解。

- **時間複雜度**: O(\log N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        left, right = 1, num
        while left <= right:
            mid = (left + right) // 2
            square = mid * mid
            if square == num:
                return True
            elif square < num:
                left = mid + 1
            else:
                right = mid - 1
        return False
```

### C++
```cpp
class Solution {
public:
    bool isPerfectSquare(int num) {
        long long left = 1, right = num;
        while (left <= right) {
            long long mid = left + (right - left) / 2;
            long long square = mid * mid;
            if (square == num) return true;
            else if (square < num) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }
};
```
