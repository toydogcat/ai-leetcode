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
給你一個字符串 `s` 、一個字符串 `t` 。返回 `s` 中包含 `t` 所有字符的最小子串。如果 `s` 中不存在符合條件的子串，則返回空字符串 `""` 。

## 解題心得：伸縮自如的窗口
這是滑動窗口（Sliding Window）最經典的 Hard 題目。

**想像你在拉一個伸縮尺：**
1. **向右擴張**：我們先拉開右邊邊界 (`right`)，一直往右走，直到我們這把尺覆蓋到的範圍內，已經包含了單詞 `t` 的所有字母。
2. **向左收縮**：既然已經包含所有字母了，這把尺可能太長了。我們開始收縮左邊邊界 (`left`)，試試看能不能在依然包含所有字母的情況下，把尺縮得更短。
3. **更新答案**：每次縮完，如果發現長度打破了紀錄，就記下來。
4. **循環往復**：一旦縮到不再滿足條件，就繼續拉開右邊，重複上述過程。

這就像是在找一個包含所有必需品的最小購物袋，先抓一把進去，再看看有沒有不需要的可以扔掉。

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
