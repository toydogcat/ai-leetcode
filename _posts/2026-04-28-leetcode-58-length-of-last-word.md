---
title: "LeetCode #58: Length of Last Word"
categories:
  - String
tags:
  - Easy
  - Python
  - C++
---

## 解題思路
從後往前找。

### Python
```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        return len(s.split()[-1])
```

### C++
```cpp
#include <string>

class Solution {
public:
    int lengthOfLastWord(std::string s) {
        int length = 0;
        int i = s.length() - 1;
        while (i >= 0 && s[i] == ' ') i--;
        while (i >= 0 && s[i] != ' ') {
            length++;
            i--;
        }
        return length;
    }
};
```
