---
title: "LeetCode #112: Path Sum"
categories:
  - Tree
tags:
  - Easy
  - DFS
  - Python
  - C++
---

## 題目描述
給你二元樹的根節點 `root` 和一個表示目標和的整數 `targetSum` 。判斷該樹中是否存在 **從根節點到葉子節點** 的路徑，這條路徑上所有節點值相加等於目標和 `targetSum` 。

## 解題心得：扣除法
這題可以使用簡單的遞迴。
每次向下走一步，我們就把 `targetSum` 減去當前節點的值。
當我們到達 **葉子節點** 時，檢查剩下的 `targetSum` 是否等於該葉子節點的值即可。

### Python
```python
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if not root: return False
        
        # 到達葉子節點
        if not root.left and not root.right:
            return targetSum == root.val
        
        return (self.hasPathSum(root.left, targetSum - root.val) or 
                self.hasPathSum(root.right, targetSum - root.val))
```

### C++
```cpp
class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        
        if (!root->left && !root->right) {
            return targetSum == root->val;
        }
        
        return hasPathSum(root->left, targetSum - root->val) || 
               hasPathSum(root->right, targetSum - root->val);
    }
};
```
