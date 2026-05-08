---
title: "LeetCode #385: Mini Parser (微型解析器)"
categories:
  - String
  - Stack
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個由字串表示的巢狀列表，將其解析並返回一個 `NestedInteger`。

## 解題心得
使用 **堆疊** 來處理巢狀：
- 遍歷字串，並使用數字與正負號解析出整數。
- 遇到 `[`，代表一個新列表的開始，建立一個新的列表型 `NestedInteger` 並將其壓入堆疊。
- 遇到數字，加入到堆疊頂端的列表中。
- 遇到 `]`，說明當前列表解析完畢，將其彈出；若堆疊不為空，將其加入到新的堆疊頂端列表中。

- **時間複雜度**: O(N)
- **空間複雜度**: O(D) 巢狀深度

## 程式碼實作

### Python
```python
class Solution:
    def deserialize(self, s: str) -> NestedInteger:
        if not s: return NestedInteger()
        if s[0] != '[':
            return NestedInteger(int(s))
            
        stack = []
        num = 0
        sign = 1
        is_num = False
        
        for char in s:
            if char == '-':
                sign = -1
            elif char.isdigit():
                num = num * 10 + int(char)
                is_num = True
            elif char == '[':
                stack.append(NestedInteger())
            elif char in ',]':
                if is_num:
                    stack[-1].add(NestedInteger(sign * num))
                    num = 0
                    sign = 1
                    is_num = False
                if char == ']' and len(stack) > 1:
                    popped = stack.pop()
                    stack[-1].add(popped)
                    
        return stack[0]
```

### C++
```cpp
#include <string>
#include <stack>
#include <cctype>

class Solution {
public:
    NestedInteger deserialize(std::string s) {
        if (s.empty()) return NestedInteger();
        if (s[0] != '[') return NestedInteger(std::stoi(s));

        std::stack<NestedInteger> stack;
        int num = 0;
        int sign = 1;
        bool is_num = false;

        for (char c : s) {
            if (c == '-') {
                sign = -1;
            } else if (std::isdigit(c)) {
                num = num * 10 + (c - '0');
                is_num = true;
            } else if (c == '[') {
                stack.push(NestedInteger());
            } else if (c == ',' || c == ']') {
                if (is_num) {
                    stack.top().add(NestedInteger(sign * num));
                    num = 0;
                    sign = 1;
                    is_num = false;
                }
                if (c == ']' && stack.size() > 1) {
                    auto popped = stack.top();
                    stack.pop();
                    stack.top().add(popped);
                }
            }
        }
        return stack.top();
    }
};
```
