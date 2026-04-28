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

## 題目描述
給你一個鏈表的頭節點 `head` 和一個特定值 `x` ，請你對鏈表進行分隔，使得所有 **小於** `x` 的節點都出現在 **大於或等於** `x` 的節點之前。你應當保留兩個分區中每個節點的初始相對位置。

## 解題心得：排隊分兩路
這題的思路非常像 **「體檢排隊」**：醫生說，身高小於 170 的站左邊，其餘站右邊。

**核心邏輯：**
1. **準備兩條新線路**：一條叫 `before` (小的)，一條叫 `after` (大的)。
2. **遍歷原隊伍**：看一個節點，小於 `x` 就把它接到 `before` 後面；否則接到 `after` 後面。
3. **最後合體**：把 `before` 的尾巴連到 `after` 的頭部。
4. **注意細節**：最後一定要把 `after` 的尾巴指向 `null`，否則可能會形成環，讓程序死循環。

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
