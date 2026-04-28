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

## 題目描述
給你一個有序數組 `nums` ，請你 **原地** 刪除重複出現的元素，使得出現次數超過兩次的元素 **只出現兩次** ，返回刪除後數組的新長度。

## 解題心得：給重複留一點餘地
這題是「刪除重複項」的變體。之前的題目是每個數字只能留一個，這題是 **「最多留兩個」**。

**核心邏輯：快慢指針**
1. **慢指針 `slow`**：代表「處理好、符合規定的隊伍」的長度。
2. **快指針 `fast`**：代表「正在觀察、準備入隊」的數字。
3. **入隊規則**：只要當前這個數字跟「已經入隊的倒數第二個數字」不一樣，它就有資格入隊。
   - 為什麼是倒數第二個？因為如果它跟倒數第二個不一樣，那它跟倒數第一個一不一樣都沒關係，反正最多只會重複兩次。

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
