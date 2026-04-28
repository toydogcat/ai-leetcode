---
title: "LeetCode #104: Maximum Depth of Binary Tree"
categories:
  - Tree
tags:
  - Easy
  - DFS
  - Python
  - C++
---

## 題目描述
給定一個二元樹，找出其最大深度。
二元樹的深度為根節點到最遠葉子節點的最長路徑上的節點數。

## 解題心得：更上一層樓
這是一道非常基礎的遞迴題。
要找一棵樹的最大深度，其實就是找它的 **左子樹深度** 和 **右子樹深度** 中的最大值，然後再加上根節點自己（也就是 +1）。

**遞迴公式：**
`maxDepth(root) = 1 + max(maxDepth(root.left), maxDepth(root.right))`

### Python
```python
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root: return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))
```

### C++
```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};
```
