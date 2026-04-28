---
title: "LeetCode #83: Remove Duplicates from Sorted List"
categories:
  - Linked List
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個已排序的鏈表的頭 `head` ， 刪除所有重複的元素，使每個元素只出現一次 。返回同樣按排序順序排列的鏈表。

## 解題心得：斷捨離
這題比 82 題簡單得多。因為鏈表是排好序的，重複的數字一定挨在一起。

**核心邏輯：**
1. **看一眼後面**：如果當前節點的值跟下一個節點一樣，說明下一個是多餘的。
2. **跳過它**：直接把當前節點的 `next` 指向「下下個」節點。
3. **保持不動**：只有當下一個數字不一樣時，我們才真正往後走一步。

### Python
```python
class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        curr = head
        while curr and curr.next:
            if curr.val == curr.next.val:
                curr.next = curr.next.next
            else:
                curr = curr.next
        return head
```

### C++
```cpp
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* curr = head;
        while (curr && curr->next) {
            if (curr->val == curr->next->val) curr->next = curr->next->next;
            else curr = curr->next;
        }
        return head;
    }
};
```
