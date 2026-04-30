---
title: "LeetCode #207: Course Schedule (課程表)"
categories:
  - Graph
  - Topological Sort
  - Depth-First Search
  - Breadth-First Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
你這個學期必須修讀 `numCourses` 門課程，記為 `0` 到 `numCourses - 1` 。
在修讀某些課程之前，你必須先修讀另一些課程。例如，想要學習課程 `0` ，你需要先完成課程 `1` ，我們用一個匹配來表示：`[0,1]` 。
給你課程總數 `numCourses` 和一個先修課程列表 `prerequisites` ，其中 `prerequisites[i] = [ai, bi]` ，表示在修讀課程 `ai` 前，必須先修讀課程 `bi` 。
請你判斷是否可能完成所有課程的學習？如果可以，返回 `true` ；否則，返回 `false` 。

## 解題心得：有向無環圖 (DAG) 判定
這是一個經典的 **拓撲排序 (Topological Sort)** 問題。問題的核心在於判定給定的有向圖是否存在 **環 (Cycle)**。

**核心邏輯：Kahn 算法 (BFS)**
1. **建立鄰接表和入度數組**：統計每門課的入度（需要先修課的數量）。
2. **入隊入度為 0 的點**：這些課程沒有任何先修課，可以直接上。
3. **處理隊列**：彈出課程時，將其所有後續課程的入度減 1。如果某個後續課程的入度變為 0，則將其入隊。
4. **檢查結果**：最後統計出隊的課程總數。如果等於 `numCourses`，說明沒有環；否則存在環。

- **時間複雜度**: $O(V + E)$，其中 $V$ 是課程數，$E$ 是先修關係數。
- **空間複雜度**: $O(V + E)$。

## 程式碼實作

### Python (BFS/Kahn's Algorithm)
```python
from collections import deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        indegrees = [0] * numCourses
        adjacency = [[] for _ in range(numCourses)]
        
        # 建立圖
        for cur, pre in prerequisites:
            indegrees[cur] += 1
            adjacency[pre].append(cur)
            
        # 入度為 0 的課程入隊
        queue = deque([i for i in range(numCourses) if indegrees[i] == 0])
        count = 0
        
        while queue:
            pre = queue.popleft()
            count += 1
            for cur in adjacency[pre]:
                indegrees[cur] -= 1
                if indegrees[cur] == 0:
                    queue.append(cur)
                    
        return count == numCourses
```

### C++ (DFS)
```cpp
#include <vector>

class Solution {
public:
    bool canFinish(int numCourses, std::vector<std::vector<int>>& prerequisites) {
        std::vector<std::vector<int>> adj(numCourses);
        for (auto& edge : prerequisites) {
            adj[edge[1]].push_back(edge[0]);
        }
        
        // 0: 未訪問, 1: 正在訪問(當前路徑), 2: 已完成訪問
        std::vector<int> flags(numCourses, 0);
        for (int i = 0; i < numCourses; i++) {
            if (!dfs(adj, flags, i)) return false;
        }
        return true;
    }

private:
    bool dfs(std::vector<std::vector<int>>& adj, std::vector<int>& flags, int i) {
        if (flags[i] == 1) return false; // 發現環
        if (flags[i] == 2) return true;  // 已經檢查過沒問題
        
        flags[i] = 1;
        for (int next : adj[i]) {
            if (!dfs(adj, flags, next)) return false;
        }
        flags[i] = 2;
        return true;
    }
};
```
