---
title: "LeetCode #296: Best Meeting Point (最佳會面地點)"
categories:
  - Array
  - Sorting
  - Math
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
有一群朋友想要開會，他們想在某個地方碰面，使得所有人移動到碰面地點的 **總距離最短**。

給你一個 `m x n` 的二維網格 `grid`，其中 `1` 表示某個朋友的家，`0` 表示空地。

距離使用 **曼哈頓距離（Manhattan Distance）** 來計算：即 $\text{distance}(p1, p2) = |p1.x - p2.x| + |p1.y - p2.y|$。

請返回所有人到最佳會面地點的最短總距離。

**範例 1:**
```
輸入: grid = [[1,0,0,0,1],[0,0,0,0,0],[0,0,1,0,0]]
輸出: 6
解釋:
三個朋友的家分別位於 (0,0), (0,4) 和 (2,2)。
最佳開會地點是 (0,2)，總距離為 2 + 2 + 2 = 6，最優。
```

## 解題心得：曼哈頓距離拆分與中位數性質
在二維空間中，曼哈頓距離具有一個非常棒的性質：**X 軸方向和 Y 軸方向的距離是完全獨立的**。
$$\text{Total Distance} = \sum |x_i - x| + \sum |y_i - y|$$
因此，我們可以將原本的二維問題，拆分為兩個獨立的一維問題：
1. **在 X 軸上**：找出一個點 $x$，使所有朋友的 $x_i$ 座標到 $x$ 的距離和最小。
2. **在 Y 軸上**：找出一個點 $y$，使所有朋友的 $y_i$ 座標到 $y$ 的距離和最小。

**一維距離最小化原理**：
根據數學定義，一組點到某個點的距離總和最小，這個點就是這組點的 **中位數（Median）**。

**核心邏輯**：
1. **收集 X 軸座標**：按順序掃描每一列（或收集後排序），將所有朋友家的 $x$ 座標存入數組。
2. **收集 Y 軸座標**：按順序掃描每一行（或收集後排序），將所有朋友家的 $y$ 座標存入數組。
3. **計算總距離**：
   - 提取出 $X$ 的中位數與 $Y$ 的中位數。
   - 分別累加距離。或者使用雙指針法：`distance = Sum(X[right] - X[left])`，其中 `left` 從 `0` 遞增，`right` 從 `len-1` 遞減。

- **時間複雜度**: $O(M \times N)$。我們只需線性掃描網格收集座標。
- **空間複雜度**: $O(M \times N)$，儲存所有朋友的座標數組。

## 程式碼實作

### Python
```python
class Solution:
    def minTotalDistance(self, grid: List[List[int]]) -> int:
        if not grid or not grid[0]:
            return 0
            
        m, n = len(grid), len(grid[0])
        
        # 按順序掃描收集 row，相當於排序後的 x 座標
        rows = []
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 1:
                    rows.append(r)
                    
        # 按順序掃描收集 col，相當於排序後的 y 座標
        cols = []
        for c in range(n):
            for r in range(m):
                if grid[r][c] == 1:
                    cols.append(c)
                    
        # 雙指針法計算中位數距離
        def get_min_dist(coords):
            d = 0
            i, j = 0, len(coords) - 1
            while i < j:
                d += coords[j] - coords[i]
                i += 1
                j -= 1
            return d
            
        return get_min_dist(rows) + get_min_dist(cols)
```

### C++
```cpp
#include <vector>
#include <cmath>
#include <algorithm>

class Solution {
private:
    int getMinDist(const std::vector<int>& coords) {
        int d = 0;
        int i = 0, j = coords.size() - 1;
        while (i < j) {
            d += coords[j] - coords[i];
            i++;
            j--;
        }
        return d;
    }

public:
    int minTotalDistance(std::vector<std::vector<int>>& grid) {
        if (grid.empty() || grid[0].empty()) return 0;

        int m = grid.size();
        int n = grid[0].size();

        std::vector<int> rows;
        std::vector<int> cols;

        // 收集 rows 座標（自動按升序排列）
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 1) {
                    rows.push_back(r);
                }
            }
        }

        // 收集 cols 座標（自動按升序排列）
        for (int c = 0; c < n; ++c) {
            for (int r = 0; r < m; ++r) {
                if (grid[r][c] == 1) {
                    cols.push_back(c);
                }
            }
        }

        return getMinDist(rows) + getMinDist(cols);
    }
};
```
