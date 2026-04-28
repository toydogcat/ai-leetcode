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
給你兩個單詞 `word1` 和 `word2`，請返回將 `word1` 轉換成 `word2` 所使用的最少操作數。

## 解題思路：動態規劃
設 $dp[i][j]$ 為 `word1[0..i]` 轉換到 `word2[0..j]` 的最小操作數。
- 如果 `word1[i] == word2[j]`，則 $dp[i][j] = dp[i-1][j-1]$。
- 否則，取「插入、刪除、替換」三種操作中的最小值加 1。

- **時間複雜度**: $O(mn)$
- **空間複雜度**: $O(mn)$

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
