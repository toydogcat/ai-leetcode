---
title: "LeetCode #82: Remove Duplicates from Sorted List II"
categories:
  - Linked List
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
使用啞節點 (Dummy Node)。遍歷鏈表，如果發現當前節點與下一個節點值相同，則跳過所有相同值的節點。

### Python
```python
class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        dummy = ListNode(0, head)
        prev = dummy
        while head:
            if head.next and head.val == head.next.val:
                while head.next and head.val == head.next.val:
                    head = head.next
                prev.next = head.next
            else:
                prev = prev.next
            head = head.next
        return dummy.next
```

### C++
```cpp
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* prev = dummy;
        while (head) {
            if (head->next && head->val == head->next->val) {
                while (head->next && head->val == head->next->val) head = head->next;
                prev->next = head->next;
            } else {
                prev = prev->next;
            }
            head = head->next;
        }
        return dummy->next;
    }
};
```
