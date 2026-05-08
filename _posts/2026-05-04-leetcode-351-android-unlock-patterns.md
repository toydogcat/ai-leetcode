---
title: "LeetCode #351: Android Unlock Patterns (安卓解鎖手勢)"
categories:
  - Dynamic Programming
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個 `m` 和 `n`，表示解鎖手勢的最小長度和最大長度。計算在 $3 \times 3$ 的網格中，所有合法的解鎖手勢數量。

## 解題心得
使用深度優先搜尋 (DFS) 配合回溯法。我們使用一個 $10 \times 10$ 的陣列 `skip` 來記錄網格中兩個數字之間必須經過的「跳過」節點（例如，從 1 到 3 必須經過 2）。每次走訪時，我們更新 `visited` 狀態，且只有當下一個節點未被訪問，或是兩點之間的跳過節點已被訪問時，才為合法移動。由於鍵盤對稱性，1, 3, 7, 9 的解鎖次數相同，2, 4, 6, 8 相同，5 獨特。可以用此對稱性加速。

- **時間複雜度**: O(9!)，實際上由於剪枝與對稱性，耗時極低
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def numberOfPatterns(self, m: int, n: int) -> int:
        skip = [[0] * 10 for _ in range(10)]
        skip[1][3] = skip[3][1] = 2
        skip[1][7] = skip[7][1] = 4
        skip[3][9] = skip[9][3] = 6
        skip[7][9] = skip[9][7] = 8
        skip[1][9] = skip[9][1] = skip[3][7] = skip[7][3] = skip[2][8] = skip[8][2] = skip[4][6] = skip[6][4] = 5
        
        visited = [False] * 10
        
        def dfs(curr, remain):
            if remain == 0:
                return 1
            visited[curr] = True
            count = 0
            for i in range(1, 10):
                if not visited[i] and (skip[curr][i] == 0 or visited[skip[curr][i]]):
                    count += dfs(i, remain - 1)
            visited[curr] = False
            return count
            
        ans = 0
        for length in range(m, n + 1):
            ans += dfs(1, length - 1) * 4  # 1, 3, 7, 9 對稱
            ans += dfs(2, length - 1) * 4  # 2, 4, 6, 8 對稱
            ans += dfs(5, length - 1)      # 5 獨特
        return ans
```

### C++
```cpp
#include <vector>
#include <cmath>

class Solution {
private:
    int dfs(int curr, int remain, std::vector<bool>& visited, const std::vector<std::vector<int>>& skip) {
        if (remain == 0) return 1;
        visited[curr] = true;
        int count = 0;
        for (int i = 1; i <= 9; ++i) {
            if (!visited[i] && (skip[curr][i] == 0 || visited[skip[curr][i]])) {
                count += dfs(i, remain - 1, visited, skip);
            }
        }
        visited[curr] = false;
        return count;
    }

public:
    int numberOfPatterns(int m, int n) {
        std::vector<std::vector<int>> skip(10, std::vector<int>(10, 0));
        skip[1][3] = skip[3][1] = 2;
        skip[1][7] = skip[7][1] = 4;
        skip[3][9] = skip[9][3] = 6;
        skip[7][9] = skip[9][7] = 8;
        skip[1][9] = skip[9][1] = skip[3][7] = skip[7][3] = skip[2][8] = skip[8][2] = skip[4][6] = skip[6][4] = 5;

        std::vector<bool> visited(10, false);
        int ans = 0;
        for (int len = m; len <= n; ++len) {
            ans += dfs(1, len - 1, visited, skip) * 4;
            ans += dfs(2, len - 1, visited, skip) * 4;
            ans += dfs(5, len - 1, visited, skip);
        }
        return ans;
    }
};
```
