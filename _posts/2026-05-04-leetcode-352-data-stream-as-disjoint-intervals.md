---
title: "LeetCode #352: Data Stream as Disjoint Intervals (將數據流變為不相交區間)"
categories:
  - Design
  - Binary Search
  - Ordered Set
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
設計一個資料結構，能夠接收來自資料流的整數，並將這些整數表示為一組不相交的區間。

## 解題心得
可以使用平衡二元搜尋樹 (如 C++ 中的 `std::set`) 或有序陣列來維護區間。在 Python 中，我們可以使用排序陣列或使用 `bisect` 進行二分搜尋插入。插入新數字 `val` 時，我們尋找其左右相鄰的區間：
- 若 `val` 已被某個區間包含，直接忽略。
- 若 `val` 剛好可以與左、右區間合併，則將三個區間合併為一個。
- 若僅能與左或右合併，更新該區間邊界。
- 若皆不能合併，則建立一個新的獨立區間 `[val, val]`。

- **時間複雜度**: 每次插入 O(N)，取得區間 O(1)；或插入 O(log N)，取得 O(N)
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
import bisect

class SummaryRanges:
    def __init__(self):
        self.intervals = []

    def addNum(self, value: int) -> None:
        # 使用二分搜尋定位插入點
        idx = bisect.bisect_left(self.intervals, [value, value])
        n = len(self.intervals)
        
        # 檢查是否被前一個區間包含
        if idx > 0 and self.intervals[idx - 1][1] >= value:
            return
            
        merge_prev = idx > 0 and self.intervals[idx - 1][1] + 1 == value
        merge_next = idx < n and self.intervals[idx][0] - 1 == value
        
        if merge_prev and merge_next:
            self.intervals[idx - 1][1] = self.intervals[idx][1]
            self.intervals.pop(idx)
        elif merge_prev:
            self.intervals[idx - 1][1] = value
        elif merge_next:
            self.intervals[idx][0] = value
        else:
            self.intervals.insert(idx, [value, value])

    def getIntervals(self) -> List[List[int]]:
        return self.intervals
```

### C++
```cpp
#include <vector>
#include <map>

class SummaryRanges {
private:
    std::map<int, int> intervals; // key: left, value: right

public:
    SummaryRanges() {}
    
    void addNum(int value) {
        auto it = intervals.upper_bound(value);
        bool merge_prev = (it != intervals.begin() && std::prev(it)->second + 1 >= value);
        
        if (merge_prev) {
            auto prev_it = std::prev(it);
            if (prev_it->second >= value) return; // 已經被包含
            prev_it->second = std::max(prev_it->second, value);
            if (it != intervals.end() && prev_it->second + 1 == it->first) {
                prev_it->second = it->second;
                intervals.erase(it);
            }
        } else {
            if (it != intervals.end() && value + 1 == it->first) {
                int right = it->second;
                intervals.erase(it);
                intervals[value] = right;
            } else {
                intervals[value] = value;
            }
        }
    }
    
    std::vector<std::vector<int>> getIntervals() {
        std::vector<std::vector<int>> res;
        for (auto const& [left, right] : intervals) {
            res.push_back({left, right});
        }
        return res;
    }
};
```
