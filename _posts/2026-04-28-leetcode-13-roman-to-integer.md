---
title: "LeetCode #13: Roman to Integer"
categories:
  - Math
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
羅馬數字包含以下七種字符: `I`, `V`, `X`, `L`, `C`, `D` 和 `M`。通常情況下，羅馬數字中小的數字在大的數字的右邊。但也有特殊情況，例如 `IV` 表示 4。給定一個羅馬數字，將其轉換成整數。

## 解題心得：左小右大就相減
這題的關鍵在於處理「特殊情況」（比如 `IV` = 4, `IX` = 9）。

**核心邏輯：**
1. **建立映射表**：把 `I: 1`, `V: 5`, `X: 10`... 等基礎對應存好。
2. **比較相鄰兩位**：
   - 如果「當前的數」比「後面的數」**小**，說明遇到了特殊情況（如 `IV`）。這時候我們要 **減掉** 當前的數。
   - 否則，我們就 **加上** 當前的數。

這就像是在算帳。如果你看到一個小硬幣在一個大面額紙鈔前面（這在現實生活中很奇怪，但在羅馬數字裡很常見），你就把它想成是「找零」，所以要扣掉。

### Python
```python
class Solution:
    def romanToInt(self, s: str) -> int:
        d = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
        res = 0
        for i in range(len(s)):
            if i + 1 < len(s) and d[s[i]] < d[s[i+1]]:
                res -= d[s[i]]
            else:
                res += d[s[i]]
        return res
```

### C++
```cpp
#include <string>
#include <unordered_map>

class Solution {
public:
    int romanToInt(std::string s) {
        std::unordered_map<char, int> d = {
            {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50}, 
            {'C', 100}, {'D', 500}, {'M', 1000}
        };
        int res = 0;
        for (int i = 0; i < s.length(); i++) {
            if (i + 1 < s.length() && d[s[i]] < d[s[i+1]]) {
                res -= d[s[i]];
            } else {
                res += d[s[i]];
            }
        }
        return res;
    }
};
```
