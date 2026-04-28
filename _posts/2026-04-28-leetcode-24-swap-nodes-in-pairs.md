---
title: "LeetCode #24: Swap Nodes in Pairs"
categories:
  - Linked List
  - Recursion
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個鏈表，兩兩交換其中相鄰的節點，並返回交換後鏈表的頭。你不能只是單純的改變節點內部的值，而是需要實際的進行節點交換。

## 解題心得：優雅的華爾滋
這題是 25 題（k 組翻轉）在 $k=2$ 時的特殊情況。

**核心邏輯：**
1. **設定虛擬頭 `dummy`**：鏈表題的萬用技巧，方便處理第一個節點。
2. **兩兩一組**：我們盯著接下來的兩個節點（`first` 和 `second`）。
3. **換位子**：
   - 讓這組前面的節點（`prev`）指向 `second`。
   - 讓 `first` 指向 `second.next`（接住後面的隊伍）。
   - 讓 `second` 指向 `first`（完成兩人的對調）。
4. **移動指針**：把 `prev` 移到 `first` 的位置，繼續處理下一對。

這就像是兩兩跳舞。原本是 A-B-C-D，音樂一響，A 和 B 轉個圈變成 B-A，然後這組的尾巴 A 再去牽下一對（C 和 D）的頭。

### Python
```python
class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        if not head or not head.next:
            return head
        first = head
        second = head.next
        first.next = self.swapPairs(second.next)
        second.next = first
        return second
```

### C++
```cpp
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode* first = head;
        ListNode* second = head->next;
        first->next = swapPairs(second->next);
        second->next = first;
        return second;
    }
};
```
