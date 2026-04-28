---
title: "LeetCode #109: Convert Sorted List to Binary Search Tree"
categories:
  - Tree
  - Linked List
tags:
  - Medium
  - Binary Search Tree
  - Python
  - C++
---

## 題目描述
給定一個單鏈表的頭節點 `head` ，其中的元素按 **升序** 排序，將其轉換為高度平衡的二元搜索樹。

## 解題心得：快慢指針找中點
這題與 #108 的區別在於數據結構是 **鏈表 (Linked List)** 而不是數組。
鏈表不能像數組一樣通過索引 O(1) 找到中點。
我們有兩種策略：
1. **空間換時間：** 先遍歷一遍鏈表存入數組，然後套用 #108 的解法。
2. **快慢指針：** 使用快慢指針找到鏈表的中點作為根節點，然後斷開鏈表遞迴處理左右兩部分。

這裡推薦快慢指針的方法。

### Python
```python
class Solution:
    def sortedListToBST(self, head: Optional[ListNode]) -> Optional[TreeNode]:
        if not head: return None
        if not head.next: return TreeNode(head.val)
        
        # 快慢指針找中點，並記錄中點的前一個節點以便斷開
        slow, fast = head, head
        pre = None
        while fast and fast.next:
            pre = slow
            slow = slow.next
            fast = fast.next.next
        
        # slow 就是中點，作為根節點
        root = TreeNode(slow.val)
        
        # 斷開鏈表，處理左半部
        if pre:
            pre.next = None
            root.left = self.sortedListToBST(head)
        
        # 處理右半部
        root.right = self.sortedListToBST(slow.next)
        
        return root
```

### C++
```cpp
class Solution {
public:
    TreeNode* sortedListToBST(ListNode* head) {
        if (!head) return nullptr;
        if (!head->next) return new TreeNode(head->val);
        
        ListNode* slow = head;
        ListNode* fast = head;
        ListNode* pre = nullptr;
        
        while (fast && fast->next) {
            pre = slow;
            slow = slow->next;
            fast = fast->next->next;
        }
        
        TreeNode* root = new TreeNode(slow->val);
        if (pre) {
            pre->next = nullptr;
            root->left = sortedListToBST(head);
        }
        root->right = sortedListToBST(slow->next);
        
        return root;
    }
};
```
