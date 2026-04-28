---
title: "LeetCode #96: Unique Binary Search Trees"
categories:
  - Dynamic Programming
  - Math
tags:
  - Medium
  - Python
  - C++
---

## 解題心得：卡塔蘭數 (Catalan Number)
這題不需要生成樹，只需要求個數。

**邏輯推導：**
假設 $G(n)$ 是長度為 $n$ 的序列能構成的 BST 個數。
如果我們選 $i$ 作為根節點，那麼左邊有 $i-1$ 個節點，右邊有 $n-i$ 個節點。
能構成的數量就是 $G(i-1) \times G(n-i)$。
我們把所有可能的 $i$ ($1$ 到 $n$) 的情況加起來，就是 $G(n)$。

這就是數學中著名的 **卡塔蘭數** 應用。

### Python
```python
class Solution:
    def numTrees(self, n: int) -> int:
        dp = [0] * (n + 1)
        dp[0] = 1 # 空樹也是一種情況
        dp[1] = 1
        for i in range(2, n + 1):
            for j in range(1, i + 1):
                # 以 j 為根，左邊有 j-1 個，右邊有 i-j 個
                dp[i] += dp[j-1] * dp[i-j]
        return dp[n]
```
