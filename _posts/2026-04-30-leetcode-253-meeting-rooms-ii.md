---
title: "LeetCode #253: Meeting Rooms II (會議室 II)"
categories:
  - Array
  - Two Pointers
  - Greedy
  - Sorting
  - Heap
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個會議時間安排的數組 `intervals` ，每個會議時間都會包括開始和結束時間 `intervals[i] = [starti, endi]` ，請你計算至少需要多少間會議室，才能滿足這些會議安排。

## 解題心得：最小堆 (Min-Heap) 策略
這題是 [Meeting Rooms I](./2026-04-30-leetcode-252-meeting-rooms.md) 的進階，要求計算最大並發量。

**核心邏輯：**
1. **排序**：按會議的 **開始時間** 進行升序排序。
2. **最小堆 (Priority Queue)**：堆中存儲正在進行的會議的 **結束時間**。堆頂即為最早結束的會議。
3. **遍歷處理**：
   - 對於每一個新會議：
     - 如果堆頂（最早結束的會議）的結束時間 $\le$ 當前會議的開始時間，說明可以複用這間會議室，將堆頂彈出。
     - 無論是否複用，都將當前會議的結束時間壓入堆。
4. **結果**：遍歷結束後，堆的大小就是所需會議室的最小數量。

- **時間複雜度**: $O(N \log N)$。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
import heapq

class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        if not intervals: return 0
        
        # 1. 按開始時間排序
        intervals.sort(key=lambda x: x[0])
        
        # 2. 最小堆存儲結束時間
        heap = []
        
        for i in intervals:
            # 如果堆頂的結束時間 <= 當前開始時間，彈出（複用房間）
            if heap and heap[0] <= i[0]:
                heapq.heappop(heap)
            
            # 加入當前會議的結束時間
            heapq.heappush(heap, i[1])
            
        return len(heap)
```

### C++
```cpp
#include <vector>
#include <algorithm>
#include <queue>

class Solution {
public:
    int minMeetingRooms(std::vector<std::vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        
        // 1. 按開始時間排序
        std::sort(intervals.begin(), intervals.end(), [](const std::vector<int>& a, const std::vector<int>& b) {
            return a[0] < b[0];
        });
        
        // 2. 最小堆存儲結束時間
        std::priority_queue<int, std::vector<int>, std::greater<int>> pq;
        
        for (const auto& i : intervals) {
            if (!pq.empty() && pq.top() <= i[0]) {
                pq.pop();
            }
            pq.push(i[1]);
        }
        
        return pq.size();
    }
};
```
