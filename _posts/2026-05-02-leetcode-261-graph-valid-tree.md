---
title: "LeetCode #261: Graph Valid Tree (圖驗證樹)"
categories:
  - Graph
  - Breadth-First Search
  - Depth-First Search
  - Union Find
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定 `n` 個節點（編號從 `0` 到 `n - 1`）以及一個無向邊的列表 `edges`。請判斷這些邊是否能構成一棵有效的樹。

**範例 1：**
```
輸入: n = 5, edges = [[0,1], [0,2], [0,3], [1,4]]
輸出: true
```

**範例 2：**
```
輸入: n = 5, edges = [[0,1], [1,2], [2,3], [1,3], [1,4]]
輸出: false
```

## 解題心得：判斷樹的條件
在圖論中，一個包含 `n` 個節點的無向圖能構成一棵有效的樹，若且唯若滿足以下兩個條件：
1. **邊的數量必須剛好為 `n - 1`**：少於 `n - 1` 則不連通，多於 `n - 1` 則必定存在環。
2. **所有節點必須連通**（即沒有孤立的子圖）。

因此，我們可以使用並查集（Union-Find）、廣度優先搜尋（BFS）或深度優先搜尋（DFS）來檢查這兩個條件。
以下實作中，我們先過濾掉邊數不等於 `n - 1` 的情況，接著使用 Union-Find 來判定是否有環或是否能將所有節點連通。

- **時間複雜度**: $O(N \alpha(N))$，其中 $\alpha$ 是阿克曼函數的反函數，幾乎可以視為常數時間。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
class UnionFind:
    def __init__(self, size):
        self.root = list(range(size))
        self.count = size

    def find(self, x):
        if x == self.root[x]:
            return x
        self.root[x] = self.find(self.root[x])
        return self.root[x]

    def union(self, x, y):
        rootX = self.find(x)
        rootY = self.find(y)
        if rootX != rootY:
            self.root[rootX] = rootY
            self.count -= 1
            return True
        return False

class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        # 樹必須有 n - 1 條邊
        if len(edges) != n - 1:
            return False
        
        uf = UnionFind(n)
        for u, v in edges:
            # 如果發現邊連接的兩點已經在同一個集合，代表有環
            if not uf.union(u, v):
                return False
                
        # 最後只要確認所有邊加入後，整張圖連通（集合總數減為 1）
        return uf.count == 1
```

### C++
```cpp
#include <vector>
#include <numeric>

class UnionFind {
private:
    std::vector<int> root;
    int count;

public:
    UnionFind(int size) : count(size) {
        root.resize(size);
        std::iota(root.begin(), root.end(), 0);
    }

    int find(int x) {
        if (x == root[x]) {
            return x;
        }
        return root[x] = find(root[x]);
    }

    bool unite(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        if (rootX != rootY) {
            root[rootX] = rootY;
            count--;
            return true;
        }
        return false;
    }

    int getCount() const {
        return count;
    }
};

class Solution {
public:
    bool validTree(int n, std::vector<std::vector<int>>& edges) {
        if (edges.size() != n - 1) {
            return false;
        }

        UnionFind uf(n);
        for (const auto& edge : edges) {
            if (!uf.unite(edge[0], edge[1])) {
                return false;
            }
        }

        return uf.getCount() == 1;
    }
};
```
