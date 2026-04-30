---
title: "LeetCode #233: Number of Digit One (數字 1 的個數)"
categories:
  - Math
  - Dynamic Programming
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個整數 `n`，計算所有小於等於 `n` 的非負整數中數字 `1` 出現的總次數。

## 解題心得：逐位計數法
這是一題經典的數論/組合問題。與其一個個數，不如計算「1 在每一位（個位、十位、百位...）出現了多少次」。

**核心邏輯：**
假設 `n = 12345`，我們要計算「百位」上出現 1 的次數：
- 當前位 `cur = 3`，低位 `low = 45`，高位 `high = 12`，當前位數權重 `digit = 100`。
- **如果 `cur == 0`**：出現次數由高位決定，`high * digit`。
- **如果 `cur == 1`**：出現次數由高位和低位共同決定，`high * digit + low + 1`。
- **如果 `cur > 1`**：出現次數由高位決定，`(high + 1) * digit`。

遍歷每一位並累加即可。

- **時間複雜度**: $O(\log_{10} N)$，即 $N$ 的位數。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def countDigitOne(self, n: int) -> int:
        res = 0
        digit = 1
        high, cur, low = n // 10, n % 10, 0
        
        while high != 0 or cur != 0:
            if cur == 0:
                res += high * digit
            elif cur == 1:
                res += high * digit + low + 1
            else:
                res += (high + 1) * digit
            
            # 準備下一位
            low += cur * digit
            cur = high % 10
            high //= 10
            digit *= 10
            
        return res
```

### C++
```cpp
class Solution {
public:
    int countDigitOne(int n) {
        long long res = 0;
        long long digit = 1;
        int high = n / 10, cur = n % 10, low = 0;
        
        while (high != 0 || cur != 0) {
            if (cur == 0) res += (long long)high * digit;
            else if (cur == 1) res += (long long)high * digit + low + 1;
            else res += (long long)(high + 1) * digit;
            
            low += cur * digit;
            cur = high % 10;
            high /= 10;
            digit *= 10;
        }
        return (int)res;
    }
};
```
