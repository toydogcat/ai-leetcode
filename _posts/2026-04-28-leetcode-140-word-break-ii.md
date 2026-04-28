---
title: "LeetCode #140: Word Break II"
categories:
  - Backtracking
  - Hash Table
  - Dynamic Programming
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個字符串 `s` 和一個字符串列表 `wordDict` ，在 `s` 中增加空格來構建一個句子，使得句子中所有的單詞都在詞典中。返回所有這些可能的句子。

## 解題心得：斷句的清單
這題是 #139 的進階版。由於需要列出所有可能的句子，我們使用 **回溯法 (Backtracking)**，並結合 **記憶化搜索 (Memoization)** 來避免重複計算。

我們定義一個 `memo`，記錄 `s[i:]` 能構成的所有合法句子列表。

### Python
```python
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        word_set = set(wordDict)
        memo = {}
        
        def backtrack(start):
            if start in memo: return memo[start]
            if start == len(s): return [""]
            
            res = []
            for end in range(start + 1, len(s) + 1):
                word = s[start:end]
                if word in word_set:
                    sub_sentences = backtrack(end)
                    for sub in sub_sentences:
                        if sub == "":
                            res.append(word)
                        else:
                            res.append(word + " " + sub)
            
            memo[start] = res
            return res
            
        return backtrack(0)
```

### C++
```cpp
class Solution {
public:
    unordered_map<int, vector<string>> memo;
    unordered_set<string> word_set;
    
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        for (string& w : wordDict) word_set.insert(w);
        return backtrack(s, 0);
    }
    
    vector<string> backtrack(string& s, int start) {
        if (memo.count(start)) return memo[start];
        if (start == s.length()) return {""};
        
        vector<string> res;
        for (int end = start + 1; end <= s.length(); ++end) {
            string word = s.substr(start, end - start);
            if (word_set.count(word)) {
                vector<string> sub_sentences = backtrack(s, end);
                for (string& sub : sub_sentences) {
                    res.push_back(word + (sub.empty() ? "" : " ") + sub);
                }
            }
        }
        
        return memo[start] = res;
    }
};
```
