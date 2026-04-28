---
title: "LeetCode #28: Find the Index of the First Occurrence in a String"
categories:
  - String
  - Two Pointers
tags:
  - Easy
  - Python
  - C++
---

## 解題思路
簡單的子串匹配。

### Python
```python
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        return haystack.find(needle)
```

### C++
```cpp
#include <string>

class Solution {
public:
    int strStr(std::string haystack, std::string needle) {
        return haystack.find(needle);
    }
};
```
