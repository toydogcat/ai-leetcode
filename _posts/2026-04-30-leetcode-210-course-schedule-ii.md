---
title: "LeetCode #210: Course Schedule II (課程表 II)"
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
現在你總共有 `numCourses` 門課需要選，記為 `0` 到 `numCourses - 1`。給你一個數組 `prerequisites` ，其中 `prerequisites[i] = [ai, bi]` ，表示在修讀課程 `ai` 前，必須先修讀課程 `bi` 。
返回你為了學完所有課程所安排的修讀順序。
如果有多個正確的順序，你只需返回 **任意一個** 即可。如果不可能完成所有課程，返回 **一個空數組** 。

## 解題心得：拓撲排序的路徑記錄
本題是 [LeetCode #207](./2026-04-30-leetcode-207-course-schedule.md) 的進階版。不僅要判斷是否有環，還要返回一條可行的路徑。

**核心邏輯：Kahn 算法 (BFS)**
1. **建立鄰接表和入度數組**。
2. **入隊入度為 0 的點**。
3. **處理隊列**：
   - 每次從隊列彈出一個課程 `pre` 時，將其加入結果數組 `order`。
   - 遍歷該課程的所有後續課程 `cur`，將 `cur` 的入度減 1。
   - 如果 `cur` 的入度變為 0，則將其入隊。
4. **檢查結果**：如果 `order` 的長度等於 `numCourses`，返回 `order`；否則返回空數組（存在環）。

- **時間複雜度**: $O(V + E)$。
- **空間複雜度**: $O(V + E)$。

## 程式碼實作

### Python
```python
from collections import deque

class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        indegrees = [0] * numCourses
        adjacency = [[] for _ in range(numCourses)]
        
        for cur, pre in prerequisites:
            indegrees[cur] += 1
            adjacency[pre].append(cur)
            
        queue = deque([i for i in range(numCourses) if indegrees[i] == 0])
        order = []
        
        while queue:
            pre = queue.popleft()
            order.append(pre)
            for cur in adjacency[pre]:
                indegrees[cur] -= 1
                if indegrees[cur] == 0:
                    queue.append(cur)
                    
        return order if len(order) == numCourses else []
```

### C++
```cpp
#include <vector>
#include <queue>

class Solution {
public:
    std::vector<int> findOrder(int numCourses, std::vector<std::vector<int>>& prerequisites) {
        std::vector<int> indegrees(numCourses, 0);
        std::vector<std::vector<int>> adj(numCourses);
        for (auto& edge : prerequisites) {
            indegrees[edge[0]]++;
            adj[edge[1]].push_back(edge[0]);
        }
        
        std::queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (indegrees[i] == 0) q.push(i);
        }
        
        std::vector<int> order;
        while (!q.empty()) {
            int pre = q.front();
            q.pop();
            order.push_back(pre);
            for (int cur : adj[pre]) {
                indegrees[cur]--;
                if (indegrees[cur] == 0) q.push(cur);
            }
        }
        
        if (order.size() == numCourses) return order;
        return {};
    }
};
```
