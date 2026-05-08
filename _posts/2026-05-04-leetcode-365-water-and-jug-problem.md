---
title: "LeetCode #365: Water and Jug Problem (水壺問題)"
categories:
  - Math
  - Depth-First Search
  - Breadth-First Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定兩個容量分別為 `x` 和 `y` 的水壺。判斷是否能使得最後水壺中的水總量恰好為 `target`。

## 解題心得
這是一道經典的 **貝祖定理 (Bézout's Identity)** 數學題：
- 我們能湊出的所有水總量，必定是 `x` 和 `y` 的最大公因數 (GCD) 的整數倍。
- 只要滿足：
  1. `x + y >= target`
  2. `target % gcd(x, y) == 0`
- 即可判定為可行。

- **時間複雜度**: O(\log(\min(x, y))) 計算最大公因數
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
import math

class Solution:
    def canMeasureWater(self, x: int, y: int, target: int) -> bool:
        if x + y < target:
            return False
        return target % math.gcd(x, y) == 0
```

### C++
```cpp
#include <numeric>

class Solution {
public:
    bool canMeasureWater(int x, int y, int target) {
        if (x + y < target) return false;
        return target % std::gcd(x, y) == 0;
    }
};
```
