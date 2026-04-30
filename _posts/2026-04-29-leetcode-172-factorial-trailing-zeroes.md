---
title: "LeetCode #172: Factorial Trailing Zeroes (階乘後的零)"
categories:
  - Math
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個整數 `n` ，返回 `n!` 結果中尾隨零的數量。

提示：`n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1`

## 解題心得：尋找因數 5
這題如果直接計算階乘會導致溢位，所以必須尋找數學規律。

**核心邏輯**：
1. 尾隨零是由 $10$ 產生的，而 $10 = 2 \times 5$。
2. 在階乘中，因數 $2$ 的數量遠遠多於因數 $5$ 的數量。
3. 因此，**尾隨零的數量 = 因數 5 的總數**。

**如何計算因數 5 的總數？**
- 每 5 個數就有一個包含因數 5。
- 每 25 個數就有一個額外的因數 5（因為 $25 = 5 \times 5$）。
- 每 125 個數就有一個再額外的因數 5...
- 規律：$Count = \lfloor n/5 \rfloor + \lfloor n/25 \rfloor + \lfloor n/125 \rfloor + \dots$

- **時間複雜度**: $O(\log_5 n)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def trailingZeroes(self, n: int) -> int:
        count = 0
        while n > 0:
            n //= 5
            count += n
        return count
```

### C++
```cpp
class Solution {
public:
    int trailingZeroes(int n) {
        int count = 0;
        while (n > 0) {
            count += n / 5;
            n /= 5;
        }
        return count;
    }
};
```
