---
title: "LeetCode #257: Binary Tree Paths (二叉樹的所有路徑)"
categories:
  - Tree
  - Depth-First Search
  - Binary Tree
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一個二叉樹的根節點 `root` ，按 **任意順序** ，返回所有從根節點到葉子節點的路徑。
**葉子節點**：沒有子節點的節點。

## 解題心得：深度優先搜索 (DFS)
這是一個遍歷問題。我們需要從根出發，一直走到葉子為止。

**核心邏輯：**
1. **遞迴 DFS**：`dfs(node, path)`。
2. **路徑記錄**：將當前節點的值加入 `path`。
3. **葉子判斷**：如果當前節點是葉子節點（左右子樹皆空），則將完整的 `path` 加入結果。
4. **分歧處理**：如果有左子樹，向左遞迴；如果有右子樹，向右遞迴。
5. **格式處理**：注意路徑中間的 `->` 分隔符。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(H)$ (遞迴深度) 或 $O(N)$ (存儲路徑)。

## 程式碼實作

### Python
```python
class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
        res = []
        
        def dfs(node, path):
            if not node: return
            
            # 加入當前路徑
            new_path = path + str(node.val)
            
            # 如果是葉子
            if not node.left and not node.right:
                res.append(new_path)
            else:
                # 否則繼續向下，帶上箭頭
                dfs(node.left, new_path + "->")
                dfs(node.right, new_path + "->")
                
        dfs(root, "")
        return res
```

### C++
```cpp
#include <vector>
#include <string>

class Solution {
public:
    std::vector<std::string> binaryTreePaths(TreeNode* root) {
        std::vector<std::string> res;
        if (root) dfs(root, "", res);
        return res;
    }

    void dfs(TreeNode* node, std::string path, std::vector<std::string>& res) {
        path += std::to_string(node->val);
        
        if (!node->left && !node->right) {
            res.push_back(path);
            return;
        }
        
        if (node->left) dfs(node->left, path + "->", res);
        if (node->right) dfs(node->right, path + "->", res);
    }
};
```
