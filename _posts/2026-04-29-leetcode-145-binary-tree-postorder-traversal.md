---
title: "LeetCode #145: Binary Tree Postorder Traversal"
categories:
  - Tree
tags:
  - Easy
  - Stack
  - Python
  - C++
---

## 題目描述
給你二元樹的根節點 `root` ，返回它節點值的 **後序** 遍歷。

## 解題心得：左 -> 右 -> 根
後序遍歷的順序是：左子樹 -> 右子樹 -> 根節點。
迭代寫法有一個巧妙的技巧：
1. 觀察前序遍歷（根 -> 左 -> 右）。
2. 如果我們改成（根 -> 右 -> 左），得到的結果序列剛好是後序遍歷的 **反轉**。
3. 所以我們照著（根 -> 右 -> 左）的順序存入結果，最後把結果 `reverse` 即可。

### Python
```python
class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root: return []
        res = []
        stack = [root]
        
        while stack:
            node = stack.pop()
            res.append(node.val)
            # 先左後右，這樣彈出順序就是先右後左
            if node.left: stack.append(node.left)
            if node.right: stack.append(node.right)
            
        return res[::-1] # 反轉結果
```

### C++
```cpp
class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        if (!root) return {};
        vector<int> res;
        stack<TreeNode*> s;
        s.push(root);
        
        while (!s.empty()) {
            TreeNode* node = s.top();
            s.pop();
            res.push_back(node->val);
            
            if (node->left) s.push(node->left);
            if (node->right) s.push(node->right);
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```
