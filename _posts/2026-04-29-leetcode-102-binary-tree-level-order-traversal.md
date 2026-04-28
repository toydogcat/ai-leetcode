---
title: "LeetCode #102: Binary Tree Level Order Traversal"
categories:
  - Tree
tags:
  - Medium
  - BFS
  - Python
  - C++
---

## 題目描述
給你一個二元樹的根節點 `root` ，返回其節點值的 **層序遍歷** 。 （即逐層地，從左到右訪問所有節點）。

## 解題心得：排隊報數
層序遍歷（Level Order Traversal）最直覺的方法就是使用 **廣度優先搜索 (BFS)**。
我們可以使用一個「隊列 (Queue)」：
1. 先把根節點放進隊列。
2. 當隊列不為空時，記錄下當前隊列的大小 `level_size`（這就是這一層的所有節點）。
3. 遍歷這 `level_size` 個節點，把它們的值存起來，並把它們的左右子節點放進隊列中供下一層使用。

### Python
```python
from collections import deque

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root: return []
        res = []
        queue = deque([root])
        
        while queue:
            level_size = len(queue)
            current_level = []
            for _ in range(level_size):
                node = queue.popleft()
                current_level.append(node.val)
                if node.left: queue.append(node.left)
                if node.right: queue.append(node.right)
            res.append(current_level)
            
        return res
```

### C++
```cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            int level_size = q.size();
            vector<int> current_level;
            for (int i = 0; i < level_size; ++i) {
                TreeNode* node = q.front();
                q.pop();
                current_level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(current_level);
        }
        return res;
    }
};
```
