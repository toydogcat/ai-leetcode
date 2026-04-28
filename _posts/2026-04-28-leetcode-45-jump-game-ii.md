---
title: "LeetCode #45: Jump Game II"
categories:
  - Array
  - Greedy
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
貪心算法。每次在當前能跳到的範圍內，選擇下一次能跳到最遠的那個位置。

### Python
```python
class Solution:
    def jump(self, nums: List[int]) -> int:
        n = len(nums)
        max_pos = end = step = 0
        for i in range(n - 1):
            max_pos = max(max_pos, i + nums[i])
            if i == end:
                end = max_pos
                step += 1
        return step
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int jump(std::vector<int>& nums) {
        int n = nums.size();
        int maxPos = 0, end = 0, step = 0;
        for (int i = 0; i < n - 1; i++) {
            maxPos = std::max(maxPos, i + nums[i]);
            if (i == end) {
                end = maxPos;
                step++;
            }
        }
        return step;
    }
};
```
