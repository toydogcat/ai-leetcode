---
title: "LeetCode #14: Longest Common Prefix"
categories:
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
編寫一個函數來查找字符串數組中的最長公共前綴。如果不存在公共前綴，返回空字符串 `""`。

## 解題心得：最嚴格的領頭羊
公共前綴，就是所有單詞開頭都必須一模一樣的部分。

**核心邏輯：**
1. **以第一個為標竿**：我們先假設第一個單詞就是最長前綴。
2. **不斷縮小範圍**：拿這個前綴去跟第二個、第三個...單詞對比。
   - 如果對比發現對不上，我們就把前綴「砍掉最後一個字」，再試一次。
   - 直到所有單詞開頭都包含這個前綴，或是砍到變空字串為止。

這就像是在找一群人的共同愛好。我們拿第一個人的愛好清單去問大家。只要有人不喜歡其中一項，我們就把它劃掉，最後剩下的就是大家公認的愛好。

### Python
```python
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        if not strs: return ""
        for i in range(len(strs[0])):
            for string in strs[1:]:
                if i == len(string) or string[i] != strs[0][i]:
                    return strs[0][:i]
        return strs[0]
```

### C++
```cpp
#include <string>
#include <vector>

class Solution {
public:
    std::string longestCommonPrefix(std::vector<std::string>& strs) {
        if (strs.empty()) return "";
        for (int i = 0; i < strs[0].length(); i++) {
            for (int j = 1; j < strs.size(); j++) {
                if (i == strs[j].length() || strs[j][i] != strs[0][i]) {
                    return strs[0].substr(0, i);
                }
            }
        }
        return strs[0];
    }
};
```
