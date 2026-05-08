---
title: "LeetCode #366: Find Leaves of Binary Tree (尋找二元樹的葉子節點)"
categories:
  - Tree
  - Depth-First Search
  - Binary Tree
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一棵二元樹，依次收集並移除所有葉子節點，直到二元樹為空。返回收集的葉子節點陣列。

## 解題心得
葉子節點在被移除時，其在樹中的「高度」（即從下往上的深度）是相同的。葉子節點的高度為 0，其父節點高度為 `max(left_height, right_height) + 1`。
我們可以使用 DFS 遞迴計算每個節點的高度：
- 計算出高度 `h` 後，將當前節點的值加入結果陣列 `ans[h]` 中。
- 不需要真正去修改指針刪除節點，這是一道非常精妙的深度映射題！

- **時間複雜度**: O(N)
- **空間複雜度**: O(H) 遞迴堆疊的深度

## 程式碼實作

### Python
```python
class Solution:
    def findLeaves(self, root: Optional[TreeNode]) -> List[List[int]]:
        ans = []
        
        def dfs(node):
            if not node:
                return -1
            left_h = dfs(node.left)
            right_h = dfs(node.right)
            curr_h = max(left_h, right_h) + 1
            
            if curr_h == len(ans):
                ans.append([])
            ans[curr_h].append(node.val)
            return curr_h
            
        dfs(root)
        return ans
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
private:
    int dfs(TreeNode* node, std::vector<std::vector<int>>& ans) {
        if (!node) return -1;
        int left_h = dfs(node->left, ans);
        int right_h = dfs(node->right, ans);
        int curr_h = std::max(left_h, right_h) + 1;

        if (curr_h == ans.size()) {
            ans.push_back({});
        }
        ans[curr_h].push_back(node->val);
        return curr_h;
    }

public:
    std::vector<std::vector<int>> findLeaves(TreeNode* root) {
        std::vector<std::vector<int>> ans;
        dfs(root, ans);
        return ans;
    }
};
```
