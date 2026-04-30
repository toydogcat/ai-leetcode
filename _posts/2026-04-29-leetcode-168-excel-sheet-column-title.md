---
title: "LeetCode #168: Excel Sheet Column Title (Excel 表列名稱)"
categories:
  - Math
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一個整數 `columnNumber` ，請你以字串形式返回它在 Excel 表中對應的列名稱。

例如：
- 1 -> A
- 2 -> B
- 3 -> C
- ...
- 26 -> Z
- 27 -> AA
- 28 -> AB 

## 解題心得：1-based 的 26 進制
這題本質上是將 10 進制轉換為 26 進制，但有一個陷阱：它是從 1 開始的（1 對應 A，26 對應 Z），而不是從 0 開始。

**核心邏輯**：
一般的進位轉換（如 10 進位轉 2 進位）是直接取餘數。但在這裡，因為沒有 `0` 的概念（Z 是 26，而 27 是 AA），我們在每次取餘數前，需要先將 `columnNumber` 減去 1：
1. `columnNumber -= 1`
2. `char = (columnNumber % 26) + 'A'`
3. `columnNumber //= 26`
4. 重複直到 `columnNumber` 為 0。
5. 最後將得到的字串反轉。

- **時間複雜度**: $O(\log_{26} n)$。
- **空間複雜度**: $O(1)$ (不計結果字串)。

## 程式碼實作

### Python
```python
class Solution:
    def convertToTitle(self, columnNumber: int) -> str:
        res = []
        while columnNumber > 0:
            # 關鍵：先減 1 處理 1-based 問題
            columnNumber -= 1
            res.append(chr(columnNumber % 26 + ord('A')))
            columnNumber //= 26
            
        return "".join(res[::-1])
```

### C++
```cpp
#include <string>
#include <algorithm>

class Solution {
public:
    std::string convertToTitle(int columnNumber) {
        std::string res = "";
        while (columnNumber > 0) {
            columnNumber--;
            res += (char)(columnNumber % 26 + 'A');
            columnNumber /= 26;
        }
        std::reverse(res.begin(), res.end());
        return res;
    }
};
```
