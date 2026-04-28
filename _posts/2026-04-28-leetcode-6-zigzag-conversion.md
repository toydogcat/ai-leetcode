---
title: "LeetCode #6: Zigzag Conversion"
categories:
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
將一個給定字符串 `s` 根據給定的行數 `numRows`，以從上往下、從左到右進行 Z 字形排列。

## 解題思路
我們可以使用 `numRows` 個字串來模擬每一行的字符排列。利用一個變數 `step` 來控制方向（向下或向上）。

- **時間複雜度**: $O(n)$
- **空間複雜度**: $O(n)$

## 程式碼實作

### Python
```python
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1 or numRows >= len(s):
            return s
        rows = [''] * numRows
        index, step = 0, 1
        for char in s:
            rows[index] += char
            if index == 0:
                step = 1
            elif index == numRows - 1:
                step = -1
            index += step
        return ''.join(rows)
```

### C++
```cpp
#include <string>
#include <vector>

class Solution {
public:
    std::string convert(std::string s, int numRows) {
        if (numRows == 1 || numRows >= s.length()) return s;
        std::vector<std::string> rows(numRows);
        int index = 0, step = 1;
        for (char c : s) {
            rows[index] += c;
            if (index == 0) step = 1;
            else if (index == numRows - 1) step = -1;
            index += step;
        }
        std::string res = "";
        for (std::string row : rows) res += row;
        return res;
    }
};
```
