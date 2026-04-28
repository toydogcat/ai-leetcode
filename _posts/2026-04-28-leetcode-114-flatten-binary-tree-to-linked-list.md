---
title: "LeetCode #114: Flatten Binary Tree to Linked List"
categories:
  - Tree
tags:
  - Medium
  - DFS
  - Python
  - C++
---

## 題目描述
給你二元樹的根節點 `root` ，請你將它展開為一個單鏈表：
1. 展開後的單鏈表應該同樣使用 `TreeNode` ，其中 `right` 子指針指向鏈表中下一個節點，而左子指針始終為 `null` 。
2. 展開後的單鏈表應該與二元樹 **前序遍歷** 順序相同。

## 解題心得：偷龍轉鳳
展開的要求是「前序遍歷」。
一個很巧妙的遞迴思路是 **「逆前序遍歷」**，即：**右 -> 左 -> 根**。
1. 我們維護一個全局變量 `prev` 紀錄上一個處理過的節點。
2. 按照 **右、左、根** 的順序遞迴。
3. 對於每個節點，將其 `right` 指向 `prev`，`left` 設為 `null`，然後更新 `prev`。

這樣當遞迴結束時，整棵樹就按照前序的順序串起來了。

### Python
```python
class Solution:
    def __init__(self):
        self.prev = None
        
    def flatten(self, root: Optional[TreeNode]) -> None:
        if not root: return
        
        self.flatten(root.right)
        self.flatten(root.left)
        
        root.right = self.prev
        root.left = None
        self.prev = root
```

### C++
```cpp
class Solution {
public:
    TreeNode* prev = nullptr;
    
    void flatten(TreeNode* root) {
        if (!root) return;
        
        flatten(root->right);
        flatten(root->left);
        
        root->right = prev;
        root->left = nullptr;
        prev = root;
    }
};
```
