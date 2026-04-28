---
title: "LeetCode #20: Valid Parentheses"
categories:
  - Stack
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判斷字符串是否有效。有效字符串需滿足：
1. 左括號必須用相同類型的右括號閉合。
2. 左括號必須以正確的順序閉合。

## 解題心得：後進先出的配對遊戲
這是學習「棧 (Stack)」數據結構最經典的入門題。

**核心邏輯：**
1. **遇到左括號**：把它們通通丟進棧裡「存起來」。
2. **遇到右括號**：
   - 看看棧頂（也就是最近一個放進去的左括號）是不是跟它「對得上」？
   - 如果對得上，就把棧頂拿掉（配對成功）。
   - 如果對不上，或者棧已經空了（沒人跟它配對），那就無效。
3. **最後檢查**：全部走完後，如果棧是空的，說明大家都配對成功了。

這就像是去餐廳寄物，你（左括號）進去時領了一個號碼牌（存進棧）。出來時（右括號）要拿正確的牌子才能取回東西。如果你拿的牌子對不上，或是根本沒牌子領，那就有問題了。

### Python
```python
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for char in s:
            if char in mapping:
                top = stack.pop() if stack else '#'
                if mapping[char] != top:
                    return False
            else:
                stack.append(char)
        return not stack
```

### C++
```cpp
#include <stack>
#include <unordered_map>
#include <string>

class Solution {
public:
    bool isValid(std::string s) {
        std::stack<char> st;
        std::unordered_map<char, char> mapping = {
            {')', '('}, {'}', '{'}, {']', '['}
        };
        for (char c : s) {
            if (mapping.count(c)) {
                if (st.empty() || st.top() != mapping[c]) return false;
                st.pop();
            } else {
                st.push(c);
            }
        }
        return st.empty();
    }
};
```
