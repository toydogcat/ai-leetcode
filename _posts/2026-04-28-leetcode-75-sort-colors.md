---
title: "LeetCode #75: Sort Colors"
categories:
  - Array
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
---

## 解題思路：荷蘭國旗問題
使用三個指針 `p0`, `curr`, `p2`。`p0` 之前全是 0，`p2` 之後全是 2。

### Python
```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        p0, curr, p2 = 0, 0, len(nums) - 1
        while curr <= p2:
            if nums[curr] == 0:
                nums[p0], nums[curr] = nums[curr], nums[p0]
                p0 += 1; curr += 1
            elif nums[curr] == 2:
                nums[p2], nums[curr] = nums[curr], nums[p2]
                p2 -= 1
            else:
                curr += 1
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    void sortColors(std::vector<int>& nums) {
        int p0 = 0, curr = 0, p2 = nums.size() - 1;
        while (curr <= p2) {
            if (nums[curr] == 0) std::swap(nums[p0++], nums[curr++]);
            else if (nums[curr] == 2) std::swap(nums[p2--], nums[curr]);
            else curr++;
        }
    }
};
```
