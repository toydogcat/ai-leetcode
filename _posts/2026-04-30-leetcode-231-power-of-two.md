---
title: "LeetCode #231: Power of Two (2 的冪)"
categories:
  - Bit Manipulation
  - Math
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一個整數 `n`，請你判斷該整數是否是 2 的冪次方。如果是，返回 `true` ；否則，返回 `false` 。
如果存在一個整數 `x` 使得 $n = 2^x$，則認為 `n` 是 2 的冪次方。

## 解題心得：位運算的精妙
2 的冪次方在二進制表示中有一個非常鮮明的特徵：**只有一個位是 1**。

**核心邏輯：**
1. **$n \& (n - 1)$ 技巧**：
   - 如果 $n$ 是 2 的冪，例如 $8 (1000_2)$，那麼 $n - 1$ 是 $7 (0111_2)$。
   - $n \& (n - 1)$ 的結果一定是 0。
   - 注意：前提是 $n > 0$。
2. **$n \& -n$ 技巧**：
   - 2 的冪滿足 $n \& -n == n$。

- **時間複雜度**: $O(1)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0
```

### C++
```cpp
class Solution {
public:
    bool isPowerOfTwo(int n) {
        return n > 0 && (n & (long long)n - 1) == 0;
    }
};
```
