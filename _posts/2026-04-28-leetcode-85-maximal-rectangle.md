---
title: "LeetCode #85: Maximal Rectangle"
categories:
  - Matrix
  - Stack
tags:
  - Hard
  - Python
  - C++
---

## 解題思路
將矩陣的每一行看作是 84 題中的柱狀圖，逐行更新高度並調用 84 題的解法。

### Python
```python
class Solution:
    def maximalRectangle(self, matrix: List[List[str]]) -> int:
        if not matrix: return 0
        n = len(matrix[0])
        heights = [0] * (n + 1)
        res = 0
        for row in matrix:
            for i in range(n):
                heights[i] = heights[i] + 1 if row[i] == '1' else 0
            stack = [-1]
            for i in range(n + 1):
                while heights[i] < heights[stack[-1]]:
                    h = heights[stack.pop()]
                    w = i - stack[-1] - 1
                    res = max(res, h * w)
                stack.append(i)
        return res
```

### C++
```cpp
#include <vector>
#include <stack>
#include <algorithm>

class Solution {
public:
    int maximalRectangle(std::vector<std::vector<char>>& matrix) {
        if (matrix.empty()) return 0;
        int n = matrix[0].size();
        std::vector<int> heights(n + 1, 0);
        int res = 0;
        for (auto& row : matrix) {
            for (int i = 0; i < n; i++) {
                heights[i] = (row[i] == '1') ? heights[i] + 1 : 0;
            }
            std::stack<int> st;
            st.push(-1);
            for (int i = 0; i <= n; i++) {
                while (st.top() != -1 && heights[i] < heights[st.top()]) {
                    int h = heights[st.top()]; st.pop();
                    int w = i - st.top() - 1;
                    res = std::max(res, h * w);
                }
                st.push(i);
            }
        }
        return res;
    }
};
```
