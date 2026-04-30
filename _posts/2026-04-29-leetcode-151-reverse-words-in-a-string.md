---
title: "LeetCode #151: Reverse Words in a String (反轉字串中的單詞)"
categories:
  - String
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個字串 `s` ，請你反轉字串中 **單詞** 的順序。

**單詞** 是由非空格字元組成的序列。`s` 中至少會有一個單詞。
返回一個由單詞組成的字串，且單詞間用單個空格連接，無前導或尾隨空格。

## 解題心得：字串處理的細節
這題的核心在於如何處理多餘的空格。

**Python 的優勢**：
`s.split()` 會自動處理連續的空格、前導空格和尾隨空格，直接返回一個單詞列表。我們只需要反轉列表並用單個空格連接即可。

**C++ 的做法**：
1. **使用 stringstream**：最簡單的方法，像 Python 一樣提取單詞。
2. **原地反轉 (In-place)**：先反轉整個字串，再反轉每個單詞，最後處理多餘空格。雖然更複雜，但空間複雜度可以達到 $O(1)$ (如果忽略字串本身的空間)。

- **時間複雜度**: $O(n)$，其中 $n$ 是字串長度。
- **空間複雜度**: $O(n)$，用於存儲提取出的單詞。

## 程式碼實作

### Python
```python
class Solution:
    def reverseWords(self, s: str) -> str:
        # split() 會自動過濾掉多餘的空格
        words = s.split()
        # 反轉列表並用空格連接
        return " ".join(words[::-1])
```

### C++ (使用 stringstream)
```cpp
#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <algorithm>

class Solution {
public:
    std::string reverseWords(std::string s) {
        std::stringstream ss(s);
        std::string word;
        std::vector<std::string> words;
        
        // 提取每個單詞
        while (ss >> word) {
            words.push_back(word);
        }
        
        // 反轉單詞列表
        std::reverse(words.begin(), words.end());
        
        // 拼接成結果字串
        std::string result = "";
        for (int i = 0; i < words.size(); ++i) {
            result += words[i];
            if (i != words.size() - 1) {
                result += " ";
            }
        }
        return result;
    }
};
```
