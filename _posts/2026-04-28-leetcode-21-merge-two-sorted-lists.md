---
title: "LeetCode #21: Merge Two Sorted Lists"
categories:
  - Linked List
  - Recursion
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
將兩個升序鏈表合併為一個新的 **升序** 鏈表並返回。新鏈表是通過拼接給定的兩個鏈表的所有節點組成的。

## 解題心得：拉鍊式合併
這題是鏈表操作的基本功，也是「歸併排序」的核心步驟。

**核心邏輯：**
1. **虛擬頭節點 `dummy`**：先創一個假龍頭，這樣就不用判斷誰是第一個了。
2. **比較與拼接**：
   - 同時看兩個鏈表的「排頭」。
   - 誰小，就把誰接在我們的結果鏈表後面，然後那個鏈表的指針往後走一步。
3. **收尾**：如果其中一條鏈表空了，直接把另一條剩下的部分全部接過來就行（因為本來就是有序的）。

這就像是在拉拉鍊。兩邊的齒（節點）按順序咬合，誰的齒比較靠前就先咬進去，最後剩下的那一截直接拉上去就好。

### Python
```python
class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        if not l1: return l2
        if not l2: return l1
        if l1.val < l2.val:
            l1.next = self.mergeTwoLists(l1.next, l2)
            return l1
        else:
            l2.next = self.mergeTwoLists(l1, l2.next)
            return l2
```

### C++
```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        if (!l1) return l2;
        if (!l2) return l1;
        if (l1->val < l2->val) {
            l1->next = mergeTwoLists(l1->next, l2);
            return l1;
        } else {
            l2->next = mergeTwoLists(l1, l2->next);
            return l2;
        }
    }
};
```
