---
title: "LeetCode #230: Kth Smallest Element in a BST (二叉搜索樹中第 K 小的元素)"
categories:
  - Tree
  - Depth-First Search
  - Binary Search Tree
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個二叉搜索樹的根節點 `root` ，和一個整數 `k` ，請你設計一個算法查找其中第 `k` 個最小元素（從 1 開始計數）。

## 解題心得：利用中序遍歷 (In-order Traversal)
二叉搜索樹 (BST) 有一個核心性質：其 **中序遍歷** 的結果是一個 **遞增序列**。

**核心邏輯：**
1. 進行中序遍歷（左 -> 根 -> 右）。
2. 每訪問一個節點，計數器 `count` 加 1。
3. 當 `count == k` 時，當前節點的值即為所求。
4. 為了優化，可以在找到結果後提前停止遞迴。

- **時間複雜度**: $O(H + k)$，其中 $H$ 是樹的高度。最壞情況 $O(N)$。
- **空間複雜度**: $O(H)$，遞迴棧空間。

## 程式碼實作

### Python (迭代式中序遍歷)
```python
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []
        curr = root
        
        while stack or curr:
            while curr:
                stack.append(curr)
                curr = curr.left
            
            curr = stack.pop()
            k -= 1
            if k == 0:
                return curr.val
            
            curr = curr.right
```

### C++ (遞迴式中序遍歷)
```cpp
class Solution {
    int count = 0;
    int res = -1;
public:
    int kthSmallest(TreeNode* root, int k) {
        traverse(root, k);
        return res;
    }

    void traverse(TreeNode* node, int k) {
        if (!node || res != -1) return;
        
        traverse(node->left, k);
        
        count++;
        if (count == k) {
            res = node->val;
            return;
        }
        
        traverse(node->right, k);
    }
};
```
