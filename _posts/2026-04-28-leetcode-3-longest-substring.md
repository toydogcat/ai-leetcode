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
給定一個字串 `s`，請你找出其中不含有重複字元的最長子串的長度。

## 解題思路：滑動窗口 (Sliding Window)
我們維護一個「滑動窗口」，窗口內保證沒有重複字元。
1. 使用 `left` 和 `right` 兩個指針。
2. 使用哈希表存儲每個字元最後出現的位置。
3. 當 `right` 指針遇到重複字元時，將 `left` 跳轉到重複字元上次出現位置的下一個。

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
