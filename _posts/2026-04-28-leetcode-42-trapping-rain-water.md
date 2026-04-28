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

## 解題心得：木桶原理的應用
這道題是面試中的大熱門。要算一個位置能接多少水，關鍵在於：**它左右兩邊「最矮」的那堵牆有多高。**

**直覺思考：**
1. 每一根柱子能接的水 = $\min(\text{左邊最高的牆}, \text{右邊最高的牆}) - \text{當前柱子高度}$。
2. 如果這個值大於 0，就是這根柱子貢獻的水量。

**雙指針優化 (最優解)**：
我們從左右兩端同時出發。如果左邊的牆比右邊矮，那左邊位置能接多少水就只取決於左邊的最高牆（因為右邊肯定有更高的牆攔著）。反之亦然。這就像是兩個運動員向中間靠攏，隨時更新自己身後的最高紀錄。

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
