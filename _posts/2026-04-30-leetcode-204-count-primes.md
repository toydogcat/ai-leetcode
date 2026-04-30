---
title: "LeetCode #204: Count Primes (計數質數)"
categories:
  - Array
  - Math
  - Number Theory
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個整數 `n` ，請你統計所有小於非負整數 `n` 的質數的數量。

## 解題心得：埃拉托斯特尼篩法 (Sieve of Eratosthenes)
直接判斷每個數是否為質數的時間複雜度是 $O(n \sqrt{n})$，對於較大的 `n` 會超時。

**核心邏輯：埃氏篩**
1. 創建一個長度為 `n` 的布林數組 `is_prime`，初始全部設為 `True`。
2. 從 2 開始遍歷到 $\sqrt{n}$：
   - 如果當前數字 `i` 是質數，則將其所有的倍數（從 $i^2$ 開始）全部標記為非質數（`False`）。
3. 最後統計 `is_prime` 中 `True` 的數量（從 2 開始）。

- **時間複雜度**: $O(n \log \log n)$。
- **空間複雜度**: $O(n)$。

## 程式碼實作

### Python
```python
class Solution:
    def countPrimes(self, n: int) -> int:
        if n < 3:
            return 0
        
        primes = [True] * n
        primes[0] = primes[1] = False
        
        for i in range(2, int(n**0.5) + 1):
            if primes[i]:
                # 從 i*i 開始標記，因為更小的倍數已經被更小的質數標記過了
                for j in range(i * i, n, i):
                    primes[j] = False
        
        return sum(primes)
```

### C++
```cpp
#include <vector>
#include <numeric>

class Solution {
public:
    int countPrimes(int n) {
        if (n <= 2) return 0;
        
        std::vector<bool> isPrime(n, true);
        isPrime[0] = isPrime[1] = false;
        
        for (int i = 2; i * i < n; i++) {
            if (isPrime[i]) {
                for (int j = i * i; j < n; j += i) {
                    isPrime[j] = false;
                }
            }
        }
        
        int count = 0;
        for (int i = 2; i < n; i++) {
            if (isPrime[i]) count++;
        }
        return count;
    }
};
```
