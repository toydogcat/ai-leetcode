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

## 解題思路：優先隊列 (Heap)
將 $k$ 個鏈表的頭節點放入最小堆中，每次彈出最小的節點，並將該節點的下一個節點放入堆中。

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
