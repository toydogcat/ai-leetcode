---
title: "LeetCode #12: Integer to Roman"
categories:
  - Math
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
羅馬數字由七個不同的符號表示。給你一個整數，將其轉換為羅馬數字。

## 解題心得：大鈔找零法
這題跟 13 題相反，要把數字拆解成羅馬字符。

**核心邏輯：貪心算法 (Greedy)**
1. **羅列所有「整數塊」**：包括 `M: 1000`, `CM: 900`, `D: 500`, `CD: 400`... 一直到 `I: 1`。
2. **從大到小試探**：我們先看最大的 M (1000) 能裝進去幾次，裝進去幾次就寫幾個 M。
3. **剩下的繼續**：減掉已經裝進去的部分，繼續看下一個面額。

這就像是你去自動兌幣機換零錢。如果你有一千塊，機器會先吐出一千塊面額的（如果有），剩下的再吐五百、一百的，直到全部換完。

### Python
```python
class Solution:
    def intToRoman(self, num: int) -> str:
        val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
        sym = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
        res = ""
        for i in range(len(val)):
            while num >= val[i]:
                num -= val[i]
                res += sym[i]
        return res
```

### C++
```cpp
#include <string>
#include <vector>

class Solution {
public:
    std::string intToRoman(int num) {
        int val[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        std::string sym[] = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        std::string res = "";
        for (int i = 0; i < 13; i++) {
            while (num >= val[i]) {
                num -= val[i];
                res += sym[i];
            }
        }
        return res;
    }
};
```
