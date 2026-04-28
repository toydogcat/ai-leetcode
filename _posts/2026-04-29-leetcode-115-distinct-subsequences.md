---
title: "LeetCode #115: Distinct Subsequences"
categories:
  - Dynamic Programming
tags:
  - Hard
  - String
  - Python
  - C++
---

## 題目描述
給定一個字符串 `s` 和一個字符串 `t` ，計算在 `s` 的子序列中 `t` 出現的次數。

## 解題心得：配對的可能
這是一道經典的 **動態規劃 (DP)** 題目。
設 `dp[i][j]` 為 `s[0...i-1]` 的子序列中出現 `t[0...j-1]` 的次數。

**狀態轉移：**
1. 如果 `s[i-1] == t[j-1]`：
   - 我們可以選擇「使用」`s[i-1]` 來匹配 `t[j-1]`，次數為 `dp[i-1][j-1]`。
   - 我們也可以選擇「不使用」`s[i-1]`，次數為 `dp[i-1][j]`（看前面的部分能不能湊出 `t`）。
   - `dp[i][j] = dp[i-1][j-1] + dp[i-1][j]`。
2. 如果 `s[i-1] != t[j-1]`：
   - 只能選擇「不使用」`s[i-1]`。
   - `dp[i][j] = dp[i-1][j]`。

### Python
```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        dp = [[0] * (m + 1) for _ in range(n + 1)]
        
        # t 為空時，s 只有一個子序列（空字串）符合
        for i in range(n + 1):
            dp[i][0] = 1
            
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if s[i-1] == t[j-1]:
                    dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
                else:
                    dp[i][j] = dp[i-1][j]
                    
        return dp[n][m]
```

### C++
```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        int n = s.length(), m = t.length();
        // 使用 unsigned long long 防止溢位
        vector<vector<unsigned long long>> dp(n + 1, vector<unsigned long long>(m + 1, 0));
        
        for (int i = 0; i <= n; ++i) dp[i][0] = 1;
        
        for (int i = 1; i <= n; ++i) {
            for (int j = 1; j <= m; ++j) {
                if (s[i-1] == t[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + dp[i-1][j];
                } else {
                    dp[i][j] = dp[i-1][j];
                }
            }
        }
        return dp[n][m];
    }
};
```
