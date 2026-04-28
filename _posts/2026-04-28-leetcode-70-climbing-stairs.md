---
title: "LeetCode #70: Climbing Stairs"
categories:
  - Dynamic Programming
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
假設你正在爬樓梯。需要 `n` 階你才能到達樓頂。每次你可以爬 `1` 或 `2` 個台階。你有多少種不同的方法可以爬到樓頂呢？

## 解題心得：倒著想更簡單
這是動態規劃最經典的入門題。

**核心邏輯：**
你要想，當你站在最後一階（第 `n` 階）時，你是從哪裡跳上來的？
- 要麼是從 **第 `n-1` 階** 跳了 1 步上來的。
- 要麼是從 **第 `n-2` 階** 跳了 2 步上來的。

所以，到達第 `n` 階的方法數，就是「到達 `n-1` 的方法數」加上「到達 `n-2` 的方法數」。
這不就是 **斐波那契數列** (Fibonacci) 嗎！

我們只需要記住前兩個位置的答案，就能一步步算出最後的結果。

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
