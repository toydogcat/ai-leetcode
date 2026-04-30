---
title: "LeetCode #173: Binary Search Tree Iterator (二元搜尋樹迭代器)"
categories:
  - Stack
  - Tree
  - Design
  - Binary Search Tree
  - Iterator
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
實現一個二元搜尋樹（BST）的迭代器 `BSTIterator` ，表示對該樹進行 **中序遍歷**（In-order Traversal）。

- `BSTIterator(TreeNode root)`：初始化。
- `boolean hasNext()`：如果還有下一個元素，返回 `true`。
- `int next()`：返回下一個最小的元素。

你必須以 $O(h)$ 的記憶體限制實現，其中 $h$ 是樹的高度。且 `next()` 的平均時間複雜度應為 $O(1)$。

## 解題心得：受控的中序遍歷
中序遍歷的順序是：左子樹 -> 根節點 -> 右子樹。

**核心邏輯：手動維護棧**
為了滿足空間複雜度 $O(h)$，我們不能一次把所有節點都取出來存進去。我們需要使用一個 **棧 (Stack)** 來模擬遞迴過程：
1. 在初始化時，我們一直向左走，將路徑上的所有節點壓入棧中。
2. `next()` 操作：
   - 彈出棧頂元素 `curr`（這是當前最小的節點）。
   - 如果 `curr` 有右子樹，則對右子樹重複「一直向左走」的過程，將節點壓棧。
   - 返回 `curr` 的值。

這種方式稱為「受控的 (controlled)」或「懶惰的 (lazy)」遍歷。

- **時間複雜度**: `hasNext()` 是 $O(1)$, `next()` 平均為 $O(1)$。
- **空間複雜度**: $O(h)$，棧中最多存儲高度為 $h$ 的節點。

## 程式碼實作

### Python
```python
class BSTIterator:

    def __init__(self, root: Optional[TreeNode]):
        self.stack = []
        self._push_left(root)

    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def next(self) -> int:
        curr = self.stack.pop()
        if curr.right:
            self._push_left(curr.right)
        return curr.val

    def hasNext(self) -> bool:
        return len(self.stack) > 0
```

### C++
```cpp
#include <stack>

class BSTIterator {
private:
    std::stack<TreeNode*> st;

    void pushLeft(TreeNode* node) {
        while (node) {
            st.push(node);
            node = node->left;
        }
    }

public:
    BSTIterator(TreeNode* root) {
        pushLeft(root);
    }
    
    int next() {
        TreeNode* curr = st.top();
        st.pop();
        if (curr->right) {
            pushLeft(curr->right);
        }
        return curr->val;
    }
    
    bool hasNext() {
        return !st.empty();
    }
};
```
