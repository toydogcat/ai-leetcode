---
title: "LeetCode #214: Shortest Palindrome (最短回文串)"
categories:
  - String
  - KMP
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個字符串 `s`，你可以通過在字符串前面添加字符將其轉換為回文串。找到並返回可以用這種方式轉換的最短回文串。

## 解題心得：KMP 算法的巧妙應用
這題的目標是在 `s` 前面添加最少的字符使其變成回文。這等價於 **找到 `s` 的最長前綴回文串**。

**核心邏輯：**
1. 假設 `s` 的最長前綴回文串長度為 `L`，那麼我們只需要將 `s` 剩餘的部分 `s[L:]` 反轉並補在最前面。
2. 如何快速找到最長前綴回文串？
   - 構造一個新字符串 `temp = s + "#" + s[::-1]`（中間加一個特殊字符避免重疊干擾）。
   - 對 `temp` 運行 **KMP 算法** 計算 `next` 數組（或稱為 `pi` 數組）。
   - `next` 數組最後一個元素的值，就是 `s` 和 `s[::-1]` 的最長公共前後綴長度，也就是 `s` 的最長前綴回文串長度。

- **時間複雜度**: $O(N)$，KMP 算法的時間複雜度。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
class Solution:
    def shortestPalindrome(self, s: str) -> str:
        if not s: return ""
        
        # 構造 KMP 匹配串
        rev_s = s[::-1]
        new_s = s + "#" + rev_s
        
        # 計算 KMP 的 next 數組 (pi array)
        n = len(new_s)
        pi = [0] * n
        for i in range(1, n):
            j = pi[i - 1]
            while j > 0 and new_s[i] != new_s[j]:
                j = pi[j - 1]
            if new_s[i] == new_s[j]:
                j += 1
            pi[i] = j
            
        # pi[-1] 即為最長前綴回文長度
        max_len = pi[-1]
        return rev_s[:len(s) - max_len] + s
```

### C++
```cpp
#include <string>
#include <vector>
#include <algorithm>

class Solution {
public:
    std::string shortestPalindrome(std::string s) {
        std::string rev_s = s;
        std::reverse(rev_s.begin(), rev_s.end());
        std::string new_s = s + "#" + rev_s;
        
        int n = new_s.length();
        std::vector<int> pi(n, 0);
        for (int i = 1; i < n; i++) {
            int j = pi[i - 1];
            while (j > 0 && new_s[i] != new_s[j]) {
                j = pi[j - 1];
            }
            if (new_s[i] == new_s[j]) {
                j++;
            }
            pi[i] = j;
        }
        
        return rev_s.substr(0, s.length() - pi[n - 1]) + s;
    }
};
```
