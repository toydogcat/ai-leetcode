---
title: "LeetCode #260: Single Number III (只出現一次的數字 III)"
categories:
  - Array
  - Bit Manipulation
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個整數數組 `nums`，其中恰好有兩個元素只出現一次，其餘所有元素均出現兩次。找出只出現一次的那兩個元素。你可以按 **任意順序** 返回答案。
進階要求：時間複雜度 $O(N)$，空間複雜度 $O(1)$。

## 解題心得：位運算 (Bit Manipulation)
這題是 [Single Number I](./2026-04-29-leetcode-136-single-number.md) 的強化版。

**核心邏輯：**
1. **整體異或**：對數組中所有數字進行異或（XOR），得到的結果 `sum = x ^ y`（其中 `x, y` 是那兩個只出現一次的數）。
2. **尋找差異位**：由於 `x != y`，則 `sum` 的二進制位中至少有一位是 `1`。我們找到最右邊的 `1`（可以使用 `diff = sum & -sum`）。
3. **分組異或**：根據這一點是否為 `1`，將原數組所有數字分成兩組。
   - 組 1：該位為 `1`。
   - 組 2：該位為 `0`。
4. **結果提取**：這兩個組分別進行異或，最終得到的結果就是 `x` 和 `y`。因為相同的數會被分到同一組並抵消。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        # 1. 算出 x ^ y
        xor_sum = 0
        for n in nums:
            xor_sum ^= n
            
        # 2. 找到最右邊的 1 (差異位)
        diff = xor_sum & -xor_sum
        
        # 3. 分組異或
        res = [0, 0]
        for n in nums:
            if n & diff:
                res[0] ^= n
            else:
                res[1] ^= n
                
        return res
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<int> singleNumber(std::vector<int>& nums) {
        long long xorSum = 0;
        for (int n : nums) xorSum ^= n;
        
        // 找到差異位
        long long diff = xorSum & -xorSum;
        
        int x = 0, y = 0;
        for (int n : nums) {
            if (n & diff) x ^= n;
            else y ^= n;
        }
        
        return {x, y};
    }
};
```
