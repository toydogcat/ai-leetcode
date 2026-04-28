---
title: "LeetCode #98: Validate Binary Search Tree"
categories:
  - Tree
tags:
  - Medium
  - Python
  - C++
---

## 解題心得：魔鬼藏在細節裡
很多人會以為只要檢查「左節點 < 根 < 右節點」就行了。但這是錯的！

**正確規則：**
根節點必須大於 **整個左子樹的所有節點**，且小於 **整個右子樹的所有節點**。

**解題大招：中序遍歷**
還記得 94 題說的嗎？BST 的中序遍歷結果必須是 **嚴格遞增** 的。
我們只要做一次中序遍歷，並檢查當前節點是否大於前一個節點即可。

### Python
```python
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        self.prev = float('-inf')
        def dfs(node):
            if not node: return True
            # 中序遍歷：先去左邊
            if not dfs(node.left): return False
            # 檢查中間：必須比前一個大
            if node.val <= self.prev: return False
            self.prev = node.val
            # 最後去右邊
            return dfs(node.right)
        return dfs(root)
```
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
