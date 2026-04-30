---
title: "LeetCode #241: Different Ways to Add Parentheses (為運算表達式設計優先級)"
categories:
  - Math
  - String
  - Dynamic Programming
  - Recursion
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個由數字和運算符組成的字符串 `expression` ，從中找出所有可能的組合方式，通過添加括號來改變運算的優先級，最後返回所有可能的計算結果。你可以按 **任意順序** 返回答案。

## 解題心得：分治法 (Divide and Conquer)
這題的核心思想是：對於任何一個運算符，我們可以將表達式以它為界，分成左半部分和右半部分。

**核心邏輯：**
1. **遍歷表達式**：尋找所有運算符 (`+`, `-`, `*`)。
2. **分治遞迴**：
   - 當遇到運算符時，將字符串分為 `left` 和 `right`。
   - 遞迴調用函數獲取 `left` 的所有可能結果。
   - 遞迴調用函數獲取 `right` 的所有可能結果。
   - 將兩邊的結果進行笛卡爾積組合運算。
3. **記憶化優化**：使用哈希表存儲已經計算過的子表達式結果，避免重複計算。
4. **基結準則**：如果字符串中沒有運算符，說明它是一個純數字，直接轉換並返回。

- **時間複雜度**: 指數級（卡特蘭數相關）。
- **空間複雜度**: 指數級。

## 程式碼實作

### Python
```python
class Solution:
    def diffWaysToCompute(self, expression: str) -> List[int]:
        memo = {}
        
        def solve(expr):
            if expr in memo:
                return memo[expr]
            
            res = []
            for i, char in enumerate(expr):
                if char in "+-*":
                    # 分治
                    left_results = solve(expr[:i])
                    right_results = solve(expr[i+1:])
                    
                    # 合併
                    for l in left_results:
                        for r in right_results:
                            if char == '+': res.append(l + r)
                            elif char == '-': res.append(l - r)
                            elif char == '*': res.append(l * r)
            
            # 如果是純數字
            if not res:
                res.append(int(expr))
            
            memo[expr] = res
            return res
            
        return solve(expression)
```

### C++
```cpp
#include <vector>
#include <string>
#include <unordered_map>

class Solution {
    std::unordered_map<std::string, std::vector<int>> memo;
public:
    std::vector<int> diffWaysToCompute(std::string expression) {
        if (memo.count(expression)) return memo[expression];
        
        std::vector<int> res;
        for (int i = 0; i < expression.length(); i++) {
            char c = expression[i];
            if (c == '+' || c == '-' || c == '*') {
                std::vector<int> left = diffWaysToCompute(expression.substr(0, i));
                std::vector<int> right = diffWaysToCompute(expression.substr(i + 1));
                
                for (int l : left) {
                    for (int r : right) {
                        if (c == '+') res.push_back(l + r);
                        else if (c == '-') res.push_back(l - r);
                        else if (c == '*') res.push_back(l * r);
                    }
                }
            }
        }
        
        if (res.empty()) {
            res.push_back(std::stoi(expression));
        }
        
        return memo[expression] = res;
    }
};
```
