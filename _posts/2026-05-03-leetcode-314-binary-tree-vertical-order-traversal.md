---
title: "LeetCode #314: Binary Tree Vertical Order Traversal (二元樹的垂直走訪)"
categories:
  - Hash Table
  - Tree
  - Breadth-First Search
  - Binary Tree
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個二元樹的根節點 `root`，返回其節點值的垂直走訪結果（即按列從左到右，每列從上到下）。

## 解題心得
為了保證每一列中的元素是「自上而下」排列，我們應當使用 **BFS (廣度優先走訪)**。在走訪時，我們為每個節點標記一個水平座標 `col`：
- 根節點座標為 0。
- 左子節點座標為 `col - 1`，右子節點座標為 `col + 1`。
- 我們使用一個雜湊表來存放每個座標對應的節點值。
- 最後將雜湊表按照座標 key 排序，即可獲得從左到右的列走訪結果。

- **時間複雜度**: O(N log N) 主要是對 col key 進行排序，若使用桶排序可達到 O(N)
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
from collections import deque, defaultdict

class Solution:
    def verticalOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
            
        col_table = defaultdict(list)
        queue = deque([(root, 0)])
        
        while queue:
            node, col = queue.popleft()
            if node:
                col_table[col].append(node.val)
                queue.append((node.left, col - 1))
                queue.append((node.right, col + 1))
                
        return [col_table[x] for x in sorted(col_table.keys())]
```

### C++
```cpp
#include <vector>
#include <map>
#include <queue>

class Solution {
public:
    std::vector<std::vector<int>> verticalOrder(TreeNode* root) {
        std::vector<std::vector<int>> ans;
        if (!root) return ans;

        std::map<int, std::vector<int>> colTable;
        std::queue<std::pair<TreeNode*, int>> q;
        q.push({root, 0});

        while (!q.empty()) {
            auto curr = q.front();
            q.pop();
            TreeNode* node = curr.first;
            int col = curr.second;

            colTable[col].push_back(node->val);

            if (node->left) q.push({node->left, col - 1});
            if (node->right) q.push({node->right, col + 1});
        }

        for (auto const& [col, vals] : colTable) {
            ans.push_back(vals);
        }
        return ans;
    }
};
```
