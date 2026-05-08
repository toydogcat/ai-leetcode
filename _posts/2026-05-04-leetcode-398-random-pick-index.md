---
title: "LeetCode #398: Random Pick Index (隨機數索引)"
categories:
  - Reservoir Sampling
  - Hash Table
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個包含重複數字的整數陣列，隨機挑選給定目標數字的索引。

## 解題心得
使用 **蓄水池抽樣 (Reservoir Sampling)**：
- 遍歷陣列，當遇到與目標值相等的數字時，記錄這是第 `count` 次遇到。
- 以 $1/\text{count}$ 的機率將當前索引更新為候選答案。保證每個索引被選中的概率相同，且不佔用額外空間。

- **時間複雜度**: 每次 pick 耗時 O(N)，初始化 O(1)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
import random

class Solution:
    def __init__(self, nums: List[int]):
        self.nums = nums

    def pick(self, target: int) -> int:
        ans = -1
        count = 0
        for i, num in enumerate(self.nums):
            if num == target:
                count += 1
                if random.randint(0, count - 1) == 0:
                    ans = i
        return ans
```

### C++
```cpp
#include <vector>
#include <cstdlib>

class Solution {
private:
    std::vector<int> nums;

public:
    Solution(std::vector<int>& nums) : nums(nums) {}
    
    int pick(int target) {
        int ans = -1;
        int count = 0;
        for (int i = 0; i < nums.size(); ++i) {
            if (nums[i] == target) {
                count++;
                if (std::rand() % count == 0) {
                    ans = i;
                }
            }
        }
        return ans;
    }
};
```
