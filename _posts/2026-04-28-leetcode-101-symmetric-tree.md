---
title: "LeetCode #101: Symmetric Tree"
categories:
  - Tree
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一個二元樹的根節點 `root` ，檢查它是否軸對稱（即關於中心對稱）。

## 解題心得：照鏡子的人
這題就像是在看鏡子。如果一棵樹是對稱的，那麼：
1. 它的左子樹和右子樹互為「鏡像」。
2. 互為鏡像的條件是：
   - 它們的值相等。
   - 左子樹的左邊 == 右子樹的右邊。
   - 左子樹的右邊 == 右子樹的左邊。

我們可以使用遞迴，同時傳入兩個節點來比較。

### Python
```python
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        if not root: return True
        
        def isMirror(t1, t2):
            if not t1 and not t2: return True
            if not t1 or not t2: return False
            return (t1.val == t2.val and 
                    isMirror(t1.left, t2.right) and 
                    isMirror(t1.right, t2.left))
        
        return isMirror(root.left, root.right)
```

### C++
```cpp
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        if (!root) return true;
        return isMirror(root->left, root->right);
    }
    
    bool isMirror(TreeNode* t1, TreeNode* t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;
        return (t1->val == t2->val) && 
               isMirror(t1->left, t2->right) && 
               isMirror(t1->right, t2->left);
    }
};
```
