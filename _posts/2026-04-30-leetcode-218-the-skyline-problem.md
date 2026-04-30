---
title: "LeetCode #218: The Skyline Problem (天際線問題)"
categories:
  - Array
  - Heap
  - Ordered Set
  - Line Sweep
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
城市的 **天際線** 是從遠處觀看城市中所有建築物形成的輪廓的外部輪廓。
給你所有建築物的位置和高度，請返回由這些建築物共同形成的 **天際線** 。
每個建築物的資訊用一個三元組 `[lefti, righti, heighti]` 表示。

## 解題心得：掃描線法 (Line Sweep)
這是一道非常經典的幾何問題，核心在於處理「重疊」和「高度變化」。

**核心邏輯：**
1. **離散化事件點**：將每個建築物的左邊界和右邊界看作事件點。
   - 左邊界：高度為正（進入）。
   - 右邊界：高度為負（離開）。
2. **排序事件點**：按橫座標排序。如果橫座標相同，需要特殊處理排序規則（左邊界高的優先、右邊界矮的優先等）。
3. **維護當前最大高度**：使用一個 **最大堆 (Max-Heap)** 或 **平衡樹 (multiset)** 存儲當前掃描線覆蓋的所有建築物的高度。
4. **輸出關鍵點**：
   - 每遇到一個事件點，更新堆中的高度。
   - 如果當前的最大高度發生了變化，則說明這是一個關鍵點（天際線的轉折點）。

- **時間複雜度**: $O(N \log N)$。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
import heapq

class Solution:
    def getSkyline(self, buildings: List[List[int]]) -> List[List[int]]:
        # 提取事件點：(x, -h) 表示左邊界進，(x, h) 表示右邊界出
        events = []
        for l, r, h in buildings:
            events.append((l, -h))
            events.append((r, h))
        
        # 排序規則：x 小的在前；x 相同時，h 小的在前（即 -h 大的在前）
        events.sort()
        
        res = [[0, 0]] # [x, max_h]
        max_heap = [0] # 初始高度為 0
        
        for x, h in events:
            if h < 0: # 左邊界
                heapq.heappush(max_heap, h)
            else: # 右邊界
                # Python 的 heapq 不支持隨機刪除，這裡採用延遲刪除優化
                # 或者使用更複雜的結構。為了簡潔，這裡使用 remove（注意 $O(N)$）
                # 實際面試建議說明延遲刪除的策略
                max_heap.remove(-h)
                heapq.heapify(max_heap)
            
            curr_max = -max_heap[0]
            if curr_max != res[-1][1]:
                res.append([x, curr_max])
                
        return res[1:]
```

### C++ (使用 multiset)
```cpp
#include <vector>
#include <algorithm>
#include <set>

class Solution {
public:
    std::vector<std::vector<int>> getSkyline(std::vector<std::vector<int>>& buildings) {
        std::vector<std::pair<int, int>> events;
        for (auto& b : buildings) {
            events.push_back({b[0], -b[2]}); // 左邊界：高度取負
            events.push_back({b[1], b[2]});  // 右邊界：高度取正
        }
        
        std::sort(events.begin(), events.end());
        
        std::vector<std::vector<int>> res;
        std::multiset<int> heights = {0}; // 維護當前高度集合
        int prevMax = 0;
        
        for (auto& e : events) {
            if (e.second < 0) {
                heights.insert(-e.second);
            } else {
                heights.erase(heights.find(e.second));
            }
            
            int currMax = *heights.rbegin();
            if (currMax != prevMax) {
                res.push_back({e.first, currMax});
                prevMax = currMax;
            }
        }
        return res;
    }
};
```
