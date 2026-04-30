---
title: "LeetCode #205: Isomorphic Strings (同構字符串)"
categories:
  - Hash Table
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定兩個字符串 `s` 和 `t` ，判斷它們是否是同構的。
如果 `s` 中的字符可以按某種映射關係替換得到 `t` ，那麼這兩個字符串是同構的。
每個出現的字符都應當映射到另一個字符，同時不改變字符的順序。不同字符不能映射到同一個字符上，相同字符只能映射到同一個字符上，字符可以映射到自己本身。

## 解題心得：雙向映射
判斷同構的關鍵在於建立 **雙向的一一對應關係**。

**核心邏輯：**
1. **雙哈希表**：我們需要確保 `s[i]` 映射到 `t[i]` 的同時，`t[i]` 也要能唯一對應回 `s[i]`。
   - 例如：`s = "ab", t = "aa"`。`a -> a`，但當我們處理 `b` 時，`t` 又是 `a`，此時 `a` 已經被 `s` 中的 `a` 佔用了，所以不是同構。
2. **位置記錄法**：記錄每個字符最後出現的位置。如果 `s[i]` 和 `t[i]` 上次出現的位置不同，則不同構。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(Z)$，其中 $Z$ 是字符集的大小（如 ASCII 為 128 或 256）。

## 程式碼實作

### Python (使用哈希表)
```python
class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        s2t, t2s = {}, {}
        for char_s, char_t in zip(s, t):
            # 檢查 s -> t 的映射
            if char_s in s2t and s2t[char_s] != char_t:
                return False
            # 檢查 t -> s 的映射
            if char_t in t2s and t2s[char_t] != char_s:
                return False
            s2t[char_s] = char_t
            t2s[char_t] = char_s
        return True
```

### C++ (使用數組)
```cpp
#include <string>
#include <vector>

class Solution {
public:
    bool isIsomorphic(std::string s, std::string t) {
        int m1[256] = {0}, m2[256] = {0};
        int n = s.length();
        for (int i = 0; i < n; ++i) {
            if (m1[s[i]] != m2[t[i]]) return false;
            m1[s[i]] = i + 1; // 記錄位置（+1 防止與初始 0 衝突）
            m2[t[i]] = i + 1;
        }
        return true;
    }
};
```
