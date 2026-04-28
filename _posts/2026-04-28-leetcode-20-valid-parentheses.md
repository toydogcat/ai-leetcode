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

## 解題思路：棧 (Stack)
遍歷字串，遇到左括號入棧，遇到右括號則檢查棧頂是否匹配。

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
