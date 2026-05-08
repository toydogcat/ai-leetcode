---
title: "LeetCode #332: Reconstruct Itinerary (重建行程)"
categories:
  - Depth-First Search
  - Graph
  - Eulerian Circuit
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一份機票列表 `tickets`，其中 `tickets[i] = [from, to]` 表示出發和降落機場。請你重建行程，使得行程從 `'JFK'` 出發，且剛好用完所有機票。若有多個合法行程，請返回按字典序最小的那一個。

## 解題心得
這是一個尋找 **歐拉路徑 (Eulerian Path)** 的問題（要求一筆畫經過所有的邊，且字典序最小）：
1. 我們可以使用鄰接表建立圖，並對每個節點的目標列表按字典序從小到大排序。
2. 使用 **Hierholzer 演算法 (DFS)**：
   - 從 `'JFK'` 出發，每次貪心地選擇字典序最小的鄰居機場前進，並隨即在鄰接表中「刪除」該條機票（邊）。
   - 如果某個機場沒有可前進的邊時，表示我們已經走到了死胡同（終點），這時將該機場「逆序」加入到行程清單中。
3. 最後將行程清單逆序翻轉，即為我們正確的行程路徑。

- **時間複雜度**: O(E log E) 其中 $E$ 是邊數（即機票張數），主要是因為鄰接機場排序
- **空間複雜度**: O(E)

## 程式碼實作

### Python
```python
from collections import defaultdict

class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        adj = defaultdict(list)
        for u, v in sorted(tickets, reverse=True):
            adj[u].append(v)
            
        itinerary = []
        
        def dfs(airport):
            while adj[airport]:
                next_dest = adj[airport].pop()
                dfs(next_dest)
            itinerary.append(airport)

        dfs("JFK")
        return itinerary[::-1]
```

### C++
```cpp
#include <vector>
#include <string>
#include <unordered_map>
#include <map>
#include <queue>
#include <algorithm>

class Solution {
private:
    std::unordered_map<std::string, std::priority_queue<std::string, std::vector<std::string>, std::greater<std::string>>> adj;
    std::vector<std::string> itinerary;

    void dfs(const std::string& airport) {
        while (!adj[airport].empty()) {
            std::string next = adj[airport].top();
            adj[airport].pop();
            dfs(next);
        }
        itinerary.push_back(airport);
    }

public:
    std::vector<std::string> findItinerary(std::vector<std::vector<std::string>>& tickets) {
        for (const auto& ticket : tickets) {
            adj[ticket[0]].push(ticket[1]);
        }
        dfs("JFK");
        std::reverse(itinerary.begin(), itinerary.end());
        return itinerary;
    }
};
```
