---
title: "LeetCode #334: Increasing Triplet Subsequence (遞增的三元子序列)"
categories:
  - Array
  - Greedy
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個整數陣列 `nums`，判斷其中是否存在一個長度為 3 的遞增子序列 `nums[i] < nums[j] < nums[k]` 滿足 `i < j < k`。時間複雜度 $O(N)$，空間複雜度 $O(1)$。

## 解題心得
這是一道可以用 **貪心演算法 (Greedy)** 優雅解決的經典題目：
- 我們維護兩個變數 `first` 和 `second`，分別表示當前已找到的「遞增序列中第一個（最小）和第二個（次小）元素」的最小值。初始化為無限大。
- 遍歷陣列中的每個數字 `num`：
  - 如果 `num <= first`，我們將其更新為更小的 `first`（貪心地讓第一個數儘可能小，增加後面出現更大數的機率）。
  - 如果 `first < num <= second`，我們更新 `second`（同樣貪心）。
  - 如果 `num > second`，表示我們找到了一個大於前兩個數的第三個數字，立即返回 `true`。
- 如果遍歷完成仍未找到，返回 `false`。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def increasingTriplet(self, nums: List[int]) -> bool:
        first = second = float('inf')
        for num in nums:
            if num <= first:
                first = num
            elif num <= second:
                second = num
            else:
                return True
        return False
```

### C++
```cpp
#include <vector>
#include <climits>

class Solution {
public:
    bool increasingTriplet(std::vector<int>& nums) {
        int first = INT_MAX;
        int second = INT_MAX;

        for (int num : nums) {
            if (num <= first) {
                first = num;
            } else if (num <= second) {
                second = num;
            } else {
                return true;
            }
        }
        return false;
    }
};
```
