---
title: "LeetCode #110: Balanced Binary Tree"
categories:
  - Tree
tags:
  - Easy
  - DFS
  - Python
  - C++
---

## 題目描述
給定一個二元樹，判斷它是否是高度平衡的二元樹。
本題中，一棵高度平衡二元樹定義為：一個二元樹每個節點的左右兩個子樹的高度差的絕對值不超過 1 。

## 解題心得：平衡的藝術
要檢查一棵樹是否平衡，我們需要知道每個節點的 **高度**。
一個節點是平衡的，若且唯若：
1. 其左子樹是平衡的。
2. 其右子樹是平衡的。
3. 其左子樹高度與右子樹高度差不超過 1。

我們可以使用遞迴（後序遍歷）：
- 如果子樹不平衡，向上返回 `-1`。
- 如果子樹平衡，返回其真實高度。

這樣我們只需要遍歷一次整棵樹即可得出答案。

### Python
```python
class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def get_height(node):
            if not node: return 0
            
            left = get_height(node.left)
            if left == -1: return -1
            
            right = get_height(node.right)
            if right == -1: return -1
            
            if abs(left - right) > 1: return -1
            
            return 1 + max(left, right)
            
        return get_height(root) != -1
```

### C++
```cpp
class Solution {
public:
    bool isBalanced(TreeNode* root) {
        return getHeight(root) != -1;
    }
    
    int getHeight(TreeNode* node) {
        if (!node) return 0;
        
        int left = getHeight(node->left);
        if (left == -1) return -1;
        
        int right = getHeight(node->right);
        if (right == -1) return -1;
        
        if (abs(left - right) > 1) return -1;
        
        return 1 + max(left, right);
    }
};
```
