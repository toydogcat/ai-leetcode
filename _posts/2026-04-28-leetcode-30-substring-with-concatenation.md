---
title: "LeetCode #30: Substring with Concatenation of All Words"
categories:
  - String
  - Sliding Window
  - Hash Table
tags:
  - Hard
  - Python
  - C++
---

## 解題思路
利用滑動窗口。所有單詞長度相同是關鍵。我們遍歷字串，每次移動一個單詞長度。

- **時間複雜度**: $O(n \cdot k)$，其中 $k$ 是單詞長度。

### Python
```python
from collections import Counter
class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        if not s or not words: return []
        word_len = len(words[0])
        all_len = len(words) * word_len
        count = Counter(words)
        res = []
        for i in range(len(s) - all_len + 1):
            tmp_s = s[i:i+all_len]
            tmp_words = [tmp_s[j:j+word_len] for j in range(0, all_len, word_len)]
            if Counter(tmp_words) == count:
                res.append(i)
        return res
```

### C++
```cpp
#include <vector>
#include <string>
#include <unordered_map>

class Solution {
public:
    std::vector<int> findSubstring(std::string s, std::vector<std::string>& words) {
        if (s.empty() || words.empty()) return {};
        int wordLen = words[0].length();
        int wordCount = words.size();
        int totalLen = wordLen * wordCount;
        std::unordered_map<std::string, int> count;
        for (const std::string& w : words) count[w]++;
        
        std::vector<int> res;
        for (int i = 0; i <= (int)s.length() - totalLen; i++) {
            std::unordered_map<std::string, int> seen;
            int j = 0;
            for (; j < wordCount; j++) {
                std::string word = s.substr(i + j * wordLen, wordLen);
                if (count.find(word) != count.end()) {
                    seen[word]++;
                    if (seen[word] > count[word]) break;
                } else break;
            }
            if (j == wordCount) res.push_back(i);
        }
        return res;
    }
};
```
