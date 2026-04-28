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

## 題目描述
給定一個僅包含 `0` 和 `1` 、大小為 `rows x cols` 的二維二進制矩陣，找出只包含 `1` 的最大矩形，並返回其面積。

## 解題心得：站在巨人的肩膀上
這題雖然是 Hard，但如果你先做了第 84 題（柱狀圖最大矩形），這題就是「換個姿勢再做一次」。

**核心邏輯：**
1. **地基轉化**：我們把矩陣的每一行都看作是一個「地基」。
2. **高度累積**：從第一行開始，我們算出每一列「連續 1 的高度」。如果遇到 0，高度就重置為 0。
3. **調用 84 題**：對於每一行算出的這組「高度」，它其實就是一個柱狀圖！我們直接用 84 題的「單調棧」算法算出這一行能構成的最大矩形。
4. **遍歷所有行**：記錄下所有行中出現的最大值，就是最終答案。

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
