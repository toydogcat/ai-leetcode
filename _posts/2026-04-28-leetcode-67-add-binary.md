---
title: "LeetCode #67: Add Binary"
categories:
  - Math
  - String
tags:
  - Easy
  - Python
  - C++
---

## 解題思路
模擬二進制加法。

### Python
```python
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        return bin(int(a, 2) + int(b, 2))[2:]
```

### C++
```cpp
#include <string>
#include <algorithm>

class Solution {
public:
    std::string addBinary(std::string a, std::string b) {
        std::string res = "";
        int i = a.size() - 1, j = b.size() - 1, carry = 0;
        while (i >= 0 || j >= 0 || carry) {
            int sum = carry + (i >= 0 ? a[i--] - '0' : 0) + (j >= 0 ? b[j--] - '0' : 0);
            res += std::to_string(sum % 2);
            carry = sum / 2;
        }
        std::reverse(res.begin(), res.end());
        return res;
    }
};
```
