---
title: "LeetCode #199: Binary Tree Right Side View (二元樹的右視圖)"
categories:
  - Tree
  - Breadth-First Search
  - Depth-First Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個二元樹的根節點 `root`，想像自己站在它的右側，按照從頂部到底部的順序，返回從右側所能看到的節點值。

## 解題心得：層序遍歷的變體
從右邊看，其實就是看每一層的 **最後一個** 節點。

**核心邏輯：廣度優先搜尋 (BFS)**
1. 使用一個隊列 (Queue) 進行層序遍歷。
2. 對於每一層：
   - 記錄該層的節點數量 `size`。
   - 遍歷這 `size` 個節點。
   - **關鍵**：如果是該層的最後一個節點（即遍歷到 `size-1` 時），將其加入結果清單。
   - 同時將左右子節點加入隊列。

- **時間複雜度**: $O(n)$，每個節點訪問一次。
- **空間複雜度**: $O(w)$，其中 $w$ 是樹的最大寬度。

## 程式碼實作

### Python
```python
from collections import deque

class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        if not root: return []
        
        res = []
        queue = deque([root])
        
        while queue:
            size = len(queue)
            for i in range(size):
                node = queue.popleft()
                # 如果是當前層的最後一個節點
                if i == size - 1:
                    res.append(node.val)
                
                if node.left: queue.append(node.left)
                if node.right: queue.append(node.right)
                
        return res
```

### C++
```cpp
#include <vector>
#include <queue>

class Solution {
public:
    std::vector<int> rightSideView(TreeNode* root) {
        if (!root) return {};
        
        std::vector<int> res;
        std::queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front();
                q.pop();
                
                // 如果是該層的最後一個節點
                if (i == size - 1) {
                    res.push_back(node->val);
                }
                
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        
        return res;
    }
};
```
