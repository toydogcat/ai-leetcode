---
title: "LeetCode #190: Reverse Bits (顛倒二進制位)"
categories:
  - Bit Manipulation
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
顛倒給定的 32 位無符號整數的二進制位。

提示：在某些語言（如 Java）中，沒有無符號整數類型。在這種情況下，輸入和輸出都將被表示為有符號整數類型，並且不應影響您的實現，因為整數的內部二進制表示形式是相同的。

## 解題心得：位運算的藝術
這題考察對二進制位操作的熟練度。

**核心邏輯**：
1. 我們從輸入 `n` 的最低位開始取值。
2. 將取出的位放進結果 `res` 的對應高位。
3. 具體步驟：
   - 遍歷 32 次。
   - 將 `res` 左移一位：`res <<= 1`。
   - 取出 `n` 的最後一位並加到 `res`：`res |= (n & 1)`。
   - 將 `n` 右移一位：`n >>= 1`。

- **時間複雜度**: $O(1)$，固定遍歷 32 次。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def reverseBits(self, n: int) -> int:
        res = 0
        for _ in range(32):
            res = (res << 1) | (n & 1)
            n >>= 1
        return res
```

### C++
```cpp
#include <stdint.h>

class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t res = 0;
        for (int i = 0; i < 32; i++) {
            res = (res << 1) | (n & 1);
            n >>= 1;
        }
        return res;
    }
};
```
