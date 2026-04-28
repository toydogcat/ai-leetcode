---
title: "LeetCode #55: Jump Game"
categories:
  - Array
  - Greedy
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
貪心算法。維護一個當前能到達的最遠位置。

### Python
```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        max_reach = 0
        for i, jump in enumerate(nums):
            if i > max_reach: return False
            max_reach = max(max_reach, i + jump)
        return True
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    bool canJump(std::vector<int>& nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (i > maxReach) return false;
            maxReach = std::max(maxReach, i + nums[i]);
        }
        return true;
    }
};
```
