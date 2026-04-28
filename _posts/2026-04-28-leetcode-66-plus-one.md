---
title: "LeetCode #66: Plus One"
categories:
  - Array
  - Math
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個由 **整數** 組成的 **非空** 數組所表示的非負整數，在該數的基礎上加一。最高位數字存放在數組的首位， 數組中每個元素只存儲單個數字。

## 解題心得：處理「9」的情況
這題看起來很簡單，但唯一需要處理的就是進位。

**核心邏輯：**
1. **遇到非 9**：直接加 1 然後返回結果就好。
2. **遇到 9**：把它變成 0，然後繼續往左邊看（進位）。
3. **全都是 9**：如果整個數組都遍歷完了還沒返回，說明原數組是像 `[9, 9, 9]` 這樣。這時我們要在前面補個 1，變成 `[1, 0, 0, 0]`。

### Python
```python
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        for i in range(len(digits)-1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0
        return [1] + digits
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<int> plusOne(std::vector<int>& digits) {
        for (int i = digits.size() - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        digits.insert(digits.begin(), 1);
        return digits;
    }
};
```
