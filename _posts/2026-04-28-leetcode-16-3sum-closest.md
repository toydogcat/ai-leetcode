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

## 題目描述
給你一個長度為 `n` 的整數數組 `nums` 和一個目標值 `target`。請你從 `nums` 中選出三個整數，使它們的和與 `target` 最接近。返回這三個數的和。

## 解題心得：尋找最貼心的組合
這題跟 15 題（三數之和）幾乎一樣，差別在於 15 題要「精準命中 0」，而這題只要「盡量靠近 target」。

**核心邏輯：**
1. **排序**：同樣先排好序，方便我們決定指針要往哪動。
2. **固定一個，夾擊兩個**：遍歷每個數 `nums[i]`，剩下的兩邊用 `left` 和 `right` 指針向中間靠。
3. **動態更新最優解**：
   - 算出三數之和 `currentSum`。
   - 如果 `currentSum` 比目前的紀錄更靠近 `target`（差距更小），就更新紀錄。
   - 如果 `currentSum < target`，為了變大一點，我們把 `left` 往右移。
   - 如果 `currentSum > target`，為了變小一點，我們把 `right` 往左移。

這就像是在買衣服，雖然沒有剛好 100% 合身的尺寸（精準命中），但你試穿了幾件後，總能找到一件跟你的身材（target）最接近的。

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
