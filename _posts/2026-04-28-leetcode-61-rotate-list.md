---
title: "LeetCode #61: Rotate List"
categories:
  - Linked List
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
1. 先計算鏈表長度 `n`。
2. 將鏈表連成環。
3. 找到新的斷開點（倒數第 `k % n` 個節點）。

### Python
```python
class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if not head or not head.next or k == 0: return head
        
        # 計算長度並連成環
        n = 1
        curr = head
        while curr.next:
            curr = curr.next
            n += 1
        curr.next = head
        
        # 找到新的頭
        k = k % n
        for _ in range(n - k):
            curr = curr.next
        
        new_head = curr.next
        curr.next = None
        return new_head
```

### C++
```cpp
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head || !head->next || k == 0) return head;
        int n = 1;
        ListNode* curr = head;
        while (curr->next) {
            curr = curr->next;
            n++;
        }
        curr->next = head;
        k = k % n;
        for (int i = 0; i < n - k; i++) curr = curr->next;
        ListNode* newHead = curr->next;
        curr->next = nullptr;
        return newHead;
    }
};
```
