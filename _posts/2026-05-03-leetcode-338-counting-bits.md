---
title: "LeetCode #338: Counting Bits (位元計數)"
categories:
  - Dynamic Programming
  - Bit Manipulation
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一個整數 `n`，對於滿足 `0 <= i <= n` 的每一個 `i`，計算其二進制表示中 `1` 的個數，並以陣列形式返回。時間複雜度 $O(N)$，空間複雜度 $O(1)$（不計返回陣列）。

## 解題心得
我們可以使用 **動態規劃 (Dynamic Programming)** 結合二進制的特性來達到 $O(N)$。主要有兩種轉移方程：
- 奇偶性判斷：
  - 如果 `i` 是偶數，其二進制中 `1` 的個數與 `i >> 1` 相同（僅向左平移，不影響 1 的數量）。
  - 如果 `i` 是奇數，其 `1` 的個數等於 `i - 1`（或 `i >> 1`）的個數加 1。
  - 整合為轉移方程：`dp[i] = dp[i >> 1] + (i & 1)`。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = dp[i >> 1] + (i & 1)
        return dp
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<int> countBits(int n) {
        std::vector<int> dp(n + 1, 0);
        for (int i = 1; i <= n; ++i) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
};
```
