---
title: "LeetCode #336: Palindrome Pairs (迴文對)"
categories:
  - Hash Table
  - String
  - Trie
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一組唯一的單詞 `words`，找出所有不同的索引對 `(i, j)`，使得拼接後的單詞 `words[i] + words[j]` 是一個迴文串。

## 解題心得
如果使用暴力法拼接並驗證，時間複雜度為 $O(N^2 \cdot L)$，會導致逾時。我們可以使用 **前綴/字尾分割 + 雜湊表**：
1. 將所有單詞存入雜湊表，key 為單詞的反轉字串，value 為其索引。
2. 對於每個單詞 `word`，我們可以將其分割為前綴 `pref` 和字尾 `suff` 的兩部分（$O(L)$）：
   - 如果 `pref` 是迴文，且 `suff` 的反轉字串出現在雜湊表中（設索引為 `k`），則 `words[k] + word` 必為迴文。
   - 如果 `suff` 是迴文，且 `pref` 的反轉字串出現在雜湊表中（設索引為 `k`），則 `word + words[k]` 必為迴文。
3. 注意處理空字串與重複對的情況。

- **時間複雜度**: O(N \times L^2)，其中 $L$ 是單詞的平均長度
- **空間複雜度**: O(N \times L)

## 程式碼實作

### Python
```python
class Solution:
    def palindromePairs(self, words: List[str]) -> List[List[int]]:
        lookup = {word[::-1]: i for i, word in enumerate(words)}
        ans = set()
        
        for i, word in enumerate(words):
            n = len(word)
            for j in range(n + 1):
                pref = word[:j]
                suff = word[j:]
                
                if pref == pref[::-1]:
                    if suff in lookup and lookup[suff] != i:
                        ans.add((lookup[suff], i))
                if suff == suff[::-1]:
                    if pref in lookup and lookup[pref] != i:
                        ans.add((i, lookup[pref]))
                        
        return [list(p) for p in ans]
```

### C++
```cpp
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
#include <set>

class Solution {
private:
    bool isPalindrome(const std::string& s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s[i++] != s[j--]) return false;
        }
        return true;
    }

public:
    std::vector<std::vector<int>> palindromePairs(std::vector<std::string>& words) {
        std::unordered_map<std::string, int> lookup;
        for (int i = 0; i < words.size(); ++i) {
            std::string rev = words[i];
            std::reverse(rev.begin(), rev.end());
            lookup[rev] = i;
        }

        std::set<std::pair<int, int>> ans;

        for (int i = 0; i < words.size(); ++i) {
            std::string word = words[i];
            int len = word.length();
            for (int j = 0; j <= len; ++j) {
                std::string pref = word.substr(0, j);
                std::string suff = word.substr(j);

                if (isPalindrome(pref)) {
                    if (lookup.find(suff) != lookup.end() && lookup[suff] != i) {
                        ans.insert({lookup[suff], i});
                    }
                }
                if (isPalindrome(suff)) {
                    if (lookup.find(pref) != lookup.end() && lookup[pref] != i) {
                        ans.insert({i, lookup[pref]});
                    }
                }
            }
        }

        std::vector<std::vector<int>> res;
        for (auto const& p : ans) {
            res.push_back({p.first, p.second});
        }
        return res;
    }
};
```
