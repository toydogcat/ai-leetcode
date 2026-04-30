---
title: "LeetCode #227: Basic Calculator II (基本計算機 II)"
categories:
  - Stack
  - Math
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個字符串表達式 `s` ，請你實現一個基本計算機器件，計算並返回它的值。
表達式包含：數字、`+`、`-`、`*`、`/` 和空格。
整數除法應當捨去小數部分。

## 解題心得：棧處理運算優先級
這題沒有括號，但引入了乘除法。乘除法的優先級高於加減法。

**核心邏輯：**
1. **遍歷字符串**：記錄前一個運算符 `last_op` (初始為 `+`)。
2. **處理數字與運算符**：
   - 如果當前字符是數字，解析出完整數字 `num`。
   - 如果當前字符是運算符（或遍歷到最後一個字符）：
     - 如果 `last_op` 是 `+`：將 `num` 壓入棧。
     - 如果 `last_op` 是 `-`：將 `-num` 壓入棧。
     - 如果 `last_op` 是 `*`：彈出棧頂元素，與 `num` 相乘後重新壓入。
     - 如果 `last_op` 是 `/`：彈出棧頂元素，與 `num` 相除後重新壓入。
     - 更新 `last_op` 為當前字符，重置 `num = 0`。
3. **最後結果**：棧中所有元素的總和。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
class Solution:
    def calculate(self, s: str) -> int:
        stack = []
        num = 0
        last_op = '+'
        s = s.strip()
        
        for i, char in enumerate(s):
            if char.isdigit():
                num = num * 10 + int(char)
            
            if char in "+-*/" or i == len(s) - 1:
                if last_op == '+':
                    stack.append(num)
                elif last_op == '-':
                    stack.append(-num)
                elif last_op == '*':
                    stack.append(stack.pop() * num)
                elif last_op == '/':
                    # Python 的負數除法與 C++ 不同，需使用 int() 向 0 取整
                    stack.append(int(stack.pop() / num))
                
                last_op = char
                num = 0
                
        return sum(stack)
```

### C++
```cpp
#include <string>
#include <vector>
#include <numeric>

class Solution {
public:
    int calculate(std::string s) {
        std::vector<int> stack;
        int num = 0;
        char lastOp = '+';
        
        for (int i = 0; i < s.length(); i++) {
            if (isdigit(s[i])) {
                num = num * 10 + (s[i] - '0');
            }
            
            if ((!isdigit(s[i]) && s[i] != ' ') || i == s.length() - 1) {
                if (lastOp == '+') {
                    stack.push_back(num);
                } else if (lastOp == '-') {
                    stack.push_back(-num);
                } else if (lastOp == '*') {
                    stack.back() *= num;
                } else if (lastOp == '/') {
                    stack.back() /= num;
                }
                lastOp = s[i];
                num = 0;
            }
        }
        
        int res = 0;
        for (int x : stack) res += x;
        return res;
    }
};
```
