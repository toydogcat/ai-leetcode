---
title: "LeetCode #313: Super Ugly Number (超級醜數)"
categories:
  - Array
  - Math
  - Dynamic Programming
  - Heap (Priority Queue)
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
超級醜數是指正整數，其所有質因數都在一個給定的質數列表 `primes` 中。給你一個質數列表 `primes`，求第 `n` 個超級醜數。

## 解題心得
本題是「醜數 II」的延伸，我們可以使用 **多指針動態規劃 (Multi-pointer DP)**：
- 設 `dp[i]` 表示第 `i + 1` 個超級醜數。
- 對於 `primes` 中的每個質數，我們維護一個指針 `pointers[j]`，表示當前該質數乘以哪一個已生成的超級醜數。
- 下一個超級醜數即為所有的 `primes[j] * dp[pointers[j]]` 的最小值。
- 為了避免重複，若最小值與某個乘積相同，我們需要將對應的指針前進一步。

- **時間複雜度**: O(N \times K)，其中 $K$ 是 `primes` 的個數
- **空間複雜度**: O(N + K)

## 程式碼實作

### Python
```python
class Solution:
    def nthSuperUglyNumber(self, n: int, primes: List[int]) -> int:
        dp = [1] * n
        pointers = [0] * len(primes)
        
        for i in range(1, n):
            candidates = [primes[j] * dp[pointers[j]] for j in range(len(primes))]
            next_val = min(candidates)
            dp[i] = next_val
            
            for j in range(len(primes)):
                if candidates[j] == next_val:
                    pointers[j] += 1
                    
        return dp[-1]
```

### C++
```cpp
#include <vector>
#include <algorithm>
#include <climits>

class Solution {
public:
    int nthSuperUglyNumber(int n, std::vector<int>& primes) {
        std::vector<long long> dp(n, 1);
        std::vector<int> pointers(primes.size(), 0);

        for (int i = 1; i < n; ++i) {
            long long nextVal = LLONG_MAX;
            for (size_t j = 0; j < primes.size(); ++j) {
                nextVal = std::min(nextVal, (long long)primes[j] * dp[pointers[j]]);
            }
            dp[i] = nextVal;
            for (size_t j = 0; j < primes.size(); ++j) {
                if (nextVal == (long long)primes[j] * dp[pointers[j]]) {
                    pointers[j]++;
                }
            }
        }
        return dp[n - 1];
    }
};
```
