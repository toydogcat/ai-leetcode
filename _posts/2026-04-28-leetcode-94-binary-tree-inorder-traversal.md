---
title: "LeetCode #94: Binary Tree Inorder Traversal"
categories:
  - Tree
  - Stack
tags:
  - Easy
  - Python
  - C++
---

## 解題心得：左、中、右
中序遍歷是二元樹最基礎的操作之一。記住順序：**左子樹 -> 根節點 -> 右子樹**。

**為什麼它很重要？**
對於「二元搜尋樹 (BST)」來說，中序遍歷出來的結果剛好是 **由小到大排序好的**。這是解決很多進階樹題目的鑰匙。

### Python (遞迴法 - 最直覺)
```python
class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        def dfs(node):
            if not node: return
            dfs(node.left)    # 先去左邊
            res.append(node.val) # 回來中間
            dfs(node.right)   # 再去右邊
        dfs(root)
        return res
```

### C++ (迭代法 - 使用 Stack)
```cpp
#include <vector>
#include <stack>

class Solution {
public:
    std::vector<int> inorderTraversal(TreeNode* root) {
        std::vector<int> res;
        std::stack<TreeNode*> st;
        TreeNode* curr = root;
        while (curr || !st.empty()) {
            while (curr) {
                st.push(curr);
                curr = curr->left;
            }
            curr = st.top(); st.pop();
            res.push_back(curr->val);
            curr = curr->right;
        }
        return res;
    }
};
```
