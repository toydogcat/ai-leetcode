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

## 題目描述
給你一個只包含 `'('` 和 `')'` 的字符串，找出最長有效（格式正確且連續）括號子串的長度。

## 解題心得：括號的「配對成功」之旅
這是一道 Hard 題。要把括號配對好並不難（用棧 Stack 就行），但要找「最長連續」的配對就需要一點技巧。

**核心邏輯：棧 (Stack) 的妙用**
1. **墊腳石**：我們在棧底先放一個 `-1`。這是一個「虛擬的邊界」，用來幫我們計算長度。
2. **遇到左括號 `(`**：我們把它的索引（位置）放進棧裡。
3. **遇到右括號 `)`**：
   - 先把棧頂拿掉（模擬一次配對）。
   - 如果棧空了，說明這個右括號「落單了」，沒人跟它配對。我們把它的索引放進棧，當作新的「邊界」。
   - 如果棧沒空，說明配對成功！當前長度 = `現在的位置 - 棧頂的位置`。

這就像是在拉手，左手先舉起來，右手來牽。如果右手牽到了人，我們就量一下這段距離有多長。如果右手沒牽到人反而落單了，那它就變成下一個計量的起點。

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
