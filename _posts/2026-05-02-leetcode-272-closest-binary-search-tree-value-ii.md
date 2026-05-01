---
title: "LeetCode #272: Closest Binary Search Tree Value II (最接近的二元搜尋樹值 II)"
categories:
  - Tree
  - Binary Search Tree
  - Depth-First Search
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個非空的二元搜尋樹（BST），一個目標值 `target` 以及一個整數 `k`。請在該樹中找出 `k` 個節點值，使其最接近 `target`。

**注意：**
1. 給定的目標值 `target` 是浮點數。
2. 你可以按任何順序返回答案。
3. 題目保證答案唯一。

**範例 1:**
```
輸入: root = [4,2,5,1,3], target = 3.714286, k = 2
輸出: [4,3]
```

## 解題心得：中序遍歷與雙端佇列 (In-order & Deque)
這是題 [Closest Binary Search Tree Value I](./2026-05-02-leetcode-270-closest-binary-search-tree-value.md) 的進階版本。
由於樹是一棵二元搜尋樹（BST），對其進行 **中序遍歷（In-order Traversal）** 可以得到一個由小到大排序的序列。

**核心邏輯**：
1. **中序遍歷與維護佇列**：
   - 建立一個長度上限為 `k` 的雙端佇列（Deque）。
   - 進行中序遍歷，按遞增順序訪問節點。
2. **容量與更新判斷**：
   - 如果佇列大小小於 `k`：直接將當前節點值加入佇列尾端。
   - 如果佇列大小等於 `k`：
     - 比對當前節點值 `node.val` 與佇列最前端節點值 `dq[0]` 跟 `target` 的距離。
     - 如果 `node.val` 更接近 `target`：彈出佇列前端的元素，並將 `node.val` 加入佇列尾端。
     - **提前結束條件**：如果 `node.val` 沒有比 `dq[0]` 更接近 `target`，因為中序遍歷接下來的元素只會更大、離 `target` 更遠，我們可以提前結束整個遍歷過程。

- **時間複雜度**: $O(N)$，最壞情況遍歷整棵樹。
- **空間複雜度**: $O(H + K)$，其中 $H$ 為遞迴呼叫堆疊（樹的高度），$K$ 為佇列大小。

## 程式碼實作

### Python
```python
from collections import deque

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def closestKValues(self, root: Optional[TreeNode], target: float, k: int) -> List[int]:
        dq = deque()
        
        def inorder(node):
            if not node:
                return True # True 表示繼續遍歷
                
            # 先走左子樹
            if not inorder(node.left):
                return False
                
            # 處理當前節點
            if len(dq) < k:
                dq.append(node.val)
            else:
                # 比對前端元素與當前節點，看誰離 target 更近
                if abs(node.val - target) < abs(dq[0] - target):
                    dq.popleft()
                    dq.append(node.val)
                else:
                    # 後續只會更大、離 target 更遠，提前剪枝結束
                    return False
                    
            # 走右子樹
            return inorder(node.right)
            
        inorder(root)
        return list(dq)
```

### C++
```cpp
#include <vector>
#include <deque>
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
private:
    std::deque<int> dq;

    bool inorder(TreeNode* node, double target, int k) {
        if (!node) return true;

        if (!inorder(node->left, target, k)) return false;

        if (dq.size() < k) {
            dq.push_back(node->val);
        } else {
            if (std::abs(node->val - target) < std::abs(dq.front() - target)) {
                dq.pop_front();
                dq.push_back(node->val);
            } else {
                return false;
            }
        }

        return inorder(node->right, target, k);
    }

public:
    std::vector<int> closestKValues(TreeNode* root, double target, int k) {
        dq.clear();
        inorder(root, target, k);
        return std::vector<int>(dq.begin(), dq.end());
    }
};
```
