---
title: "LeetCode #19: Remove Nth Node From End of List"
categories:
  - Linked List
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
---

## 解題思路：快慢指針
快指針先走 `n` 步，然後快慢指針一起走，當快指針到結尾時，慢指針正好在倒數第 `n` 個節點的前一個。

- **時間複雜度**: $O(n)$
- **空間複雜度**: $O(1)$

### Python
```python
class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        dummy = ListNode(0, head)
        fast = slow = dummy
        for _ in range(n):
            fast = fast.next
        while fast.next:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.next
```

### C++
```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* fast = dummy;
        ListNode* slow = dummy;
        for (int i = 0; i < n; i++) fast = fast->next;
        while (fast->next) {
            fast = fast->next;
            slow = slow->next;
        }
        slow->next = slow->next->next;
        return dummy->next;
    }
};
```
