---
title: "LeetCode #24: Swap Nodes in Pairs"
categories:
  - Linked List
  - Recursion
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
使用遞迴，每次處理前兩個節點，再將剩餘部分交給遞迴處理。

### Python
```python
class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        if not head or not head.next:
            return head
        first = head
        second = head.next
        first.next = self.swapPairs(second.next)
        second.next = first
        return second
```

### C++
```cpp
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode* first = head;
        ListNode* second = head->next;
        first->next = swapPairs(second->next);
        second->next = first;
        return second;
    }
};
```
