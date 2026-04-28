---
title: "LeetCode #86: Partition List"
categories:
  - Linked List
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
建立兩個鏈表，一個存放小於 $x$ 的節點，另一個存放其餘節點，最後拼接。

### Python
```python
class Solution:
    def partition(self, head: ListNode, x: int) -> ListNode:
        before = before_head = ListNode(0)
        after = after_head = ListNode(0)
        while head:
            if head.val < x:
                before.next = head
                before = before.next
            else:
                after.next = head
                after = after.next
            head = head.next
        after.next = None
        before.next = after_head.next
        return before_head.next
```

### C++
```cpp
class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        ListNode* beforeHead = new ListNode(0);
        ListNode* afterHead = new ListNode(0);
        ListNode* before = beforeHead;
        ListNode* after = afterHead;
        while (head) {
            if (head->val < x) {
                before->next = head; before = before->next;
            } else {
                after->next = head; after = after->next;
            }
            head = head->next;
        }
        after->next = nullptr;
        before->next = afterHead->next;
        return beforeHead->next;
    }
};
```
