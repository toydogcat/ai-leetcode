---
title: "LeetCode #32: Longest Valid Parentheses"
categories:
  - String
  - Dynamic Programming
  - Stack
tags:
  - Hard
  - Python
  - C++
---

## 解題思路：棧 (Stack)
我們在棧中存儲索引。初始化棧並壓入 `-1`。遇到左括號壓入索引，遇到右括號彈出棧頂並計算長度。

- **時間複雜度**: $O(n)$
- **空間複雜度**: $O(n)$

### Python
```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        stack = [-1]
        res = 0
        for i, char in enumerate(s):
            if char == '(':
                stack.append(i)
            else:
                stack.pop()
                if not stack:
                    stack.append(i)
                else:
                    res = max(res, i - stack[-1])
        return res
```

### C++
```cpp
#include <string>
#include <stack>
#include <algorithm>

class Solution {
public:
    int longestValidParentheses(std::string s) {
        std::stack<int> st;
        st.push(-1);
        int res = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s[i] == '(') {
                st.push(i);
            } else {
                st.pop();
                if (st.empty()) {
                    st.push(i);
                } else {
                    res = std::max(res, i - st.top());
                }
            }
        }
        return res;
    }
};
```
