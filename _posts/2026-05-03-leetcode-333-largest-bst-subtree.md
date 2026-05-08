---
title: "LeetCode #333: Largest BST Subtree (最大 BST 子樹)"
categories:
  - Tree
  - Binary Search Tree
  - Depth-First Search
  - Binary Tree
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個二元樹的根節點 `root`，找到其中最大的二元搜尋樹（BST）子樹，並返回該子樹的節點個數。

## 解題心得
我們可以使用 **自底向上 (Postorder DFS)** 走訪：
- 每個節點遞迴返回一個含有四個資訊的 tuple：
  `(is_bst, size, min_val, max_val)`
- 一棵子樹是 BST 的條件為：
  1. 左子樹是 BST。
  2. 右子樹是 BST。
  3. 當前節點的值嚴格大於左子樹的最大值，且嚴格小於右子樹的最小值。
- 如果是 BST，則 `size = left_size + right_size + 1`，並更新全局的最大 `size` 變數。
- 如果不是 BST，則將 `is_bst` 設為 `False`（可以返回 `(False, 0, 0, 0)`）。

- **時間複雜度**: O(N) 每個節點僅走訪一次
- **空間複雜度**: O(H) 遞迴堆疊的深度

## 程式碼實作

### Python
```python
class Solution:
    def largestBSTSubtree(self, root: Optional[TreeNode]) -> int:
        self.max_size = 0
        
        def dfs(node):
            if not node:
                return True, 0, float('inf'), -float('inf')
                
            left_bst, left_size, left_min, left_max = dfs(node.left)
            right_bst, right_size, right_min, right_max = dfs(node.right)
            
            if left_bst and right_bst and left_max < node.val < right_min:
                curr_size = left_size + right_size + 1
                self.max_size = max(self.max_size, curr_size)
                return True, curr_size, min(left_min, node.val), max(right_max, node.val)
                
            return False, 0, 0, 0

        dfs(root)
        return self.max_size
```

### C++
```cpp
#include <algorithm>
#include <climits>

class Solution {
private:
    struct SubtreeInfo {
        bool isBST;
        int size;
        long long minVal;
        long long maxVal;
    };

    int maxSize = 0;

    SubtreeInfo dfs(TreeNode* node) {
        if (!node) {
            return {true, 0, LLONG_MAX, LLONG_MIN};
        }

        auto left = dfs(node->left);
        auto right = dfs(node->right);

        if (left.isBST && right.isBST && node->val > left.maxVal && node->val < right.minVal) {
            int currSize = left.size + right.size + 1;
            maxSize = std::max(maxSize, currSize);
            return {true, currSize, std::min((long long)node->val, left.minVal), std::max((long long)node->val, right.maxVal)};
        }
        return {false, 0, 0, 0};
    }

public:
    int largestBSTSubtree(TreeNode* root) {
        dfs(root);
        return maxSize;
    }
};
```
