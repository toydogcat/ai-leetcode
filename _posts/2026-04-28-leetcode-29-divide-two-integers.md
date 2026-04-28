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

## 題目描述
給定兩個整數，被除數 `dividend` 和除數 `divisor`。將兩數相除，要求不使用乘法、除法和取餘運算符。返回被除數除以除數得到的商。

## 解題心得：倍增的藝術
不能用除法，最笨的方法是一個一個減，但如果被除數是 $2^{31}$ 而除數是 $1$，會減到地老天荒。

**核心邏輯：倍增 (指數增長)**
我們可以用「左移 `<<`」來模擬乘 2。
1. **試探法**：我們先看除數的 1 倍、2 倍、4 倍、8 倍... 直到快要超過被除數為止。
2. **減掉最大倍數**：比如被除數是 100，除數是 3。我們發現 $3 \times 2^5 = 96$ 是最接近 100 的。我們就把 100 減掉 96，商加上 $2^5 = 32$。
3. **剩下的繼續**：剩下的 4 再繼續重複上面的過程。

這就像是你在付錢，你不會一塊錢一塊錢數，你會先掏出面額最大的鈔票，不夠付了再掏小一點的。

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
