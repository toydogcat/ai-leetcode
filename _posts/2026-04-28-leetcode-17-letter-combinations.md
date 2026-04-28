---
title: "LeetCode #17: Letter Combinations of a Phone Number"
categories:
  - String
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個僅包含數字 `2-9` 的字符串，返回所有它能表示的字母組合。答案可以按 **任意順序** 返回。給出數字到字母的映射如下（與電話按鍵相同）。注意 1 不對應任何字母。

## 解題心得：九宮格鍵盤的秘密
這題是「回溯算法」中非常生動的一個應用。

**核心邏輯：**
1. **建立映射表**：比如 2 對應 "abc"，3 對應 "def"。
2. **決策樹**：
   - 當你按下第一個數字時，你有幾個選擇（比如 2 有 a, b, c 三種可能）。
   - 選了一個之後，再去處理下一個數字。
3. **路徑記錄**：我們一直往下走，直到「拼出的字母長度」等於「輸入的數字個數」，就得到了一組答案。

這就像是你以前用老式手機打簡訊（或是現在的注音輸入法），每按一個數字，螢幕就會列出各種可能的字母組合。我們就是在電腦裡模擬這個「所有可能都列出來」的過程。

- **時間複雜度**: $O(3^N \times 4^M)$，其中 $N$ 是對應 3 個字母的數字個數，$M$ 是對應 4 個字母的數字個數。
- **空間複雜度**: $O(N+M)$ (遞迴深度)。

### Python
```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits: return []
        phone = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', 
                 '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'}
        res = []
        def backtrack(index, path):
            if index == len(digits):
                res.append(path)
                return
            for char in phone[digits[index]]:
                backtrack(index + 1, path + char)
        backtrack(0, "")
        return res
```

### C++
```cpp
#include <vector>
#include <string>
#include <unordered_map>

class Solution {
    std::unordered_map<char, std::string> phone = {
        {'2', "abc"}, {'3', "def"}, {'4', "ghi"}, {'5', "jkl"},
        {'6', "mno"}, {'7', "pqrs"}, {'8', "tuv"}, {'9', "wxyz"}
    };
    std::vector<std::string> res;

public:
    std::vector<std::string> letterCombinations(std::string digits) {
        if (digits.empty()) return {};
        backtrack(0, "", digits);
        return res;
    }

    void backtrack(int index, std::string path, const std::string& digits) {
        if (index == digits.length()) {
            res.push_back(path);
            return;
        }
        for (char c : phone[digits[index]]) {
            backtrack(index + 1, path + c, digits);
        }
    }
};
```
