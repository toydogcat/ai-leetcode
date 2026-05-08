---
title: "LeetCode #323: Number of Connected Components in an Undirected Graph (無向圖中的連通分量個數)"
categories:
  - Depth-First Search
  - Breadth-First Search
  - Union Find
  - Graph
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個無向圖，其中有 `n` 個節點。另給定一個陣列 `edges`，其中 `edges[i] = [a, b]` 表示圖中節點 `a` 和 `b` 之間存在一條無向邊。求連通分量的個數。

## 解題心得
要找出無向圖中連通分量的個數，我們可以使用 **並查集 (Union Find)**，這也是最直觀且高效的做法：
1. 初始時，每個節點各自是一個連通分量，故連通分量總數為 `n`。
2. 對於每條邊 `[u, v]`，我們在並查集中執行 `union(u, v)`：
   - 如果 `u` 和 `v` 本來就在同一個連通分量中，則不作任何事。
   - 如果不在同一個連通分量中，我們合併它們，並將連通分量總數減 1。
3. 所有邊合併完成後，剩餘的連通分量總數即為答案。

- **時間複雜度**: O(V + E \cdot \alpha(V))
- **空間複雜度**: O(V)

## 程式碼實作

### Python
```python
class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        parent = list(range(n))
        self.count = n
        
        def find(i):
            if parent[i] == i:
                return i
            parent[i] = find(parent[i])
            return parent[i]
            
        def union(i, j):
            root_i = find(i)
            root_j = find(j)
            if root_i != root_j:
                parent[root_i] = root_j
                self.count -= 1

        for u, v in edges:
            union(u, v)
            
        return self.count
```

### C++
```cpp
#include <vector>
#include <numeric>

class Solution {
private:
    std::vector<int> parent;
    int count;

    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }

    void unionNodes(int i, int j) {
        int root_i = find(i);
        int root_j = find(j);
        if (root_i != root_j) {
            parent[root_i] = root_j;
            count--;
        }
    }

public:
    int countComponents(int n, std::vector<std::vector<int>>& edges) {
        parent.resize(n);
        std::iota(parent.begin(), parent.end(), 0);
        count = n;

        for (const auto& edge : edges) {
            unionNodes(edge[0], edge[1]);
        }
        return count;
    }
};
```
