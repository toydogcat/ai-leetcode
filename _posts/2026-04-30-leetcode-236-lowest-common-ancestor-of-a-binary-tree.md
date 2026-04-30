---
title: "LeetCode #236: Lowest Common Ancestor of a Binary Tree (二叉樹的最近公共祖先)"
categories:
  - Tree
  - Binary Tree
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個二叉樹，找到該樹中兩個指定節點的最近公共祖先 (LCA)。

## 解題心得：遞迴後序遍歷
與 BST 不同，普通二叉樹沒有值的規律，我們必須通過遞迴來尋找。

**核心邏輯：**
1. **基結準則**：
   - 如果當前節點為空，或者等於 `p` 或 `q`，則直接返回當前節點。
2. **遞迴查找**：
   - 在左子樹中找 LCA，結果記為 `left`。
   - 在右子樹中找 LCA，結果記為 `right`。
3. **判斷結果**：
   - 如果 `left` 和 `right` 同時不為空：說明 `p` 和 `q` 分別分佈在當前節點的兩側，那麼 **當前節點** 就是最近公共祖先。
   - 如果只有一個不為空：說明 `p` 和 `q` 都在該側子樹中，返回那個不為空的結果。
   - 如果都為空：返回空。

- **時間複雜度**: $O(N)$，每個節點訪問一次。
- **空間複雜度**: $O(H)$，遞迴棧空間。

## 程式碼實作

### Python
```python
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        # 1. 終止條件
        if not root or root == p or root == q:
            return root
        
        # 2. 遞迴
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        
        # 3. 判斷
        if left and right:
            return root
        
        return left if left else right
```

### C++
```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        
        if (left && right) return root;
        
        return left ? left : right;
    }
};
```
