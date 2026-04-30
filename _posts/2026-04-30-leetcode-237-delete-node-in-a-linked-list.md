---
title: "LeetCode #237: Delete Node in a Linked List (刪除鏈表中的節點)"
categories:
  - Linked List
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
有一個單鏈表的 `head`，我們想刪除它其中的一個節點 `node`。
給你該節點 `node` 。你將 **無法訪問** 第一個節點 `head`。
鏈表的所有值都是 **唯一的**，並且保證給定的節點 `node` **不是末尾節點**。

## 解題心得：偷樑換柱
通常刪除鏈表節點需要找到前一個節點 (`prev`)，但這題沒給 `head`，所以找不到 `prev`。

**核心邏輯：**
既然不能刪除自己，我們可以「偽裝」成下一個節點，然後把下一個節點幹掉：
1. 將當前節點的值改為下一個節點的值。
2. 將當前節點的 `next` 指向下一個節點的下一個節點。

這在本質上是刪除了下一個節點，但外觀上看起來是當前節點消失了。

- **時間複雜度**: $O(1)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def deleteNode(self, node):
        """
        :type node: ListNode
        :rtype: void Do not return anything, modify node in-place instead.
        """
        # 把下一個節點的值拷貝過來
        node.val = node.next.val
        # 跳過下一個節點
        node.next = node.next.next
```

### C++
```cpp
class Solution {
public:
    void deleteNode(ListNode* node) {
        // 賦值後跳過
        node->val = node->next->val;
        node->next = node->next->next;
    }
};
```
