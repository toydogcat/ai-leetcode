---
title: "LeetCode #298: Binary Tree Longest Consecutive Sequence (二元樹最長連續序列)"
categories:
  - Tree
  - Depth-First Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一棵二元樹的根節點 `root`，返回該樹中 **最長連續序列路徑** 的長度。

**連續序列路徑** 是指一條從父節點到子節點的單向路徑，其中路徑上相鄰節點的值滿足 **後一個節點的值剛好比前一個大 1**（即遞增且差值為 1）。

**範例 1:**
```
輸入: root = [1,null,3,2,4,null,null,null,5]
        1
         \
          3
         / \
        2   4
             \
              5
輸出: 3
解釋: 最長的連續序列路徑是 3-4-5，長度為 3。
```

**範例 2:**
```
輸入: root = [2,null,3,2,null,1]
        2
         \
          3
         /
        2
       /
      1
輸出: 2
解釋: 最長的連續序列路徑是 2-3，而不是 3-2-1，因為路徑必須是遞增的。
```

## 解題心得：自頂向下遞迴搜尋 (Top-down DFS)
這題要求尋找連續遞增的序列路徑，且這條路徑必須是從父節點到子節點（自頂向下）。

**核心邏輯**：
1. **定義遞迴函數**：`dfs(node, parent_val, current_length)`
   - `node`：當前遍歷的節點。
   - `parent_val`：父節點的值。
   - `current_length`：到目前為止連續序列的長度。
2. **判斷是否連續**：
   - 如果當前節點的值剛好比父節點大 1（`node.val == parent_val + 1`），說明當前連續序列得以延續，我們將長度加 1：`current_length + 1`。
   - 否則：連續序列中斷，我們將連續長度重新設為 `1`，開啟一條新的序列路徑。
3. **更新最大長度**：在遍歷過程中，使用一個全域變數記錄下所見過的最大長度 `max_len`。

- **時間複雜度**: $O(N)$，需要遍歷所有節點。
- **空間複雜度**: $O(H)$，其中 $H$ 為樹的高度，遞迴呼叫堆疊。

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
    def longestConsecutive(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
            
        self.max_len = 1
        
        def dfs(node, parent_val, current_len):
            if not node:
                return
                
            # 判斷當前節點是否連續
            if node.val == parent_val + 1:
                length = current_len + 1
            else:
                length = 1
                
            self.max_len = max(self.max_len, length)
            
            # 向下遍歷子樹
            dfs(node.left, node.val, length)
            dfs(node.right, node.val, length)
            
        dfs(root, root.val - 1, 1)
        return self.max_len
```

### C++
```cpp
#include <algorithm>

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
    int maxLen = 0;

    void dfs(TreeNode* node, int parentVal, int currentLen) {
        if (!node) return;

        if (node->val == parentVal + 1) {
            currentLen++;
        } else {
            currentLen = 1;
        }

        maxLen = std::max(maxLen, currentLen);

        dfs(node->left, node->val, currentLen);
        dfs(node->right, node->val, currentLen);
    }

public:
    int longestConsecutive(TreeNode* root) {
        if (!root) return 0;
        maxLen = 1;
        dfs(root, root->val - 1, 1);
        return maxLen;
    }
};
```
