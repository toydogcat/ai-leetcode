---
title: "LeetCode #113: Path Sum II"
categories:
  - Tree
tags:
  - Medium
  - Backtracking
  - Python
  - C++
---

## 題目描述
給你二元樹的根節點 `root` 和一個整數目標和 `targetSum` ，找出所有 **從根節點到葉子節點** 路徑總和等於目標和的路徑。

## 解題心得：回溯尋路
這題是 #112 的進階版。我們不只需要知道「有沒有」，還需要「路徑是什麼」。
我們使用 **回溯法 (Backtracking)**：
1. 維護一個 `path` 列表存當前路徑。
2. 遍歷節點，存入 `path`，更新目標值。
3. 到達葉子且符合條件時，將 `path` 的副本存入結果。
4. **重點：** 在遞迴返回前，要把剛才加入 `path` 的節點「彈出」，回到上一個狀態。

### Python
```python
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:
        res = []
        
        def dfs(node, current_sum, path):
            if not node: return
            
            path.append(node.val)
            if not node.left and not node.right and current_sum == node.val:
                res.append(list(path))
            else:
                dfs(node.left, current_sum - node.val, path)
                dfs(node.right, current_sum - node.val, path)
            
            path.pop() # 回溯
            
        dfs(root, targetSum, [])
        return res
```

### C++
```cpp
class Solution {
public:
    vector<vector<int>> res;
    
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<int> path;
        dfs(root, targetSum, path);
        return res;
    }
    
    void dfs(TreeNode* node, int sum, vector<int>& path) {
        if (!node) return;
        
        path.push_back(node->val);
        if (!node->left && !node->right && sum == node->val) {
            res.push_back(path);
        } else {
            dfs(node->left, sum - node->val, path);
            dfs(node->right, sum - node->val, path);
        }
        path.pop_back(); // 回溯
    }
};
```
