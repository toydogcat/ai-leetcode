---
title: "LeetCode #357: Count Numbers with Unique Digits (統計各位數字都不同的數字個數)"
categories:
  - Math
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個非負整數 `n`，計算各位數字都不同的數字個數（範圍為 $0 \le x < 10^n$）。

## 解題心得
這是一道經典的排列組合問題：
- 當 `n = 0`，答案為 1（僅包含 0）。
- 當 `n = 1`，答案為 10（0 到 9）。
- 當 `n >= 2`，長度為 `i` 且各位數字不同的數字個數為：
  - 第一位：不能為 0，有 9 種選擇。
  - 第二位：不能與第一位相同，有 9 種選擇。
  - 第三位：有 8 種選擇，以此類推。
  - 長度為 `i` 的數字個數為 $9 \times 9 \times 8 \times \dots \times (11 - i)$。
- 我們累加長度從 1 到 `n` 的個數即可。由於數字最多有 10 個不同位，當 `n > 10` 時，其結果與 `n = 10` 相同。

- **時間複雜度**: O(1) 最多計算 10 次
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def countNumbersWithUniqueDigits(self, n: int) -> int:
        if n == 0: return 1
        ans = 10
        unique_digits = 9
        available_number = 9
        
        for i in range(2, min(n + 1, 11)):
            unique_digits *= available_number
            ans += unique_digits
            available_number -= 1
        return ans
```

### C++
```cpp
#include <algorithm>

class Solution {
public:
    int countNumbersWithUniqueDigits(int n) {
        if (n == 0) return 1;
        int ans = 10;
        int unique_digits = 9;
        int available_number = 9;

        for (int i = 2; i <= std::min(n, 10); ++i) {
            unique_digits *= available_number;
            ans += unique_digits;
            available_number--;
        }
        return ans;
    }
};
```
