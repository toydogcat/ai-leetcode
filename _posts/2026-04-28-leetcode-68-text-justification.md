---
title: "LeetCode #68: Text Justification"
categories:
  - String
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個單詞數組 `words` 和一個長度 `maxWidth` ，重新排版單詞，使其成為每行恰好有 `maxWidth` 個字符，且左右兩端對齊的文本。

## 解題心得：排字工人的邏輯
這題是 Hard 難度，難點在於 **「極其繁瑣的空格分配規則」**。

**規則拆解：**
1. **貪心塞入**：每一行盡量塞入最多的單詞，單詞間至少空一格。
2. **對齊規則 (最難點)**：
   - 如果這行只有一個單詞，那就靠左對齊，剩下的補空格。
   - 如果這行是最後一行，也是靠左對齊，單詞間只留一格。
   - **一般情況**：剩餘的總空格要平均分給單詞間。如果分不均勻，**左邊的間隙要比右邊多**。
3. **分配技巧**：我們算出總共有多少空格，然後用取模 (`%`) 的方式，把多出來的空格一個個從左往右撒下去。

這題不考演算法，考的是你能不能把複雜的要求轉化為嚴密的邏輯代碼。

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
