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
給定一個長度為 `n` 的整數數組 `height`。找出兩條線，使得它們與 x 軸共同構成的容器可以容納最多的水。

## 解題思路：雙指針
設定兩個指針分別指向數組的兩端，每次移動較短的那一邊，因為容器的高度是由短板決定的。

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
