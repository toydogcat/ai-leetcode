---
title: "LeetCode #223: Rectangle Area (矩形面積)"
categories:
  - Math
  - Geometry
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你 **二維** 平面上兩個 **矩形** 的坐標，請你計算這兩個矩形覆蓋的總面積。
每個矩形由左下角 `(ax1, ay1)` / `(bx1, by1)` 和右上角 `(ax2, ay2)` / `(bx2, by2)` 定義。

## 解題心得：容斥原理
總面積等於兩個矩形的面積之和減去它們重疊部分的面積。

**核心邏輯：**
1. **計算各個矩形面積**：
   - `area1 = (ax2 - ax1) * (ay2 - ay1)`
   - `area2 = (bx2 - bx1) * (by2 - by1)`
2. **計算重疊部分面積**：
   - 重疊矩形的左邊界是 `max(ax1, bx1)`，右邊界是 `min(ax2, bx2)`。
   - 重疊矩形的下邊界是 `max(ay1, by1)`，上邊界是 `min(ay2, by2)`。
   - 如果 `overlap_width > 0` 且 `overlap_height > 0`，則 `overlap_area = overlap_width * overlap_height`。
   - 否則重疊面積為 0。
3. **結果**：`area1 + area2 - overlap_area`。

- **時間複雜度**: $O(1)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def computeArea(self, ax1: int, ay1: int, ax2: int, ay2: int, bx1: int, by1: int, bx2: int, by2: int) -> int:
        area1 = (ax2 - ax1) * (ay2 - ay1)
        area2 = (bx2 - bx1) * (by2 - by1)
        
        # 計算重疊邊界
        overlap_w = min(ax2, bx2) - max(ax1, bx1)
        overlap_h = min(ay2, by2) - max(ay1, by1)
        
        overlap_area = max(overlap_w, 0) * max(overlap_h, 0)
        
        return area1 + area2 - overlap_area
```

### C++
```cpp
#include <algorithm>

class Solution {
public:
    int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {
        int area1 = (ax2 - ax1) * (ay2 - ay1);
        int area2 = (bx2 - bx1) * (by2 - by1);
        
        int overlapWidth = std::max(0, std::min(ax2, bx2) - std::max(ax1, bx1));
        int overlapHeight = std::max(0, std::min(ay2, by2) - std::max(ay1, by1));
        
        return area1 + area2 - (overlapWidth * overlapHeight);
    }
};
```
