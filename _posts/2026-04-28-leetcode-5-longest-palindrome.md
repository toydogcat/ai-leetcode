---
title: "LeetCode #5: Longest Palindromic Substring"
categories:
  - String
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個字串 `s`，找到 `s` 中最長的迴文子串。

## 解題思路：中心擴展法 (Expand Around Center)
迴文中心可以是一個字元（如 `aba` 中的 `b`）或是兩個字元中間（如 `abba`）。我們遍歷所有可能的中心，並向兩側擴展。

- **時間複雜度**: $O(n^2)$
- **空間複雜度**: $O(1)$

## 數學模型
對於字串 $S$，子串 $S[i..j]$ 是迴文的充分必要條件是：
$$S[i] = S[j] \quad \text{and} \quad S[i+1..j-1] \text{ 是迴文}$$

## 程式碼實作

### Python
```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        res = ""
        for i in range(len(s)):
            # 奇數長度
            s1 = self.expand(s, i, i)
            # 偶數長度
            s2 = self.expand(s, i, i + 1)
            res = max(res, s1, s2, key=len)
        return res
    
    def expand(self, s, l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l+1:r]
```

### C++
```cpp
#include <string>
#include <algorithm>

class Solution {
public:
    std::string longestPalindrome(std::string s) {
        if (s.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = std::max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substr(start, end - start + 1);
    }

private:
    int expandAroundCenter(std::string s, int left, int right) {
        while (left >= 0 && right < s.length() && s[left] == s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
};
```
