---
title: "LeetCode #335: Self Crossing (路徑交叉)"
categories:
  - Array
  - Math
  - Geometry
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個整數陣列 `distance`。你從 `(0,0)` 開始，沿北、西、南、東四個方向依次移動 `distance[i]` 的距離。判斷你的移動路徑是否發生了交叉（Self-crossing）。

## 解題心得
這是一道 **幾何 / 分類討論** 題。路徑發生交叉的情況可以歸納為三種幾何模型：
1. **第四條邊與第一條邊相交**：`distance[i] >= distance[i-2]` 且 `distance[i-1] <= distance[i-3]`。
2. **第五條邊與第一條邊相切/重合相交**：`distance[i-1] == distance[i-3]` 且 `distance[i] + distance[i-4] >= distance[i-2]`。
3. **第六條邊與第一條邊相交**：`distance[i-1] <= distance[i-3]` 且 `distance[i-1] + distance[i-5] >= distance[i-3]` 且 `distance[i-2] >= distance[i-4]` 且 `distance[i] + distance[i-4] >= distance[i-2]`。
- 我們只需要在遍歷 `distance` 陣列（從索引 3 開始）時，依序對這三種交叉模型進行邊界比對，如有滿足即為發生交叉。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def isSelfCrossing(self, distance: List[int]) -> bool:
        d = distance
        n = len(d)
        if n < 4: return False
        
        for i in range(3, n):
            # 情況 1
            if d[i] >= d[i-2] and d[i-1] <= d[i-3]:
                return True
            # 情況 2
            if i >= 4 and d[i-1] == d[i-3] and d[i] + d[i-4] >= d[i-2]:
                return True
            # 情況 3
            if i >= 5 and d[i-1] <= d[i-3] and d[i-1] + d[i-5] >= d[i-3] and d[i-2] >= d[i-4] and d[i] + d[i-4] >= d[i-2]:
                return True
                
        return False
```

### C++
```cpp
#include <vector>

class Solution {
public:
    bool isSelfCrossing(std::vector<int>& d) {
        int n = d.size();
        if (n < 4) return false;

        for (int i = 3; i < n; ++i) {
            // Case 1
            if (d[i] >= d[i-2] && d[i-1] <= d[i-3]) return true;
            // Case 2
            if (i >= 4 && d[i-1] == d[i-3] && d[i] + d[i-4] >= d[i-2]) return true;
            // Case 3
            if (i >= 5 && d[i-1] <= d[i-3] && d[i-1] + d[i-5] >= d[i-3] && d[i-2] >= d[i-4] && d[i] + d[i-4] >= d[i-2]) return true;
        }
        return false;
    }
};
```
