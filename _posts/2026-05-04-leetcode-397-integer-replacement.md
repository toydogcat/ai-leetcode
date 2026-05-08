---
title: "LeetCode #397: Integer Replacement (整數替換)"
categories:
  - Dynamic Programming
  - Bit Manipulation
  - Greedy
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個正整數 n。若 n 是偶數，則除以 2；若是奇數，則可以加 1 或減 1。求將 n 變為 1 所需的最少操作次數。

## 解題心得
使用 **貪心演算法**：
- 對於奇數 `n`：
  - 若 `n == 3` 或者是 `n % 4 == 1`，我們應該選擇減 1，因為這樣可以更快地在二進制尾端製造更多的 0。
  - 若 `n % 4 == 3`，我們應該選擇加 1（除了 3 之外），這可以將尾部的連續 1 一次性消除為一個進位的 0，操作數更少。

- **時間複雜度**: O(\log N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def integerReplacement(self, n: int) -> int:
        count = 0
        while n > 1:
            if n % 2 == 0:
                n //= 2
            elif n == 3 or n % 4 == 1:
                n -= 1
            else:
                n += 1
            count += 1
        return count
```

### C++
```cpp
class Solution {
public:
    int integerReplacement(int n) {
        int count = 0;
        long long ln = n; // 防止加 1 溢位
        while (ln > 1) {
            if (ln % 2 == 0) {
                ln /= 2;
            } else if (ln == 3 || ln % 4 == 1) {
                ln--;
            } else {
                ln++;
            }
            count++;
        }
        return count;
    }
};
```
