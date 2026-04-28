---
title: "LeetCode #117: Populating Next Right Pointers in Each Node II"
categories:
  - Tree
tags:
  - Medium
  - BFS
  - Python
  - C++
---

## 題目描述
這題是 #116 的進階版，但給定的二元樹 **不再是完美二元樹**。你需要同樣填充每個 `next` 指針。

## 解題心得：層序遍歷最穩
由於樹不對稱且不完整，#116 的遞迴方法變得非常複雜。
最直覺且穩定的方法是使用 **BFS (層序遍歷)**。
在遍歷每一層時，我們將該層的所有節點依次串聯起來。

### Python
```python
from collections import deque

class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if not root: return None
        queue = deque([root])
        
        while queue:
            level_size = len(queue)
            prev = None
            for i in range(level_size):
                node = queue.popleft()
                if prev:
                    prev.next = node
                prev = node
                
                if node.left: queue.append(node.left)
                if node.right: queue.append(node.right)
                
        return root
```

### C++
```cpp
class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;
        queue<Node*> q;
        q.push(root);
        
        while (!q.empty()) {
            int level_size = q.size();
            Node* prev = nullptr;
            for (int i = 0; i < level_size; ++i) {
                Node* node = q.front();
                q.pop();
                
                if (prev) prev->next = node;
                prev = node;
                
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        return root;
    }
};
```
