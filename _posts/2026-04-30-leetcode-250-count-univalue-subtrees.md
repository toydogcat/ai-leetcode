---
title: "LeetCode #250: Count Univalue Subtrees (統計同值子樹)"
categories:
  - Tree
  - Depth-First Search
  - Binary Tree
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一棵二叉樹，統計並返回其中 **同值子樹** 的個數。
同值子樹是指該子樹的所有節點都擁有相同的數值。

## 解題心得：後序遍歷 (Bottom-up)
這是一個典型的樹形 DP 或遞迴問題。要判斷當前樹是否為同值子樹，必須先知道左右子樹的情況。

**核心邏輯：**
1. **定義遞迴函數**：`is_unival(node)` 返回當前節點是否能構成同值子樹。
2. **判斷條件**：
   - 如果節點是葉子節點，一定是同值子樹，計數加 1。
   - 如果不是葉子，需滿足：
     - 左子樹為空，或者（左子樹是同值子樹且左子值等於當前值）。
     - 右子樹為空，或者（右子樹是同值子樹且右子值等於當前值）。
3. **全局計數**：每當發現一個滿足條件的節點，全局變量 `count` 加 1。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(H)$。

## 程式碼實作

### Python
```python
class Solution:
    def countUnivalSubtrees(self, root: Optional[TreeNode]) -> int:
        self.count = 0
        
        def is_unival(node):
            if not node: return True
            
            # 先檢查左右子樹
            left = is_unival(node.left)
            right = is_unival(node.right)
            
            # 只有左右子樹都是同值，當前才可能是
            if left and right:
                if node.left and node.left.val != node.val:
                    return False
                if node.right and node.right.val != node.val:
                    return False
                
                self.count += 1
                return True
            
            return False
            
        is_unival(root)
        return self.count
```

### C++
```cpp
class Solution {
    int count = 0;
public:
    int countUnivalSubtrees(TreeNode* root) {
        isUnival(root);
        return count;
    }

    bool isUnival(TreeNode* node) {
        if (!node) return true;
        
        bool left = isUnival(node->left);
        bool right = isUnival(node->right);
        
        if (left && right) {
            if (node->left && node->left->val != node->val) return false;
            if (node->right && node->right->val != node->val) return false;
            
            count++;
            return true;
        }
        return false;
    }
};
```
