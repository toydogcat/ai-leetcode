---
title: "LeetCode #337: House Robber III (打家劫舍 III)"
categories:
  - Tree
  - Depth-First Search
  - Dynamic Programming
  - Binary Tree
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
除了「根節點」之外，每個房子有且只有一個「父節點」。相鄰的房子如果同時被搶，會觸發警報。計算在不觸發警報的情況下，小偷最多能搶劫的金額。

## 解題心得
這是一道典型的 **樹狀動態規劃 (Tree DP)**。我們可以使用自底向上的遞迴走訪，對每個節點返回兩個資訊：
1. `rob_this`：在搶劫當前節點的情況下，以當前節點為根的子樹最大收益。
2. `not_rob_this`：在「不搶劫」當前節點的情況下，以當前節點為根的子樹最大收益。
- 轉移方程：
  - 如果我們「搶劫」當前節點，其子節點絕對不能搶：
    `rob_this = node.val + left_not_rob + right_not_rob`
  - 如果我們「不搶劫」當前節點，其子節點搶不搶皆可，取最大收益：
    `not_rob_this = max(left_rob, left_not_rob) + max(right_rob, right_not_rob)`。
- 這樣做每個節點只需被訪問一遍，效率極高。

- **時間複雜度**: O(N)
- **空間複雜度**: O(H) 遞迴堆疊的深度

## 程式碼實作

### Python
```python
class Solution:
    def rob(self, root: Optional[TreeNode]) -> int:
        def dfs(node):
            if not node:
                return 0, 0  # rob, not_rob
                
            left_rob, left_not = dfs(node.left)
            right_rob, right_not = dfs(node.right)
            
            # 搶當前節點，子節點不能搶
            rob_this = node.val + left_not + right_not
            # 不搶當前節點，子節點可以搶或不搶
            not_rob_this = max(left_rob, left_not) + max(right_rob, right_not)
            
            return rob_this, not_rob_this

        return max(dfs(root))
```

### C++
```cpp
#include <algorithm>

class Solution {
private:
    struct RobInfo {
        int rob;
        int notRob;
    };

    RobInfo dfs(TreeNode* node) {
        if (!node) return {0, 0};

        auto left = dfs(node->left);
        auto right = dfs(node->right);

        int robThis = node->val + left.notRob + right.notRob;
        int notRobThis = std::max(left.rob, left.notRob) + std::max(right.rob, right.notRob);

        return {robThis, notRobThis};
    }

public:
    int rob(TreeNode* root) {
        auto ans = dfs(root);
        return std::max(ans.rob, ans.notRob);
    }
};
```
