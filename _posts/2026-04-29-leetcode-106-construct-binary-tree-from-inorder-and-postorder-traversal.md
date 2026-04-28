---
title: "LeetCode #106: Construct Binary Tree from Inorder and Postorder Traversal"
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
根據一棵樹的 **中序遍歷 (Inorder)** 與 **後序遍歷 (Postorder)** 構造二元樹。

## 解題心得：後發制人
這題邏輯與 #105 非常相似，區別在於：
1. **後序遍歷 (Postorder)** 的 **最後一個元素** 是根節點。
2. 同樣在中序遍歷中找到根節點位置，切分左右子樹。
3. 注意在遞迴時，後序遍歷的區間切分方式略有不同。

### Python
```python
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        in_map = {val: i for i, val in enumerate(inorder)}
        
        def helper(in_start, in_end, post_start, post_end):
            if post_start > post_end: return None
            
            root_val = postorder[post_end]
            root = TreeNode(root_val)
            
            in_root_idx = in_map[root_val]
            left_size = in_root_idx - in_start
            
            # 左子樹在中序是 [in_start, in_root_idx-1]，在後序是 [post_start, post_start + left_size - 1]
            root.left = helper(in_start, in_root_idx - 1, post_start, post_start + left_size - 1)
            # 右子樹在中序是 [in_root_idx+1, in_end]，在後序是 [post_start + left_size, post_end - 1]
            root.right = helper(in_root_idx + 1, in_end, post_start + left_size, post_end - 1)
            
            return root
            
        return helper(0, len(inorder)-1, 0, len(postorder)-1)
```

### C++
```cpp
class Solution {
public:
    unordered_map<int, int> in_map;
    
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        for (int i = 0; i < inorder.size(); ++i) in_map[inorder[i]] = i;
        return helper(inorder, 0, inorder.size() - 1, postorder, 0, postorder.size() - 1);
    }
    
    TreeNode* helper(vector<int>& inorder, int in_start, int in_end, vector<int>& postorder, int post_start, int post_end) {
        if (post_start > post_end) return nullptr;
        
        int root_val = postorder[post_end];
        TreeNode* root = new TreeNode(root_val);
        
        int in_root_idx = in_map[root_val];
        int left_size = in_root_idx - in_start;
        
        root->left = helper(inorder, in_start, in_root_idx - 1, postorder, post_start, post_start + left_size - 1);
        root->right = helper(inorder, in_root_idx + 1, in_end, postorder, post_start + left_size, post_end - 1);
        
        return root;
    }
};
```
