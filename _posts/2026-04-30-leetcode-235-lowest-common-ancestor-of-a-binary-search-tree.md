---
title: "LeetCode #235: Lowest Common Ancestor of a Binary Search Tree (二叉搜索樹的最近公共祖先)"
categories:
  - Tree
  - Binary Search Tree
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個二叉搜索樹 (BST)，找到該樹中兩個指定節點的最近公共祖先 (LCA)。
最近公共祖先的定義：對於有根樹 T 的兩個節點 p、q，最近公共祖先表示為一個節點 x，滿足 x 是 p、q 的祖先且 x 的深度盡可能大（一個節點也可以是它自己的祖先）。

## 解題心得：利用 BST 性質
在普通二叉樹中找 LCA 需要遍歷，但在 BST 中，我們可以根據節點值的大小關係快速定位。

**核心邏輯：**
1. 如果 `p` 和 `q` 的值都小於 `root`，說明 LCA 在左子樹中。
2. 如果 `p` 和 `q` 的值都大於 `root`，說明 LCA 在右子樹中。
3. 如果一個大於等於 `root`，另一個小於等於 `root`（或者其中一個就是 `root`），那麼當前 `root` 就是最近公共祖先。

- **時間複雜度**: $O(H)$，其中 $H$ 為樹的高度。
- **空間複雜度**: $O(1)$（如果使用迭代法）。

## 程式碼實作

### Python
```python
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        while root:
            if p.val < root.val and q.val < root.val:
                root = root.left
            elif p.val > root.val and q.val > root.val:
                root = root.right
            else:
                return root
```

### C++
```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        while (root) {
            if (p->val < root->val && q->val < root->val) {
                root = root->left;
            } else if (p->val > root->val && q->val > root->val) {
                root = root->right;
            } else {
                return root;
            }
        }
        return nullptr;
    }
};
```
