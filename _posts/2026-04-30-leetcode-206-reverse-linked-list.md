---
title: "LeetCode #206: Reverse Linked List (反轉鏈表)"
categories:
  - Linked List
  - Recursion
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你單鏈表的頭節點 `head` ，請你反轉鏈表，並返回反轉後的鏈表。

## 解題心得：指針反向
這是鏈表操作中最經典、最基礎的一題。

**核心邏輯：迭代法**
1. 使用兩個指針：`prev` (初始為 `None`) 和 `curr` (初始為 `head`)。
2. 在遍歷過程中：
   - 暫存下一個節點：`next_node = curr.next`。
   - 反轉指向：`curr.next = prev`。
   - 指針後移：`prev = curr`, `curr = next_node`。
3. 最後 `prev` 就是新的頭節點。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$ (迭代) 或 $O(N)$ (遞迴，棧空間)。

## 程式碼實作

### Python (迭代)
```python
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev
```

### C++ (遞迴)
```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (head == nullptr || head->next == nullptr) {
            return head;
        }
        ListNode* newHead = reverseList(head->next);
        head->next->next = head;
        head->next = nullptr;
        return newHead;
    }
};
```
