---
title: "LeetCode #44: Wildcard Matching"
categories:
  - String
  - Dynamic Programming
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個字符串 `s` 和一個字符模式 `p` ，實現一個支持 `?` 和 `*` 的通配符匹配。
- `?` 可以匹配任何單個字符。
- `*` 可以匹配任意字符串（包括空字符串）。

## 解題心得：強大的星號
這題是 10 題（正則表達式）的簡化版，但星號 `*` 的威力依然不容小覷。

**核心邏輯：動態規劃 (DP)**
我們定義 `dp[i][j]` 為 `s` 的前 `i` 個字符與 `p` 的前 `j` 個字符是否匹配。
1. **遇到普通字符或 `?`**：只要當前字符一樣，或模式是 `?`，那結果取決於「前一個狀態」：`dp[i][j] = dp[i-1][j-1]`。
2. **遇到星號 `*`**：星號有兩種選擇：
   - **當空氣**：不匹配任何字符，`dp[i][j] = dp[i][j-1]`。
   - **當吸塵器**：匹配一個或多個字符，只要「上一個 `s` 的狀態」是匹配的，現在也匹配：`dp[i][j] = dp[i-1][j]`。

這就像是在對暗號，普通字符要對得上，`?` 是萬能鑰匙（限一個），而 `*` 是任意長度的膠帶，可以黏住任何東西。

### Python
```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True
        for j in range(1, n + 1):
            if p[j-1] == '*': dp[0][j] = dp[0][j-1]
        
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if p[j-1] == '?' or s[i-1] == p[j-1]:
                    dp[i][j] = dp[i-1][j-1]
                elif p[j-1] == '*':
                    dp[i][j] = dp[i][j-1] or dp[i-1][j]
        return dp[m][n]
```

### C++
```cpp
#include <vector>
#include <string>

class Solution {
public:
    bool isMatch(std::string s, std::string p) {
        int m = s.length(), n = p.length();
        std::vector<std::vector<bool>> dp(m + 1, std::vector<bool>(n + 1, false));
        dp[0][0] = true;
        for (int j = 1; j <= n; j++) {
            if (p[j-1] == '*') dp[0][j] = dp[0][j-1];
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j-1] == '?' || s[i-1] == p[j-1]) {
                    dp[i][j] = dp[i-1][j-1];
                } else if (p[j-1] == '*') {
                    dp[i][j] = dp[i][j-1] || dp[i-1][j];
                }
            }
        }
        return dp[m][n];
    }
};
```
