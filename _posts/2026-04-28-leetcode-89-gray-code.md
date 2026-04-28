---
title: "LeetCode #89: Gray Code"
categories:
  - Math
  - Bit Manipulation
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
格雷編碼（Gray Code）是一個數字序列，其中任意兩個相鄰的數字在二進制表示中 **只有一位不同**。給你一個整數 `n`，返回一個長度為 $2^n$ 的格雷編碼序列。

## 解題心得：優雅的翻轉
這題如果硬想會很痛苦，但它有一個非常絕妙的規律。

**直覺規律：鏡面反射法**
1. 假設 $n=1$，序列是 `[0, 1]`。
2. 當 $n=2$ 時：
   - 先拿 $n=1$ 的結果：`[0, 1]`。
   - 把這組結果反轉（鏡面）：`[1, 0]`。
   - 在反轉的結果前面加上一個 1（即加上 $2^1$）：變成 `[3, 2]`。
   - 拼起來：`[0, 1, 3, 2]`。你會發現相鄰兩位真的都只差一個 bit！

**進階公式法**：
有一個神奇的公式可以直接算出第 $i$ 個格雷碼：`i ^ (i >> 1)`。這在數位電路設計中非常常用，能避免電路切換時產生雜訊。

### Python
```python
class Solution:
    def grayCode(self, n: int) -> List[int]:
        return [i ^ (i >> 1) for i in range(1 << n)]
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<int> grayCode(int n) {
        std::vector<int> res;
        for (int i = 0; i < (1 << n); i++) {
            res.push_back(i ^ (i >> 1));
        }
        return res;
    }
};
```
