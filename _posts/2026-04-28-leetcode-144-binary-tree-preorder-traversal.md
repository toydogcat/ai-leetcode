---
title: "LeetCode #144: Binary Tree Preorder Traversal"
categories:
  - Tree
tags:
  - Easy
  - Stack
  - Python
  - C++
---

## 題目描述
給你二元樹的根節點 `root` ，返回它節點值的 **前序** 遍歷。

## 解題心得：根 -> 左 -> 右
前序遍歷的順序是：根節點 -> 左子樹 -> 右子樹。
雖然遞迴很簡單，但面試常考 **非遞迴（迭代）** 的寫法。
我們可以使用一個 **棧 (Stack)**：
1. 把根節點入棧。
2. 彈出節點並記錄值。
3. **關鍵：** 先把 **右子節點** 入棧，再把 **左子節點** 入棧（因為棧是後進先出，這樣左子節點會先被彈出處理）。

### Python
```python
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root: return []
        res = []
        stack = [root]
        
        while stack:
            node = stack.pop()
            res.append(node.val)
            # 先右後左
            if node.right: stack.append(node.right)
            if node.left: stack.append(node.left)
            
        return res
```

### C++
```cpp
class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        if (!root) return {};
        vector<int> res;
        stack<TreeNode*> s;
        s.push(root);
        
        while (!s.empty()) {
            TreeNode* node = s.top();
            s.pop();
            res.push_back(node->val);
            
            if (node->right) s.push(node->right);
            if (node->left) s.push(node->left);
        }
        return res;
    }
};
```
