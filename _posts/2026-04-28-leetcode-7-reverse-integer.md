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
給你一個 32 位的有符號整數 `x` ，返回將 `x` 中的數字部分反轉後的結果。如果反轉後整數超過 32 位整數的範圍，就返回 0。

## 解題心得：倒著裝罐
這題跟 9 題很像，核心都是「如何把數字拆掉再反著裝回去」。

**核心邏輯：**
1. **取出尾巴**：`pop = x % 10`。
2. **塞進頭部**：`res = res * 10 + pop`。
3. **判斷溢出**：在拼數字之前，要先看現在的 `res` 乘 10 之後會不會爆掉。

這就像是你在把一串珍珠（數字）從左邊的罐子移到右邊。你每次從左邊罐子的「最底下」拿出一顆，丟進右邊罐子的「最頂端」。如果你發現右邊罐子裝不下了，就要立刻停止，否則會溢出來。

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
