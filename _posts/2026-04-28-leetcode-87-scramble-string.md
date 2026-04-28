---
title: "LeetCode #87: Scramble String"
categories:
  - String
  - Dynamic Programming
tags:
  - Hard
  - Python
  - C++
---

## 解題思路
使用遞迴 + 記憶化搜索。判斷兩個字串是否互為擾亂字串。

### Python
```python
from functools import lru_cache
class Solution:
    @lru_cache(None)
    def isScramble(self, s1: str, s2: str) -> bool:
        if s1 == s2: return True
        if sorted(s1) != sorted(s2): return False
        for i in range(1, len(s1)):
            if (self.isScramble(s1[:i], s2[:i]) and self.isScramble(s1[i:], s2[i:])) or \
               (self.isScramble(s1[:i], s2[-i:]) and self.isScramble(s1[i:], s2[:-i])):
                return True
        return False
```

### C++
```cpp
#include <string>
#include <unordered_map>
#include <algorithm>

class Solution {
    std::unordered_map<std::string, bool> memo;
public:
    bool isScramble(std::string s1, std::string s2) {
        if (s1 == s2) return true;
        if (s1.length() != s2.length()) return false;
        std::string key = s1 + "#" + s2;
        if (memo.count(key)) return memo[key];
        
        std::string t1 = s1, t2 = s2;
        std::sort(t1.begin(), t1.end()); std::sort(t2.begin(), t2.end());
        if (t1 != t2) return memo[key] = false;
        
        int n = s1.length();
        for (int i = 1; i < n; i++) {
            if ((isScramble(s1.substr(0, i), s2.substr(0, i)) && isScramble(s1.substr(i), s2.substr(i))) ||
                (isScramble(s1.substr(0, i), s2.substr(n - i)) && isScramble(s1.substr(i), s2.substr(0, n - i)))) {
                return memo[key] = true;
            }
        }
        return memo[key] = false;
    }
};
```
