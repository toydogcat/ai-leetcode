---
title: "LeetCode #133: Clone Graph"
categories:
  - Hash Table
  - Graph
  - BFS
  - DFS
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你無向 **連通** 圖中一個節點的引用，請你返回該圖的 **深拷貝**（克隆）。

## 解題心得：映射與克隆
克隆圖的關鍵在於處理 **循環引用**（圖中的環）。
我們需要一個 `HashMap` 來儲存 `原節點 -> 克隆節點` 的映射：
1. 當遇到一個節點，如果它已經在 `HashMap` 中，直接返回對應的克隆節點。
2. 如果不在，先創建一個新的克隆節點並存入 `HashMap`。
3. 遞迴克隆該節點的所有鄰居，並加入到克隆節點的鄰居列表中。

### Python
```python
class Solution:
    def cloneGraph(self, node: 'Optional[Node]') -> 'Optional[Node]':
        if not node: return None
        visited = {}
        
        def dfs(curr):
            if curr in visited:
                return visited[curr]
            
            copy = Node(curr.val)
            visited[curr] = copy
            
            for neighbor in curr.neighbors:
                copy.neighbors.append(dfs(neighbor))
            
            return copy
            
        return dfs(node)
```

### C++
```cpp
class Solution {
public:
    unordered_map<Node*, Node*> visited;
    
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        
        if (visited.count(node)) {
            return visited[node];
        }
        
        Node* copy = new Node(node->val);
        visited[node] = copy;
        
        for (Node* neighbor : node->neighbors) {
            copy->neighbors.push_back(cloneGraph(neighbor));
        }
        
        return copy;
    }
};
```
