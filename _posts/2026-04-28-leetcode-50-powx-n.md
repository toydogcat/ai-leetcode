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

## 解題思路：快速冪 (Binary Exponentiation)
利用 $x^n = (x^{n/2})^2$ 的特性，將時間複雜度降至 $O(\log n)$。

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
