---
title: "LeetCode #25: Reverse Nodes in k-Group"
categories:
  - Linked List
tags:
  - Hard
  - Python
  - C++
---

## 解題思路
1. 找到第 $k$ 個節點，如果不足 $k$ 個則不翻轉。
2. 翻轉這 $k$ 個節點。
3. 遞迴處理剩餘部分。

### Python
```python
class Solution:
    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:
        curr = head
        count = 0
        while curr and count != k:
            curr = curr.next
            count += 1
        if count == k:
            curr = self.reverseKGroup(curr, k)
            while count > 0:
                tmp = head.next
                head.next = curr
                curr = head
                head = tmp
                count -= 1
            head = curr
        return head
```

### C++
```cpp
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* curr = head;
        int count = 0;
        while (curr != nullptr && count != k) {
            curr = curr->next;
            count++;
        }
        if (count == k) {
            curr = reverseKGroup(curr, k);
            while (count-- > 0) {
                ListNode* tmp = head->next;
                head->next = curr;
                curr = head;
                head = tmp;
            }
            head = curr;
        }
        return head;
    }
};
```
