---
title: "LeetCode #100: Same Tree"
categories:
  - Tree
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你兩棵二元樹的根節點 `p` 和 `q` ，編寫一個函數來檢驗這兩棵樹是否相同。

## 解題心得：同步的心跳
這題是遞迴最經典的入門題。

**邏輯很簡單：**
1. 如果兩棵樹都走到了盡頭（都為空），那它們在這一支路上是「相同」的。
2. 如果一棵樹空了另一棵沒空，或者兩棵樹當前的值不一樣，那它們就「不同」。
3. 接下來，我們同步去檢查兩棵樹的 **左手邊** 和 **右手邊**。只有當左右都相同時，整棵樹才算相同。

### Python
```python
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if not p and not q: return True
        if not p or not q or p.val != q.val: return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```

### C++
```cpp
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true;
        if (!p || !q || p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};
```
