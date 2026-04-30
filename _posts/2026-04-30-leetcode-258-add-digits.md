---
title: "LeetCode #258: Add Digits (各位相加)"
categories:
  - Math
  - Simulation
  - Number Theory
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個非負整數 `num`，反覆將各個位上的數字相加，直到結果為一位數。返回這個結果。

## 解題心得：數學規律 (Digital Root)
這題如果用循環模擬很簡單，但題目進階要求在 $O(1)$ 時間內完成。

**核心邏輯：**
1. **循環模擬**：當 `num >= 10` 時，計算各位數之和，更新 `num`。
2. **數學公式 (數根)**：
   - 觀察規律：9 的倍數的各個位之和最終都會變成 9。
   - 非 9 的倍數最終會變成 `num % 9`。
   - 特殊情況 `num = 0` 結果為 0。
   - 統一公式：`(num - 1) % 9 + 1` (適用於所有正整數)。

- **時間複雜度**: $O(1)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def addDigits(self, num: int) -> int:
        if num == 0: return 0
        return (num - 1) % 9 + 1
```

### C++
```cpp
class Solution {
public:
    int addDigits(int num) {
        if (num == 0) return 0;
        return (num - 1) % 9 + 1;
    }
};
```
