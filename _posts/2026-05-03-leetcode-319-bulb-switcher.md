---
title: "LeetCode #319: Bulb Switcher (燈泡開關)"
categories:
  - Math
  - Brainteaser
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
初始時有 `n` 個關閉的燈泡。在第 1 輪，你打開所有燈泡。在第 2 輪，你每隔一個燈泡就切換一次（按第 2, 4, 6... 個）。第 3 輪，你每隔兩個就切換一次。直到第 `n` 輪切換第 `n` 個燈泡。求最終有多少個燈泡是亮著的。

## 解題心得
這是一個精妙的 **數學問題 / 腦筋急轉彎**：
- 每個燈泡 `i` 會在它的所有因數（Factors）輪次中被切換。例如燈泡 6 在第 1, 2, 3, 6 輪被切換，共計 4 次（偶數次，最後回到初始關閉狀態）。
- 只有當一個數的因數個數為 **奇數** 時，燈泡最終才會保持亮著。
- 一個數的因數個數是奇數，若且唯若該數是一個 **完全平方數**（如 1, 4, 9, 16 等，其因數中平方根不重複成雙）。
- 因此，問題轉化為：求 `1` 到 `n` 之間有多少個完全平方數。結果即為 `floor(sqrt(n))`。

- **時間複雜度**: O(1)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
import math

class Solution:
    def bulbSwitch(self, n: int) -> int:
        return int(math.sqrt(n))
```

### C++
```cpp
#include <cmath>

class Solution {
public:
    int bulbSwitch(int n) {
        return std::sqrt(n);
    }
};
```
