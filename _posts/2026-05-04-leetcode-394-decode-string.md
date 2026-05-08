---
title: "LeetCode #394: Decode String (字串解碼)"
categories:
  - String
  - Stack
  - Recursion
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個經過編碼的字串，返回它解碼後的字串。編碼規則為: `k[encoded_string]`。

## 解題心得
使用 **輔助堆疊**：
- 維護當前數字 `curr_num` 與當前字串 `curr_str`。
- 遇到數字時，累加計算 `curr_num`。
- 遇到 `[` 時，將 `curr_str` 和 `curr_num` 壓入堆疊，並重置。
- 遇到 `]` 時，彈出堆疊中的前一個字串與倍數，將其拼接：`curr_str = prev_str + num * curr_str`。

- **時間複雜度**: O(S) 其中 S 是解碼後的字串長度
- **空間複雜度**: O(S)

## 程式碼實作

### Python
```python
class Solution:
    def decodeString(self, s: str) -> str:
        stack = []
        curr_str = ""
        curr_num = 0
        
        for char in s:
            if char.isdigit():
                curr_num = curr_num * 10 + int(char)
            elif char == '[':
                stack.append((curr_str, curr_num))
                curr_str = ""
                curr_num = 0
            elif char == ']':
                prev_str, num = stack.pop()
                curr_str = prev_str + num * curr_str
            else:
                curr_str += char
                
        return curr_str
```

### C++
```cpp
#include <string>
#include <stack>
#include <cctype>

class Solution {
public:
    std::string decodeString(std::string s) {
        std::stack<std::pair<std::string, int>> stack;
        std::string curr_str = "";
        int curr_num = 0;

        for (char c : s) {
            if (std::isdigit(c)) {
                curr_num = curr_num * 10 + (c - '0');
            } else if (c == '[') {
                stack.push({curr_str, curr_num});
                curr_str = "";
                curr_num = 0;
            } else if (c == ']') {
                auto [prev_str, num] = stack.top();
                stack.pop();
                std::string temp = "";
                for (int i = 0; i < num; ++i) {
                    temp += curr_str;
                }
                curr_str = prev_str + temp;
            } else {
                curr_str += c;
            }
        }
        return curr_str;
    }
};
```
