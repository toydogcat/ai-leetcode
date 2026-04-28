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

## 解題心得：找左右兩邊「拖後腿」的人
要算一個柱子能構成的最大矩形，它的高度一定是由自己決定的。那麼寬度呢？寬度取決於 **「它左右兩邊第一個比它矮的柱子在哪裡」**。

**核心邏輯：單調遞增棧**
1. 我們維護一個「高度越來越高」的棧。
2. **遇到矮柱子**：如果當前柱子比棧頂柱子矮，說明棧頂柱子的「右邊界」找到了。
3. **計算面積**：棧頂柱子的左邊界就是它下面那個人。高就是它自己，寬就是「右邊界 - 左邊界 - 1」。
4. **哨兵技巧**：我們在陣列最後放一個高度為 0 的柱子，確保所有的柱子最後都能被彈出來計算面積。

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
