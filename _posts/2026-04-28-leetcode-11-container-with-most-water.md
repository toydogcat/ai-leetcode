---
title: "LeetCode #11: Container With Most Water"
categories:
  - Array
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你 `n` 個非負整數 `a1, a2, ..., an`，每個數代表坐標中的一個點 `(i, ai)` 。在坐標內畫 `n` 條垂直線，垂直線 `i` 的兩個端點分別為 `(i, ai)` 和 `(i, 0)` 。找出其中的兩條線，使得它們與 `x` 軸共同構成的容器可以容納最多的水。

## 解題心得：誰矮誰先走
這是一道非常經典的「雙指針」題目。

**核心邏輯：**
1. **左右兩端出發**：設置兩個指針 `left` 和 `right`。
2. **計算面積**：面積 = $\min(\text{左柱高}, \text{右柱高}) \times (\text{右邊界} - \text{左邊界})$。
3. **移動策略**：關鍵來了！我們要移動哪一個指針？
   - **移動矮的那一邊**。
   - **為什麼？** 因為容器的容量是被「短板」限制的。如果你移動長的那一邊，寬度變小了，而短板還是那個短板（甚至變得更短），面積一定會縮小。只有移動短板，才有可能找到更長的柱子來彌補寬度的損失。

這就像是木桶理論，決定水量的永遠是那塊短板。所以我們要想辦法把短板換掉，看看能不能換成更長的一塊，讓容量變大。
每次移動較短的那一邊，因為容器的高度是由短板決定的。

- **時間複雜度**: $O(n)$
- **空間複雜度**: $O(1)$

## 程式碼實作

### Python
```python
class Solution:
    def maxArea(self, height: List[int]) -> int:
        l, r = 0, len(height) - 1
        res = 0
        while l < r:
            res = max(res, min(height[l], height[r]) * (r - l))
            if height[l] < height[r]:
                l += 1
            else:
                r -= 1
        return res
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int maxArea(std::vector<int>& height) {
        int l = 0, r = height.size() - 1;
        int res = 0;
        while (l < r) {
            res = std::max(res, std::min(height[l], height[r]) * (r - l));
            if (height[l] < height[r]) l++;
            else r--;
        }
        return res;
    }
};
```
