---
title: "LeetCode #281: Zigzag Iterator (鋸齒迭代器)"
categories:
  - Design
  - Queue
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定兩個一維數組 `v1` 和 `v2`，請實現一個鋸齒迭代器，交替返回這兩個數組中的元素。

**範例 1:**
```
輸入: v1 = [1,2], v2 = [3,4,5,6]
輸出: [1,3,2,4,5,6]
解釋: 通過交替從 v1 和 v2 中取出元素，我們得到 [1,3,2,4,5,6]。
```

**進階要求**：
如果給你 `k` 個一維數組，你該如何擴展你的設計？

## 解題心得：利用佇列維護多個指針
本題的鋸齒狀（交替）遍歷可以使用雙端佇列（Queue）來優雅地解決，這種方法還能完美擴展到 `k` 個數組的進階情況。

**核心邏輯**：
1. **佇列儲存狀態**：我們在 Queue 中儲存當前還有元素未遍歷的數組迭代狀態。每個狀態可以表示為一個 `(迭代器, 結束位置)` 或是 `(數組索引, 內部索引)`。
2. **交替取出與推回**：
   - 每次調用 `next()` 時，從 Queue 的前端彈出一個數組。
   - 從該數組中取出當前指向的元素，並將其內部的遍歷索引加 1。
   - 如果該數組中還有剩餘元素，則將更新後的數組重新推入 Queue 的末端。
3. **判斷是否結束**：只要 Queue 不為空，`hasNext()` 就返回 `true`。

- **時間複雜度**: 初始化 $O(K)$，`next()` 與 `hasNext()` $O(1)$，其中 $K$ 是數組的個數。
- **空間複雜度**: $O(K)$，記錄數組指針的 Queue。

## 程式碼實作

### Python
```python
from collections import deque

class ZigzagIterator:
    def __init__(self, v1: List[int], v2: List[int]):
        # queue 中存放 (數組索引, 內部下標) 的指針
        self.vectors = []
        if v1: self.vectors.append(v1)
        if v2: self.vectors.append(v2)
        
        # 佇列存放有剩餘元素的數組索引
        self.queue = deque([(i, 0) for i in range(len(self.vectors))])

    def next(self) -> int:
        # 取出隊首
        v_idx, col_idx = self.queue.popleft()
        val = self.vectors[v_idx][col_idx]
        
        # 如果該數組還有下一個元素，放回隊尾
        if col_idx + 1 < len(self.vectors[v_idx]):
            self.queue.append((v_idx, col_idx + 1))
            
        return val

    def hasNext(self) -> bool:
        return len(self.queue) > 0
```

### C++
```cpp
#include <vector>
#include <queue>

class ZigzagIterator {
private:
    std::queue<std::pair<std::vector<int>::iterator, std::vector<int>::iterator>> q;

public:
    ZigzagIterator(std::vector<int>& v1, std::vector<int>& v2) {
        if (!v1.empty()) q.push({v1.begin(), v1.end()});
        if (!v2.empty()) q.push({v2.begin(), v2.end()});
    }

    int next() {
        auto p = q.front();
        q.pop();

        auto it = p.first;
        auto end = p.second;
        int val = *it;

        if (it + 1 != end) {
            q.push({it + 1, end});
        }

        return val;
    }

    bool hasNext() {
        return !q.empty();
    }
};
```
