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

## 題目描述
給你一個 **升序排列** 的數組 `nums` ，請你 **原地** 刪除重複出現的元素，使每個元素 **只出現一次** ，返回刪除後數組的新長度。元素的 **相對順序** 應該保持一致。

## 解題心得：快慢指針的華爾滋
這題是「原地修改」數組的經典題。

**核心邏輯：雙指針 (Two Pointers)**
1. **慢指針 `i`**：指向「下一個不重複數字應該放的位置」。
2. **快指針 `j`**：負責往後探路，尋找不一樣的數字。
3. **發現新大陸**：如果 `nums[j]` 跟 `nums[i]` 不一樣，說明找到了一個新數字。我們就把 `i` 往前挪一格，並把 `nums[j]` 填進去。

這就像是在排隊，原本隊伍裡有很多重複的人。你派一個「探子」（快指針）往後找，只要找到一個長得不一樣的人，就叫他到「隊伍末端」（慢指針處）報到，然後隊伍長度加一。

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
