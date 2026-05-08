---
title: "LeetCode #326: Power of Three (3 的冪)"
categories:
  - Math
  - Recursion
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個整數 `n`，如果是 3 的冪次方，返回 `true`；否則，返回 `false`。

## 解題心得
最直接的做法是重複除以 3。更好的 **數學優雅解法**：
- 由於 3 是一個質數，在 32 位整數（`int`）範圍內，最大的是 $3^{19} = 1162261467$。
- 任何 3 的冪次方，都必定是 $3^{19}$ 的因數。因此，我們只需要驗證 `n > 0` 且 `1162261467 % n == 0` 即可。

- **時間複雜度**: O(1)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        return n > 0 and 1162261467 % n == 0
```

### C++
```cpp
class Solution {
public:
    bool isPowerOfThree(int n) {
        return n > 0 && 1162261467 % n == 0;
    }
};
```
