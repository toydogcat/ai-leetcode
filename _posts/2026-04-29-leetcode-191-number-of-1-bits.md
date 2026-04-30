---
title: "LeetCode #191: Number of 1 Bits (位元 1 的個數)"
categories:
  - Bit Manipulation
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
編寫一個函數，輸入是一個無符號整數（以二進制串的形式），返回其二進制表達式中數字位為 '1' 的個數（也被稱為漢明重量）。

## 解題心得：優雅的位運算
除了逐位檢查外，有一個非常有名的位運算技巧可以快速計算 1 的個數。

**核心邏輯：n & (n - 1)**
1. 對於任何一個非零整數 $n$，`n & (n - 1)` 會將 $n$ 的二進制表示中最右邊的那個 `1` 變為 `0`。
2. 我們只需要不斷執行這個操作，直到 $n$ 變為 $0$。
3. 執行次數即為 `1` 的個數。

這個方法比遍歷 32 位更快，因為它的時間複雜度只與 `1` 的個數有關。

- **時間複雜度**: $O(k)$，其中 $k$ 是 `1` 的個數。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        count = 0
        while n:
            # 關鍵技巧：消除最右邊的 1
            n &= (n - 1)
            count += 1
        return count
```

### C++
```cpp
#include <stdint.h>

class Solution {
public:
    int hammingWeight(uint32_t n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
};
```
