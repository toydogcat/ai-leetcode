---
title: "LeetCode #283: Move Zeroes (移動零)"
categories:
  - Array
  - Two Pointers
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個數組 `nums`，編寫一個函數將所有 `0` 移動到數組的末尾，同時保持非零元素的相對順序。

**進階要求**：必須在原數組上操作，不能拷貝額外的數組。盡量減少操作次數。

**範例 1:**
```
輸入: nums = [0,1,0,3,12]
輸出: [1,3,12,0,0]
```

**範例 2:**
```
輸入: nums = [0]
輸出: [0]
```

## 解題心得：雙指針 (Two Pointers)
本題可以使用雙指針（Two Pointers）來實現原地（In-place）操作：

**核心邏輯**：
1. **維護非零指標**：我們維護一個讀寫指針 `lastNonZeroFoundAt`，這個指針表示下一個放置非零數字的位置。
2. **單次掃描**：
   - 遍歷整個數組，每當讀取到一個非零元素時，我們將其與 `lastNonZeroFoundAt` 所指的位置進行交換（或是直接覆蓋，最後補零）。
   - 將 `lastNonZeroFoundAt` 加 1 往後移。
3. **完成排列**：
   - 當整個數組遍歷完成後，所有的非零元素都已經移到了數組的前端。剩餘的所有位置我們直接填入 `0` 即可（如果使用覆蓋的方法）。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        lastNonZeroFoundAt = 0
        
        # 1. 覆蓋非零元素
        for i in range(len(nums)):
            if nums[i] != 0:
                nums[lastNonZeroFoundAt] = nums[i]
                lastNonZeroFoundAt += 1
                
        # 2. 剩餘補零
        for i in range(lastNonZeroFoundAt, len(nums)):
            nums[i] = 0
```

### C++
```cpp
#include <vector>

class Solution {
public:
    void moveZeroes(std::vector<int>& nums) {
        int lastNonZeroFoundAt = 0;

        // 1. 覆蓋非零元素
        for (size_t i = 0; i < nums.size(); ++i) {
            if (nums[i] != 0) {
                nums[lastNonZeroFoundAt++] = nums[i];
            }
        }

        // 2. 剩餘補零
        for (size_t i = lastNonZeroFoundAt; i < nums.size(); ++i) {
            nums[i] = 0;
        }
    }
};
```
