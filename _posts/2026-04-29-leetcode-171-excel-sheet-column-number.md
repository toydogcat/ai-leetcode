---
title: "LeetCode #171: Excel Sheet Column Number (Excel 表列序號)"
categories:
  - Math
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一個字串 `columnTitle` ，表示 Excel 表格中的列名稱。返回該列名稱對應的列序號。

例如：
- A -> 1
- B -> 2
- C -> 3
- ...
- Z -> 26
- AA -> 27
- AB -> 28 

## 解題心得：26 進制轉 10 進制
這題是 [168. Excel Sheet Column Title](file:///home/toymsi/documents/projects/Github/ai-leetcode/_posts/2026-04-30-leetcode-168-excel-sheet-column-title.md) 的逆過程。

**核心邏輯**：
這本質上就是一個進位制轉換（26 進制轉 10 進制）。
對於一個字串，從左到右遍歷：
1. `ans = ans * 26 + (當前字元 - 'A' + 1)`

例如 `AB`：
- 'A': $0 \times 26 + 1 = 1$
- 'B': $1 \times 26 + 2 = 28$

- **時間複雜度**: $O(n)$，其中 $n$ 是字串長度。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def titleToNumber(self, columnTitle: str) -> int:
        res = 0
        for char in columnTitle:
            # ord('A') 是 65
            val = ord(char) - ord('A') + 1
            res = res * 26 + val
        return res
```

### C++
```cpp
#include <string>

class Solution {
public:
    int titleToNumber(std::string columnTitle) {
        long long res = 0;
        for (char c : columnTitle) {
            int val = c - 'A' + 1;
            res = res * 26 + val;
        }
        return (int)res;
    }
};
```
