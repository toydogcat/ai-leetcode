---
title: "LeetCode #305: Number of Islands II (島嶼數量 II)"
categories:
  - Union Find
  - Array
tags:
  - Hard
  - Python
  - C++
---

{% raw %}
## 題目描述
給你一個大小為 `m x n` 的網格。初始時，所有格子的值都是 `'0'`（水域）。你需要執行一連串的操作將特定格子的 `'0'` 改為 `'1'`（陸地）。返回每次操作後陸地（島嶼）的數量。

## 解題心得
這是一個典型的動態連通性問題，我們可以使用 **並查集 (Union Find)** 來高效維護：
1. 初始化一個並查集與計數器，島嶼數初始為 0。
2. 當在 `(r, c)` 新增一塊陸地時，我們將其視為一個獨立的新島嶼（島嶼數 + 1）。
3. 檢查其上下左右四個鄰居，如果鄰居也是陸地且與當前島嶼不屬於同一個集合（利用 `find` 判斷）：
   - 將它們 `union`（合併）。
   - 每次成功合併，島嶼數即減 1。
4. 將每一次操作後的島嶼數量加入結果陣列中。

- **時間複雜度**: 每次操作 $O(\alpha(M \times N))$，總時間複雜度 $O(L \cdot \alpha(M \times N))$，其中 $L$ 是操作次數
- **空間複雜度**: O(M \times N)

## 程式碼實作

### Python
```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.count = 0

    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i, j):
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i != root_j:
            self.parent[root_i] = root_j
            self.count -= 1

class Solution:
    def numIslands2(self, m: int, n: int, positions: List[List[int]]) -> List[int]:
        uf = UnionFind(m * n)
        grid = set()
        ans = []
        
        for r, c in positions:
            idx = r * n + c
            if idx in grid:
                ans.append(uf.count)
                continue
            grid.add(idx)
            uf.count += 1
            
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    n_idx = nr * n + nc
                    if n_idx in grid:
                        uf.union(idx, n_idx)
            ans.append(uf.count)
            
        return ans
```

### C++
```cpp
#include <vector>
#include <unordered_set>

class UnionFind {
public:
    std::vector<int> parent;
    int count;

    UnionFind(int n) {
        parent.resize(n);
        for (int i = 0; i < n; ++i) parent[i] = i;
        count = 0;
    }

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
};

class Solution {
public:
    std::vector<int> numIslands2(int m, int n, std::vector<std::vector<int>>& positions) {
        UnionFind uf(m * n);
        std::vector<int> ans;
        std::unordered_set<int> grid;

        for (const auto& pos : positions) {
            int r = pos[0], c = pos[1];
            int idx = r * n + c;

            if (grid.find(idx) != grid.end()) {
                ans.push_back(uf.count);
                continue;
            }

            grid.insert(idx);
            uf.count++;

            int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
            for (auto& d : dirs) {
                int nr = r + d[0];
                int nc = c + d[1];
                int n_idx = nr * n + nc;

                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid.find(n_idx) != grid.end()) {
                    uf.unionNodes(idx, n_idx);
                }
            }
            ans.push_back(uf.count);
        }
        return ans;
    }
};
```
{% endraw %}
