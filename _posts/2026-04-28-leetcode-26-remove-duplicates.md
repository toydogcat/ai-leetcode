---
title: "LeetCode #26: Remove Duplicates from Sorted Array"
categories:
  - Array
  - Two Pointers
tags:
  - Easy
  - Python
  - C++
---

## 解題思路
快慢指針。當快指針的值不等於慢指針時，慢指針向前一步並賦值。

### Python
```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if not nums: return 0
        slow = 0
        for fast in range(1, len(nums)):
            if nums[fast] != nums[slow]:
                slow += 1
                nums[slow] = nums[fast]
        return slow + 1
```

### C++
```cpp
#include <vector>

class Solution {
public:
    int removeDuplicates(std::vector<int>& nums) {
        if (nums.empty()) return 0;
        int slow = 0;
        for (int fast = 1; fast < nums.size(); fast++) {
            if (nums[fast] != nums[slow]) {
                slow++;
                nums[slow] = nums[fast];
            }
        }
        return slow + 1;
    }
};
```
