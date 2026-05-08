---
title: "LeetCode #369: Plus One Linked List (單鏈表加一)"
categories:
  - Linked List
  - Recursion
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個用單鏈表表示的非負整數，將這個整數加一，並返回新的單鏈表。

## 解題心得
使用雙指針（尋找非 9 節點）來進行 $O(1)$ 空間優化：
- 維護一個 `not_nine` 指針，指向鏈表中最右邊一個值不為 9 的節點。
- 走訪整個鏈表，若 `node.val != 9`，更新 `not_nine = node`。
- 走訪結束後，將 `not_nine.val` 加 1，並將其後續所有的節點值改為 0。
- 如果所有節點都是 9，我們在鏈表最前面新增一個值為 1 的哨兵節點，並把後續所有值改為 0。此解法僅需走訪一次且不需要翻轉鏈表。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1) 哨兵節點開銷

## 程式碼實作

### Python
```python
class Solution:
    def plusOne(self, head: ListNode) -> ListNode:
        sentinel = ListNode(0, head)
        not_nine = sentinel
        
        curr = head
        while curr:
            if curr.val != 9:
                not_nine = curr
            curr = curr.next
            
        not_nine.val += 1
        curr = not_nine.next
        while curr:
            curr.val = 0
            curr = curr.next
            
        return sentinel if sentinel.val != 0 else sentinel.next
```

### C++
```cpp
class Solution {
public:
    ListNode* plusOne(ListNode* head) {
        ListNode* sentinel = new ListNode(0, head);
        ListNode* not_nine = sentinel;

        ListNode* curr = head;
        while (curr) {
            if (curr->val != 9) {
                not_nine = curr;
            }
            curr = curr->next;
        }

        not_nine->val += 1;
        curr = not_nine->next;
        while (curr) {
            curr->val = 0;
            curr = curr->next;
        }

        if (sentinel->val != 0) return sentinel;
        ListNode* ans = sentinel->next;
        delete sentinel;
        return ans;
    }
};
```
