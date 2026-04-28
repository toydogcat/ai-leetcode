---
title: "LeetCode #2: Add Two Numbers (兩數相加)"
categories:
  - Linked List
  - Math
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你兩個 **非空** 的鏈表，表示兩個非負的整數。它們每位數字都是按照 **逆序** 的方式存儲的，並且每個節點只能存儲 **一位** 數字。

請你將兩個數相加，並以相同形式返回一個表示和的鏈表。

## 解題思路
同時遍歷兩個鏈表，逐位相加。注意處理進位（carry）。

- **時間複雜度**: $O(\max(m, n))$，其中 $m$ 和 $n$ 分別為兩個鏈表的長度。
- **空間複雜度**: $O(\max(m, n))$，新鏈表的長度最多為 $\max(m, n) + 1$。

## 數學運算邏輯
對於每一位數字 $a_i$ 和 $b_i$，考慮進位 $c_{i-1}$，當前位的和 $S_i$ 與新的進位 $c_i$ 計算如下：
$$S_i = (a_i + b_i + c_{i-1}) \pmod{10}$$
$$c_i = \lfloor (a_i + b_i + c_{i-1}) / 10 \rfloor$$

## 程式碼實作

### Python
```python
class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy = ListNode(0)
        curr = dummy
        carry = 0
        while l1 or l2 or carry:
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0
            
            total = val1 + val2 + carry
            carry = total // 10
            curr.next = ListNode(total % 10)
            
            curr = curr.next
            if l1: l1 = l1.next
            if l2: l2 = l2.next
            
        return dummy.next
```

### C++
```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
        int carry = 0;
        
        while (l1 || l2 || carry) {
            int val1 = l1 ? l1->val : 0;
            int val2 = l2 ? l2->val : 0;
            
            int sum = val1 + val2 + carry;
            carry = sum / 10;
            curr->next = new ListNode(sum % 10);
            
            curr = curr->next;
            if (l1) l1 = l1->next;
            if (l2) l2 = l2->next;
        }
        
        return dummy->next;
    }
};
```
