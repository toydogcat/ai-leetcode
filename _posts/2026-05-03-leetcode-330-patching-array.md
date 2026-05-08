---
title: "LeetCode #330: Patching Array (按要求補齊陣列)"
categories:
  - Array
  - Greedy
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個已排序的整數陣列 `nums` 和一個整數 `n`。向陣列中添加最少數量的元素（補丁），使得 `[1, n]` 區間內的所有整數都可以由陣列中某些元素的和來表示。返回所需的最少補丁數。

## 解題心得
我們可以使用 **貪心算法 (Greedy)**：
- 設 `miss` 表示當前我們無法表示的最小正整數。初始時 `miss = 1`，這意味著我們當前可以覆蓋的區間為 `[1, miss - 1]`。
- 遍歷 `nums`：
  1. 如果 `nums[i] <= miss`，我們可以將覆蓋區間擴展為 `[1, miss + nums[i] - 1]`，此時新的 `miss = miss + nums[i]`，並將指針 `i` 後移。
  2. 如果 `nums[i] > miss` 或者已經遍歷完陣列，代表出現了缺口。為了在最少的元素下填補這個缺口，我們貪心地直接加入 `miss` 本身。這時，覆蓋範圍擴展為 `[1, 2 * miss - 1]`，此時新的 `miss = 2 * miss`，且所需補丁數 + 1。
- 循環直到 `miss > n`。

- **時間複雜度**: O(M + log N)，其中 $M$ 是 `nums` 的長度，$\log N$ 是當我們進行補丁翻倍時的次數
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def minPatches(self, nums: List[int], n: int) -> int:
        miss = 1
        patches = 0
        i = 0
        
        while miss <= n:
            if i < len(nums) and nums[i] <= miss:
                miss += nums[i]
                i += 1
            else:
                miss += miss
                patches += 1
                
        return patches
```

### C++
```cpp
#include <vector>

class Solution {
public:
    int minPatches(std::vector<int>& nums, int n) {
        long long miss = 1;
        int patches = 0;
        int i = 0;

        while (miss <= n) {
            if (i < nums.size() && nums[i] <= miss) {
                miss += nums[i];
                i++;
            } else {
                miss += miss;
                patches++;
            }
        }
        return patches;
    }
};
```
