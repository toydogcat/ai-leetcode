---
title: "LeetCode #147: Insertion Sort List"
categories:
  - Linked List
  - Sorting
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
對鏈表進行 **插入排序**。

## 解題心得：慢慢塞進去
插入排序的邏輯是：將當前節點插入到已經排好序的部分中的適當位置。
1. 我們使用一個 `dummy` 節點作為排好序鏈表的起點。
2. 遍歷原鏈表，對於每個節點 `curr`：
   - 從 `dummy` 開始往後找，找到第一個比 `curr.val` 大的節點的前一個位置。
   - 將 `curr` 插入到該位置。

### Python
```python
class Solution:
    def insertionSortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head: return head
        
        dummy = ListNode(0)
        curr = head
        
        while curr:
            # 暫存下一個要處理的節點
            next_node = curr.next
            
            # 從頭找插入位置
            prev = dummy
            while prev.next and prev.next.val < curr.val:
                prev = prev.next
            
            # 插入
            curr.next = prev.next
            prev.next = curr
            
            curr = next_node
            
        return dummy.next
```

### C++
```cpp
class Solution {
public:
    ListNode* insertionSortList(ListNode* head) {
        if (!head) return head;
        
        ListNode* dummy = new ListNode(0);
        ListNode* curr = head;
        
        while (curr) {
            ListNode* next_node = curr->next;
            
            ListNode* prev = dummy;
            while (prev->next && prev->next->val < curr->val) {
                prev = prev->next;
            }
            
            curr->next = prev->next;
            prev->next = curr;
            
            curr = next_node;
        }
        
        return dummy->next;
    }
};
```
