---
title: "LeetCode #383: Ransom Note (贖金信)"
categories:
  - Hash Table
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
判斷字串 `ransomNote` 能不能由字串 `magazine` 中的字元構成。每個字元在 `ransomNote` 中只能使用一次。

## 解題心得
使用一個大小為 26 的陣列記錄 `magazine` 中每個字元的頻率。遍歷 `ransomNote`，扣除對應字元的頻率。若有任何字元頻率不足，返回 `false`。

- **時間複雜度**: O(N + M) 其中 N, M 是兩字串的長度
- **空間複雜度**: O(1) 字元集大小固定為 26

## 程式碼實作

### Python
```python
class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        counts = [0] * 26
        for char in magazine:
            counts[ord(char) - ord('a')] += 1
            
        for char in ransomNote:
            idx = ord(char) - ord('a')
            counts[idx] -= 1
            if counts[idx] < 0:
                return False
        return True
```

### C++
```cpp
#include <string>
#include <vector>

class Solution {
public:
    bool canConstruct(std::string ransomNote, std::string magazine) {
        std::vector<int> counts(26, 0);
        for (char c : magazine) {
            counts[c - 'a']++;
        }
        for (char c : ransomNote) {
            counts[c - 'a']--;
            if (counts[c - 'a'] < 0) return false;
        }
        return true;
    }
};
```
