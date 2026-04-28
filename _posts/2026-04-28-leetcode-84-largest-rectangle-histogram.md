---
title: "LeetCode #84: Largest Rectangle in Histogram"
categories:
  - Stack
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定 `n` 個非負整數，用來表示柱狀圖中各個柱子的高度。每個柱子彼此相鄰，且寬度為 1 。求在該柱狀圖中，能夠勾勒出的矩形的最大面積。

## 解題思路：單調棧 (Monotonic Stack)
我們維護一個單調遞增棧。當遇到一個高度小於棧頂的高度時，說明找到了棧頂柱子的右邊界，而棧頂下一個元素就是左邊界。

- **時間複雜度**: $O(n)$
- **空間複雜度**: $O(n)$

### Python
```python
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        heights.append(0)
        stack = [-1]
        res = 0
        for i in range(len(heights)):
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
    int largestRectangleArea(std::vector<int>& heights) {
        heights.push_back(0);
        std::stack<int> st;
        st.push(-1);
        int res = 0;
        for (int i = 0; i < heights.size(); i++) {
            while (st.top() != -1 && heights[i] < heights[st.top()]) {
                int h = heights[st.top()];
                st.pop();
                int w = i - st.top() - 1;
                res = std::max(res, h * w);
            }
            st.push(i);
        }
        return res;
    }
};
```
