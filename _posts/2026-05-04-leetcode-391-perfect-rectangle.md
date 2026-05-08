---
title: "LeetCode #391: Perfect Rectangle (完美矩形)"
categories:
  - Array
  - Line Sweep
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定數個小矩形，判斷它們是否能完美拼接成一個大矩形（無空隙、無重疊）。

## 解題心得
完美矩形必須滿足兩個核心條件：
1. 所有小矩形的面積總和必須恰好等於最外圍大矩形的面積。
2. 內部的所有頂點必須成對出現（互相抵消），最終**僅留下最外圍大矩形的四個頂點**且各出現一次。
- 我們用一個雜湊集合記錄所有小矩形的四個角點座標，若頂點已在集合中，則將其移除（實現偶數次抵消）；否則加入。最後驗證集合中是否僅剩下最外圍的四個角點，且面積與累加值相等。

- **時間複雜度**: O(N)
- **空間複雜度**: O(N) 頂點集合空間

## 程式碼實作

### Python
```python
class Solution:
    def isRectangleCover(self, rectangles: List[List[int]]) -> bool:
        area = 0
        min_x = min_y = float('inf')
        max_x = max_y = float('-inf')
        points = set()
        
        for x1, y1, x2, y2 in rectangles:
            area += (x2 - x1) * (y2 - y1)
            min_x = min(min_x, x1)
            min_y = min(min_y, y1)
            max_x = max(max_x, x2)
            max_y = max(max_y, y2)
            
            # 對角四個點做抵消處理
            for p in [(x1, y1), (x1, y2), (x2, y1), (x2, y2)]:
                if p in points:
                    points.remove(p)
                else:
                    points.add(p)
                    
        # 最終留在 points 的必須是完美外圈的四個點
        expected_points = {(min_x, min_y), (min_x, max_y), (max_x, min_y), (max_x, max_y)}
        if points != expected_points:
            return False
            
        return area == (max_x - min_x) * (max_y - min_y)
```

### C++
```cpp
#include <vector>
#include <set>
#include <algorithm>
#include <climits>

class Solution {
public:
    bool isRectangleCover(std::vector<std::vector<int>>& rectangles) {
        long long area = 0;
        int min_x = INT_MAX, min_y = INT_MAX;
        int max_x = INT_MIN, max_y = INT_MIN;
        std::set<std::pair<int, int>> points;

        for (auto const& rect : rectangles) {
            int x1 = rect[0], y1 = rect[1], x2 = rect[2], y2 = rect[3];
            area += (long long)(x2 - x1) * (y2 - y1);
            min_x = std::min(min_x, x1);
            min_y = std::min(min_y, y1);
            max_x = std::max(max_x, x2);
            max_y = std::max(max_y, y2);

            std::vector<std::pair<int, int>> curr_pts = {{x1, y1}, {x1, y2}, {x2, y1}, {x2, y2}};
            for (auto const& p : curr_pts) {
                if (points.count(p)) {
                    points.erase(p);
                } else {
                    points.insert(p);
                }
            }
        }

        std::set<std::pair<int, int>> expected = {{min_x, min_y}, {min_x, max_y}, {max_x, min_y}, {max_x, max_y}};
        if (points != expected) return false;

        return area == (long long)(max_x - min_x) * (max_y - min_y);
    }
};
```
