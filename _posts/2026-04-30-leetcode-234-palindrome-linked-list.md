---
title: "LeetCode #234: Palindrome Linked List (回文鏈表)"
categories:
  - Linked List
  - Two Pointers
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一個單鏈表的頭節點 `head` ，請你判斷該鏈表是否為回文鏈表。如果是，返回 `true` ；否則，返回 `false` 。

## 解題心得：快慢指針 + 鏈表反轉
如果使用額外的數組存儲節點值，空間複雜度為 $O(N)$。若要實現 $O(1)$ 空間複雜度，需要修改鏈表結構。

**核心邏輯：**
1. **尋找中點**：使用快慢指針，當快指針到達末尾時，慢指針恰好在中間。
2. **反轉後半部分**：將慢指針之後的鏈表進行反轉。
3. **對比**：同時遍歷前半部分和反轉後的後半部分，比較節點值。
4. **還原（可選）**：為了保持原鏈表不變，可以將後半部分再次反轉。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return True
        
        # 1. 快慢指針找中點
        slow = fast = head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next
            
        # 2. 反轉後半部分
        second_half = self.reverse(slow.next)
        
        # 3. 比較
        curr1, curr2 = head, second_half
        res = True
        while curr2:
            if curr1.val != curr2.val:
                res = False
                break
            curr1 = curr1.next
            curr2 = curr2.next
            
        return res

    def reverse(self, head):
        prev = None
        curr = head
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        return prev
```

### C++
```cpp
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        if (!head || !head->next) return true;
        
        ListNode *slow = head, *fast = head;
        while (fast->next && fast->next->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        
        ListNode* secondHalf = reverseList(slow->next);
        ListNode* p1 = head;
        ListNode* p2 = secondHalf;
        
        bool res = true;
        while (p2) {
            if (p1->val != p2->val) {
                res = false;
                break;
            }
            p1 = p1->next;
            p2 = p2->next;
        }
        return res;
    }

    ListNode* reverseList(ListNode* head) {
        ListNode *prev = nullptr, *curr = head;
        while (curr) {
            ListNode* nxt = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nxt;
        }
        return prev;
    }
};
```
