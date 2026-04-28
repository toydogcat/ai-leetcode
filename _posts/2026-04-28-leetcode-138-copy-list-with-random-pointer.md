---
title: "LeetCode #138: Copy List with Random Pointer"
categories:
  - Hash Table
  - Linked List
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個長度為 `n` 的鏈表，每個節點包含一個額外的隨機指針 `random` ，該指針可以指向鏈表中的任何節點或空節點。
請構造這個鏈表的 **深拷貝**。

## 解題心得：影子節點
克隆鏈表的難點在於 `random` 指針。
最簡單的方法是使用一個 `HashMap` 儲存 `原節點 -> 新節點` 的對應關係。
但更優雅（O(1) 空間）的做法是：
1. **複製節點：** 將新節點插入到原節點的後面。`A -> A' -> B -> B'`。
2. **複製隨機指針：** `A'.random = A.random.next`。
3. **拆分鏈表：** 將原鏈表和克隆鏈表分開。

### Python
```python
class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if not head: return None
        
        # 1. 在每個節點後面複製一個新節點
        curr = head
        while curr:
            copy = Node(curr.val, curr.next)
            curr.next = copy
            curr = copy.next
            
        # 2. 處理 random 指針
        curr = head
        while curr:
            if curr.random:
                curr.next.random = curr.random.next
            curr = curr.next.next
            
        # 3. 拆分鏈表
        curr = head
        new_head = head.next
        while curr:
            copy = curr.next
            curr.next = copy.next
            if copy.next:
                copy.next = copy.next.next
            curr = curr.next
            
        return new_head
```

### C++
```cpp
class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;
        
        Node* curr = head;
        while (curr) {
            Node* copy = new Node(curr->val);
            copy->next = curr->next;
            curr->next = copy;
            curr = copy->next;
        }
        
        curr = head;
        while (curr) {
            if (curr->random) {
                curr->next->random = curr->random->next;
            }
            curr = curr->next->next;
        }
        
        curr = head;
        Node* new_head = head->next;
        while (curr) {
            Node* copy = curr->next;
            curr->next = copy->next;
            if (copy->next) copy->next = copy->next->next;
            curr = curr->next;
        }
        
        return new_head;
    }
};
```
