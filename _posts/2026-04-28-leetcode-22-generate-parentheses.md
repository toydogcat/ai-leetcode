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

## 解題思路：回溯法
我們需要生成所有有效的括號組合。有效的條件是：
1. 左括號數量不能超過 `n`。
2. 右括號數量不能超過當前已有的左括號數量。

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
