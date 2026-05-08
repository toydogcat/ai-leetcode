---
title: "LeetCode #376: Wiggle Subsequence (擺動子序列)"
categories:
  - Greedy
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
擺動序列是指連續數字之間的差在正數和負數之間交替。求最大擺動子序列的長度。

## 解題心得
使用 **貪心演算法**：
- 我們只需尋找序列中的「峰」與「谷」的數量。
- 維護兩個狀態變數 `up` 和 `down`：
  - `up` 記錄以當前元素為上升趨勢結尾的最大擺動序列長度。
  - `down` 記錄以當前元素為下降趨勢結尾的最大擺動序列長度。
- 當 `nums[i] > nums[i-1]`：`up = down + 1`。
- 當 `nums[i] < nums[i-1]`：`down = up + 1`。
- 最終答案為 `max(up, down)`。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def wiggleMaxLength(self, nums: List[int]) -> int:
        if not nums: return 0
        up = down = 1
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]:
                up = down + 1
            elif nums[i] < nums[i - 1]:
                down = up + 1
        return max(up, down)
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int wiggleMaxLength(std::vector<int>& nums) {
        if (nums.empty()) return 0;
        int up = 1, down = 1;
        for (int i = 1; i < nums.size(); ++i) {
            if (nums[i] > nums[i - 1]) {
                up = down + 1;
            } else if (nums[i] < nums[i - 1]) {
                down = up + 1;
            }
        }
        return std::max(up, down);
    }
};
```
