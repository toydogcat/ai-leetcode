---
title: "LeetCode #270: Closest Binary Search Tree Value (最接近的二元搜尋樹值)"
categories:
  - Tree
  - Binary Search Tree
  - Depth-First Search
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個非空的二元搜尋樹（BST）以及一個目標值 `target`。請在該樹中找出一個節點值，使其最接近 `target`。

**注意：**
1. 給定的目標值 `target` 是浮點數。
2. 題目保證樹中只有一個最接近目標值的答案。如果有兩個，返回較小的那一個。

**範例 1:**
```
輸入: root = [4,2,5,1,3], target = 3.714286
輸出: 4
```

## 解題心得：利用 BST 特性進行二分搜尋
由於這棵樹是二元搜尋樹（BST），我們不需要遍歷所有的節點。我們可以藉由節點值與 `target` 的大小關係來判斷移動方向。

**核心邏輯**：
1. **遍歷與比對**：從樹根節點 `root` 開始往下走：
   - 如果當前節點值比我們所記錄的「最接近值 `closest`」更接近 `target`，則更新 `closest`。
   - **平局情況處理**：若與 `target` 的絕對差值相同，則根據題目要求更新為較小的節點值。
2. **選擇子樹方向**：
   - 如果 `target < root.val`：說明目標值比當前節點小，我們應該往 **左子樹** 走。
   - 如果 `target >= root.val`：說明目標值比當前節點大或等於，我們應該往 **右子樹** 走。
3. 當走到底部（遍歷到 `None`）時，搜尋結束，返回 `closest`。

- **時間複雜度**: $O(H)$，其中 $H$ 是樹的高度。在平衡樹中為 $O(\log N)$，最壞情況（樹傾斜）為 $O(N)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def closestValue(self, root: Optional[TreeNode], target: float) -> int:
        closest = root.val
        
        while root:
            # 更新最接近的值
            # 1. 差值更小
            # 2. 差值相同，但當前節點值較小
            if abs(root.val - target) < abs(closest - target):
                closest = root.val
            elif abs(root.val - target) == abs(closest - target):
                closest = min(closest, root.val)
                
            # 利用 BST 特性決定往左或往右走
            if target < root.val:
                root = root.left
            else:
                root = root.right
                
        return closest
```

### C++
```cpp
#include <algorithm>
#include <cmath>

// Definition for a binary tree node.
// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode() : val(0), left(nullptr), right(nullptr) {}
//     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
//     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
// };

class Solution {
public:
    int closestValue(TreeNode* root, double target) {
        int closest = root->val;

        while (root != nullptr) {
            if (std::abs(root->val - target) < std::abs(closest - target)) {
                closest = root->val;
            } else if (std::abs(root->val - target) == std::abs(closest - target)) {
                closest = std::min(closest, root->val);
            }

            if (target < root->val) {
                root = root->left;
            } else {
                root = root->right;
            }
        }

        return closest;
    }
};
```
