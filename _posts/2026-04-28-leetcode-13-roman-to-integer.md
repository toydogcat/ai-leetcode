---
title: "LeetCode #13: Roman to Integer"
categories:
  - Math
  - String
tags:
  - Easy
  - Python
  - C++
---

## 解題思路
從左向右遍歷，如果當前字元代表的數值小於右邊的字元，則減去當前數值，否則加上。

### Python
```python
class Solution:
    def romanToInt(self, s: str) -> int:
        d = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
        res = 0
        for i in range(len(s)):
            if i + 1 < len(s) and d[s[i]] < d[s[i+1]]:
                res -= d[s[i]]
            else:
                res += d[s[i]]
        return res
```

### C++
```cpp
#include <string>
#include <unordered_map>

class Solution {
public:
    int romanToInt(std::string s) {
        std::unordered_map<char, int> d = {
            {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50}, 
            {'C', 100}, {'D', 500}, {'M', 1000}
        };
        int res = 0;
        for (int i = 0; i < s.length(); i++) {
            if (i + 1 < s.length() && d[s[i]] < d[s[i+1]]) {
                res -= d[s[i]];
            } else {
                res += d[s[i]];
            }
        }
        return res;
    }
};
```
