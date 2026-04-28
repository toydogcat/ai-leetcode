---
title: "LeetCode #10: Regular Expression Matching"
categories:
  - String
  - Dynamic Programming
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個字符串 `s` 和一個字符模式 `p`，請你實現一個支持 `.` 和 `*` 的正則表達式匹配。
- `.` 匹配任意單個字符。
- `*` 匹配零個或多個前面的那一個元素。

## 解題心得：萬能與變身
這題是 Hard，難在星號 `*` 可以讓前面的字符「變身」成 0 個、1 個或無數個。

**核心邏輯：動態規劃 (DP)**
定義 `dp[i][j]` 為 `s` 的前 `i` 個字與 `p` 的前 `j` 個字是否匹配。
1. **遇到 `.` 或普通字符**：對得上就行，`dp[i][j] = dp[i-1][j-1]`。
2. **遇到 `*`**：它有兩種大招：
   - **斬首行動 (0 次匹配)**：直接忽略 `*` 和它前面的字符，看看 `p` 往前兩格能不能匹配，`dp[i][j] = dp[i][j-2]`。
   - **無限分身 (1 次或多次匹配)**：如果 `s` 當前字符能對上 `*` 前面的那個字，只要 `s` 往前一個狀態是匹配的，現在也匹配，`dp[i][j] = dp[i-1][j]`。

這就像是在玩變形金剛，`.` 是百變怪，而 `*` 是複製機，可以把前一個隊友複製出一個軍隊，也可以讓那個隊友直接消失。
- **空間複雜度**: $O(mn)$

## 程式碼實作

### Python
```python
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True
        
        for j in range(1, n + 1):
            if p[j-1] == '*':
                dp[0][j] = dp[0][j-2]
        
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if p[j-1] == s[i-1] or p[j-1] == '.':
                    dp[i][j] = dp[i-1][j-1]
                elif p[j-1] == '*':
                    dp[i][j] = dp[i][j-2]
                    if p[j-2] == s[i-1] or p[j-2] == '.':
                        dp[i][j] |= dp[i-1][j]
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
            if (p[j-1] == '*') dp[0][j] = dp[0][j-2];
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j-1] == s[i-1] || p[j-1] == '.') {
                    dp[i][j] = dp[i-1][j-1];
                } else if (p[j-1] == '*') {
                    dp[i][j] = dp[i][j-2];
                    if (p[j-2] == s[i-1] || p[j-2] == '.') {
                        dp[i][j] = dp[i][j] || dp[i-1][j];
                    }
                }
            }
        }
        return dp[m][n];
    }
};
```
