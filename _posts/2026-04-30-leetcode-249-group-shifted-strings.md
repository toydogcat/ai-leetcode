---
title: "LeetCode #249: Group Shifted Strings (移位字符串分組)"
categories:
  - Array
  - Hash Table
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個字符串列表，將所有屬於同一個移位序列的字符串分組。
**移位序列**：如果一個字符串可以通過將另一個字符串中的每個字母在字母表中移動相同的距離（循環移動，如 'z' 後面是 'a'）來得到，則它們屬於同一個序列。
例如：`"abc"` 和 `"bcd"` 是一組。

## 解題心得：特徵提取 (Normalization)
我們需要為每一組移位字符串找到一個 **唯一的標識 (Key)**。

**核心邏輯：**
1. **計算相對距離**：對於任何一個字符串，我們計算相鄰字符之間的距離。
   - 例如 `"abc"`：`'b'-'a'=1, 'c'-'b'=1` -> Key 是 `(1, 1)`。
   - 例如 `"azc"`：`'z'-'a'=25, 'c'-'z'=3 (mod 26)` -> Key 是 `(25, 3)`。
2. **處理循環**：距離計算公式為 `(s[i] - s[i-1] + 26) % 26`。
3. **哈希分組**：使用一個哈希表，Key 是距離序列，Value 是原始字符串列表。

- **時間複雜度**: $O(N \cdot L)$，其中 $N$ 是單詞數，$L$ 是平均長度。
- **空間複雜度**: $O(N \cdot L)$。

## 程式碼實作

### Python
```python
from collections import defaultdict

class Solution:
    def groupStrings(self, strings: List[str]) -> List[List[str]]:
        groups = defaultdict(list)
        
        for s in strings:
            if len(s) == 1:
                key = (-1,) # 單字符特殊 Key
            else:
                # 計算相鄰字符的距離序列
                key = []
                for i in range(1, len(s)):
                    diff = (ord(s[i]) - ord(s[i-1]) + 26) % 26
                    key.append(diff)
                key = tuple(key)
            
            groups[key].append(s)
            
        return list(groups.values())
```

### C++
```cpp
#include <vector>
#include <string>
#include <unordered_map>

class Solution {
public:
    std::vector<std::vector<std::string>> groupStrings(std::vector<std::string>& strings) {
        std::unordered_map<std::string, std::vector<std::string>> groups;
        
        for (std::string s : strings) {
            std::string key = "";
            for (int i = 1; i < s.length(); i++) {
                int diff = (s[i] - s[i-1] + 26) % 26;
                key += std::to_string(diff) + ",";
            }
            groups[key].push_back(s);
        }
        
        std::vector<std::vector<std::string>> res;
        for (auto& item : groups) {
            res.push_back(item.second);
        }
        return res;
    }
};
```
