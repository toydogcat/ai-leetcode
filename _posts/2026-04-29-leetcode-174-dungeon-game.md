---
title: "LeetCode #174: Dungeon Game (地下城遊戲)"
categories:
  - Array
  - Dynamic Programming
  - Matrix
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
惡魔抓走了公主並將她關在地下城的右下角。地下城是一個 $M \times N$ 的格格。勇士從左上角出發。
每一格都有一個整數，代表勇士進入該格後體力的變化（正數代表補血，負數代表扣血）。
如果勇士的體力降到 0 或以下，他會立即死亡。
請問勇士出發時，**至少** 需要多少初始體力，才能確保能救到公主？

## 解題心得：倒著推的動態規劃
這題是動態規劃 (DP) 的經典難題。

**為什麼不能順著推？**
如果你從左上角開始算，當前的體力盈餘並不能決定未來的命運。例如，你有很高的體力但路徑後段有極大的扣血點，或者你體力剛好但路徑後段有大補血。

**正確思路：從公主往回推 (Bottom-up DP)**
我們定義 `dp[i][j]` 為：從 `(i, j)` 出發直到救到公主，**進入該格時所需的最少體力**。
1. 在公主所在的格子 `(m-1, n-1)`：
   - 需要的體力是 `max(1, 1 - dungeon[m-1][n-1])`。
2. 對於其他格子 `(i, j)`：
   - 勇士可以往右 `(i, j+1)` 或往下 `(i+1, j)`。
   - 為了活著進入下一格，所需的體力為 `need = min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j]`。
   - 同樣，所需的體力至少要是 1：`dp[i][j] = max(1, need)`。

- **時間複雜度**: $O(m \times n)$。
- **空間複雜度**: $O(m \times n)$，可優化至 $O(n)$。

## 程式碼實作

### Python
```python
class Solution:
    def calculateMinimumHP(self, dungeon: List[List[int]]) -> int:
        m, n = len(dungeon), len(dungeon[0])
        dp = [[float('inf')] * (n + 1) for _ in range(m + 1)]
        
        # 邊界處理：救到公主後的「虛擬狀態」需要 1 體力
        dp[m][n-1] = dp[m-1][n] = 1
        
        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                min_need = min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j]
                dp[i][j] = max(1, min_need)
                
        return dp[0][0]
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int calculateMinimumHP(std::vector<std::vector<int>>& dungeon) {
        int m = dungeon.size();
        int n = dungeon[0].size();
        std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, INT_MAX));
        
        dp[m][n-1] = dp[m-1][n] = 1;
        
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int minNeed = std::min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j];
                dp[i][j] = std::max(1, minNeed);
            }
        }
        
        return dp[0][0];
    }
};
```
