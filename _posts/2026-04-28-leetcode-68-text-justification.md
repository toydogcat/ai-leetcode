---
title: "LeetCode #68: Text Justification"
categories:
  - String
tags:
  - Hard
  - Python
  - C++
---

## 解題思路
貪心算法逐行處理。計算空格分配：平均分配後，剩餘的空格從左往右分配。

### Python
```python
class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        res, cur, num_of_letters = [], [], 0
        for w in words:
            if num_of_letters + len(w) + len(cur) > maxWidth:
                for i in range(maxWidth - num_of_letters):
                    cur[i % (len(cur) - 1 or 1)] += ' '
                res.append(''.join(cur))
                cur, num_of_letters = [], 0
            cur += [w]
            num_of_letters += len(w)
        return res + [' '.join(cur).ljust(maxWidth)]
```

### C++
```cpp
#include <vector>
#include <string>

class Solution {
public:
    std::vector<std::string> fullJustify(std::vector<std::string>& words, int maxWidth) {
        std::vector<std::string> res;
        int i = 0;
        while (i < words.size()) {
            int j = i + 1;
            int lineLen = words[i].length();
            while (j < words.size() && lineLen + words[j].length() + (j - i) <= maxWidth) {
                lineLen += words[j].length();
                j++;
            }
            std::string line = words[i];
            int numWords = j - i;
            if (j == words.size() || numWords == 1) {
                for (int k = i + 1; k < j; k++) line += " " + words[k];
                line += std::string(maxWidth - line.length(), ' ');
            } else {
                int spaces = (maxWidth - lineLen) / (numWords - 1);
                int extra = (maxWidth - lineLen) % (numWords - 1);
                for (int k = i + 1; k < j; k++) {
                    line += std::string(spaces + (k - i <= extra ? 1 : 0), ' ') + words[k];
                }
            }
            res.push_back(line);
            i = j;
        }
        return res;
    }
};
```
