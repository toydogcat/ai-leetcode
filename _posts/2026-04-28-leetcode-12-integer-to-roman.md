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

## 解題思路
利用貪心算法，從最大的數值開始匹配。

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
