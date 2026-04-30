---
title: "LeetCode #224: Basic Calculator (基本計算機)"
categories:
  - Stack
  - Math
  - String
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個字符串表達式 `s` ，請你實現一個基本計算機器件，計算並返回它的值。
注意：不允許使用任何內置的用於直接估算數學表達式的函數，比如 `eval()` 。
表達式包含：數字、`+`、`-`、`(`、`)` 和空格。

## 解題心得：棧與括號處理
這題的難點在於處理括號和負號。因為只有加減法，運算優先級相同。

**核心邏輯：**
1. **維護當前狀態**：
   - `res`：當前的累加結果。
   - `sign`：當前的正負號（1 表示加，-1 表示減）。
2. **遍歷字符串**：
   - **數字**：累加數字直到遇到非數字字符，然後 `res += sign * num`。
   - **`+` 或 `-`**：更新 `sign`。
   - **`(`**：將當前的 `res` 和 `sign` 壓入棧中，重置 `res = 0, sign = 1`。這相當於進入了一個新的計算環境。
   - **`)`**：計算完括號內的 `res` 後，彈出棧頂的符號和之前的結果，進行合併：`res = stack.pop() * res + stack.pop()`。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
class Solution:
    def calculate(self, s: str) -> int:
        stack = []
        res = 0
        num = 0
        sign = 1
        
        i = 0
        while i < len(s):
            char = s[i]
            if char.isdigit():
                num = 0
                while i < len(s) and s[i].isdigit():
                    num = num * 10 + int(s[i])
                    i += 1
                res += sign * num
                i -= 1 # 抵銷外層循環的 i += 1
            elif char == '+':
                sign = 1
            elif char == '-':
                sign = -1
            elif char == '(':
                # 壓入當前結果和符號
                stack.append(res)
                stack.append(sign)
                # 重置
                res = 0
                sign = 1
            elif char == ')':
                # 彈出括號前的符號和結果
                prev_sign = stack.pop()
                prev_res = stack.pop()
                res = prev_res + prev_sign * res
            i += 1
            
        return res
```

### C++
```cpp
#include <string>
#include <stack>

class Solution {
public:
    int calculate(std::string s) {
        std::stack<int> st;
        int res = 0;
        long long num = 0;
        int sign = 1;
        
        for (int i = 0; i < s.length(); i++) {
            char c = s[i];
            if (isdigit(c)) {
                num = 0;
                while (i < s.length() && isdigit(s[i])) {
                    num = num * 10 + (s[i] - '0');
                    i++;
                }
                res += sign * num;
                i--; 
            } else if (c == '+') {
                sign = 1;
            } else if (c == '-') {
                sign = -1;
            } else if (c == '(') {
                st.push(res);
                st.push(sign);
                res = 0;
                sign = 1;
            } else if (c == ')') {
                int prevSign = st.top(); st.pop();
                int prevRes = st.top(); st.pop();
                res = prevRes + prevSign * res;
            }
        }
        return res;
    }
};
```
