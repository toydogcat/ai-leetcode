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

## 解題思路
動態規劃。`dp[i][j]` 表示 $s$ 的前 $i$ 個字符與 $p$ 的前 $j$ 個字符是否匹配。

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
