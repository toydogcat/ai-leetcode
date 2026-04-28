---
title: "LeetCode #22: Generate Parentheses"
categories:
  - String
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
數字 `n` 代表生成括號的對數，請你設計一個函數，用於能夠生成所有可能的並且 **有效的** 括號組合。

## 解題心得：左右開弓的平衡術
這題是回溯算法中非常直觀的一題。

**核心邏輯：**
1. **兩個計數器**：記錄目前用了幾個「左括號」(`left`) 和幾個「右括號」(`right`)。
2. **規則 1：左邊優先**：只要左括號還沒用完（`left < n`），我們就可以放左括號。
3. **規則 2：右邊必須配對**：只有在「右括號的數量小於左括號」時，我們才能放右括號。這樣保證了每一個右括號都有一個對應的左括號在前面等著它。
4. **結束條件**：當左括號和右括號都用到 `n` 個時，一組有效的組合就誕生了。

這就像是在排雙人舞。你隨時可以請一位女生（左括號）入場，但只有在女生比男生多的時候，你才能請一位男生（右括號）入場，這樣才能保證每位男生都能牽到一位女生的手。

### Python
```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []
        def backtrack(s, left, right):
            if len(s) == 2 * n:
                res.append(s)
                return
            if left < n:
                backtrack(s + '(', left + 1, right)
            if right < left:
                backtrack(s + ')', left, right + 1)
        backtrack("", 0, 0)
        return res
```

### C++
```cpp
#include <vector>
#include <string>

class Solution {
public:
    std::vector<std::string> generateParenthesis(int n) {
        std::vector<std::string> res;
        backtrack(res, "", 0, 0, n);
        return res;
    }
    void backtrack(std::vector<std::string>& res, std::string s, int left, int right, int n) {
        if (s.length() == 2 * n) {
            res.push_back(s);
            return;
        }
        if (left < n) backtrack(res, s + '(', left + 1, right, n);
        if (right < left) backtrack(res, s + ')', left, right + 1, n);
    }
};
```
