---
title: "LeetCode #81: Search in Rotated Sorted Array II"
categories:
  - Array
  - Binary Search
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
與 33 題類似，但數組中包含重複元素。當 `nums[l] == nums[mid]` 時，我們無法判斷哪一邊是有序的，此時只需將 `l` 向前移動一步。

### Python
```python
class Solution:
    def search(self, nums: List[int], target: int) -> bool:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target: return True
            if nums[l] == nums[mid]:
                l += 1
                continue
            if nums[l] < nums[mid]:
                if nums[l] <= target < nums[mid]: r = mid - 1
                else: l = mid + 1
            else:
                if nums[mid] < target <= nums[r]: l = mid + 1
                else: r = mid - 1
        return False
```

### C++
```cpp
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return true;
            if (nums[l] == nums[mid]) {
                l++; continue;
            }
            if (nums[l] < nums[mid]) {
                if (nums[l] <= target && target < nums[mid]) r = mid - 1;
                else l = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[r]) l = mid + 1;
                else r = mid - 1;
            }
        }
        return false;
    }
};
```
