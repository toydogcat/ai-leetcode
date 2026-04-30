---
title: "LeetCode #200: Number of Islands (島嶼數量)"
categories:
  - Depth-First Search
  - Breadth-First Search
  - Union Find
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個由 `'1'`（陸地）和 `'0'`（水）組成的二維網格，請你計算網格中島嶼的數量。
島嶼總是被水包圍，並且通過水平方向或垂直方向上相鄰的陸地連接而形成。此外，你可以假設該網格的四條邊都被水包圍。

## 解題心得：渲染 (Flood Fill) 算法
這題是圖論和搜索的基礎題。

**核心邏輯：DFS 或 BFS**
1. 遍歷整個網格。
2. 當遇到一個 `'1'` 時：
   - 島嶼計數加 1。
   - 使用 **深度優先搜尋 (DFS)** 或 **廣度優先搜尋 (BFS)** 將與該陸地相連的所有陸地全部標記為 `'0'`（這就像是把這座島「擊沉」）。
3. 這樣當主循環繼續遍歷時，就不會重複計算同一座島嶼。

- **時間複雜度**: $O(M \times N)$，其中 $M, N$ 為網格的行數和列數。
- **空間複雜度**: $O(M \times N)$，最壞情況下遞迴調用棧的深度。

## 程式碼實作

### Python (DFS)
```python
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid: return 0
        
        m, n = len(grid), len(grid[0])
        count = 0
        
        def dfs(r, c):
            # 邊界檢查與水域檢查
            if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] == '0':
                return
            
            # 標記為已訪問 (擊沉陸地)
            grid[r][c] = '0'
            
            # 向四個方向擴散
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)
            
        for i in range(m):
            for j in range(n):
                if grid[i][j] == '1':
                    count += 1
                    dfs(i, j)
                    
        return count
```

### C++ (DFS)
```cpp
#include <vector>

class Solution {
public:
    void dfs(std::vector<std::vector<char>>& grid, int r, int c) {
        int m = grid.size();
        int n = grid[0].size();
        
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] == '0') {
            return;
        }
        
        grid[r][c] = '0';
        
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }

    int numIslands(std::vector<std::vector<char>>& grid) {
        int m = grid.size();
        if (m == 0) return 0;
        int n = grid[0].size();
        int count = 0;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        
        return count;
    }
};
```
