---
title: "LeetCode #149: Max Points on a Line"
categories:
  - Hash Table
  - Math
  - Geometry
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個數組 `points` ，其中 `points[i] = [xi, yi]` 表示 X-Y 平面上的一個點。求最多有多少個點在同一條直線上。

## 解題心得：斜率的共鳴
判斷點是否在同一直線上，最核心的概念就是 **「斜率」**。
1. 對於每個點 `i`，我們計算它與其他所有點 `j` 的斜率。
2. 使用 `HashMap` 紀錄每種斜率出現的次數。
3. **注意精度：** 為了避免浮點數精度問題，我們可以使用 `dy` 和 `dx` 的 **最大公約數 (GCD)** 化簡後的比例作為 Key。

### Python
```python
from math import gcd
from collections import defaultdict

class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        n = len(points)
        if n <= 2: return n
        
        max_pts = 0
        for i in range(n):
            slopes = defaultdict(int)
            for j in range(i + 1, n):
                dx = points[j][0] - points[i][0]
                dy = points[j][1] - points[i][1]
                
                # 化簡斜率 (dy, dx)
                common = gcd(dx, dy)
                slope = (dx // common, dy // common)
                slopes[slope] += 1
            
            # max_pts = slopes[max] + 1 (點 i 自己)
            if slopes:
                max_pts = max(max_pts, max(slopes.values()) + 1)
            else:
                max_pts = max(max_pts, 1)
                
        return max_pts
```

### C++
```cpp
class Solution {
public:
    int maxPoints(vector<vector<int>>& points) {
        int n = points.size();
        if (n <= 2) return n;
        
        int res = 0;
        for (int i = 0; i < n; ++i) {
            unordered_map<string, int> slopes;
            for (int j = i + 1; j < n; ++j) {
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                int common = gcd(dx, dy);
                
                string key = to_string(dx / common) + "_" + to_string(dy / common);
                slopes[key]++;
            }
            
            int current_max = 0;
            for (auto& it : slopes) current_max = max(current_max, it.second);
            res = max(res, current_max + 1);
        }
        return res;
    }
    
    int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
};
```
