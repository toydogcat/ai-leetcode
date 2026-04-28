---
title: "LeetCode #72: Edit Distance"
categories:
  - Dynamic Programming
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你兩個單詞 `word1` 和 `word2`，請返回將 `word1` 轉換成 `word2` 所使用的最少操作數。你可以對一個單詞進行三種操作：插入一個字符、刪除一個字符、替換一個字符。

## 解題心得：文字的變身術
這是動態規劃（DP）最經典的 Hard 題目之一。

**核心邏輯：**
假設我們正在比較 `word1` 的前 $i$ 個字和 `word2` 的前 $j$ 個字。
1. **如果最後一個字母一樣**：太棒了，不需要任何操作。步數等於「前面的字母變身成對方的步數」，即 $dp[i-1][j-1]$。
2. **如果字母不一樣**：我們有三條路可以選，挑一條最省力的（步數最小的），然後加 1 步：
   - **替換**：把 `word1[i]` 換成 `word2[j]`，步數是 $dp[i-1][j-1] + 1$。
   - **刪除**：把 `word1[i]` 刪掉，步數是 $dp[i-1][j] + 1$。
   - **插入**：在 `word1` 後面插一個字母，步數是 $dp[i][j-1] + 1$。

這就像是在玩拼字遊戲，每一步都有三種改法，我們用一張表把每一種長度下的最優解都記下來。

### Python
```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1): dp[i][0] = i
        for j in range(n + 1): dp[0][j] = j
        
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i-1] == word2[j-1]:
                    dp[i][j] = dp[i-1][j-1]
                else:
                    dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
        return dp[m][n]
```

### C++
```cpp
#include <vector>
#include <string>
#include <algorithm>

class Solution {
public:
    int minDistance(std::string word1, std::string word2) {
        int m = word1.length(), n = word2.length();
        std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1));
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i-1] == word2[j-1]) dp[i][j] = dp[i-1][j-1];
                else dp[i][j] = std::min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]}) + 1;
            }
        }
        return dp[m][n];
    }
};
```
