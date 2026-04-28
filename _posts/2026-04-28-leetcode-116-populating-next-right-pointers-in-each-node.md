---
title: "LeetCode #116: Populating Next Right Pointers in Each Node"
categories:
  - Tree
tags:
  - Medium
  - BFS
  - Python
  - C++
---

## 題目描述
給定一個 **完美二元樹** ，其所有葉子節點都在同一層，每個父節點都有兩個子節點。
填充它的每個 `next` 指針，讓這個指針指向其下一個右側節點。如果找不到下一個右側節點，則將 `next` 指針設置為 `NULL`。

## 解題心得：拉緊鄰居的手
因為是完美二元樹，我們可以利用已經建立好的 `next` 指針。
對於每一層：
1. 建立「同一個父節點」下，左子節點到右子節點的連接：`node.left.next = node.right`。
2. 建立「跨父節點」的連接：如果當前節點 `node` 有 `next` 指針，那麼 `node.right.next = node.next.left`。

這種方法可以在 O(1) 的額外空間內完成（不考慮遞迴棧）。

### Python
```python
class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        if not root or not root.left: return root
        
        # 連接同一個父節點下的子節點
        root.left.next = root.right
        
        # 連接不同父節點下的子節點
        if root.next:
            root.right.next = root.next.left
            
        self.connect(root.left)
        self.connect(root.right)
        
        return root
```

### C++
```cpp
class Solution {
public:
    Node* connect(Node* root) {
        if (!root || !root->left) return root;
        
        root->left->next = root->right;
        
        if (root->next) {
            root->right->next = root->next->left;
        }
        
        connect(root->left);
        connect(root->right);
        
        return root;
    }
};
```
