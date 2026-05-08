---
title: "LeetCode #399: Evaluate Division (除法求值)"
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
給定一組除法等式 `A / B = val`，求給定查詢等式的結果。

## 解題心得
這是一道經典的 **有向加權圖** 尋找路徑問題：
- 將每個變數視為圖中的一個頂點。等式 `A / B = val` 代表從 A 到 B 有一條權重為 `val` 的有向邊，從 B 到 A 有一條權重為 `1/val` 的邊。
- 對於每個查詢 `X / Y`，我們使用 **深度優先搜尋 (DFS)** 尋找從 X 到 Y 的路徑，將沿途邊的權重相乘即為答案。若頂點不存在或無路徑，返回 -1.0。

- **時間複雜度**: O(Q * (V + E)) 其中 Q 是查詢數，V, E 是圖的節點數和邊數
- **空間複雜度**: O(V + E)

## 程式碼實作

### Python
```python
from collections import defaultdict

class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        graph = defaultdict(dict)
        for (x, y), val in zip(equations, values):
            graph[x][y] = val
            graph[y][x] = 1.0 / val
            
        def dfs(start, end, visited):
            if start not in graph or end not in graph:
                return -1.0
            if start == end:
                return 1.0
            visited.add(start)
            for neighbor, val in graph[start].items():
                if neighbor not in visited:
                    res = dfs(neighbor, end, visited)
                    if res != -1.0:
                        return val * res
            return -1.0
            
        ans = []
        for x, y in queries:
            ans.append(dfs(x, y, set()))
        return ans
```

### C++
```cpp
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>

class Solution {
private:
    double dfs(const std::string& start, const std::string& end, 
               std::unordered_map<std::string, std::unordered_map<std::string, double>>& graph,
               std::unordered_set<std::string>& visited) {
        if (graph.find(start) == graph.end() || graph.find(end) == graph.end()) return -1.0;
        if (start == end) return 1.0;

        visited.insert(start);
        for (auto const& [neighbor, val] : graph[start]) {
            if (visited.find(neighbor) == visited.end()) {
                double res = dfs(neighbor, end, graph, visited);
                if (res != -1.0) {
                    return val * res;
                }
            }
        }
        return -1.0;
    }

public:
    std::vector<double> calcEquation(std::vector<std::vector<std::string>>& equations, 
                                     std::vector<double>& values, 
                                     std::vector<std::vector<std::string>>& queries) {
        std::unordered_map<std::string, std::unordered_map<std::string, double>> graph;
        for (size_t i = 0; i < equations.size(); ++i) {
            std::string x = equations[i][0];
            std::string y = equations[i][1];
            double val = values[i];
            graph[x][y] = val;
            graph[y][x] = 1.0 / val;
        }

        std::vector<double> ans;
        for (auto const& query : queries) {
            std::unordered_set<std::string> visited;
            ans.push_back(dfs(query[0], query[1], graph, visited));
        }
        return ans;
    }
};
```
