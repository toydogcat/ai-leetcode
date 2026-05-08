---
title: "LeetCode #328: Odd Even Linked List (奇偶鏈結串列)"
categories:
  - Linked List
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定單鏈結串列的頭節點 `head`，將所有索引為奇數的節點和索引為偶數的節點分別組合在一起，並連接奇數鏈結串列和偶數鏈結串列的尾部。第一個節點視為奇數節點，第二個為偶數節點，以此類推。空間複雜度限制在 $O(1)$，時間複雜度限制在 $O(N)$。

## 解題心得
我們可以使用 **雙指針雙鏈結串列拼接** 的方法：
1. 用 `odd` 指向奇數鏈結串列頭部 `head`，`even` 指向偶數鏈結串列頭部 `head->next`。
2. 保留偶數鏈結串列頭部的指標 `evenHead` 用於之後拼接。
3. 同時往後跳躍推進：
   - `odd->next = even->next; odd = odd->next;`
   - `even->next = odd->next; even = even->next;`
4. 最終將奇數鏈結串列的尾部連向 `evenHead`：`odd->next = evenHead`。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        odd = head
        even = head.next
        even_head = even
        
        while even and even.next:
            odd.next = even.next
            odd = odd.next
            even.next = odd.next
            even = even.next
            
        odd.next = even_head
        return head
```

### C++
```cpp
class Solution {
public:
    ListNode* oddEvenList(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode* odd = head;
        ListNode* even = head->next;
        ListNode* evenHead = even;

        while (even && even->next) {
            odd->next = even->next;
            odd = odd->next;
            even->next = odd->next;
            even = even->next;
        }
        odd->next = evenHead;
        return head;
    }
};
```
