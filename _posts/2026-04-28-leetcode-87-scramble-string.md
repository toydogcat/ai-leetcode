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

## 題目描述
給定兩個長度相等的字符串 `s1` 和 `s2`，判斷 `s2` 是否是 `s1` 的擾亂字符串。擾亂的定義是將字符串遞迴拆分成兩個非空子串，並可以選擇交換它們的位置。

## 解題心得：拆解與拼圖
這題是 Hard 難度，因為它的變化非常多。

**核心邏輯：**
1. **分而治之**：如果兩個字串一樣，那肯定是 True。如果它們包含的字母種類或數量不一樣，那肯定是 False。
2. **尋找切割點**：我們嘗試在任何一個位置 $i$ 切開字串。
   - **情況一：不交換**。如果 `s1` 的左邊等於 `s2` 的左邊，且 `s1` 的右邊等於 `s2` 的右邊，那就是 True。
   - **情況二：交換了**。如果 `s1` 的左邊等於 `s2` 的 **右邊**，且 `s1` 的右邊等於 `s2` 的 **左邊**，那也是 True。
3. **記憶化搜索**：因為會有很多重複的子問題，我們用一個「小本本」(memo) 把算過的結果記下來，否則會跑太久。

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
