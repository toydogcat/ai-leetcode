---
title: "LeetCode #8: String to Integer (atoi)"
categories:
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
請你來實現一個 `myAtoi(string s)` 函數，使其能將字符串轉換成一個 32 位有符號整數。

## 解題思路
1. 忽略前導空格。
2. 檢查正負號。
3. 讀取數字直到遇到非數字字符。
4. 處理溢出。

- **時間複雜度**: $O(n)$
- **空間複雜度**: $O(1)$

## 程式碼實作

### Python
```python
class Solution:
    def myAtoi(self, s: str) -> int:
        s = s.lstrip()
        if not s: return 0
        sign = 1
        if s[0] == '-':
            sign = -1
            s = s[1:]
        elif s[0] == '+':
            s = s[1:]
        
        res = 0
        for char in s:
            if char.isdigit():
                res = res * 10 + int(char)
            else:
                break
        
        res *= sign
        return max(-2**31, min(res, 2**31 - 1))
```

### C++
```cpp
#include <string>
#include <climits>

class Solution {
public:
    int myAtoi(std::string s) {
        int i = 0, sign = 1;
        long res = 0;
        while (i < s.length() && s[i] == ' ') i++;
        if (i < s.length() && (s[i] == '+' || s[i] == '-')) {
            sign = (s[i] == '-') ? -1 : 1;
            i++;
        }
        while (i < s.length() && isdigit(s[i])) {
            res = res * 10 + (s[i] - '0');
            if (res * sign > INT_MAX) return INT_MAX;
            if (res * sign < INT_MIN) return INT_MIN;
            i++;
        }
        return (int)(res * sign);
    }
};
```
