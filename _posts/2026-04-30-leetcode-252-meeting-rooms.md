---
title: "LeetCode #252: Meeting Rooms (會議室)"
categories:
  - Array
  - Sorting
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個會議時間安排的數組 `intervals` ，每個會議時間都會包括開始和結束時間 `intervals[i] = [starti, endi]` ，請你判斷一個人是否能夠參加這裡所有的會議。

## 解題心得：排序 + 區間重疊檢查
這是一個經典的區間重疊問題。

**核心邏輯：**
1. **排序**：按照會議的 **開始時間** 對 `intervals` 進行升序排序。
2. **遍歷檢查**：
   - 遍歷排序後的會議。
   - 檢查當前會議的開始時間是否早於前一個會議的結束時間。
   - 如果 `intervals[i][0] < intervals[i-1][1]`，說明兩個會議時間上有重疊，返回 `false`。
3. 如果遍歷結束都沒有發現重疊，返回 `true`。

- **時間複雜度**: $O(N \log N)$，主要耗時在排序。
- **空間複雜度**: $O(1)$ 或 $O(\log N)$ (取決於排序算法)。

## 程式碼實作

### Python
```python
class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        # 1. 按開始時間排序
        intervals.sort(key=lambda x: x[0])
        
        # 2. 檢查重疊
        for i in range(1, len(intervals)):
            if intervals[i][0] < intervals[i-1][1]:
                return False
                
        return True
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    bool canAttendMeetings(std::vector<std::vector<int>>& intervals) {
        if (intervals.empty()) return true;
        
        // 按開始時間排序
        std::sort(intervals.begin(), intervals.end(), [](const std::vector<int>& a, const std::vector<int>& b) {
            return a[0] < b[0];
        });
        
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] < intervals[i-1][1]) {
                return false;
            }
        }
        return true;
    }
};
```
