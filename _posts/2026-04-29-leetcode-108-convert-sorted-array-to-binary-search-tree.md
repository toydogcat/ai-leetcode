---
title: "LeetCode #108: Convert Sorted Array to Binary Search Tree"
categories:
  - Tree
tags:
  - Easy
  - Array
  - Binary Search Tree
  - Python
  - C++
---

## 題目描述
給你一個整數數組 `nums` ，其中元素已經按 **升序** 排列，請你將其轉換為一棵 **高度平衡** 二元搜索樹 (BST)。

## 解題心得：擒賊先擒王
要在一個有序數組中建立一棵高度平衡的 BST，最簡單的方法就是：
1. 選取數組的 **中間元素** 作為根節點。
2. 中間元素左邊的部分遞迴建立 **左子樹**。
3. 中間元素右邊的部分遞迴建立 **右子樹**。

因為數組是有序的，選中間點能保證左右兩邊的節點數量差不超過 1，從而達到高度平衡。

### Python
```python
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        def helper(left, right):
            if left > right: return None
            
            mid = (left + right) // 2
            root = TreeNode(nums[mid])
            root.left = helper(left, mid - 1)
            root.right = helper(mid + 1, right)
            return root
            
        return helper(0, len(nums) - 1)
```

### C++
```cpp
class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return helper(nums, 0, nums.size() - 1);
    }
    
    TreeNode* helper(vector<int>& nums, int left, int right) {
        if (left > right) return nullptr;
        
        int mid = left + (right - left) / 2;
        TreeNode* root = new TreeNode(nums[mid]);
        root->left = helper(nums, left, mid - 1);
        root->right = helper(nums, mid + 1, right);
        return root;
    }
};
```
