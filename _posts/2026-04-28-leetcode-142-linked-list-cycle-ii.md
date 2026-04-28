---
title: "LeetCode #142: Linked List Cycle II"
categories:
  - Linked List
tags:
  - Medium
  - Two Pointers
  - Python
  - C++
---

## 題目描述
給定一個鏈表的頭節點 `head` ，返回鏈表開始入環的第一個節點。如果鏈表無環，則返回 `null` 。

## 解題心得：重逢的起點
這題是 #141 的加強版。不只要知道有環，還要找到環的入口。
**數學推導結論：**
1. 按照龜兔賽跑的方法，找到 `slow` 和 `fast` 相遇的點。
2. 相遇後，將其中一個指針（比如 `fast`）重置回 `head`。
3. 讓 `slow` 和 `fast` 同步（每次走一步）前進。
4. 它們再次相遇的地方，就是 **環的入口**。

### Python
```python
class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow, fast = head, head
        has_cycle = False
        
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                has_cycle = True
                break
        
        if not has_cycle: return None
        
        # 重置一個指針到起點
        fast = head
        while slow != fast:
            slow = slow.next
            fast = fast.next
            
        return slow
```

### C++
```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode *slow = head, *fast = head;
        bool has_cycle = false;
        
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                has_cycle = true;
                break;
            }
        }
        
        if (!has_cycle) return nullptr;
        
        fast = head;
        while (slow != fast) {
            slow = slow->next;
            fast = fast->next;
        }
        return slow;
    }
};
```
