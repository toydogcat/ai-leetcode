---
title: "LeetCode #131: Palindrome Partitioning"
categories:
  - Backtracking
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個字符串 `s`，請你將 `s` 分割成一些子串，使每個子串都是 **迴文串** 。返回 `s` 所有可能的分割方案。

## 解題心得：切西瓜的藝術
這題是一個經典的 **回溯 (Backtracking)** 問題。
1. **遍歷切割點：** 從第一個字符開始，嘗試每一個可能的切割長度。
2. **檢查迴文：** 如果切下來的前半部分是迴文，那麼我們就對剩餘的部分遞迴進行同樣的操作。
3. **收集結果：** 當我們處理完整個字符串時，說明找到了一種合法的分割方式。

### Python
```python
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        res = []
        
        def backtrack(start, path):
            if start == len(s):
                res.append(list(path))
                return
            
            for end in range(start + 1, len(s) + 1):
                substring = s[start:end]
                # 檢查是否為迴文
                if substring == substring[::-1]:
                    path.append(substring)
                    backtrack(end, path)
                    path.pop() # 回溯
                    
        backtrack(0, [])
        return res
```

### C++
```cpp
class Solution {
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> res;
        vector<string> path;
        backtrack(s, 0, path, res);
        return res;
    }
    
    void backtrack(string& s, int start, vector<string>& path, vector<vector<string>>& res) {
        if (start == s.length()) {
            res.push_back(path);
            return;
        }
        
        for (int end = start; end < s.length(); ++end) {
            if (isPalindrome(s, start, end)) {
                path.push_back(s.substr(start, end - start + 1));
                backtrack(s, end + 1, path, res);
                path.pop_back();
            }
        }
    }
    
    bool isPalindrome(string& s, int left, int right) {
        while (left < right) {
            if (s[left++] != s[right--]) return false;
        }
        return true;
    }
};
```
