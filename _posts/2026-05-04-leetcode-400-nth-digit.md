---
title: "LeetCode #400: Nth Digit (第 N 位數字)"
categories:
  - Math
  - Binary Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
在無限正整數序列 1, 2, 3, 4, 5... 中，求第 n 位數字。

## 解題心得
統計不同位數的數字所佔的長度：
- 1 位數 (1-9) 有 9 個，共 $9 \times 1$ 位。
- 2 位數 (10-99) 有 90 個，共 $90 \times 2$ 位。
- $k$ 位數有 $9 \times 10^{k-1}$ 個，共 $9 \times 10^{k-1} \times k$ 位。
- 根據 `n` 決定第 `n` 位數字屬於幾位數，接著定位到具體的數字值，最後取出其具體字元。

- **時間複雜度**: O(\log N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def findNthDigit(self, n: int) -> int:
        digit_type = 1
        count = 9
        start = 1
        
        while n > digit_type * count:
            n -= digit_type * count
            digit_type += 1
            count *= 10
            start *= 10
            
        # 尋找具體的數字值
        num = start + (n - 1) // digit_type
        # 尋找具體位置
        idx = (n - 1) % digit_type
        return int(str(num)[idx])
```

### C++
```cpp
#include <string>

class Solution {
public:
    int findNthDigit(int n) {
        long long digit_type = 1;
        long long count = 9;
        long long start = 1;

        while (n > digit_type * count) {
            n -= digit_type * count;
            digit_type++;
            count *= 10;
            start *= 10;
        }

        long long num = start + (n - 1) / digit_type;
        std::string s = std::to_string(num);
        return s[(n - 1) % digit_type] - '0';
    }
};
```
