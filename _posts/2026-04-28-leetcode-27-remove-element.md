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

## 題目描述
給你一個數組 `nums` 和一個值 `val`，你需要 **原地** 移除所有數值等於 `val` 的元素，並返回移除後數組的新長度。不要使用額外的數組空間。

## 解題心得：搬運工的邏輯
這題跟 26 題很像，也是用「雙指針」。

**核心邏輯：**
1. **快指針 `j`**：走在前面，負責尋找「不是 `val`」的好東西。
2. **慢指針 `i`**：守在後面，負責把好東西「搬」到前面排好。
3. **搬運**：只要 `nums[j]` 不等於 `val`，就把它搬到 `nums[i]`，然後 `i` 往前走一格。

這就像是在清理貨架上的過期商品。你（快指針）看到一瓶沒過期的果汁，就把它遞給搬運工（慢指針），搬運工把它整齊地放在貨架的最前方，最後搬運工放了多少瓶，就是新的長度。

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
