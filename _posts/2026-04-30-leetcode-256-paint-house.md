---
title: "LeetCode #256: Paint House (粉刷房子)"
categories:
  - Array
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
有一排 `n` 幢房子，每幢房子可以被粉刷成紅色、藍色或綠色。粉刷每幢房子成不同顏色的成本是不同的。
你需要粉刷所有的房子，使得 **相鄰的兩幢房子顏色不能相同**。
返回粉刷所有房子的最小總成本。

## 解題心得：動態規劃 (DP)
這是一個經典的狀態轉移問題。當前房子的顏色選擇取決於前一幢房子的顏色。

**核心邏輯：**
1. **定義狀態**：
   - `dp[i][0]`：粉刷到第 `i` 幢房子且它是紅色的最小成本。
   - `dp[i][1]`：粉刷到第 `i` 幢房子且它是藍色的最小成本。
   - `dp[i][2]`：粉刷到第 `i` 幢房子且它是綠色的最小成本。
2. **轉移方程**：
   - `dp[i][0] = costs[i][0] + min(dp[i-1][1], dp[i-1][2])`
   - `dp[i][1] = costs[i][1] + min(dp[i-1][0], dp[i-1][2])`
   - `dp[i][2] = costs[i][2] + min(dp[i-1][0], dp[i-1][1])`
3. **優化空間**：由於只需要前一個房子的結果，我們可以用三個變量代替完整的二維數組。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def minCost(self, costs: List[List[int]]) -> int:
        if not costs: return 0
        
        # 使用 prev 記錄前一間房子的三種顏色最小成本
        red, blue, green = costs[0]
        
        for i in range(1, len(costs)):
            curr_red = costs[i][0] + min(blue, green)
            curr_blue = costs[i][1] + min(red, green)
            curr_green = costs[i][2] + min(red, blue)
            red, blue, green = curr_red, curr_blue, curr_green
            
        return min(red, blue, green)
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int minCost(std::vector<std::vector<int>>& costs) {
        if (costs.empty()) return 0;
        
        int n = costs.size();
        int r = costs[0][0], b = costs[0][1], g = costs[0][2];
        
        for (int i = 1; i < n; i++) {
            int next_r = costs[i][0] + std::min(b, g);
            int next_b = costs[i][1] + std::min(r, g);
            int next_g = costs[i][2] + std::min(r, b);
            r = next_r; b = next_b; g = next_g;
        }
        
        return std::min({r, b, g});
    }
};
```
