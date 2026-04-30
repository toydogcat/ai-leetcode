---
title: "LeetCode #203: Remove Linked List Elements (移除鏈表元素)"
categories:
  - Linked List
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一個鏈表的頭節點 `head` 和一個整數 `val` ，請你刪除鏈表中所有滿足 `Node.val == val` 的節點，並返回 **新的頭節點** 。

## 解題心得：虛擬頭節點 (Dummy Head)
刪除鏈表節點時，最麻煩的情況是刪除的是 **頭節點**。

**核心邏輯：**
1. **虛擬頭節點**：創建一個 `dummy` 節點，令 `dummy.next = head`。這樣原來的頭節點就變成了普通節點，處理邏輯就統一了。
2. **遍歷與刪除**：使用一個指針 `curr` 指向 `dummy`。
   - 如果 `curr.next.val == val`，則跳過該節點：`curr.next = curr.next.next`。
   - 否則，指針後移：`curr = curr.next`。
3. 最後返回 `dummy.next`。

- **時間複雜度**: $O(N)$，遍歷一次鏈表。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeElements(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head
        curr = dummy
        
        while curr.next:
            if curr.next.val == val:
                curr.next = curr.next.next
            else:
                curr = curr.next
                
        return dummy.next
```

### C++
```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeElements(ListNode* head, int val) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* curr = dummy;
        
        while (curr->next != nullptr) {
            if (curr->next->val == val) {
                ListNode* temp = curr->next;
                curr->next = curr->next->next;
                delete temp; // 釋放記憶體
            } else {
                curr = curr->next;
            }
        }
        
        ListNode* newHead = dummy->next;
        delete dummy;
        return newHead;
    }
};
```
