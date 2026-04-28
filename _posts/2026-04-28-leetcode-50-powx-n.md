---
title: "LeetCode #50: Pow(x, n)"
categories:
  - Math
  - Recursion
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
實現 `pow(x, n)` ，即計算 `x` 的整數 `n`次冪函數（即 $x^n$）。

## 解題心得：快速冪 (Binary Exponentiation)
如果你用 $O(n)$ 一個一個乘，當 $n$ 很大時（例如 $2^{31}-1$）會超時。

**核心邏輯：**
我們要算 $2^{10}$，可以這樣想：
1. $2^{10} = (2^5)^2$
2. $2^5 = 2 \times (2^2)^2$
3. $2^2 = (2^1)^2$
這樣我們只需要算 **$\log n$** 次乘法就行了！

**白話規律：**
- 如果 $n$ 是偶數，我們就把底數平方，指數減半。
- 如果 $n$ 是奇數，我們就先拿出來一個底數，然後把剩下的變成偶數繼續處理。
- **處理負數**：如果 $n < 0$，就把 $x$ 變成 $1/x$，然後把 $n$ 變成正數。

### Python
```python
class Solution:
    def myPow(self, x: float, n: int) -> float:
        if n == 0: return 1
        if n < 0:
            x = 1 / x
            n = -n
        
        def helper(x, n):
            if n == 0: return 1
            half = helper(x, n // 2)
            if n % 2 == 0: return half * half
            else: return half * half * x
            
        return helper(x, n)
```

### C++
```cpp
class Solution {
public:
    double myPow(double x, int n) {
        long long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        return fastPow(x, N);
    }
    double fastPow(double x, long long n) {
        if (n == 0) return 1.0;
        double half = fastPow(x, n / 2);
        if (n % 2 == 0) return half * half;
        else return half * half * x;
    }
};
```
