---
title: "LeetCode #99: Recover Binary Search Tree"
categories:
  - Tree
tags:
  - Medium
  - Python
  - C++
---

## 解題心得：找出隊伍中的搗蛋鬼
一個 BST 中有兩個節點被錯誤地交換了，請恢復它。

**思路：**
同樣利用 **中序遍歷**。原本應該是 `1, 2, 3, 4, 5`，如果交換了 2 和 4，會變成 `1, 4, 3, 2, 5`。
1. 我們會發現第一個「降序」的位置（4 > 3），這裏的 4 是第一個錯誤點。
2. 我們會發現最後一個「降序」的位置（3 > 2），這裏的 2 是第二個錯誤點。
最後交換這兩個點的值即可。

### Python
```python
class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        self.first = self.second = self.prev = None
        
        def dfs(node):
            if not node: return
            dfs(node.left)
            
            # 檢查錯誤
            if self.prev and node.val < self.prev.val:
                if not self.first: self.first = self.prev
                self.second = node
            self.prev = node
            
            dfs(node.right)
            
        dfs(root)
        # 交換值
        self.first.val, self.second.val = self.second.val, self.first.val
```
