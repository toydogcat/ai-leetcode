---
title: "LeetCode #3: Longest Substring Without Repeating Characters"
categories:
  - String
  - Sliding Window
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個字符串 `s` ，請你找出其中不含有重複字符的 **最長子串** 的長度。

## 解題心得：靈活的伸縮尺
這題是學習「滑動窗口 (Sliding Window)」的必修課。

**核心邏輯：**
1. **窗口左端 `left` 與右端 `right`**：我們維護一個「窗口」，裡面保證沒有重複字母。
2. **向右擴張**：`right` 不斷往右走，把新字元納入窗口。
3. **遇到重複就縮小**：如果新字元已經在窗口裡了，我們就把左邊的 `left` 往右挪，直到窗口裡不再有重複字元為止。
4. **記錄最大值**：每次移動，我們都記下當前窗口的長度 `right - left + 1`，取最大的一個。

這就像是在拉一把伸縮尺。你一直往右拉（`right` 增加），如果發現尺子中間夾到了重複的零件，你就從左邊縮回來一點點（`left` 增加），直到零件不再重複。

- **時間複雜度**: $O(n)$
- **空間複雜度**: $O(\min(n, m))$，其中 $m$ 是字符集的大小。

## 程式碼實作

### Python
```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_map = {}
        max_len = left = 0
        for right, char in enumerate(s):
            if char in char_map and char_map[char] >= left:
                left = char_map[char] + 1
            char_map[char] = right
            max_len = max(max_len, right - left + 1)
        return max_len
```

### C++
```cpp
#include <string>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        std::unordered_map<char, int> charMap;
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            if (charMap.count(s[right]) && charMap[s[right]] >= left) {
                left = charMap[s[right]] + 1;
            }
            charMap[s[right]] = right;
            maxLen = std::max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```
