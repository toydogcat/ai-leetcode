---
title: "LeetCode #389: Find the Difference (找不同)"
categories:
  - Hash Table
  - Bit Manipulation
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定兩個字串 `s` 和 `t`，`t` 是由 `s` 隨機打亂並在隨機位置新增一個字元組成的。找出被新增的字元。

## 解題心得
使用 **互斥或 (XOR)** 位元運算：將 `s` 和 `t` 中的所有字元進行 XOR 運算，最終留下的結果即為新增的字元（因為成對出現的字元會互相抵消）。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        ans = 0
        for char in s: ans ^= ord(char)
        for char in t: ans ^= ord(char)
        return chr(ans)
```

### C++
```cpp
#include <string>

class Solution {
public:
    char findTheDifference(std::string s, std::string t) {
        char ans = 0;
        for (char c : s) ans ^= c;
        for (char c : t) ans ^= c;
        return ans;
    }
};
```
