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

## 題目描述
給你一個字符串數組，請你將 **字母異位詞** 組合在一起。可以按任意順序返回結果列表。字母異位詞是由重新排列源單詞的字母得到的一個新單詞（例如 `eat` 和 `tea`）。

## 解題心得：給單詞「標準化」
字母異位詞雖然字母順序不同，但它們 **「包含的字母及數量」是一模一樣的**。

**核心邏輯：**
1. **找出共同點**：怎麼讓 `eat` 和 `tea` 認出彼此？最簡單的方法就是把它們都 **排序**。排序後，它們都會變成 `aet`。
2. **分組管理**：我們用一個哈希表（Dictionary），把排序後的單詞當作「鑰匙」(Key)，把原始單詞放進對應的清單裡。
3. **最後合體**：哈希表裡每一個 Key 對應的列表，就是我們要的一組。

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
