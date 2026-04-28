---
title: "LeetCode #67: Add Binary"
categories:
  - Math
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你兩個二進制字符串 `a` 和 `b` ，以二進制字符串的形式返回它們的和。

## 解題心得：小學加法
無論是十進制還是二進制，加法的本質是一樣的：**逢 N 進一**。

**核心邏輯：**
1. **從尾巴開始**：像我們列豎式加法一樣，從最後一位開始加。
2. **處理進位**：當前位的數字就是 `(sum % 2)`，進位就是 `(sum / 2)`。
3. **最後一步**：如果加完了所有位數，進位還是 1，別忘了在最前面補上一個 1。

### Python
```python
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        return bin(int(a, 2) + int(b, 2))[2:]
```

### C++
```cpp
#include <string>
#include <algorithm>

class Solution {
public:
    std::string addBinary(std::string a, std::string b) {
        std::string res = "";
        int i = a.size() - 1, j = b.size() - 1, carry = 0;
        while (i >= 0 || j >= 0 || carry) {
            int sum = carry + (i >= 0 ? a[i--] - '0' : 0) + (j >= 0 ? b[j--] - '0' : 0);
            res += std::to_string(sum % 2);
            carry = sum / 2;
        }
        std::reverse(res.begin(), res.end());
        return res;
    }
};
```
