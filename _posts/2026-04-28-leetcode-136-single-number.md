---
title: "LeetCode #136: Single Number"
categories:
  - Bit Manipulation
  - Array
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個 **非空** 整數數組，除了某個元素只出現一次以外，其餘每個元素均出現兩次。找出那個只出現了一次的元素。
設計並實現線性時間複雜度的算法，且不使用額外空間。

## 解題心得：異或的奇蹟
這題是位運算最經典的應用。
利用 **異或 (XOR)** 的性質：
1. `a ^ a = 0` (相同的數字異或為 0)
2. `a ^ 0 = a` (任何數字與 0 異或還是它自己)
3. 異或滿足交換律和結合律。

我們把數組中所有的數字全部異或在一起，成對出現的數字都會變成 0，最後剩下的就是那個唯一的數字！

### Python
```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        res = 0
        for n in nums:
            res ^= n
        return res
```

### C++
```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for (int n : nums) res ^= n;
        return res;
    }
};
```
