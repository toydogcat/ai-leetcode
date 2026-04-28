---
title: "LeetCode #92: Reverse Linked List II"
categories:
  - Linked List
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
反轉從位置 `m` 到 `n` 的鏈表。請使用一趟掃描完成反轉。

## 解題心得：穿針引線的藝術
反轉局部鏈表最難的地方在於 **「如何把反轉後的這一段重新接回原鏈表」**。

**想像你在縫衣服：**
1. **找到起始點**：我們先走到第 `m-1` 個節點，這就是我們要「動手術」的前夕。
2. **局部反轉**：我們不需要把整段拆掉重組。我們採用「頭插法」：把 `m+1` 到 `n` 的節點，一個一個挪到 `m` 的前面。
3. **優點**：這種方法只需要一次遍歷，而且不需要額外的存儲空間。

**關鍵節點：**
- `pre`：反轉段落的前一個節點（手術台邊緣）。
- `cur`：當前正在被處理的節點。
- `next`：暫存下一個節點，防止鏈表斷掉找不到人。

### Python
```python
class Solution:
    def reverseBetween(self, head: ListNode, left: int, right: int) -> ListNode:
        if not head or left == right: return head
        
        dummy = ListNode(0, head)
        pre = dummy
        # 1. 走到反轉段落的前一個位置
        for _ in range(left - 1):
            pre = pre.next
        
        # 2. 開始局部反轉 (頭插法)
        cur = pre.next
        for _ in range(right - left):
            nxt = cur.next
            cur.next = nxt.next # 把 nxt 踢出去
            nxt.next = pre.next # 把 nxt 插到 pre 的後面
            pre.next = nxt      # 更新 pre 的指向
            
        return dummy.next
```

### C++
```cpp
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        if (!head || left == right) return head;
        ListNode* dummy = new ListNode(0, head);
        ListNode* pre = dummy;
        for (int i = 0; i < left - 1; i++) pre = pre->next;
        
        ListNode* cur = pre->next;
        for (int i = 0; i < right - left; i++) {
            ListNode* nxt = cur->next;
            cur->next = nxt->next;
            nxt->next = pre->next;
            pre->next = nxt;
        }
        return dummy->next;
    }
};
```
