---
title: "LeetCode #34: Find First and Last Position of Element in Sorted Array"
categories:
  - Array
  - Binary Search
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
使用兩次二分搜索，分別查找左邊界和右邊界。

### Python
```python
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        def findBound(isFirst):
            l, r = 0, len(nums) - 1
            res = -1
            while l <= r:
                mid = (l + r) // 2
                if nums[mid] == target:
                    res = mid
                    if isFirst: r = mid - 1
                    else: l = mid + 1
                elif nums[mid] < target: l = mid + 1
                else: r = mid - 1
            return res
        return [findBound(True), findBound(False)]
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<int> searchRange(std::vector<int>& nums, int target) {
        return {findBound(nums, target, true), findBound(nums, target, false)};
    }
    int findBound(std::vector<int>& nums, int target, bool isFirst) {
        int l = 0, r = nums.size() - 1, res = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) {
                res = mid;
                if (isFirst) r = mid - 1;
                else l = mid + 1;
            } else if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return res;
    }
};
```
