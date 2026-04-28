---
title: "LeetCode #124: Binary Tree Maximum Path Sum"
categories:
  - Tree
tags:
  - Hard
  - DFS
  - Python
  - C++
---

## 題目描述
二元樹中的 **路徑** 被定義為一條節點序列，序列中每對相鄰節點之間都存在一條邊。同一個節點在路徑序列中 **至多出現一次** 。該路徑 **至少包含一個** 節點，且不一定經過根節點。
**路徑和** 是路徑中各節點值的總和。
給你一個二元樹的根節點 `root` ，返回其 **最大路徑和** 。

## 解題心得：橋樑的力量
這是一道 Hard 題，重點在於區分「可傳遞的路徑」和「完整的路徑」。
1. **可傳遞路徑：** 對於一個節點，它能給父節點提供的最大貢獻是：`節點值 + max(左子樹貢獻, 右子樹貢獻, 0)`。
2. **完整路徑：** 以該節點為頂點，橫跨左右子樹的路徑和為：`節點值 + 左子樹貢獻 + 右子樹貢獻`。

我們在遞迴過程中，不斷更新全局最大值（考慮完整路徑），但遞迴返回的是「可傳遞路徑」。

### Python
```python
class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        self.max_sum = float('-inf')
        
        def gain(node):
            if not node: return 0
            
            # 獲取左右子樹的貢獻，如果是負數就捨棄(取0)
            left_gain = max(gain(node.left), 0)
            right_gain = max(gain(node.right), 0)
            
            # 嘗試更新全局最大值（當前節點作為橋樑連接左右）
            current_path_sum = node.val + left_gain + right_gain
            self.max_sum = max(self.max_sum, current_path_sum)
            
            # 返回給上一層的最大貢獻
            return node.val + max(left_gain, right_gain)
            
        gain(root)
        return self.max_sum
```

### C++
```cpp
class Solution {
public:
    int max_sum = INT_MIN;
    
    int maxPathSum(TreeNode* root) {
        gain(root);
        return max_sum;
    }
    
    int gain(TreeNode* node) {
        if (!node) return 0;
        
        int left_gain = max(gain(node->left), 0);
        int right_gain = max(gain(node->right), 0);
        
        int current_path_sum = node->val + left_gain + right_gain;
        max_sum = max(max_sum, current_path_sum);
        
        return node->val + max(left_gain, right_gain);
    }
};
```
