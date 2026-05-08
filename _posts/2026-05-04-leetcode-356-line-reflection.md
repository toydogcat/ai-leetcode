---
title: "LeetCode #356: Line Reflection (直線鏡像)"
categories:
  - Hash Table
  - Math
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定二維平面上的 $n$ 個點，判斷是否存在一條平行於 y 軸的直線，使得所有點相對於該直線對稱。

## 解題心得
1. 找出所有點中 x 座標的最小值 `min_x` 與最大值 `max_x`。若對稱軸存在，其 x 座標必為 `mid = (min_x + max_x) / 2`。也就是說，對於任意點 `(x, y)`，其對稱點必須是 `(min_x + max_x - x, y)`。
2. 將所有點去重後放入雜湊集合中。
3. 遍歷集合中的每個點 `(x, y)`，驗證對稱點 `(min_x + max_x - x, y)` 是否也存在於集合中。若皆存在，則返回 `true`，否則為 `false`。

- **時間複雜度**: O(N)
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
class Solution:
    def isReflected(self, points: List[List[int]]) -> bool:
        if not points: return True
        point_set = {(x, y) for x, y in points}
        min_x = min(x for x, y in points)
        max_x = max(x for x, y in points)
        
        sum_x = min_x + max_x
        for x, y in point_set:
            if (sum_x - x, y) not in point_set:
                return False
        return True
```

### C++
```cpp
#include <vector>
#include <set>
#include <algorithm>
#include <climits>

class Solution {
public:
    bool isReflected(std::vector<std::vector<int>>& points) {
        if (points.empty()) return true;
        std::set<std::pair<int, int>> point_set;
        int min_x = INT_MAX, max_x = INT_MIN;
        for (auto const& p : points) {
            min_x = std::min(min_x, p[0]);
            max_x = std::max(max_x, p[0]);
            point_set.insert({p[0], p[1]});
        }

        int sum_x = min_x + max_x;
        for (auto const& p : point_set) {
            if (point_set.find({sum_x - p.first, p.second}) == point_set.end()) {
                return false;
            }
        }
        return true;
    }
};
```
