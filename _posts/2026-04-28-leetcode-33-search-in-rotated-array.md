---
title: "LeetCode #33: Search in Rotated Sorted Array"
categories:
  - Array
  - Binary Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
整數數組 `nums` 按升序排列，數組中的值 **互不相同** 。在傳遞給函數之前，`nums` 在預先未知的某個下標 `k` 上進行了旋轉。給你 **旋轉後** 的數組 `nums` 和一個整數 `target` ，如果 `nums` 中存在這個目標值 `target` ，則返回它的下標，否則返回 `-1` 。

## 解題心得：斷層中的二分法
這題最妙的地方在於，即便數組被旋轉過（斷開了），只要我們切一刀，**左半部或右半部，一定有一邊是依然有序的！**

**核心邏輯：**
1. **切中點**：算出 `mid`。
2. **判斷哪邊有序**：
   - 如果 `nums[left] <= nums[mid]`，說明 **左半邊** 是規規矩矩的升序。
   - 否則，**右半邊** 一定是規規矩矩的升序。
3. **縮小範圍**：
   - 如果左邊有序，且目標在左邊範圍內，我們就去左邊找。
   - 否則，我們就去右邊（斷層的那邊）找。

這就像是在一段被切開並重新接上的梯子找東西。雖然梯子斷了，但每一段被切下來的部分本身還是完整的，我們只要確認東西在不在完整的那一段，就能決定下一步往哪走。

### Python
```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target: return mid
            if nums[l] <= nums[mid]:
                if nums[l] <= target < nums[mid]: r = mid - 1
                else: l = mid + 1
            else:
                if nums[mid] < target <= nums[r]: l = mid + 1
                else: r = mid - 1
        return -1
```

### C++
```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            if (nums[l] <= nums[mid]) {
                if (nums[l] <= target && target < nums[mid]) r = mid - 1;
                else l = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[r]) l = mid + 1;
                else r = mid - 1;
            }
        }
        return -1;
    }
};
```
