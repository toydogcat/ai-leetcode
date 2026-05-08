---
title: "LeetCode #342: Power of Four (4 的冪)"
categories:
  - Math
  - Bit Manipulation
  - Recursion
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個整數 `n`，如果是 4 的冪次方，返回 `true`；否則，返回 `false`。

## 解題心得
一個整數若是 4 的冪次方，必須滿足以下三個條件：
1. `n > 0`。
2. 是 2 的冪次方，即 `(n & (n - 1)) == 0`（其二進制中僅有一個 1）。
3. 唯一的一個 `1` 必須位於**偶數二進制位**（即第 0, 2, 4... 位）。我們可以與 `0x55555555`（二進制為 `010101...01`）進行 `&` 運算來做確認。若 `(n & 0x55555555) != 0` 則符合條件。

- **時間複雜度**: O(1)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0 and (n & 0x55555555) != 0
```

### C++
```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) != 0;
    }
};
```
