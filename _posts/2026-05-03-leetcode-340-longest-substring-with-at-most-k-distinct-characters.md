---
title: "LeetCode #340: Longest Substring with At Most K Distinct Characters (最多包含 K 個不同字元的最長子字串)"
categories:
  - Hash Table
  - String
  - Sliding Window
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個字串 `s` 和一個整數 `k`，找出最多包含 `k` 個不同字元的最長子字串的長度。

## 解題心得
這是一道極其經典的 **滑動窗口 (Sliding Window)** 問題：
1. 我們維護一個滑動窗口 `[left, right]`，以及一個雜湊表紀錄當前窗口內每個字元的頻率。
2. 當 `right` 往右擴展時，將新字元加入雜湊表。
3. 如果此時雜湊表的大小（不同字元的個數）大於 `k`：
   - 我們不斷將 `left` 右移，並減少其對應字元的頻率，直到雜湊表中某些字元頻率變為 0 並將其剔除。
4. 在窗口合法（不同字元數 $\le k$）時，更新最長子字串長度 `right - left + 1`。

- **時間複雜度**: O(N)
- **空間複雜度**: O(K) 雜湊表最多存放 $k+1$ 個字元

## 程式碼實作

### Python
```python
class Solution:
    def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:
        if k == 0: return 0
        char_map = {}
        left = 0
        max_len = 0
        
        for right, char in enumerate(s):
            char_map[char] = char_map.get(char, 0) + 1
            while len(char_map) > k:
                left_char = s[left]
                char_map[left_char] -= 1
                if char_map[left_char] == 0:
                    del char_map[left_char]
                left += 1
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
    int lengthOfLongestSubstringKDistinct(std::string s, int k) {
        if (k == 0) return 0;
        std::unordered_map<char, int> charMap;
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); ++right) {
            charMap[s[right]]++;
            while (charMap.size() > k) {
                char leftChar = s[left];
                charMap[leftChar]--;
                if (charMap[leftChar] == 0) {
                    charMap.erase(leftChar);
                }
                left++;
            }
            maxLen = std::max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```
