---
title: "LeetCode #103: Binary Tree Zigzag Level Order Traversal"
categories:
  - Tree
tags:
  - Medium
  - BFS
  - Python
  - C++
---

## 題目描述
給你二元樹的根節點 `root` ，返回其節點值的 **鋸齒形層序遍歷** 。（即先從左往右，下一層再從右往左，以此類推，層與層之間交替進行）。

## 解題心得：蛇形走位
這題是 #102 的變體。基本的 BFS 邏輯不變，只需要加一個標誌位 `left_to_right` 來決定這一層的數據要順著存還是反著存。
- 第一層：從左到右
- 第二層：從右到左
- 第三層：從左到右
... 以此類推。

### Python
```python
from collections import deque

class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root: return []
        res = []
        queue = deque([root])
        left_to_right = True
        
        while queue:
            level_size = len(queue)
            current_level = deque()
            for _ in range(level_size):
                node = queue.popleft()
                if left_to_right:
                    current_level.append(node.val)
                else:
                    current_level.appendleft(node.val)
                
                if node.left: queue.append(node.left)
                if node.right: queue.append(node.right)
            
            res.append(list(current_level))
            left_to_right = not left_to_right
            
        return res
```

### C++
```cpp
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        queue<TreeNode*> q;
        q.push(root);
        bool left_to_right = true;
        
        while (!q.empty()) {
            int level_size = q.size();
            vector<int> current_level(level_size);
            for (int i = 0; i < level_size; ++i) {
                TreeNode* node = q.front();
                q.pop();
                
                int index = left_to_right ? i : (level_size - 1 - i);
                current_level[index] = node->val;
                
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(current_level);
            left_to_right = !left_to_right;
        }
        return res;
    }
};
```
