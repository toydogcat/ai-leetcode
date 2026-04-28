---
title: "LeetCode #80: Remove Duplicates from Sorted Array II"
categories:
  - Array
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
使用快慢指針。每個數字最多出現兩次，所以 `nums[fast]` 只要與 `nums[slow-2]` 不同即可移動。

### Python
```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if len(nums) <= 2: return len(nums)
        slow = 2
        for fast in range(2, len(nums)):
            if nums[fast] != nums[slow-2]:
                nums[slow] = nums[fast]
                slow += 1
        return slow
```

### C++
```cpp
#include <vector>

class Solution {
public:
    int removeDuplicates(std::vector<int>& nums) {
        int n = nums.size();
        if (n <= 2) return n;
        int slow = 2;
        for (int fast = 2; fast < n; fast++) {
            if (nums[fast] != nums[slow - 2]) {
                nums[slow++] = nums[fast];
            }
        }
        return slow;
    }
};
```
