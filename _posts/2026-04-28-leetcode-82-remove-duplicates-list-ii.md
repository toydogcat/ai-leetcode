---
title: "LeetCode #82: Remove Duplicates from Sorted List II"
categories:
  - Linked List
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個已排序的鏈表的頭 `head` ， 刪除所有含有重複數字的節點，只保留原始鏈表中 **只出現一次** 的數字。返回同樣按排序順序排列的鏈表。

## 解題心得：一個都不留
注意這題跟 83 題的區別：83 題是「重複的留一個」，這題是「只要重複過，通通趕走」。

**核心邏輯：**
1. **啞節點 (Dummy Node)**：因為頭節點也可能被刪掉（例如 `1->1->2`），所以我們在頭前面加一個虛擬節點，方便操作。
2. **偵測重複**：如果發現 `head` 和 `head.next` 值一樣，說明這是一個「災區」。
3. **清理災區**：用一個 `while` 迴圈把所有值等於這個「災區值」的節點全部跳過。
4. **重新連接**：讓 `prev` 直接指向災區後面的第一個乾淨節點。

### Python
```python
class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        dummy = ListNode(0, head)
        prev = dummy
        while head:
            if head.next and head.val == head.next.val:
                while head.next and head.val == head.next.val:
                    head = head.next
                prev.next = head.next
            else:
                prev = prev.next
            head = head.next
        return dummy.next
```

### C++
```cpp
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* prev = dummy;
        while (head) {
            if (head->next && head->val == head->next->val) {
                while (head->next && head->val == head->next->val) head = head->next;
                prev->next = head->next;
            } else {
                prev = prev->next;
            }
            head = head->next;
        }
        return dummy->next;
    }
};
```
