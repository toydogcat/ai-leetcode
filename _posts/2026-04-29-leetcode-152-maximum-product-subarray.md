---
title: "LeetCode #152: Maximum Product Subarray (乘積最大子陣列)"
categories:
  - Array
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個整數陣列 `nums` ，請你找出陣列中乘積最大的非空連續子陣列（該子陣列中至少包含一個數字），並返回該子陣列所對應的乘積。

## 解題心得：負負得正的陷阱
這題是 [53. Maximum Subarray](file:///home/toymsi/documents/projects/Github/ai-leetcode/_posts/2026-04-28-leetcode-53-maximum-subarray.md) 的進階版。

**為什麼不能只用 Kadane's Algorithm？**
在加法中，正數加正數只會更大。但在乘法中，一個極小的負數乘以另一個負數，會瞬間變成一個極大的正數。

**解決方案**：
我們同時維護兩個變數：
1. `max_so_far`: 到目前為止的最大乘積。
2. `min_so_far`: 到目前為止的最小乘積（為了捕捉「負負得正」的機會）。

每遇到一個新數字 $x$：
- 新的 `max` 可能是 $x$ 自己、`max_so_far * x` 或 `min_so_far * x`。
- 新的 `min` 可能是 $x$ 自己、`max_so_far * x` 或 `min_so_far * x`。

- **時間複雜度**: $O(n)$，只需遍歷一次陣列。
- **空間複雜度**: $O(1)$，只需常數級別的空間。

## 程式碼實作

### Python
```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        if not nums: return 0
        
        res = nums[0]
        curMin, curMax = 1, 1
        
        for n in nums:
            # 暫存 curMax，因為下一行會更新它
            temp = curMax * n
            curMax = max(n * curMax, n * curMin, n)
            curMin = min(temp, n * curMin, n)
            res = max(res, curMax)
            
        return res
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int maxProduct(std::vector<int>& nums) {
        if (nums.empty()) return 0;
        
        long long max_so_far = nums[0];
        long long min_so_far = nums[0];
        int res = nums[0];
        
        for (int i = 1; i < nums.size(); ++i) {
            int n = nums[i];
            if (n < 0) std::swap(max_so_far, min_so_far);
            
            max_so_far = std::max((long long)n, max_so_far * n);
            min_so_far = std::min((long long)n, min_so_far * n);
            
            res = std::max(res, (int)max_so_far);
        }
        
        return res;
    }
};
```
> [!NOTE]
> 在 C++ 中使用 `long long` 是為了防止中間過程溢出，雖然 LeetCode 的測資通常不會讓最終結果溢出 `int`。
