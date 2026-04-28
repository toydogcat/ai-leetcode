---
title: "LeetCode #150: Evaluate Reverse Polish Notation"
categories:
  - Stack
  - Array
  - Math
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
根據 **逆波蘭表示法**（後綴表示法），求表達式的值。
有效的算符包括 `+`、`-`、`*`、`/` 。每個運算對象可以是整數，也可以是另一個逆波蘭表達式。

## 解題心得：棧的運算場
逆波蘭表示法（RPN）是 **棧 (Stack)** 最直觀的應用之一：
1. 遍歷表達式。
2. 如果遇到 **數字**，將其入棧。
3. 如果遇到 **運算符**，從棧中彈出兩個數字（先彈出的是右操作數，後彈出的是左操作數），進行運算後將結果重新入棧。
4. 最後棧中剩下的唯一數字就是結果。

### Python
```python
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        for t in tokens:
            if t in "+-*/":
                b = stack.pop()
                a = stack.pop()
                if t == '+': stack.append(a + b)
                elif t == '-': stack.append(a - b)
                elif t == '*': stack.append(a * b)
                else: 
                    # Python 的 // 是向下取整，題目要求向零取整
                    stack.append(int(a / b))
            else:
                stack.append(int(t))
        return stack[0]
```

### C++
```cpp
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<long> s;
        for (string& t : tokens) {
            if (t == "+" || t == "-" || t == "*" || t == "/") {
                long b = s.top(); s.pop();
                long a = s.top(); s.pop();
                if (t == "+") s.push(a + b);
                else if (t == "-") s.push(a - b);
                else if (t == "*") s.push(a * b);
                else s.push(a / b);
            } else {
                s.push(stol(t));
            }
        }
        return s.top();
    }
};
```
