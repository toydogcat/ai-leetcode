---
title: "LeetCode #187: Repeated DNA Sequences (重複的 DNA 序列)"
categories:
  - Hash Table
  - String
  - Bit Manipulation
  - Sliding Window
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
DNA 序列由四種鹼基組成：'A', 'C', 'G' 和 'T'。
編寫一個函數，找出所有在 DNA 分子中出現超過一次的、長度為 10 的序列（子字串）。

## 解題心得：滑動窗口與哈希表
這題最直觀的想法是遍歷所有長度為 10 的子字串，並記錄它們出現的次數。

**核心邏輯**：
1. 使用一個哈希表（或集合）來存儲已經遇到的長度為 10 的子字串。
2. 使用另一個哈希表（或集合）來存儲已經確定是「重複」的子字串（避免結果重複）。
3. 遍歷字串 `s`，從 $i=0$ 到 $len(s)-10$。
   - 提取 `s[i:i+10]`。
   - 如果該子字串已存在於第一個集合中，將其加入結果集合。

- **時間複雜度**: $O(n)$，其中 $n$ 是字串長度（假設字串切片和哈希運算與長度 10 相關，可視為常數）。
- **空間複雜度**: $O(n)$。

## 程式碼實作

### Python
```python
class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        seen = set()
        res = set()
        
        for i in range(len(s) - 9):
            sub = s[i:i+10]
            if sub in seen:
                res.add(sub)
            else:
                seen.add(sub)
                
        return list(res)
```

### C++
```cpp
#include <vector>
#include <string>
#include <unordered_set>

class Solution {
public:
    std::vector<std::string> findRepeatedDnaSequences(std::string s) {
        if (s.length() < 10) return {};
        
        std::unordered_set<std::string> seen;
        std::unordered_set<std::string> res;
        
        for (int i = 0; i <= (int)s.length() - 10; i++) {
            std::string sub = s.substr(i, 10);
            if (seen.count(sub)) {
                res.insert(sub);
            } else {
                seen.insert(sub);
            }
        }
        
        return std::vector<std::string>(res.begin(), res.end());
    }
};
```
