---
title: "LeetCode #143: Reorder List"
categories:
  - Linked List
tags:
  - Medium
  - Two Pointers
  - Python
  - C++
---

## 題目描述
給定一個單鏈表 `L`：`L0 -> L1 -> … -> Ln-1 -> Ln`
將其重新排列後變為：`L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> …`

## 解題心得：拆分、翻轉、合併
這題看似複雜，其實可以拆解成三個已經學過的基礎操作：
1. **找中點：** 用快慢指針把鏈表切成前後兩半。
2. **翻轉後半部：** 把後半段鏈表反轉（例如 `4->5->6` 變成 `6->5->4`）。
3. **交錯合併：** 像拉拉鍊一樣，把前半段和翻轉後的後半段一個個接起來。

### Python
```python
class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        if not head or not head.next: return
        
        # 1. 找中點
        slow, fast = head, head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next
        
        # 2. 翻轉後半部
        curr = slow.next
        slow.next = None # 斷開
        prev = None
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        
        # 3. 合併
        first, second = head, prev
        while second:
            tmp1, tmp2 = first.next, second.next
            first.next = second
            second.next = tmp1
            first, second = tmp1, tmp2
```

### C++
```cpp
class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;
        
        // 1. Find Mid
        ListNode *slow = head, *fast = head;
        while (fast->next && fast->next->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        
        // 2. Reverse Second half
        ListNode* curr = slow->next;
        slow->next = nullptr;
        ListNode* prev = nullptr;
        while (curr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        
        // 3. Merge
        ListNode* first = head;
        ListNode* second = prev;
        while (second) {
            ListNode* tmp1 = first->next;
            ListNode* tmp2 = second->next;
            first->next = second;
            second->next = tmp1;
            first = tmp1;
            second = tmp2;
        }
    }
};
```
