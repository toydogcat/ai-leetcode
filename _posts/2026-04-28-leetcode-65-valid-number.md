---
title: "LeetCode #65: Valid Number"
categories:
  - String
tags:
  - Hard
  - Python
  - C++
---

## 解題思路
使用有限狀態機 (DFA) 或複雜的邏輯判斷。

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
