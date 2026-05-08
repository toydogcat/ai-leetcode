---
title: "LeetCode #361: Bomb Enemy (炸彈人)"
categories:
  - Dynamic Programming
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個二維字元網格，其中 `'W'` 代表牆，`'E'` 代表敵人，`'0'` 代表空位。你可以在一個空位放置一個炸彈，炸彈會消滅同一行與同一列的所有敵人，直到被牆擋住。返回最多能消滅的敵人數。

## 解題心得
使用 **行/列 快取** 優化：
- 為了避免對每個空位都重複向四個方向掃描，我們可以逐行、逐列掃描並快取當前能消滅的敵人數。
- 我們維護一個變數 `row_cnt` 和一個陣列 `col_cnt`。
- 當我們在網格 `(i, j)` 時：
  - 如果 `j == 0` 或左邊是牆 `'W'`，我們向右掃描當前行直到遇到牆，統計並更新 `row_cnt`。
  - 如果 `i == 0` 或上邊是牆 `'W'`，我們向下掃描當前列直到遇到牆，統計並更新 `col_cnt[j]`。
  - 若網格是空位 `'0'`，則放置炸彈消滅的敵人在該單元格的值即為 `row_cnt + col_cnt[j]`，我們取所有空位的最大值。

- **時間複雜度**: O(M * N)
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
class Solution:
    def maxKilledEnemies(self, grid: List[List[str]]) -> int:
        if not grid or not grid[0]: return 0
        m, n = len(grid), len(grid[0])
        max_enemies = 0
        row_cnt = 0
        col_cnt = [0] * n
        
        for i in range(m):
            for j in range(n):
                # 掃描並更新行快取
                if j == 0 or grid[i][j - 1] == 'W':
                    row_cnt = 0
                    k = j
                    while k < n and grid[i][k] != 'W':
                        if grid[i][k] == 'E':
                            row_cnt += 1
                        k += 1
                        
                # 掃描並更新列快取
                if i == 0 or grid[i - 1][j] == 'W':
                    col_cnt[j] = 0
                    k = i
                    while k < m and grid[k][j] != 'W':
                        if grid[k][j] == 'E':
                            col_cnt[j] += 1
                        k += 1
                        
                # 如果是空位，統計消滅數
                if grid[i][j] == '0':
                    max_enemies = max(max_enemies, row_cnt + col_cnt[j])
                    
        return max_enemies
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int maxKilledEnemies(std::vector<std::vector<char>>& grid) {
        if (grid.empty() || grid[0].empty()) return 0;
        int m = grid.size();
        int n = grid[0].size();
        int max_enemies = 0;
        int row_cnt = 0;
        std::vector<int> col_cnt(n, 0);

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (j == 0 || grid[i][j - 1] == 'W') {
                    row_cnt = 0;
                    for (int k = j; k < n && grid[i][k] != 'W'; ++k) {
                        if (grid[i][k] == 'E') row_cnt++;
                    }
                }
                if (i == 0 || grid[i - 1][j] == 'W') {
                    col_cnt[j] = 0;
                    for (int k = i; k < m && grid[k][j] != 'W'; ++k) {
                        if (grid[k][j] == 'E') col_cnt[j]++;
                    }
                }
                if (grid[i][j] == '0') {
                    max_enemies = std::max(max_enemies, row_cnt + col_cnt[j]);
                }
            }
        }
        return max_enemies;
    }
};
```
