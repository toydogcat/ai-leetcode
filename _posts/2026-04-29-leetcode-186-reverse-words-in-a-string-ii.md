---
title: "LeetCode #186: Reverse Words in a String II (翻轉字串中的單詞 II)"
categories:
  - Two Pointers
  - String
tags:
  - Medium
  - Python
  - C++
  - Premium
---

## 題目描述
這是一道 **LeetCode Premium** 題目。

給你一個字元陣列 `s` ，翻轉其中 **單詞** 的順序。單詞是由非空格字元組成的字串。`s` 中的單詞將會被單個空格分隔。
你必須在不分配額外空間的情況下 **原地 (In-place)** 修改輸入陣列。

## 解題心得：兩次翻轉法
與 [151. Reverse Words in a String](file:///home/toymsi/documents/projects/Github/ai-leetcode/_posts/2026-04-30-leetcode-151-reverse-words-in-a-string.md) 不同，這題要求原地修改且輸入是字元陣列。

**核心邏輯：全局翻轉 + 局部翻轉**
1. **全局翻轉**：將整個陣列 `s` 翻轉。此時，單詞的順序對了，但每個單詞內部的字元順序是反的。
2. **局部翻轉**：遍歷陣列，找出每個單詞的邊界，並將該單詞內部的字元再次翻轉，使其恢復原樣。

- **時間複雜度**: $O(n)$，每個字元最多被翻轉兩次。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def reverseWords(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        def reverse(l, r):
            while l < r:
                s[l], s[r] = s[r], s[l]
                l += 1
                r -= 1
        
        # 1. 全局翻轉
        reverse(0, len(s) - 1)
        
        # 2. 局部翻轉每個單詞
        start = 0
        for i in range(len(s)):
            if s[i] == ' ':
                reverse(start, i - 1)
                start = i + 1
            elif i == len(s) - 1:
                reverse(start, i)
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    void reverseWords(std::vector<char>& s) {
        // 1. 全局翻轉
        std::reverse(s.begin(), s.end());
        
        // 2. 局部翻轉
        int start = 0;
        for (int i = 0; i < s.size(); i++) {
            if (s[i] == ' ') {
                std::reverse(s.begin() + start, s.begin() + i);
                start = i + 1;
            } else if (i == s.size() - 1) {
                std::reverse(s.begin() + start, s.end());
            }
        }
    }
};
```
