---
title: "LeetCode #45: Jump Game II"
categories:
  - Array
  - Greedy
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個非負整數數組 `nums` ，你最初位於數組的第一個位置。數組中的每個元素代表你在該位置可以跳躍的最大長度。你的目標是使用 **最少的跳躍次數** 到達數組的最後一個位置。

## 解題心得：目光放長遠
55 題問的是「能不能跳到」，這題問的是「最少跳幾次」。這是一道更進階的貪心算法題。

**核心邏輯：**
1. **設定邊界 `end`**：這是我「目前這一跳」能達到的最遠範圍。
2. **尋找下一跳的最遠點 `max_reach`**：當我在目前的範圍內移動時，我會不斷觀察哪一個點可以讓我「下一跳」跳得最遠。
3. **被迫跳躍**：當我的腳步走到當前範圍的邊界 `end` 時，說明我「不得不跳了」。這時我跳到那個觀察好的 `max_reach`，並把 `max_reach` 設為新的邊界。

這就像是在過河，河面上有浮冰。你踩在一塊浮冰上時（`end` 範圍內），你會眼觀四面，看哪一塊浮冰能帶你走得更遠。等你走到現在這塊冰的邊緣時，你才跳到那一塊更有潛力的冰上，跳躍次數 `+1`。

### Python
```python
class Solution:
    def jump(self, nums: List[int]) -> int:
        n = len(nums)
        max_pos = end = step = 0
        for i in range(n - 1):
            max_pos = max(max_pos, i + nums[i])
            if i == end:
                end = max_pos
                step += 1
        return step
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int jump(std::vector<int>& nums) {
        int n = nums.size();
        int maxPos = 0, end = 0, step = 0;
        for (int i = 0; i < n - 1; i++) {
            maxPos = std::max(maxPos, i + nums[i]);
            if (i == end) {
                end = maxPos;
                step++;
            }
        }
        return step;
    }
};
```
