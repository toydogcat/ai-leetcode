---
title: "LeetCode #384: Shuffle an Array (打亂陣列)"
categories:
  - Design
  - Math
  - Randomized
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
打亂一個沒有重複元素的整數陣列。

## 解題心得
使用 **Fisher-Yates 洗牌演算法 (Fisher-Yates Shuffle)**：
- 原始狀態快取保存在 `original` 中。
- 進行洗牌時，遍歷陣列：對於下標 `i`，隨機選擇一個範圍 `[0, i]` 的下標 `j`，將 `arr[i]` 與 `arr[j]` 進行交換。
- 此演算法已被證明能產生完全均勻且隨機的排列，時間複雜度為 $O(N)$，空間複雜度為 $O(1)$ 原地修改。

- **時間複雜度**: O(N)
- **空間複雜度**: O(N) 保存初始狀態

## 程式碼實作

### Python
```python
import random

class Solution:
    def __init__(self, nums: List[int]):
        self.original = list(nums)
        self.nums = nums

    def reset(self) -> List[int]:
        self.nums = list(self.original)
        return self.nums

    def shuffle(self) -> List[int]:
        n = len(self.nums)
        for i in range(n):
            j = random.randint(0, i)
            self.nums[i], self.nums[j] = self.nums[j], self.nums[i]
        return self.nums
```

### C++
```cpp
#include <vector>
#include <cstdlib>
#include <algorithm>

class Solution {
private:
    std::vector<int> original;
    std::vector<int> nums;

public:
    Solution(std::vector<int>& nums) : original(nums), nums(nums) {}
    
    std::vector<int> reset() {
        nums = original;
        return nums;
    }
    
    std::vector<int> shuffle() {
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            int j = std::rand() % (i + 1);
            std::swap(nums[i], nums[j]);
        }
        return nums;
    }
};
```
