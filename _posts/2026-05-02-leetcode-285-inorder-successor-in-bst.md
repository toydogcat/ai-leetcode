---
title: "LeetCode #285: Inorder Successor in BST (二元搜尋樹中的中序後繼)"
categories:
  - Tree
  - Binary Search Tree
  - Depth-First Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一棵二元搜尋樹（BST）和其中的一個節點 `p`，請找出該節點在樹中的 **中序後繼（Inorder Successor）**。
如果沒有，則返回 `null`。

一個節點 `p` 的中序後繼，是樹中大於 `p.val` 的節點中值最小的那個節點。

**範例 1:**
```
輸入: root = [2,1,3], p = 1
輸出: 2
解釋: 
中序遍歷為 [1,2,3]，1 的後繼節點為 2。
```

**範例 2:**
```
輸入: root = [5,3,6,2,4,null,null,1], p = 6
輸出: null
解釋: 6 是最大節點，沒有中序後繼。
```

## 解題心得：利用 BST 的單調性
中序遍歷的後繼節點，就是大於節點 `p` 的所有節點中最小的那一個。我們可以直接利用二元搜尋樹（BST）的特性，在 $O(H)$ 時間內找到它。

**核心邏輯**：
1. **遍歷與比對**：從樹根節點 `root` 開始：
   - **如果 `p.val >= root.val`**：說明目標後繼節點一定在當前節點的 **右子樹**。我們將 `root` 移動到 `root.right`。
   - **如果 `p.val < root.val`**：說明當前節點大於 `p`，它可能是我們的答案候選人（但也可能左子樹中存在一個更接近、更小的節點）。因此，我們用一個變數 `successor` 先記下這個 `root`，接著向 **左子樹** 尋找：`root = root.left`。
2. 當遍歷到 `None` 時結束，最後存留在 `successor` 的節點即為所求。

- **時間複雜度**: $O(H)$，在平衡樹中為 $O(\log N)$，最壞情況為 $O(N)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def inorderSuccessor(self, root: TreeNode, p: TreeNode) -> Optional[TreeNode]:
        successor = None
        
        while root:
            if p.val < root.val:
                # 當前節點可能是後繼，先記下來，再往左子樹找找看有沒有更小的
                successor = root
                root = root.left
            else:
                # 後繼必定在右子樹
                root = root.right
                
        return successor
```

### C++
```cpp
#include <algorithm>

// Definition for a binary tree node.
// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
// };

class Solution {
public:
    TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
        TreeNode* successor = nullptr;

        while (root != nullptr) {
            if (p->val < root->val) {
                successor = root;
                root = root->left;
            } else {
                root = root->right;
            }
        }

        return successor;
    }
};
```
