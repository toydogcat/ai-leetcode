---
title: "LeetCode #111: Minimum Depth of Binary Tree"
categories:
  - Tree
tags:
  - Easy
  - BFS
  - Python
  - C++
---

## 題目描述
給定一個二元樹，找出其最小深度。
最小深度是從根節點到最近葉子節點的最短路徑上的節點數量。

## 解題心得：尋找最近的出路
這題跟 #104 (最大深度) 很像，但有一個大坑：
**如果根節點只有左子樹或只有右子樹，它的最小深度不是 1。**
因為葉子節點的定義是「左右子節點都為空」。

**最推薦的方法是 BFS (層序遍歷)：**
一旦我們遇到第一個葉子節點，當前所在的層數就是最小深度。這比 DFS 更有效率，因為我們不需要遍歷整棵樹。

### Python
```python
from collections import deque

class Solution:
    def minDepth(self, root: Optional[TreeNode]) -> int:
        if not root: return 0
        queue = deque([(root, 1)])
        
        while queue:
            node, depth = queue.popleft()
            if not node.left and not node.right:
                return depth
            if node.left: queue.append((node.left, depth + 1))
            if node.right: queue.append((node.right, depth + 1))
            
        return 0
```

### C++
```cpp
class Solution {
public:
    int minDepth(TreeNode* root) {
        if (!root) return 0;
        queue<pair<TreeNode*, int>> q;
        q.push({root, 1});
        
        while (!q.empty()) {
            TreeNode* node = q.front().first;
            int depth = q.front().second;
            q.pop();
            
            if (!node->left && !node->right) return depth;
            if (node->left) q.push({node->left, depth + 1});
            if (node->right) q.push({node->right, depth + 1});
        }
        return 0;
    }
};
```
