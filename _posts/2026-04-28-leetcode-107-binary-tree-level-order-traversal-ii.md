---
title: "LeetCode #107: Binary Tree Level Order Traversal II"
categories:
  - Tree
tags:
  - Medium
  - BFS
  - Python
  - C++
---

## 題目描述
給你二元樹的根節點 `root` ，返回其節點值 **自底向上的層序遍歷** 。 （即按從葉子節點所在層到根節點所在層的順序，逐層從左向右遍歷）。

## 解題心得：倒著數回來
這題就是 #102 的結果反轉。
我們照常用 BFS 獲取正常的層序遍歷（從根到葉），最後把整個結果數組 `reverse` 即可。

### Python
```python
from collections import deque

class Solution:
    def levelOrderBottom(self, root: Optional[TreeNode]) -> List[List[int]]:
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
            
        return res[::-1] # 反轉結果
```

### C++
```cpp
class Solution {
public:
    vector<vector<int>> levelOrderBottom(TreeNode* root) {
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
        reverse(res.begin(), res.end()); // 反轉結果
        return res;
    }
};
```
