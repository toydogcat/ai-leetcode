---
title: "LeetCode #65: Valid Number"
categories:
  - String
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個字符串 `s` ，如果是 **有效數字** ，返回 `true` 。有效數字的定義非常複雜，包括整數、小數、科學計數法（e 或 E）等。

## 解題心得：嚴密的規則檢查
這是一道典型的「煩人」題目，它不考複雜演算法，但考你對規則的考慮是否周全。

**核心邏輯：**
一個有效數字必須滿足：
1. **符號位**：只能出現在開頭，或者 `e` 的後面。
2. **小數點**：只能出現一次，且不能出現在 `e` 的後面。
3. **數字**：必須包含至少一個數字。
4. **e/E**：只能出現一次，且後面必須接整數。

在實際面試中，通常建議使用 **有限狀態機 (DFA)** 來處理，這樣邏輯最清晰。但如果想快速解決，正則表達式也是一個選擇。

### Python
```python
class Solution:
    def isNumber(self, s: str) -> bool:
        # 簡單方法：利用異常處理，但在面試中建議使用 DFA
        import re
        pattern = re.compile(r"^[+-]?((\d+\.?\d*)|(\.\d+))([eE][+-]?\d+)?$")
        return bool(pattern.match(s))
```

### C++
```cpp
#include <string>
#include <regex>

class Solution {
public:
    bool isNumber(std::string s) {
        std::regex pattern("^[+-]?((\\d+\\.?\\d*)|(\\.\\d+))([eE][+-]?\\d+)?$");
        return std::regex_match(s, pattern);
    }
};
```
