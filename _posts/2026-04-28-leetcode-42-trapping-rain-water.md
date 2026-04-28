---
title: "LeetCode #42: Trapping Rain Water"
categories:
  - Array
  - Two Pointers
  - Dynamic Programming
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定 `n` 個非負整數表示每個寬度為 1 的柱子的高度圖，計算按此排列的柱子，下雨之後能接多少雨水。

## 解題思路：雙指針
每個柱子能接的水量取決於其左右兩側最高柱子中的較小值。使用雙指針從兩端向中間移動。

- **時間複雜度**: $O(n)$
- **空間複雜度**: $O(1)$

### Python
```python
class Solution:
    def trap(self, height: List[int]) -> int:
        l, r = 0, len(height) - 1
        l_max = r_max = res = 0
        while l < r:
            if height[l] < height[r]:
                if height[l] >= l_max: l_max = height[l]
                else: res += l_max - height[l]
                l += 1
            else:
                if height[r] >= r_max: r_max = height[r]
                else: res += r_max - height[r]
                r -= 1
        return res
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int trap(std::vector<int>& height) {
        int l = 0, r = height.size() - 1;
        int l_max = 0, r_max = 0, res = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                if (height[l] >= l_max) l_max = height[l];
                else res += l_max - height[l];
                l++;
            } else {
                if (height[r] >= r_max) r_max = height[r];
                else res += r_max - height[r];
                r--;
            }
        }
        return res;
    }
};
```
