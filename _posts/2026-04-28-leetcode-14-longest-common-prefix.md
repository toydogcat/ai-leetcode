---
title: "LeetCode #14: Longest Common Prefix"
categories:
  - String
tags:
  - Easy
  - Python
  - C++
---

## 解題思路
遍歷第一個字串的每個字元，與其餘字串進行對比。

### Python
```python
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        if not strs: return ""
        for i in range(len(strs[0])):
            for string in strs[1:]:
                if i == len(string) or string[i] != strs[0][i]:
                    return strs[0][:i]
        return strs[0]
```

### C++
```cpp
#include <string>
#include <vector>

class Solution {
public:
    std::string longestCommonPrefix(std::vector<std::string>& strs) {
        if (strs.empty()) return "";
        for (int i = 0; i < strs[0].length(); i++) {
            for (int j = 1; j < strs.size(); j++) {
                if (i == strs[j].length() || strs[j][i] != strs[0][i]) {
                    return strs[0].substr(0, i);
                }
            }
        }
        return strs[0];
    }
};
```
