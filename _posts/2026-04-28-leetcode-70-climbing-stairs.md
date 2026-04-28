---
title: "LeetCode #70: Climbing Stairs"
categories:
  - Dynamic Programming
tags:
  - Easy
  - Python
  - C++
---

## 解題思路：動態規劃
這本質上是斐波那契數列問題。
$$dp[n] = dp[n-1] + dp[n-2]$$

### Python
```python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2: return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b
```

### C++
```cpp
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int tmp = b;
            b = a + b;
            a = tmp;
        }
        return b;
    }
};
```
