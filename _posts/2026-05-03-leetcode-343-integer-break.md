---
title: "LeetCode #343: Integer Break (整數拆分)"
categories:
  - Math
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個正整數 `n`，將其拆分為至少兩個正整數的和，並使這些整數的乘積最大。返回最大乘積。

## 解題心得
我們可以使用 **數學原理 (Math)** 或者 **動態規劃 (DP)**：
- **數學優雅解法**：依據均值不等式，當我們把正整數拆分為儘可能多的 **3** 時，其乘積最大。如果不夠，則拆分為 **2**：
  - 如果 `n <= 3`，由於必須至少拆分為兩個數，返回 `n - 1`。
  - 如果 `n % 3 == 0`，最大乘積為 $3^{n/3}$。
  - 如果 `n % 3 == 1`，我們應保留兩個 2（即一個 4），最大乘積為 $3^{(n/3)-1} \times 4$。
  - 如果 `n % 3 == 2`，最大乘積為 $3^{n/3} \times 2$。

- **時間複雜度**: O(log N) 主要是求冪運算，若使用迴圈遞迴則為 O(N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def integerBreak(self, n: int) -> int:
        if n <= 3:
            return n - 1
        q, r = divmod(n, 3)
        if r == 0:
            return 3 ** q
        elif r == 1:
            return (3 ** (q - 1)) * 4
        else:
            return (3 ** q) * 2
```

### C++
```cpp
#include <cmath>

class Solution {
public:
    int integerBreak(int n) {
        if (n <= 3) return n - 1;
        int q = n / 3;
        int r = n % 3;

        if (r == 0) return std::pow(3, q);
        else if (r == 1) return std::pow(3, q - 1) * 4;
        else return std::pow(3, q) * 2;
    }
};
```
