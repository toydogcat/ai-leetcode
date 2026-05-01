---
title: "LeetCode #265: Paint House II (油漆房子 II)"
categories:
  - Dynamic Programming
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
這裡有 `n` 棟房子，每棟房子可以被油漆成 `k` 種顏色中的其中一種。油漆每棟房子所花費的費用是不同的。這 `n` 棟房子油漆成各個顏色的費用儲存在一個 `n x k` 的成本矩陣 `costs` 中。

例如，`costs[0][0]` 是把第 0 棟房子油漆成第 0 種顏色的費用；`costs[1][2]` 是把第 1 棟房子油漆成第 2 種顏色的費用，以此類推。

請計算出在油漆完所有房子，且 **相鄰兩棟房子不能是同一種顏色** 的情況下的最小花費。

**範例 1:**
```
輸入: costs = [[1,5,3],[2,9,4]]
輸出: 5
解釋:
將第 0 棟房子油漆成顏色 0，花費 1。
將第 1 棟房子油漆成顏色 2，花費 4。
總花費: 1 + 4 = 5。
```

## 解題心得：優化 DP 轉移與狀態
這是一題 [Paint House I](./2026-04-30-leetcode-256-paint-house.md) 的進階題目。
在上一題中，顏色只有 3 種，我們只要簡單地把前一棟除了當前顏色的其他兩個顏色的最小值加上去即可。這題的顏色增加到了 `k` 種。

**直接的想法**：
- 對於第 `i` 棟房子的顏色 `j`，它的最小代價為前一棟房子除 `j` 以外的其餘顏色代價的最小值：
  $$dp[i][j] = costs[i][j] + \min_{m \neq j} (dp[i-1][m])$$
- 這樣的時間複雜度為 $O(n \times k^2)$。

**優化後的想法**：
- 對於前一棟房子的所有顏色狀態，我們其實 **只需要記錄代價最小的顏色和代價次小的顏色**：
  1. 如果當前房子的顏色 `j` 與前一棟房子代價最小的顏色 **不同**，則直接取前一棟房子的最小值。
  2. 如果相同，則取前一棟房子的次小值。
- 如此一來，只需對前一棟的狀態遍歷一次算出最小與次小值，時間複雜度便可以優化至 **$O(n \times k)$**。

- **時間複雜度**: $O(N \times K)$。
- **空間複雜度**: $O(1)$，我們可以複用空間或僅儲存前一棟的最小值與次小值狀態。

## 程式碼實作

### Python
```python
class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:
        if not costs or not costs[0]:
            return 0
            
        n = len(costs)
        k = len(costs[0])
        
        # 記錄前一棟房子的最小值與次小值代價，以及最小值對應的顏色索引
        min1 = min2 = 0
        min_idx = -1
        
        for i in range(n):
            current_min1 = float('inf')
            current_min2 = float('inf')
            current_idx = -1
            
            for j in range(k):
                # 如果當前顏色與上一棟的最小顏色相同，選次小值
                cost = costs[i][j] + (min2 if j == min_idx else min1)
                
                # 更新當前房子的最小值與次小值
                if cost < current_min1:
                    current_min2 = current_min1
                    current_min1 = cost
                    current_idx = j
                elif cost < current_min2:
                    current_min2 = cost
                    
            min1, min2, min_idx = current_min1, current_min2, current_idx
            
        return min1
```

### C++
```cpp
#include <vector>
#include <algorithm>
#include <climits>

class Solution {
public:
    int minCostII(std::vector<std::vector<int>>& costs) {
        if (costs.empty() || costs[0].empty()) {
            return 0;
        }

        int n = costs.size();
        int k = costs[0].size();

        int min1 = 0, min2 = 0, minIdx = -1;

        for (int i = 0; i < n; ++i) {
            int currentMin1 = INT_MAX;
            int currentMin2 = INT_MAX;
            int currentIdx = -1;

            for (int j = 0; j < k; ++j) {
                int cost = costs[i][j] + (j == minIdx ? min2 : min1);

                if (cost < currentMin1) {
                    currentMin2 = currentMin1;
                    currentMin1 = cost;
                    currentIdx = j;
                } else if (cost < currentMin2) {
                    currentMin2 = cost;
                }
            }

            min1 = currentMin1;
            min2 = currentMin2;
            minIdx = currentIdx;
        }

        return min1;
    }
};
```
