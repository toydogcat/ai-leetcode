---
title: "LeetCode #387: First Unique Character in a String (字串中的第一個唯一字元)"
categories:
  - Hash Table
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個字串 `s`，找到它的第一個不重複的字元，並返回它的索引。如果不存在，返回 -1。

## 解題心得
使用大小為 26 的陣列或雜湊表統計字串中每個字元的頻率，接著再次遍歷字串，第一個頻率為 1 的字元下標即為所求答案。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1) 僅需固定快取 26 個字元頻率

## 程式碼實作

### Python
```python
class Solution:
    def firstUniqChar(self, s: str) -> int:
        counts = [0] * 26
        for char in s:
            counts[ord(char) - ord('a')] += 1
            
        for i, char in enumerate(s):
            if counts[ord(char) - ord('a')] == 1:
                return i
        return -1
```

### C++
```cpp
#include <string>
#include <vector>

class Solution {
public:
    int firstUniqChar(std::string s) {
        std::vector<int> counts(26, 0);
        for (char c : s) {
            counts[c - 'a']++;
        }
        for (int i = 0; i < s.length(); ++i) {
            if (counts[s[i] - 'a'] == 1) return i;
        }
        return -1;
    }
};
```
