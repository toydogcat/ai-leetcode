---
title: "LeetCode #29: Divide Two Integers"
categories:
  - Math
  - Bit Manipulation
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
不能使用乘除法。我們可以使用位移運算來模擬除法，每次翻倍減數。

- **時間複雜度**: $O(\log^2 n)$。

### Python
```python
class Solution:
    def divide(self, dividend: int, divisor: int) -> int:
        if dividend == -2147483648 and divisor == -1:
            return 2147483647
        
        sign = 1 if (dividend > 0) == (divisor > 0) else -1
        a, b = abs(dividend), abs(divisor)
        res = 0
        while a >= b:
            tmp, i = b, 1
            while a >= (tmp << 1):
                tmp <<= 1
                i <<= 1
            a -= tmp
            res += i
        return sign * res
```

### C++
```cpp
#include <climits>
#include <cmath>

class Solution {
public:
    int divide(int dividend, int divisor) {
        if (dividend == INT_MIN && divisor == -1) return INT_MAX;
        long a = std::abs((long)dividend), b = std::abs((long)divisor);
        int sign = (dividend > 0) == (divisor > 0) ? 1 : -1;
        long res = 0;
        while (a >= b) {
            long tmp = b, i = 1;
            while (a >= (tmp << 1)) {
                tmp <<= 1;
                i <<= 1;
            }
            a -= tmp;
            res += i;
        }
        return (int)(sign * res);
    }
};
```
