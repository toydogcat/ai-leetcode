---
title: "LeetCode #160: Intersection of Two Linked Lists (相交鏈結串列)"
categories:
  - Linked List
  - Two Pointers
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你兩個單向鏈結串列的頭節點 `headA` 和 `headB` ，請你找出並返回兩個單向鏈結串列相交的起始節點。如果兩個鏈結串列不存在相交節點，返回 `null` 。

圖示如下：
A:          a1 → a2
                   ↘
                     c1 → c2 → c3
                   ↗            
B:     b1 → b2 → b3

## 解題心得：浪漫的相遇
這題最優雅的解法莫過於「雙指針法」。

**浪漫的演算法描述**：
如果兩個鏈結串列長度不同，他們要在哪裡相遇？
讓指針 A 走完 List A 後，去走 List B 的路；
讓指針 B 走完 List B 後，去走 List A 的路。
當他們都走完「自己的路 + 對方的路」時，他們走過的總路徑長度會是一樣的（$L_A + L_B$）。
這時候，如果他們相交，他們一定會在交點相遇；如果不相交，他們會同時到達終點 (`null`)。

- **時間複雜度**: $O(m + n)$，其中 $m$ 和 $n$ 是兩條鏈結串列的長度。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        if not headA or not headB:
            return None
        
        pA, pB = headA, headB
        
        while pA != pB:
            # 如果走到了終點，就換到另一條路
            pA = pA.next if pA else headB
            pB = pB.next if pB else headA
            
        return pA
```

### C++
```cpp
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        if (headA == nullptr || headB == nullptr) return nullptr;
        
        ListNode *pA = headA;
        ListNode *pB = headB;
        
        while (pA != pB) {
            pA = (pA == nullptr) ? headB : pA->next;
            pB = (pB == nullptr) ? headA : pB->next;
        }
        
        return pA;
    }
};
```
