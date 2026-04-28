---
title: "LeetCode #83: Remove Duplicates from Sorted List"
categories:
  - Linked List
tags:
  - Easy
  - Python
  - C++
---

## 解題思路
如果當前節點與下一個節點值相同，則將當前節點指向下下個節點。

### Python
```python
class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        curr = head
        while curr and curr.next:
            if curr.val == curr.next.val:
                curr.next = curr.next.next
            else:
                curr = curr.next
        return head
```

### C++
```cpp
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* curr = head;
        while (curr && curr->next) {
            if (curr->val == curr->next->val) curr->next = curr->next->next;
            else curr = curr->next;
        }
        return head;
    }
};
```
