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

## 題目描述
給你一個鏈表，刪除鏈表的倒數第 `n` 個結點，並且返回鏈表的頭結點。

## 解題心得：保持距離的智慧
要在一次遍歷中找到倒數第 `n` 個節點，我們需要一對「保持距離」的好搭檔。

**核心邏輯：雙指針 (Fast & Slow Pointers)**
1. **先行者 `fast`**：先讓它往前跑 `n` 步。
2. **跟隨者 `slow`**：等 `fast` 跑完 `n` 步後，`slow` 才從頭出發，跟著 `fast` 一起跑。
3. **保持間距**：因為 `fast` 比 `slow` 多跑了 `n` 步，所以當 `fast` 跑到盡頭（`None`）時，`slow` 剛好就停在「倒數第 `n` 個節點」的前一個位子！
4. **剪斷連接**：讓 `slow.next` 指向 `slow.next.next`，大功告成。

這就像是兩個人在跑步，中間拉著一條 $n$ 公尺長的繩子。當前面的人抵達終點時，後面的人所在的位置，剛好就是距離終點 $n$ 公尺的地方。

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
