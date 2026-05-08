---
title: "LeetCode #396: Rotate Function (旋轉函數)"
categories:
  - Math
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定長度為 n 的整數陣列 nums。計算 $F(k) = 0 \times A_k[0] + 1 \times A_k[1] + \dots$ 的最大值。

## 解題心得
尋找數學遞迴規律：
- 設陣列元素和為 `S = sum(nums)`。
- 可以推導出：$F(k) = F(k-1) + S - n \times nums[n-k]$。
- 計算初始 $F(0)$ 之後，利用該轉移方程在 $O(1)$ 時間內求出後續所有的 $F(k)$，取其最大值，總時間複雜度優化為 $O(N)$。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def maxRotateFunction(self, nums: List[int]) -> int:
        n = len(nums)
        f = sum(i * num for i, num in enumerate(nums))
        total_sum = sum(nums)
        max_val = f
        
        for k in range(1, n):
            f = f + total_sum - n * nums[n - k]
            max_val = max(max_val, f)
            
        return max_val
```

### C++
```cpp
#include <vector>
#include <numeric>
#include <algorithm>

class Solution {
public:
    int maxRotateFunction(std::vector<int>& nums) {
        int n = nums.size();
        long long f = 0;
        long long total_sum = 0;
        for (int i = 0; i < n; ++i) {
            f += (long long)i * nums[i];
            total_sum += nums[i];
        }

        long long max_val = f;
        for (int k = 1; k < n; ++k) {
            f = f + total_sum - (long long)n * nums[n - k];
            max_val = std::max(max_val, f);
        }
        return max_val;
    }
};
```
