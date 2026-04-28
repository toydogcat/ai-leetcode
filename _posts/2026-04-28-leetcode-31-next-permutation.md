---
title: "LeetCode #31: Next Permutation"
categories:
  - Array
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
實現「下一個排列」，將給定的數字序列重新排列成字典序中下一個更大的排列。如果不存在下一個更大的排列，則將數字重新排列成最小的排列（即升序排列）。必須 **原地** 修改，只允許使用額外常數空間。

## 解題心得：尋找「變大的最小代價」
這題的核心在於：我們要找一個比現在「大一點點」的數字。

**核心邏輯：**
1. **找「下坡點」**：從右往左看，找到第一個 **變小** 的數字 `i`。這表示從這裡開始，後面的數字是降序的，沒辦法再變大了。
2. **找「剛好大一點的人」**：在 `i` 的右邊，找到第一個比 `nums[i]` **大** 的數字 `j`。
3. **換位子**：交換 `i` 和 `j`。
4. **整理殘局**：雖然換了位子變大了，但後面那段還是降序（也就是在那一區塊是最大的）。為了讓整個數變化的「幅度最小」，我們要把它反轉成升序。

這就像是在排隊領號碼牌。你要找下一個號碼，你會先看個位數、十位數... 找到第一個可以變大的位子，把它變大一點點，然後讓後面的位子儘可能最小。

### Python
```python
class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        i = len(nums) - 2
        while i >= 0 and nums[i] >= nums[i+1]:
            i -= 1
        if i >= 0:
            j = len(nums) - 1
            while j >= 0 and nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        
        nums[i+1:] = reversed(nums[i+1:])
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    void nextPermutation(std::vector<int>& nums) {
        std::next_permutation(nums.begin(), nums.end());
    }
};
```
