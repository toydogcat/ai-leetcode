---
title: "LeetCode #222: Count Complete Tree Nodes (完全二叉樹的節點個數)"
categories:
  - Binary Tree
  - Binary Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一棵 **完全二叉樹** 的根節點 `root` ，求出該樹的節點個數。
完全二叉樹的定義：除了最後一層外，其餘每層節點數都達到最大值，並且最後一層的節點都集中在左側。

## 解題心得：利用完全二叉樹的性質
如果按普通二叉樹遍歷，時間複雜度為 $O(N)$。但對於完全二叉樹，我們可以做到 $O(\log^2 N)$。

**核心邏輯：**
1. **判斷是否為滿二叉樹**：
   - 分別計算左子樹的最左深度和右子樹的最右深度。
   - 如果兩者相等，說明這是一棵滿二叉樹，節點個數為 $2^h - 1$。
2. **遞迴處理**：
   - 如果不相等，則節點個數 = `1 + countNodes(root.left) + countNodes(root.right)`。
   - 在遞迴過程中，至少有一個子樹是滿二叉樹。

- **時間複雜度**: $O(\log N \cdot \log N)$，每次遞迴需要 $\log N$ 時間找深度，共遞迴 $\log N$ 次。
- **空間複雜度**: $O(\log N)$。

## 程式碼實作

### Python
```python
class Solution:
    def countNodes(self, root: Optional[TreeNode]) -> int:
        if not root: return 0
        
        left_depth = self.get_depth(root, True)
        right_depth = self.get_depth(root, False)
        
        # 如果左右深度相同，則是滿二叉樹
        if left_depth == right_depth:
            return (2 ** left_depth) - 1
        
        # 否則普通遞迴
        return 1 + self.countNodes(root.left) + self.countNodes(root.right)
    
    def get_depth(self, node, is_left):
        depth = 0
        while node:
            depth += 1
            node = node.left if is_left else node.right
        return depth
```

### C++
```cpp
class Solution {
public:
    int countNodes(TreeNode* root) {
        if (!root) return 0;
        
        int hl = 0, hr = 0;
        TreeNode *l = root, *r = root;
        while (l) { hl++; l = l->left; }
        while (r) { hr++; r = r->right; }
        
        if (hl == hr) return (1 << hl) - 1;
        
        return 1 + countNodes(root->left) + countNodes(root->right);
    }
};
```
