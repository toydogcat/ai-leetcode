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

## 題目描述
已知一個升序排列的整數數組 `nums` 在預先未知的某個點上進行了旋轉。數組中 **可能包含重複元素**。請判斷給定的目標值 `target` 是否在數組中。

## 解題心得：打破二分的僵局
這題是 33 題的升級版。區別在於：**重複元素會讓我們「迷路」**。

**為什麼會迷路？**
二分搜索的核心是判斷哪一半是有序的。如果 `nums[left] == nums[mid]`（例如 `[1, 0, 1, 1, 1]`），我們根本不知道斷點在哪一邊。

**解決策略：**
1. **遇到僵局就退一步**：如果發現 `left` 和 `mid` 的值一樣，我們就簡單地把 `left` 往右挪一步 (`left += 1`)。
2. **重回正軌**：只要擺脫了相等的情況，我們就能像 33 題一樣，判斷出哪一邊是單調遞增的，進而決定去哪一邊找。

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
