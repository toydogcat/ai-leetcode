---
title: "LeetCode #97: Interleaving String"
categories:
  - Dynamic Programming
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定三個字符串 `s1`, `s2`, `s3`，請你幫忙驗證 `s3` 是否是由 `s1` 和 `s2` 交錯組成的。

## 解題心得：編織布料
想像 `s1` 是經線，`s2` 是緯線，我們要看看能不能編出 `s3` 這塊布。

**動態規劃思路：**
設 `dp[i][j]` 表示 `s1` 的前 `i` 個字元與 `s2` 的前 `j` 個字元，能否拼出 `s3` 的前 `i+j` 個字元。

1. **從 s1 拿**：如果 `s3[i+j-1]` 等於 `s1[i-1]`，且 `dp[i-1][j]` 為真，則 `dp[i][j]` 為真。
2. **從 s2 拿**：如果 `s3[i+j-1]` 等於 `s2[j-1]`，且 `dp[i][j-1]` 為真，則 `dp[i][j]` 為真。

這就像是在地圖上走格子，只能往右或往下走。

### Python
```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        n1, n2, n3 = len(s1), len(s2), len(s3)
        if n1 + n2 != n3: return False
        
        dp = [[False] * (n2 + 1) for _ in range(n1 + 1)]
        dp[0][0] = True
        
        # 初始化邊界
        for i in range(1, n1 + 1):
            dp[i][0] = dp[i-1][0] and s1[i-1] == s3[i-1]
        for j in range(1, n2 + 1):
            dp[0][j] = dp[0][j-1] and s2[j-1] == s3[j-1]
            
        for i in range(1, n1 + 1):
            for j in range(1, n2 + 1):
                dp[i][j] = (dp[i-1][j] and s1[i-1] == s3[i+j-1]) or \
                           (dp[i][j-1] and s2[j-1] == s3[i+j-1])
                           
        return dp[n1][n2]
```
