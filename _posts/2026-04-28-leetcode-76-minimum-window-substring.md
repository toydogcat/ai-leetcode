---
title: "LeetCode #76: Minimum Window Substring"
categories:
  - String
  - Sliding Window
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個字符串 `s` 、一個字符串 `t` 。返回 `s` 中包含 `t` 所有字符的最小子串。

## 解題思路：滑動窗口
使用雙指針維護一個窗口。先移動 `right` 直到包含 `t` 的所有字元，再縮小 `left` 直到不再滿足條件，記錄最小長度。

### Python
```python
from collections import Counter
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        need = Counter(t)
        window = Counter()
        left = right = 0
        valid = 0
        start, length = 0, float('inf')
        
        while right < len(s):
            c = s[right]
            right += 1
            if c in need:
                window[c] += 1
                if window[c] == need[c]: valid += 1
            
            while valid == len(need):
                if right - left < length:
                    start = left
                    length = right - left
                d = s[left]
                left += 1
                if d in need:
                    if window[d] == need[d]: valid -= 1
                    window[d] -= 1
        return "" if length == float('inf') else s[start:start+length]
```

### C++
```cpp
#include <string>
#include <unordered_map>
#include <climits>

class Solution {
public:
    std::string minWindow(std::string s, std::string t) {
        std::unordered_map<char, int> need, window;
        for (char c : t) need[c]++;
        int left = 0, right = 0, valid = 0;
        int start = 0, len = INT_MAX;
        while (right < s.length()) {
            char c = s[right++];
            if (need.count(c)) {
                window[c]++;
                if (window[c] == need[c]) valid++;
            }
            while (valid == need.size()) {
                if (right - left < len) {
                    start = left;
                    len = right - left;
                }
                char d = s[left++];
                if (need.count(d)) {
                    if (window[d] == need[d]) valid--;
                    window[d]--;
                }
            }
        }
        return len == INT_MAX ? "" : s.substr(start, len);
    }
};
```
