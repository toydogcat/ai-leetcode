---
title: "LeetCode #7: Reverse Integer"
categories:
  - Math
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個 32 位的有符號整數 `x` ，返回將 `x` 中的數字部分反轉後的結果。如果反轉後整數超過 32 位的範圍 $[ -2^{31}, 2^{31} - 1 ]$ ，就返回 0。

## 解題思路
通過取模運算 `% 10` 得到末尾數字，再通過 `/ 10` 去掉末尾。

- **時間複雜度**: $O(\log_{10}(x))$
- **空間複雜度**: $O(1)$

## 程式碼實作

### Python
```python
class Solution:
    def reverse(self, x: int) -> int:
        res = 0
        sign = 1 if x >= 0 else -1
        x = abs(x)
        while x:
            res = res * 10 + x % 10
            x //= 10
        res *= sign
        if res < -2**31 or res > 2**31 - 1:
            return 0
        return res
```

### C++
```cpp
#include <climits>

class Solution {
public:
    int reverse(int x) {
        long res = 0;
        while (x != 0) {
            res = res * 10 + x % 10;
            x /= 10;
        }
        if (res < INT_MIN || res > INT_MAX) return 0;
        return (int)res;
    }
};
```
