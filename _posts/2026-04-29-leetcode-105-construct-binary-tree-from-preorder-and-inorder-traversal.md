---
title: "LeetCode #105: Construct Binary Tree from Preorder and Inorder Traversal"
categories:
  - Tree
tags:
  - Medium
  - Array
  - Hash Table
  - Python
  - C++
---

## 題目描述
給定兩個整數數組 `preorder` 和 `inorder` ，其中 `preorder` 是二元樹的 **前序遍歷**， `inorder` 是同一棵樹的 **中序遍歷**，請構造二元樹並返回其根節點。

## 解題心得：拼圖遊戲
這題就像是一個拼圖遊戲。
1. **前序遍歷 (Preorder)** 的第一個元素永遠是 **根節點 (Root)**。
2. 我們在 **中序遍歷 (Inorder)** 中找到這個根節點的位置，那麼：
   - 根節點左邊的所有元素都屬於 **左子樹**。
   - 根節點右邊的所有元素都屬於 **右子樹**。
3. 知道左右子樹的大小後，我們就可以在 `preorder` 中切分出對應的左、右部分，然後遞迴下去。

為了加速尋找根節點在中序數組中的位置，我們通常會先用一個 `HashMap` 存起來。

### Python
```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        in_map = {val: i for i, val in enumerate(inorder)}
        
        def helper(pre_start, pre_end, in_start, in_end):
            if pre_start > pre_end: return None
            
            root_val = preorder[pre_start]
            root = TreeNode(root_val)
            
            in_root_idx = in_map[root_val]
            left_size = in_root_idx - in_start
            
            root.left = helper(pre_start + 1, pre_start + left_size, in_start, in_root_idx - 1)
            root.right = helper(pre_start + left_size + 1, pre_end, in_root_idx + 1, in_end)
            
            return root
            
        return helper(0, len(preorder)-1, 0, len(inorder)-1)
```

### C++
```cpp
class Solution {
public:
    unordered_map<int, int> in_map;
    
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for (int i = 0; i < inorder.size(); ++i) in_map[inorder[i]] = i;
        return helper(preorder, 0, preorder.size() - 1, 0, inorder.size() - 1);
    }
    
    TreeNode* helper(vector<int>& preorder, int pre_start, int pre_end, int in_start, int in_end) {
        if (pre_start > pre_end) return nullptr;
        
        int root_val = preorder[pre_start];
        TreeNode* root = new TreeNode(root_val);
        
        int in_root_idx = in_map[root_val];
        int left_size = in_root_idx - in_start;
        
        root->left = helper(preorder, pre_start + 1, pre_start + left_size, in_start, in_root_idx - 1);
        root->right = helper(preorder, pre_start + left_size + 1, pre_end, in_root_idx + 1, in_end);
        
        return root;
    }
};
```
