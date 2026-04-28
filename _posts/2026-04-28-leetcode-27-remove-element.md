---
title: "LeetCode #27: Remove Element"
categories:
  - Array
  - Two Pointers
tags:
  - Easy
  - Python
  - C++
---

## 解題思路
使用快慢指針。

### Python
```python
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        slow = 0
        for fast in range(len(nums)):
            if nums[fast] != val:
                nums[slow] = nums[fast]
                slow += 1
        return slow
```

### C++
```cpp
#include <vector>

class Solution {
public:
    int removeElement(std::vector<int>& nums, int val) {
        int slow = 0;
        for (int fast = 0; fast < nums.size(); fast++) {
            if (nums[fast] != val) {
                nums[slow] = nums[fast];
                slow++;
            }
        }
        return slow;
    }
};
```
