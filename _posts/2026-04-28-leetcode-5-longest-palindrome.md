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
給你一個字符串 `s`，找到 `s` 中最長的回文子串。如果字符串的反序與原字符串相同，則該字符串是回文字符串。

## 解題心得：向外擴散的同心圓
找最長回文子串，最直覺的方式就是「從中心向兩邊擴散」。

**核心邏輯：中心擴展法**
1. **遍歷每個字**：把每個字符（或兩個字符的中間）當作「圓心」。
2. **向外比對**：只要左右兩邊的字符一樣，我們就繼續往外跨一步。
3. **記錄最長**：一旦發現不一樣了，或者碰到邊界了，就停止擴散，記錄這一段的長度。
4. **考慮奇偶**：
   - 奇數回文：中心是一個字（如 `aba`）。
   - 偶數回文：中心是兩個字的中間（如 `abba`）。

這就像是在池塘裡丟石頭。每一點都可能產生圓形的波紋（回文）。我們在每個位置都丟一顆石頭，看誰產生的波紋最遠、最漂亮。

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
