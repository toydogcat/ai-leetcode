---
title: "LeetCode #61: Rotate List"
categories:
  - Linked List
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個鏈表的頭節點 `head` ，旋轉鏈表，將鏈表每個節點向右移動 `k` 個位置。

## 解題心得：接成長環再剪開
「向右旋轉 k 次」聽起來很複雜，但其實就是把鏈表的尾巴接到頭部，變成一個環，然後在某個位置把環剪開。

**核心邏輯：**
1. **算出長度 `L`**：順便找到目前的尾巴。
2. **取模運算**：如果 $k=10$, 長度 $L=5$，那旋轉 10 次等於沒旋轉。所以我們只需要考慮 `k % L` 次。
3. **連成環**：把尾巴指向頭部。
4. **找剪刀位置**：我們要向右移動 $k$ 個位置，等於是在距離頭部 `L - k` 的位置剪開。
5. **剪開並斷開環**：新的頭部誕生，新的尾巴指向 `null`。

### Python
```python
class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if not head or not head.next or k == 0: return head
        
        # 計算長度並連成環
        n = 1
        curr = head
        while curr.next:
            curr = curr.next
            n += 1
        curr.next = head
        
        # 找到新的頭
        k = k % n
        for _ in range(n - k):
            curr = curr.next
        
        new_head = curr.next
        curr.next = None
        return new_head
```

### C++
```cpp
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head || !head->next || k == 0) return head;
        int n = 1;
        ListNode* curr = head;
        while (curr->next) {
            curr = curr->next;
            n++;
        }
        curr->next = head;
        k = k % n;
        for (int i = 0; i < n - k; i++) curr = curr->next;
        ListNode* newHead = curr->next;
        curr->next = nullptr;
        return newHead;
    }
};
```
