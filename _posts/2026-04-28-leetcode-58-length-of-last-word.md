---
title: "LeetCode #58: Length of Last Word"
categories:
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一個字符串 `s`，由若干單詞組成，單詞前後用一些空格隔開。返回字符串中 **最後一個** 單詞的長度。

## 解題心得：從後往前看
這題最簡單的做法是直接用語言內建的 `split()`，但如果想寫得更優雅，可以自己遍歷。

**核心邏輯：**
1. **忽略結尾空格**：從最後一個字元開始往回走，跳過所有空格，直到看到第一個字母。
2. **計算長度**：繼續往回走並計數，直到再次看到空格或走到頭。
3. **返回計數**：這就是最後一個單詞的長度。

### Python
```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        return len(s.split()[-1])
```

### C++
```cpp
#include <string>

class Solution {
public:
    int lengthOfLastWord(std::string s) {
        int length = 0;
        int i = s.length() - 1;
        while (i >= 0 && s[i] == ' ') i--;
        while (i >= 0 && s[i] != ' ') {
            length++;
            i--;
        }
        return length;
    }
};
```
