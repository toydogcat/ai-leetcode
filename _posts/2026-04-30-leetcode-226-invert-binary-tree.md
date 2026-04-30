---
title: "LeetCode #226: Invert Binary Tree (翻轉二叉樹)"
categories:
  - Tree
  - Depth-First Search
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一棵二叉樹的根節點 `root` ，翻轉這棵二叉樹，並返回其根節點。

## 解題心得：著名的「面試梗」
這題因為 Homebrew 的作者 Max Howell 在 Google 面試時因為沒寫出這題而被拒，從而成為了程式員界的著名笑談。但實際上，這題非常簡單，考察的是基本的遞迴思想。

**核心邏輯：遞迴 (DFS)**
1. **基結準則**：如果節點為空，返回 `None`。
2. **交換左右子樹**：
   - 暫存左子樹。
   - 將當前節點的左子樹設置為「翻轉後的右子樹」。
   - 將當前節點的右子樹設置為「翻轉後的左子樹」。
3. 最後返回根節點。

- **時間複雜度**: $O(N)$，每個節點訪問一次。
- **空間複雜度**: $O(N)$，最壞情況下（斜樹）的遞迴棧深度。

## 程式碼實作

### Python
```python
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        
        # 遞迴翻轉子樹並交換
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        
        return root
```

### C++
```cpp
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == nullptr) return nullptr;
        
        TreeNode* left = invertTree(root->left);
        TreeNode* right = invertTree(root->right);
        
        root->left = right;
        root->right = left;
        
        return root;
    }
};
```
