---
title: "LeetCode #297: Serialize and Deserialize Binary Tree (二叉樹的序列化與反序列化)"
categories:
  - Tree
  - Depth-First Search
  - Design
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
序列化是將一個數據結構或對象轉換為連續的比特位的操作，進而可以將其存檔在文件、內存中，或者通過網絡發送。隨後，可以在相同或另一個計算機環境中將其反序列化，恢復出原始的數據結構。

請設計一個演算法，實現二元樹的序列化與反序列化。對於該演算法如何工作，不限任何格式，只需保證一棵二元樹可以被序列化為一個字串，並且這個字串可以被反序列化為原始的樹結構。

**範例 1:**
```
輸入: root = [1,2,3,null,null,4,5]
輸出: [1,2,3,null,null,4,5]
```

## 解題心得：前序遍歷遍歷字串化 (Pre-order Traversal)
要序列化一棵樹，最有效的方法是將整棵樹進行深度優先搜尋（DFS）遍歷（例如前序遍歷 `Pre-order`），並同時保留空節點 `null`。

**核心邏輯**：
- **Serialize（序列化）**：
  - 遞迴遍歷每個節點：
    - 如果節點為 `null`，我們輸出一個特殊字符 `"#"`。
    - 如果節點有效，我們輸出它的值，並以逗號 `","` 隔開，接著遞迴序列化左子樹與右子樹。
  - 例如，範例中的樹前序遍歷字串化後可能為 `"1,2,#,#,3,4,#,#,5,#,#"`。
- **Deserialize（反序列化）**：
  - 先將字串按逗號 `","` 分割，轉換成一個列表。
  - 使用一個指針（或是隊列）從頭遍歷列表中的值：
    - 如果取出的是 `"#"`，說明當前節點為空，返回 `null`。
    - 如果取出的是一個數字，我們用該值創建一個新的 `TreeNode` 節點。
    - 接著遞迴反序列化該節點的左子樹和右子樹。

- **時間複雜度**: $O(N)$，遍歷所有節點。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Codec:
    def serialize(self, root):
        """Encodes a tree to a single string."""
        res = []
        
        def dfs(node):
            if not node:
                res.append("#")
                return
            res.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
            
        dfs(root)
        return ",".join(res)

    def deserialize(self, data):
        """Decodes your encoded data to tree."""
        values = data.split(",")
        self.cursor = 0
        
        def dfs():
            if self.cursor >= len(values):
                return None
                
            val = values[self.cursor]
            self.cursor += 1
            
            if val == "#":
                return None
                
            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node
            
        return dfs()
```

### C++
```cpp
#include <string>
#include <vector>
#include <sstream>

// Definition for a binary tree node.
// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
// };

class Codec {
private:
    void serializeDFS(TreeNode* node, std::ostringstream& out) {
        if (!node) {
            out << "#,";
            return;
        }
        out << node->val << ",";
        serializeDFS(node->left, out);
        serializeDFS(node->right, out);
    }

    TreeNode* deserializeDFS(std::istringstream& in) {
        std::string val;
        if (!std::getline(in, val, ',')) return nullptr;

        if (val == "#") return nullptr;

        TreeNode* node = new TreeNode(std::stoi(val));
        node->left = deserializeDFS(in);
        node->right = deserializeDFS(in);
        return node;
    }

public:
    // Encodes a tree to a single string.
    std::string serialize(TreeNode* root) {
        std::ostringstream out;
        serializeDFS(root, out);
        return out.str();
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(std::string data) {
        std::istringstream in(data);
        return deserializeDFS(in);
    }
};
```
