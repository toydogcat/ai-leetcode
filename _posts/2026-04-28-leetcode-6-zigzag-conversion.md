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
將一個給定字符串 `s` 根據給定的行數 `numRows` ，以從上往下、從左到右進行 `Z` 字型排列。比如 `numRows = 3` 時，排列如下：
```
P   A   H   N
A P L S I I G
Y   I   R
```
之後，你的輸出需要從左往右逐行讀取，產生一個新的字符串。

## 解題心得：坐雲霄飛車
這題的排列方式像是一個「之」字形，我們可以想像成一個在各行之間來回移動的雲霄飛車。

**核心邏輯：**
1. **建立每一行的容器**：比如 `numRows = 3`，我們就準備 3 個空盒子。
2. **決定方向**：
   - 當車子走到「最頂層」(0) 時，我們要往下走（方向變正）。
   - 當車子走到「最底層」(numRows - 1) 時，我們要往上走（方向變負）。
3. **分配字符**：把字串裡的每個字按順序丟進當前的盒子裡，然後根據方向移動到下一層。

這就像是你在發傳單。你先從第一排發到最後一排，到底了之後，再往回發，一直重複直到發完。最後把每一排的傳單連起來讀，就是答案。

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
