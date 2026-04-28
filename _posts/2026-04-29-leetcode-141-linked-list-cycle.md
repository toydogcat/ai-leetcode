---
title: "LeetCode #141: Linked List Cycle"
categories:
  - Linked List
tags:
  - Easy
  - Two Pointers
  - Python
  - C++
---

## 題目描述
給你一個鏈表的頭節點 `head` ，判斷鏈表中是否有環。

## 解題心得：龜兔賽跑
這是 **「快慢指針」** 最經典的應用。
1. 準備兩個指針，`slow` 每次走一步，`fast` 每次走兩步。
2. 如果鏈表有環，快指針最終一定會追上慢指針（兩者相遇）。
3. 如果快指針走到了盡頭（指向 `null`），說明沒有環。

### Python
```python
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow, fast = head, head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False
```

### C++
```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};
```
