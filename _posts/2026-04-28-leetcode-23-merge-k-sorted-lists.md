---
title: "LeetCode #23: Merge k Sorted Lists"
categories:
  - Linked List
  - Heap
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個鏈表數組，每個鏈表都已經按升序排列。請你將所有鏈表合併到一個升序鏈表中，返回合併後的鏈表。

## 解題心得：優選龍頭的策略
這題是 21 題（合併兩個鏈表）的終極加強版。

**核心邏輯：優先隊列 (Priority Queue / Heap)**
1. **龍頭大集合**：我們把每一條鏈表的「第一個節點」（龍頭）都放進一個小頂堆（Min-Heap）。堆會自動幫我們選出現在「最小」的那一個。
2. **取最小並補位**：
   - 從堆頂拿出最小的節點，接在結果鏈表後面。
   - 如果這個節點後面還有「小弟」（下一個節點），就立刻把那個小弟放進堆裡。
3. **循環**：重複上述動作，直到堆空了為止。

這就像是有 $k$ 列隊伍在排隊進場，每個隊伍都已經按身高排好了。門口守衛（堆）每次只看每排的第一個人，把最矮的那個放進去。放進去一個後，那個隊伍的「第二個人」就補上來變成「排頭」，繼續接受守衛的挑選。

- **時間複雜度**: $O(N \log k)$，其中 $N$ 是節點總數。
- **空間複雜度**: $O(k)$。

### Python
```python
import heapq
class Solution:
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        heap = []
        for i, node in enumerate(lists):
            if node:
                heapq.heappush(heap, (node.val, i, node))
        
        dummy = ListNode(0)
        curr = dummy
        while heap:
            val, i, node = heapq.heappop(heap)
            curr.next = node
            curr = curr.next
            if node.next:
                heapq.heappush(heap, (node.next.val, i, node.next))
        return dummy.next
```

### C++
```cpp
#include <queue>
#include <vector>

class Solution {
public:
    struct compare {
        bool operator()(ListNode* l, ListNode* r) {
            return l->val > r->val;
        }
    };
    ListNode* mergeKLists(std::vector<ListNode*>& lists) {
        std::priority_queue<ListNode*, std::vector<ListNode*>, compare> pq;
        for (auto l : lists) if (l) pq.push(l);
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
        while (!pq.empty()) {
            ListNode* node = pq.top(); pq.pop();
            curr->next = node;
            curr = curr->next;
            if (node->next) pq.push(node->next);
        }
        return dummy->next;
    }
};
```
