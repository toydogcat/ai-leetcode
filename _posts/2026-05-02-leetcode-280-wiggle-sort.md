---
title: "LeetCode #280: Wiggle Sort (擺動排序)"
categories:
  - Array
  - Greedy
  - Sorting
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個未排序的整數數組 `nums`，請在 **原地（In-place）** 對其進行重新排列，使得：
`nums[0] <= nums[1] >= nums[2] <= nums[3]...`

**範例 1:**
```
輸入: nums = [3,5,2,1,6,4]
輸出: [3,5,1,6,2,4]
解釋: [1,6,2,5,3,4] 也是一個正確答案。
```

## 解題心得：單次掃描與貪心交換
這是一題有趣的排序問題。如果我們先將整個數組從小到大排序，再將後半段的元素穿插到前半段，雖然可以滿足擺動排序的定義，但時間複雜度會是 $O(N \log N)$。

**優化後的想法（單次掃描 $O(N)$）**：
我們可以利用貪心策略，只看相鄰的兩個元素。
遍歷數組，對於索引 $i$（從 $i = 1$ 開始到 $n - 1$）：

1. 當 **`i` 是奇數** 時：我們期望 `nums[i - 1] <= nums[i]`。如果此時不滿足（即 `nums[i - 1] > nums[i]`），我們就交換這兩個元素。
2. 當 **`i` 是偶數** 時：我們期望 `nums[i - 1] >= nums[i]`。如果此時不滿足（即 `nums[i - 1] < nums[i]`），我們就交換這兩個元素。

**為什麼這樣做不會破壞前面的結果？**
假設當前 $i$ 是奇數，我們需要 `nums[i - 1] <= nums[i]`。
如果我們交換了 `nums[i - 1]` 和 `nums[i]`，因為交換前 `nums[i - 1] > nums[i]`，且我們知道 $i - 1$ 處於高點（偶數位置的前一個），即 `nums[i - 2] >= nums[i - 1]`，交換後新的 `nums[i - 1]` 比舊的更小，依然能維持 `nums[i - 2] >= nums[i - 1]`。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$，原地（In-place）修改。

## 程式碼實作

### Python
```python
class Solution:
    def wiggleSort(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        for i in range(1, len(nums)):
            # 奇數位置：期望 nums[i-1] <= nums[i]
            # 偶數位置：期望 nums[i-1] >= nums[i]
            if (i % 2 == 1 and nums[i - 1] > nums[i]) or (i % 2 == 0 and nums[i - 1] < nums[i]):
                nums[i - 1], nums[i] = nums[i], nums[i - 1]
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    void wiggleSort(std::vector<int>& nums) {
        for (size_t i = 1; i < nums.size(); ++i) {
            if ((i % 2 == 1 && nums[i - 1] > nums[i]) || (i % 2 == 0 && nums[i - 1] < nums[i])) {
                std::swap(nums[i - 1], nums[i]);
            }
        }
    }
};
```
