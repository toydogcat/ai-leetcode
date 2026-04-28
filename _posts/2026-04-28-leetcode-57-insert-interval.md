---
title: "LeetCode #57: Insert Interval"
categories:
  - Array
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個 **無重疊的** ，按照區間起始端點排序的區間列表。在列表中插入一個新的區間，你需要確保列表中的區間仍然有序且不重疊（如果有必要的話，可以合併區間）。

## 解題心得：三段式處理
這題是 56 題（合併區間）的變體，但因為原數組已經有序，我們可以用更聰明的方法。

**核心邏輯：**
1. **處理左邊不相干的**：遍歷區間，只要當前區間的結束位置比新區間的開始位置還小，說明它在新區間的左邊，直接加入結果。
2. **處理中間要合併的**：如果當前區間與新區間有重疊（即當前區間的開始位置小於等於新區間的結束位置），我們就把新區間的邊界「撐大」。
   - 新開頭 = $\min(\text{原新區間開頭}, \text{當前區間開頭})$
   - 新結尾 = $\max(\text{原新區間結尾}, \text{當前區間結尾})$
3. **處理右邊不相干的**：剩下的區間都在新區間的右邊，直接加入結果。

這就像是有一排已經停好的車，你要插進一輛超長卡車，你要先把左邊的車放過，把擋住卡車位置的車通通合併成一個大車位，最後再放行右邊的車。

### Python
```python
class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        res = []
        i = 0
        n = len(intervals)
        while i < n and intervals[i][1] < newInterval[0]:
            res.append(intervals[i])
            i += 1
        while i < n and intervals[i][0] <= newInterval[1]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1
        res.append(newInterval)
        while i < n:
            res.append(intervals[i])
            i += 1
        return res
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> insert(std::vector<std::vector<int>>& intervals, std::vector<int>& newInterval) {
        std::vector<std::vector<int>> res;
        int i = 0, n = intervals.size();
        while (i < n && intervals[i][1] < newInterval[0]) res.push_back(intervals[i++]);
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = std::min(newInterval[0], intervals[i][0]);
            newInterval[1] = std::max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);
        while (i < n) res.push_back(intervals[i++]);
        return res;
    }
};
```
