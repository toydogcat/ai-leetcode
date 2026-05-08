---
title: "LeetCode #310: Minimum Height Trees (最小高度樹)"
categories:
  - Breadth-First Search
  - Graph
  - Topological Sort
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
樹是一個無向圖，其中任意兩個頂點之間存在且僅存在一條路徑。給你一個有 `n` 個節點的樹，找出所有使樹的高度最小的根節點（即最小高度樹 MHT）。

## 解題心得
直觀上，最小高度樹的根節點應該位於整棵樹的最中心。一棵樹最多只有 1 到 2 個最中心節點。
我們可以使用 **拓撲排序 (Topological Sort / 剝洋蔥法)**：
1. 將所有度數（Degree）為 1 的節點（葉子節點）放入佇列中。
2. 每次我們將當前所有的葉子節點剝離，並更新其鄰居的度數。
3. 當剩下的節點數量小於等於 2 個時，這些剩下的節點就是最中心的根節點，也就是我們的最終答案。

- **時間複雜度**: O(V + E) = O(N)
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
from collections import deque

class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        if n == 1:
            return [0]
            
        adj = {i: set() for i in range(n)}
        for u, v in edges:
            adj[u].add(v)
            adj[v].add(u)
            
        leaves = deque([i for i in range(n) if len(adj[i]) == 1])
        remaining_nodes = n
        
        while remaining_nodes > 2:
            num_leaves = len(leaves)
            remaining_nodes -= num_leaves
            for _ in range(num_leaves):
                leaf = leaves.popleft()
                neighbor = adj[leaf].pop()
                adj[neighbor].remove(leaf)
                if len(adj[neighbor]) == 1:
                    leaves.append(neighbor)
                    
        return list(leaves)
```

### C++
```cpp
#include <vector>
#include <unordered_set>
#include <queue>

class Solution {
public:
    std::vector<int> findMinHeightTrees(int n, std::vector<std::vector<int>>& edges) {
        if (n == 1) return {0};

        std::vector<std::unordered_set<int>> adj(n);
        for (const auto& edge : edges) {
            adj[edge[0]].insert(edge[1]);
            adj[edge[1]].insert(edge[0]);
        }

        std::queue<int> leaves;
        for (int i = 0; i < n; ++i) {
            if (adj[i].size() == 1) leaves.push(i);
        }

        int remainingNodes = n;
        while (remainingNodes > 2) {
            int numLeaves = leaves.size();
            remainingNodes -= numLeaves;
            for (int i = 0; i < numLeaves; ++i) {
                int leaf = leaves.front();
                leaves.pop();
                
                int neighbor = *adj[leaf].begin();
                adj[neighbor].erase(leaf);
                if (adj[neighbor].size() == 1) {
                    leaves.push(neighbor);
                }
            }
        }

        std::vector<int> ans;
        while (!leaves.empty()) {
            ans.push_back(leaves.front());
            leaves.pop();
        }
        return ans;
    }
};
```
