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
請你來實現一個 `myAtoi(string s)` 函數，使其能將字符串轉換成一個 32 位有符號整數。算法細節包括：忽略前導空格、判斷正負號、讀取數字直到遇到非數字字符、數值範圍裁剪。

## 解題心得：嚴格的翻譯官
這題並不難，難在你要考慮到所有的「邊緣情況」，就像是一個嚴格的翻譯官，不能容許任何格式錯誤。

**核心邏輯：**
1. **去空格**：先去掉開頭那些沒用的空白。
2. **看符號**：看看第一個字符是 `+` 還是 `-`。
3. **搬運數字**：一個字一個字往下讀，如果是數字就拼起來。
4. **溢出檢查 (最重要)**：因為題目限制 32 位整數，如果數字太大，要強制停在 $2^{31}-1$ 或 $-2^{31}$。

這就像是在看一張手寫的支票。你要先忽視旁邊的雜物，找到金額前面的正負號，然後一筆一筆把數字抄下來，最後確保這筆錢沒有超出銀行帳戶的上限。

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
