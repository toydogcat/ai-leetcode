---
title: "LeetCode #49: Group Anagrams"
categories:
  - Hash Table
  - String
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
使用哈希表，鍵為排序後的字串，值為對應的原字串列表。

### Python
```python
from collections import defaultdict
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        d = defaultdict(list)
        for s in strs:
            key = "".join(sorted(s))
            d[key].append(s)
        return list(d.values())
```

### C++
```cpp
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {
        std::unordered_map<std::string, std::vector<std::string>> d;
        for (std::string s : strs) {
            std::string key = s;
            std::sort(key.begin(), key.end());
            d[key].push_back(s);
        }
        std::vector<std::vector<std::string>> res;
        for (auto it : d) res.push_back(it.second);
        return res;
    }
};
```
