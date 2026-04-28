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

## 解題思路：回溯法 (Backtracking)
使用遞迴遍歷所有可能的字母組合。

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
