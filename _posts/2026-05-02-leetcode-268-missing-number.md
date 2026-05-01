---
title: "LeetCode #268: Missing Number (缺失數字)"
categories:
  - Math
  - Array
  - Bit Manipulation
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個包含 `n` 個不重複數字的數組 `nums`，數字範圍在 `[0, n]`。請找出數組中缺失的那一個數字。

**範例 1:**
```
輸入: nums = [3,0,1]
輸出: 2
解釋: n = 3，因為有 3 個數字，所以範圍是 [0,3]。數字 2 在這個範圍內沒有出現。
```

**範例 2:**
```
輸入: nums = [0,1]
輸出: 2
解釋: n = 2，因為有 2 個數字，所以範圍是 [0,2]。數字 2 在這個範圍內沒有出現。
```

**進階要求**：時間複雜度 $O(N)$，空間複雜度 $O(1)$。

## 解題心得：數學求和法與異或法
這題有多種 $O(N)$ 時間與 $O(1)$ 空間的解法。

### 方法一：高斯求和公式
範圍在 `[0, n]` 的完整數組總和為：
$$\text{Sum} = \frac{n \times (n + 1)}{2}$$
我們將預期總和減去 `nums` 的實際總和，得到的差值就是缺失的數字。

### 方法二：位元運算異或法 (XOR)
利用異或運算的性質：任何數與自己異或等於 0（`a ^ a = 0`），與 0 異或等於自己（`a ^ 0 = a`）。
我們將 `0` 到 `n` 的所有數字以及 `nums` 中的所有數字全部異或在一起，最後留下來的數字就是缺失的數字。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        # 高斯求和公式算出預期總和
        expected_sum = n * (n + 1) // 2
        actual_sum = sum(nums)
        
        return expected_sum - actual_sum
```

### C++
```cpp
#include <vector>
#include <numeric>

class Solution {
public:
    int missingNumber(std::vector<int>& nums) {
        int n = nums.size();
        int expectedSum = n * (n + 1) / 2;
        int actualSum = std::accumulate(nums.begin(), nums.end(), 0);

        return expectedSum - actualSum;
    }
};
```
