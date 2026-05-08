---
title: "LeetCode #371: Sum of Two Integers (兩整數之和)"
categories:
  - Math
  - Bit Manipulation
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
不使用運算子 `+` 和 `-`，計算兩個整數 `a` 和 `b` 的和。

## 解題心得
使用 **位元運算**：
- `a ^ b` 可以得到無進位的相加結果。
- `(a & b) << 1` 可以得到相加時的進位值。
- 我們不斷重複上述過程：`a, b = a ^ b, (a & b) << 1`，直到進位 `b` 變為 0。
- 在 Python 中，由於整數是無限精度的，我們需要與 `0xFFFFFFFF` 進行 `&` 運算來模擬 32 位有號整數的溢位。

- **時間複雜度**: O(1) 最多執行 32 次迴圈
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def getSum(self, a: int, b: int) -> int:
        mask = 0xFFFFFFFF
        while b != 0:
            a, b = (a ^ b) & mask, ((a & b) << 1) & mask
            
        # 若大於 32 位最大有號整數，代表為負數
        return a if a <= 0x7FFFFFFF else ~(a ^ mask)
```

### C++
```cpp
class Solution {
public:
    int getSum(int a, int b) {
        while (b != 0) {
            unsigned int carry = (unsigned int)(a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
};
```
