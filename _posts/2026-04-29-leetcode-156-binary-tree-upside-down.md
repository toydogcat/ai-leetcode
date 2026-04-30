---
title: "LeetCode #156: Binary Tree Upside Down (上下翻轉二元樹)"
categories:
  - Tree
  - Depth-First Search
tags:
  - Medium
  - Python
  - C++
  - Premium
---

## 題目描述
這是一道 **LeetCode Premium** 題目。

給定一個二元樹，其中所有的右節點要麼是具有兄弟節點（即有一個左兄弟節點）的葉節點，要麼為空。將其上下翻轉並將其轉換為樹，其中原始右節點變為左葉節點。返回新根。

## 解題心得：結構的重新排列
這題的描述有點繞，但本質上是將樹向右旋轉。

**翻轉規則**：
對於當前節點 `root`：
- `root->left` 變成新的根。
- `root->right` 變成 `root->left` 的左子節點。
- `root` 變成 `root->left` 的右子節點。

我們可以使用遞迴的方法，一直深入到最左邊的節點，那個節點將成為新的根。在回溯的過程中，不斷調整指標。

- **時間複雜度**: $O(n)$，遍歷所有節點。
- **空間複雜度**: $O(h)$，递归調用堆棧的深度。

## 程式碼實作

### Python
```python
class Solution:
    def upsideDownBinaryTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root or not root.left:
            return root
        
        newRoot = self.upsideDownBinaryTree(root.left)
        
        # 翻轉指標
        root.left.left = root.right
        root.left.right = root
        
        # 斷開舊的連接，避免成環
        root.left = None
        root.right = None
        
        return newRoot
```

### C++
```cpp
class Solution {
public:
    TreeNode* upsideDownBinaryTree(TreeNode* root) {
        if (!root || !root->left) return root;
        
        TreeNode* newRoot = upsideDownBinaryTree(root->left);
        
        root->left->left = root->right;
        root->left->right = root;
        
        root->left = nullptr;
        root->right = nullptr;
        
        return newRoot;
    }
};
```
