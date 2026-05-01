---
title: "LeetCode #264: Ugly Number II (醜數 II)"
categories:
  - Math
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個整數 `n`，請你找出並返回第 `n` 個 **醜數**。

**醜數** 是指只包含質因數 `2`、`3` 和 `5` 的正整數。

**範例 1:**
```
輸入: n = 10
輸出: 12
解釋: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] 是前 10 個醜數序列。
```

**範例 2:**
```
輸入: n = 1
輸出: 1
解釋: 1 通常被視為第一個醜數。
```

## 解題心得：三指針與動態規劃 (Three Pointers & DP)
要有效找出第 $n$ 個醜數，如果採用窮舉法判斷每個數是否為醜數，效率太低。
一個更有效的方法是：**新醜數必定是某個較小的醜數乘上 2、3 或 5 得到**。

我們可以利用動態規劃（DP）與三指針來解決：
1. **維護醜數序列**：建立一個大小為 `n` 的數組 `dp`，其中 `dp[0] = 1`。
2. **三指針指向舊醜數**：
   - 指針 `p2` 表示接下來要乘以 2 的醜數位置。
   - 指針 `p3` 表示接下來要乘以 3 的醜數位置。
   - 指針 `p5` 表示接下來要乘以 5 的醜數位置。
3. **選擇最小者**：下一個醜數即為 $\min(dp[p2] \times 2, dp[p3] \times 3, dp[p5] \times 5)$。
4. **移動對應指針**：更新指針位置以避免重複。例如新生成的醜數為 6，那麼 `dp[p2] * 2 == 6` 和 `dp[p3] * 3 == 6` 都會成立，這時 `p2` 和 `p3` 都需要往前移動一步。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
class Solution:
    def nthUglyNumber(self, n: int) -> int:
        dp = [0] * n
        dp[0] = 1
        p2 = p3 = p5 = 0
        
        for i in range(1, n):
            # 分別計算乘上 2, 3, 5 的候選值
            next2 = dp[p2] * 2
            next3 = dp[p3] * 3
            next5 = dp[p5] * 5
            
            # 取其中最小者作為下一個醜數
            next_ugly = min(next2, next3, next5)
            dp[i] = next_ugly
            
            # 更新對應指針，去重
            if next_ugly == next2:
                p2 += 1
            if next_ugly == next3:
                p3 += 1
            if next_ugly == next5:
                p5 += 1
                
        return dp[-1]
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int nthUglyNumber(int n) {
        std::vector<int> dp(n);
        dp[0] = 1;
        int p2 = 0, p3 = 0, p5 = 0;

        for (int i = 1; i < n; ++i) {
            int next2 = dp[p2] * 2;
            int next3 = dp[p3] * 3;
            int next5 = dp[p5] * 5;

            int nextUgly = std::min({next2, next3, next5});
            dp[i] = nextUgly;

            if (nextUgly == next2) p2++;
            if (nextUgly == next3) p3++;
            if (nextUgly == next5) p5++;
        }

        return dp[n - 1];
    }
};
```
