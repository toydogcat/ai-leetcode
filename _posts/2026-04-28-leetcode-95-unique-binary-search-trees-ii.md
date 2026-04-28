---
title: "LeetCode #95: Unique Binary Search Trees II"
categories:
  - Tree
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 解題心得：結構的排列組合
這題要求我們生成所有可能的二元搜尋樹 (BST)。

**核心思想：分治法 (Divide and Conquer)**
1. **選一個根**：假設我們要用 $1 \dots n$ 構造樹，我們可以輪流選其中一個數字 $i$ 作為根節點。
2. **拆分左右**：
   - 比 $i$ 小的數字 ($1 \dots i-1$) 必須全部在 **左子樹**。
   - 比 $i$ 大的數字 ($i+1 \dots n$) 必須全部在 **右子樹**。
3. **遞迴構建**：分別遞迴拿到所有可能的左子樹集合與右子樹集合。
4. **組合**：用雙重迴圈，把每一種左子樹跟每一種右子樹接到根節點 $i$ 上。

### Python
```python
class Solution:
    def generateTrees(self, n: int) -> List[Optional[TreeNode]]:
        if n == 0: return []
        
        def build(start, end):
            if start > end: return [None]
            all_trees = []
            for i in range(start, end + 1):
                # 遞迴獲取所有可能的左、右子樹
                left_trees = build(start, i - 1)
                right_trees = build(i + 1, end)
                
                # 組合
                for l in left_trees:
                    for r in right_trees:
                        root = TreeNode(i)
                        root.left = l
                        root.right = r
                        all_trees.append(root)
            return all_trees
            
        return build(1, n)
```
