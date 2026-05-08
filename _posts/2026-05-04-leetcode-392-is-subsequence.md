---
title: "LeetCode #392: Is Subsequence (判斷子序列)"
categories:
  - Two Pointers
  - String
  - Dynamic Programming
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
判斷 `s` 是否為 `t` 的子序列。

## 解題心得
使用 **雙指針**，`i` 指向 `s`，`j` 指向 `t`。若 `s[i] == t[j]`，則 `i += 1`。不論如何 `j += 1`。最後若 `i == len(s)` 則為 `true`。

- **時間複雜度**: O(T) 其中 T 是字串 t 的長度
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i, j = 0, 0
        n, m = len(s), len(t)
        while i < n and j < m:
            if s[i] == t[j]:
                i += 1
            j += 1
        return i == n
```

### C++
```cpp
#include <string>

class Solution {
public:
    bool isSubsequence(std::string s, std::string t) {
        int i = 0, j = 0;
        int n = s.length(), m = t.length();
        while (i < n && j < m) {
            if (s[i] == t[j]) {
                i++;
            }
            j++;
        }
        return i == n;
    }
};
```
