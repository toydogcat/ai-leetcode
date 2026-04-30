---
title: "LeetCode #163: Missing Ranges (缺失的區間)"
categories:
  - Array
tags:
  - Easy
  - Python
  - C++
  - Premium
---

## 題目描述
這是一道 **LeetCode Premium** 題目。

給定一個排序的整數陣列 `nums` ，其中元素的範圍在 `[lower, upper]` 之間（包含端點），返回不包含在陣列中的缺失區間。

## 解題心得：邊界的藝術
這題雖然是 Easy，但要寫得優雅需要注意邊界處理。

**核心邏輯**：
1. 我們需要檢查 `lower` 與第一個元素之間、連續兩個元素之間、以及最後一個元素與 `upper` 之間的差距。
2. 為了統化邏輯，我們可以想像在 `nums` 的前後各補上一個虛擬的邊界值。
3. 缺失區間的判斷：
   - 如果 $nums[i] - nums[i-1] > 1$，則存在缺失。
   - 缺失範圍為 `[nums[i-1] + 1, nums[i] - 1]`。

- **時間複雜度**: $O(n)$。
- **空間複雜度**: $O(1)$ (不計結果陣列)。

## 程式碼實作

### Python
```python
class Solution:
    def findMissingRanges(self, nums: List[int], lower: int, upper: int) -> List[List[int]]:
        res = []
        # 將邊界值與 nums 結合
        prev = lower - 1
        
        # 遍歷 nums，最後再處理一次 upper
        for i in range(len(nums) + 1):
            curr = nums[i] if i < len(nums) else upper + 1
            
            if prev + 1 <= curr - 1:
                res.append([prev + 1, curr - 1])
                
            prev = curr
            
        return res
```

### C++
```cpp
#include <vector>
#include <string>

class Solution {
public:
    std::vector<std::vector<int>> findMissingRanges(std::vector<int>& nums, int lower, int upper) {
        std::vector<std::vector<int>> res;
        long long prev = (long long)lower - 1;
        
        for (int i = 0; i <= nums.size(); i++) {
            long long curr = (i < nums.size()) ? nums[i] : (long long)upper + 1;
            
            if (prev + 1 <= curr - 1) {
                res.push_back({(int)(prev + 1), (int)(curr - 1)});
            }
            prev = curr;
        }
        return res;
    }
};
```
> [!NOTE]
> 在 C++ 中使用 `long long` 是為了防止 `lower - 1` 或 `upper + 1` 在整數極值附近溢出。
