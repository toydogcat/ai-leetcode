---
title: "LeetCode #148: Sort List"
categories:
  - Linked List
  - Sorting
  - Divide and Conquer
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你鏈表的頭結點 `head` ，請將其按 **升序** 排列並返回 **排序後的鏈表** 。
設計時間複雜度為 `O(n log n)` ，空間複雜度為 `O(1)` 的算法。

## 解題心得：歸併的力量
要在鏈表上達到 `O(n log n)`，最適合的就是 **歸併排序 (Merge Sort)**。
1. **分割：** 使用快慢指針找到鏈表的中點，將鏈表斷開成兩半。
2. **遞迴：** 對左右兩半分別進行歸併排序。
3. **合併：** 將兩個排好序的鏈表合併（與 #21 題邏輯相同）。

### Python
```python
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next: return head
        
        # 1. Split
        slow, fast = head, head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        mid = slow.next
        slow.next = None
        
        # 2. Recursion
        left = self.sortList(head)
        right = self.sortList(mid)
        
        # 3. Merge
        return self.merge(left, right)
        
    def merge(self, l1, l2):
        dummy = ListNode(0)
        curr = dummy
        while l1 and l2:
            if l1.val < l2.val:
                curr.next, l1 = l1, l1.next
            else:
                curr.next, l2 = l2, l2.next
            curr = curr.next
        curr.next = l1 or l2
        return dummy.next
```

### C++
```cpp
class Solution {
public:
    ListNode* sortList(ListNode* head) {
        if (!head || !head->next) return head;
        
        ListNode *slow = head, *fast = head->next;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        ListNode* mid = slow->next;
        slow->next = nullptr;
        
        return merge(sortList(head), sortList(mid));
    }
    
    ListNode* merge(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* curr = &dummy;
        while (l1 && l2) {
            if (l1->val < l2->val) {
                curr->next = l1;
                l1 = l1->next;
            } else {
                curr->next = l2;
                l2 = l2->next;
            }
            curr = curr->next;
        }
        curr->next = l1 ? l1 : l2;
        return dummy.next;
    }
};
```
