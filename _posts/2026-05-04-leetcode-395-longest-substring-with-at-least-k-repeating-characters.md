---
title: "LeetCode #395: Longest Substring with At Least K Repeating Characters (至少有 K 個重複字元的最長子字串)"
categories:
  - Hash Table
  - String
  - Sliding Window
  - Divide and Conquer
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
找出最長子字串的長度，使得該子字串中的每個字元出現次數都不少於 `k`。

## 解題心得
使用 **分治法 (Divide and Conquer)**：
- 統計當前字串每個字元的頻率。
- 尋找出現次數小於 `k` 的字元。這些字元絕對不能出現在任何合法子字串中。
- 以這些字元為分界點，將字串切割成數個子字串，遞迴求解，取其最大值。
- 若所有字元出現次數均大於等於 `k`，則當前字串長度即為答案。

- **時間複雜度**: O(N) 遞迴深度最多為 26（字元集大小）
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
class Solution:
    def longestSubstring(self, s: str, k: int) -> int:
        if len(s) < k: return 0
        
        # 尋找頻率低於 k 的字元
        for char in set(s):
            if s.count(char) < k:
                return max(self.longestSubstring(sub, k) for sub in s.split(char))
                
        return len(s)
```

### C++
```cpp
#include <string>
#include <vector>
#include <algorithm>
#include <unordered_set>

class Solution {
public:
    int longestSubstring(std::string s, int k) {
        if (s.length() < k) return 0;

        std::vector<int> counts(26, 0);
        for (char c : s) counts[c - 'a']++;

        for (int i = 0; i < s.length(); ++i) {
            if (counts[s[i] - 'a'] < k) {
                int left = longestSubstring(s.substr(0, i), k);
                // 跳過多個不合法的字元以加速
                int next_idx = i + 1;
                while (next_idx < s.length() && counts[s[next_idx] - 'a'] < k) {
                    next_idx++;
                }
                int right = longestSubstring(s.substr(next_idx), k);
                return std::max(left, right);
            }
        }
        return s.length();
    }
};
```
