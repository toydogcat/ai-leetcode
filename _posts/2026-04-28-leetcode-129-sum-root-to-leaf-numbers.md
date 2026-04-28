---
title: "LeetCode #129: Sum Root to Leaf Numbers"
categories:
  - Tree
tags:
  - Medium
  - DFS
  - Python
  - C++
---

## 題目描述
給你一個二元樹的根節點 `root` ，樹中每個節點都存放有一個 `0` 到 `9` 之間的數字。
每條從根節點到葉子節點的路徑都代表一個數字：
- 例如，從根節點到葉子節點的路徑 `1 -> 2 -> 3` 表示數字 `123` 。
計算從根節點到葉子節點生成的 **所有數字之和** 。

## 解題心得：位值的演進
這是一道典型的 DFS 題目。
當我們從父節點走到子節點時，當前的路徑值演變規律為：
`new_value = old_value * 10 + current_node.val`

當到達葉子節點時，返回這個累積的值即可。

### Python
```python
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        def dfs(node, current_sum):
            if not node: return 0
            
            current_sum = current_sum * 10 + node.val
            
            # 如果是葉子節點，返回目前的累積值
            if not node.left and not node.right:
                return current_sum
            
            # 否則返回左右子樹的和
            return dfs(node.left, current_sum) + dfs(node.right, current_sum)
            
        return dfs(root, 0)
```

### C++
```cpp
class Solution {
public:
    int sumNumbers(TreeNode* root) {
        return dfs(root, 0);
    }
    
    int dfs(TreeNode* node, int sum) {
        if (!node) return 0;
        
        sum = sum * 10 + node->val;
        
        if (!node->left && !node->right) return sum;
        
        return dfs(node->left, sum) + dfs(node->right, sum);
    }
};
```
