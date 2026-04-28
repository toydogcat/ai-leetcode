---
title: "LeetCode #56: Merge Intervals"
categories:
  - Array
  - Sorting
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
以數組 `intervals` 表示若干個區間的集合，其中單個區間為 `intervals[i] = [starti, endi]` 。請你合併所有重疊的區間，並返回一個不重疊的區間數組，該數組需恰好覆蓋輸入中的所有區間。

## 解題心得：排好隊，看著前一個人的背影
這題是處理區間問題的「教科書級別」題目。

**核心邏輯：**
1. **排序**：這步最重要！按每個區間的 **「開始位置」** 進行排序。這樣我們只要看一眼前一個人的結束位置，就知道有沒有撞到了。
2. **比較與合併**：
   - 如果當前區間的開始位置 $\le$ 結果中最後一個區間的結束位置 $\rightarrow$ 撞到了！把它們合體（把結尾更新為兩者中較大的一個）。
   - 否則 $\rightarrow$ 沒撞到，直接把當前區間加入結果。

### Python
```python
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort()
        res = []
        for interval in intervals:
            if not res or res[-1][1] < interval[0]:
                res.append(interval)
            else:
                res[-1][1] = max(res[-1][1], interval[1])
        return res
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {
        std::sort(intervals.begin(), intervals.end());
        std::vector<std::vector<int>> res;
        for (auto& interval : intervals) {
            if (res.empty() || res.back()[1] < interval[0]) {
                res.push_back(interval);
            } else {
                res.back()[1] = std::max(res.back()[1], interval[1]);
            }
        }
        return res;
    }
};
```
