---
title: "LeetCode #154: Find Minimum in Rotated Sorted Array II (尋找旋轉排序陣列中的最小值 II)"
categories:
  - Array
  - Binary Search
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
這題是 [153. Find Minimum in Rotated Sorted Array](file:///home/toymsi/documents/projects/Github/ai-leetcode/_posts/2026-04-30-leetcode-153-find-minimum-in-rotated-sorted-array.md) 的延伸，但陣列中 **可能包含重複的元素**。

請找出並返回陣列中的 **最小元素**。

## 解題心得：處理重複元素的尷尬
當陣列中出現重複元素時，單純的二分搜尋會遇到一個問題：如果 `nums[mid] == nums[right]`，我們無法確定最小值是在左邊還是右邊。
例如：`[1, 0, 1, 1, 1]` 和 `[1, 1, 1, 0, 1]`。

**解決方案**：
當 `nums[mid] == nums[right]` 時，我們雖然不知道最小值在哪，但我們知道 `nums[right]` 這個數值已經由 `nums[mid]` 代表了，所以我們可以放心地把 `right` 向左移動一格：
- `right -= 1`

雖然這會導致在最壞情況下（所有元素都相同）時間複雜度退化到 $O(n)$，但在平均情況下依然能維持 $O(\log n)$。

- **時間複雜度**: 平均 $O(\log n)$，最壞 $O(n)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def findMin(self, nums: List[int]) -> int:
        left, right = 0, len(nums) - 1
        
        while left < right:
            mid = (left + right) // 2
            
            if nums[mid] > nums[right]:
                left = mid + 1
            elif nums[mid] < nums[right]:
                right = mid
            else:
                # 當無法判斷時，縮減右邊界
                right -= 1
                
        return nums[left]
```

### C++
```cpp
#include <vector>

class Solution {
public:
    int findMin(std::vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else if (nums[mid] < nums[right]) {
                right = mid;
            } else {
                right--;
            }
        }
        return nums[left];
    }
};
```
