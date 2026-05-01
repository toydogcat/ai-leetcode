---
title: "LeetCode #282: Expression Add Operators (給表達式添加運算符)"
categories:
  - Backtracking
  - Math
  - String
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個只包含數字的字串 `num` 和一個目標值 `target`，請在數字之間添加 `+`、`-` 或 `*` 運算符，返回所有能夠使表達式計算結果等於 `target` 的有效表達式。

**注意**：運算數不能包含前導零（例如 `"05"` 是不合法的，但 `"0"` 是合法的）。

**範例 1:**
```
輸入: num = "123", target = 6
輸出: ["1+2+3", "1*2*3"]
```

**範例 2:**
```
輸入: num = "232", target = 8
輸出: ["2*3+2", "2+3*2"]
```

**範例 3:**
```
輸入: num = "105", target = 5
輸出: ["1*0+5","10-5"]
```

## 解題心得：回溯法與乘法優先權處理
這是一道難度較高的回溯法題目，最大的挑戰在於處理乘法運算符 `*` 的運算優先級問題。

**核心邏輯**：
1. **定義回溯函數狀態**：`backtrack(index, prev_val, current_eval, path)`
   - `index`：當前處理字串的位置。
   - `prev_val`：前一個操作數的值（處理乘法時需要回退）。
   - `current_eval`：當前整個表達式的計算結果。
   - `path`：目前構造的表達式字串。
2. **枚舉操作數**：從 `index` 開始提取一個數字。為防止前導零，如果該數字為 `'0'`，則不能繼續提取更多位。
3. **分情況處理運算符**：
   - 如果是表達式的第一個數字：直接遞迴，不添加任何運算符。
   - **加法 `+`**：`current_eval + val`，`prev_val = val`。
   - **減法 `-`**：`current_eval - val`，`prev_val = -val`。
   - **乘法 `*`**：因為乘法的優先權高於加減法，我們需要將前一步加進去（或扣掉）的 `prev_val` 回退，並先將其與當前操作數相乘。
     - 公式：`current_eval - prev_val + prev_val * val`
     - 更新 `prev_val` 為 `prev_val * val`。

- **時間複雜度**: $O(4^N)$。每個位置有 4 種選擇（`+`, `-`, `*`, 或繼續連接）。
- **空間複雜度**: $O(N)$，回溯呼叫堆疊深度。

## 程式碼實作

### Python
```python
class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:
        res = []
        
        def backtrack(index, prev_val, current_eval, path):
            if index == len(num):
                if current_eval == target:
                    res.append(path)
                return
                
            for i in range(index, len(num)):
                # 去除前導零的情況
                if i > index and num[index] == '0':
                    break
                    
                sub_str = num[index : i + 1]
                val = int(sub_str)
                
                if index == 0:
                    # 第一個數字
                    backtrack(i + 1, val, val, sub_str)
                else:
                    # 測試 '+'
                    backtrack(i + 1, val, current_eval + val, path + "+" + sub_str)
                    # 測試 '-'
                    backtrack(i + 1, -val, current_eval - val, path + "-" + sub_str)
                    # 測試 '*'
                    backtrack(i + 1, prev_val * val, current_eval - prev_val + prev_val * val, path + "*" + sub_str)
                    
        backtrack(0, 0, 0, "")
        return res
```

### C++
```cpp
#include <vector>
#include <string>

class Solution {
private:
    std::vector<std::string> res;
    std::string s;
    long long targetVal;

    void backtrack(int index, long long prevVal, long long currentEval, std::string path) {
        if (index == s.length()) {
            if (currentEval == targetVal) {
                res.push_back(path);
            }
            return;
        }

        for (int i = index; i < s.length(); ++i) {
            if (i > index && s[index] == '0') break;

            std::string subStr = s.substr(index, i - index + 1);
            long long val = std::stoll(subStr);

            if (index == 0) {
                backtrack(i + 1, val, val, subStr);
            } else {
                backtrack(i + 1, val, currentEval + val, path + "+" + subStr);
                backtrack(i + 1, -val, currentEval - val, path + "-" + subStr);
                backtrack(i + 1, prevVal * val, currentEval - prevVal + prevVal * val, path + "*" + subStr);
            }
        }
    }

public:
    std::vector<std::string> addOperators(std::string num, int target) {
        res.clear();
        s = num;
        targetVal = target;
        if (num.empty()) return res;

        backtrack(0, 0, 0, "");
        return res;
    }
};
```
