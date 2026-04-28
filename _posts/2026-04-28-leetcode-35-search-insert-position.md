---
title: "LeetCode #35: Search Insert Position"
categories:
  - Array
  - Binary Search
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個排序數組和一個目標值，在數組中找到目標值，並返回其索引。如果目標值不存在於數組中，返回它將會被按順序插入的位置。

## 解題心得：精準定位的藝術
這是一道標準的二分查找（Binary Search）入門題。

**核心邏輯：**
1. **設定範圍**：`left = 0`, `right = len - 1`。
2. **切半查找**：每次取中間值 `mid`。
   - 如果 `nums[mid]` 就是目標，太棒了，直接返回。
   - 如果 `nums[mid]` 比目標小，說明目標在右邊，`left = mid + 1`。
   - 如果 `nums[mid]` 比目標大，說明目標在左邊，`right = mid - 1`。
3. **最後位置**：如果循環結束還沒找到，最後的 `left` 指針剛好就是目標應該插入的位置。

二分法就像是在猜數字遊戲，每次都問「比這大還是比這小？」，這樣可以最快縮小範圍。

### Python
```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target: return mid
            elif nums[mid] < target: l = mid + 1
            else: r = mid - 1
        return l
```

### C++
```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return l;
    }
};
```
