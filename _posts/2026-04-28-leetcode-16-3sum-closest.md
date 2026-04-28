---
title: "LeetCode #16: 3Sum Closest"
categories:
  - Array
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
與 15 題類似，排序後使用雙指針，記錄與目標值最小的差距。

### Python
```python
class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        nums.sort()
        res = nums[0] + nums[1] + nums[2]
        for i in range(len(nums) - 2):
            l, r = i + 1, len(nums) - 1
            while l < r:
                s = nums[i] + nums[l] + nums[r]
                if abs(s - target) < abs(res - target):
                    res = s
                if s < target:
                    l += 1
                else:
                    r -= 1
        return res
```

### C++
```cpp
#include <vector>
#include <algorithm>
#include <cmath>

class Solution {
public:
    int threeSumClosest(std::vector<int>& nums, int target) {
        std::sort(nums.begin(), nums.end());
        int res = nums[0] + nums[1] + nums[2];
        for (int i = 0; i < (int)nums.size() - 2; i++) {
            int l = i + 1, r = nums.size() - 1;
            while (l < r) {
                int s = nums[i] + nums[l] + nums[r];
                if (std::abs(s - target) < std::abs(res - target)) res = s;
                if (s < target) l++;
                else r--;
            }
        }
        return res;
    }
};
```
