---
title: "LeetCode #139: Word Break"
categories:
  - Dynamic Programming
  - Hash Table
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個字符串 `s` 和一個字符串列表 `wordDict` 作為字典。請你判斷是否利用字典中出現的單詞拼接出 `s` 。

## 解題心得：斷句的可能性
這是一個典型的 **動態規劃 (DP)** 問題。
設 `dp[i]` 為字符串 `s` 的前 `i` 個字符是否可以被成功切分。

**狀態轉移：**
對於每個 `dp[i]`，我們檢查 `j < i` 的所有位置：
如果 `dp[j]` 為真，且子串 `s[j...i-1]` 在字典中，那麼 `dp[i]` 也為真。

### Python
```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        word_set = set(wordDict)
        dp = [False] * (len(s) + 1)
        dp[0] = True # 空字串可以被切分
        
        for i in range(1, len(s) + 1):
            for j in range(i):
                if dp[j] and s[j:i] in word_set:
                    dp[i] = True
                    break
                    
        return dp[len(s)]
```

### C++
```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> word_set(wordDict.begin(), wordDict.end());
        vector<bool> dp(s.length() + 1, false);
        dp[0] = true;
        
        for (int i = 1; i <= s.length(); ++i) {
            for (int j = 0; j < i; ++j) {
                if (dp[j] && word_set.count(s.substr(j, i - j))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
};
```
