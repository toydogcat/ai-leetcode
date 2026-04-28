---
title: "LeetCode #132: Palindrome Partitioning II"
categories:
  - Dynamic Programming
  - String
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個字符串 `s`，請你將 `s` 分割成一些子串，使每個子串都是迴文。返回符合要求的最少分割次數。

## 解題心得：最少的刀數
這題是 #131 的進階版，要求的是「最少次數」，所以我們改用 **動態規劃 (DP)**。
設 `dp[i]` 為 `s[0...i]` 區間內最少的分割次數。

**狀態轉移：**
對於每個 `j <= i`：
如果 `s[j...i]` 是迴文，那麼 `dp[i] = min(dp[i], dp[j-1] + 1)`。

為了進一步優化，我們可以預處理出所有子串是否為迴文的矩陣。

### Python
```python
class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        # 預處理迴文矩陣
        is_pal = [[False] * n for _ in range(n)]
        for i in range(n-1, -1, -1):
            for j in range(i, n):
                if s[i] == s[j] and (j - i <= 2 or is_pal[i+1][j-1]):
                    is_pal[i][j] = True
                    
        dp = [i for i in range(n)] # 初始化：最壞情況每位都要切一刀
        for i in range(n):
            if is_pal[0][i]:
                dp[i] = 0
                continue
            for j in range(i):
                if is_pal[j+1][i]:
                    dp[i] = min(dp[i], dp[j] + 1)
                    
        return dp[n-1]
```

### C++
```cpp
class Solution {
public:
    int minCut(string s) {
        int n = s.length();
        vector<vector<bool>> is_pal(n, vector<bool>(n, false));
        for (int i = n - 1; i >= 0; --i) {
            for (int j = i; j < n; ++j) {
                if (s[i] == s[j] && (j - i <= 2 || is_pal[i + 1][j - 1])) {
                    is_pal[i][j] = true;
                }
            }
        }
        
        vector<int> dp(n);
        for (int i = 0; i < n; ++i) {
            if (is_pal[0][i]) {
                dp[i] = 0;
            } else {
                dp[i] = i;
                for (int j = 0; j < i; ++j) {
                    if (is_pal[j + 1][i]) {
                        dp[i] = min(dp[i], dp[j] + 1);
                    }
                }
            }
        }
        return dp[n - 1];
    }
};
```
