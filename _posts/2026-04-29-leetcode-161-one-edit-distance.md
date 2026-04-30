---
title: "LeetCode #161: One Edit Distance (相隔為一的編輯距離)"
categories:
  - String
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
  - Premium
---

## 題目描述
這是一道 **LeetCode Premium** 題目。

給定兩個字串 `s` 和 `t` ，如果它們的編輯距離恰好為 1，則返回 `true` ，否則返回 `false` 。

編輯距離恰好為 1 指的是你可以通過以下三種操作之一將 `s` 轉換為 `t` ：
1. 插入一個字元。
2. 刪除一個字元。
3. 替換一個字元。

## 解題心得：分類討論的精髓
這題的核心在於比較兩個字串的長度，並根據長度差異進行分類討論。

**核心邏輯**：
1. 如果長度差異大於 1，直接返回 `false`。
2. 遍歷較短的字串，尋找第一個不同的字元：
   - **如果長度相同**：剩下的部分必須完全相同（替換操作）。
   - **如果長度不同**：較長字串的剩餘部分必須與較短字串從當前位置開始的部分完全相同（插入/刪除操作）。
3. 如果遍歷完都沒發現不同，則檢查兩字串長度是否恰好差 1（例如 "abc" 和 "abcd"）。

- **時間複雜度**: $O(n)$，其中 $n$ 是較短字串的長度。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def isOneEditDistance(self, s: str, t: str) -> bool:
        ns, nt = len(s), len(t)
        
        # 確保 s 是較短的那一個
        if ns > nt:
            return self.isOneEditDistance(t, s)
        
        if nt - ns > 1:
            return False
        
        for i in range(ns):
            if s[i] != t[i]:
                if ns == nt:
                    # 長度相同，只能是替換，所以後面必須完全一樣
                    return s[i+1:] == t[i+1:]
                else:
                    # 長度不同，只能是插入，所以 t 跳過一個後必須跟 s 一樣
                    return s[i:] == t[i+1:]
                    
        # 遍歷完都一樣，除非長度剛好差 1
        return ns + 1 == nt
```

### C++
```cpp
#include <string>
#include <algorithm>

class Solution {
public:
    bool isOneEditDistance(std::string s, std::string t) {
        int ns = s.length(), nt = t.length();
        
        if (ns > nt) return isOneEditDistance(t, s);
        
        if (nt - ns > 1) return false;
        
        for (int i = 0; i < ns; i++) {
            if (s[i] != t[i]) {
                if (ns == nt) {
                    return s.substr(i + 1) == t.substr(i + 1);
                } else {
                    return s.substr(i) == t.substr(i + 1);
                }
            }
        }
        return ns + 1 == nt;
    }
};
```
