---
title: "LeetCode #25: Reverse Nodes in k-Group"
categories:
  - Linked List
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個鏈表，每 `k` 個節點一組進行翻轉，並返回翻轉後的鏈表。如果節點總數不是 `k` 的整數倍，那麼最後剩餘的節點應保持原有順序。

## 解題心得：分組排隊，分組轉身
這題是 Hard，因為要在保持鏈表連接不斷掉的情況下，一組一組地翻轉。

**核心邏輯：**
1. **數人頭**：先看剩下的節點夠不夠 `k` 個。不夠的話，原封不動，直接收工。
2. **小組翻轉**：如果夠 `k` 個，我們就把這一組進行「翻轉鏈表」的操作（參考 206 題）。
3. **銜接下一組**：翻轉完後，原來的「小組龍頭」變成了「小組龍尾」，它要指向「下一組翻轉後的結果」。
4. **遞迴調用**：我們可以用遞迴來處理「下一組」，非常簡潔。

這就像是在排隊，每 `k` 個人一組。我們走過去，叫前 `k` 個人向後轉，轉完之後，這組的最後一個人要去牽下一組排好隊的第一個人的手。

### Python
```python
class Solution:
    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:
        curr = head
        count = 0
        while curr and count != k:
            curr = curr.next
            count += 1
        if count == k:
            curr = self.reverseKGroup(curr, k)
            while count > 0:
                tmp = head.next
                head.next = curr
                curr = head
                head = tmp
                count -= 1
            head = curr
        return head
```

### C++
```cpp
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* curr = head;
        int count = 0;
        while (curr != nullptr && count != k) {
            curr = curr->next;
            count++;
        }
        if (count == k) {
            curr = reverseKGroup(curr, k);
            while (count-- > 0) {
                ListNode* tmp = head->next;
                head->next = curr;
                curr = head;
                head = tmp;
            }
            head = curr;
        }
        return head;
    }
};
```
