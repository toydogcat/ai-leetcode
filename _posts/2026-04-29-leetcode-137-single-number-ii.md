---
title: "LeetCode #137: Single Number II"
categories:
  - Bit Manipulation
  - Array
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個整數數組 `nums` ，除某個元素僅出現 **一次** 外，其餘每個元素都恰出現 **三次** 。請你找出並返回那個只出現了一次的元素。
設計並實現線性時間複雜度的算法，且不使用額外空間。

## 解題心得：位數的統計
因為每個數字出現三次，如果我們把所有數字的第 `i` 位二進制數加起來，那麼：
- 如果總和能被 3 整除，說明唯一的那個數在這一層是 0。
- 如果總和除以 3 餘 1，說明唯一的那個數在這一層是 1。

我們可以遍歷 32 位，每一位都做這個統計，最後還原出那個數字。

### Python
```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        res = 0
        for i in range(32):
            count = 0
            for n in nums:
                # 統計第 i 位為 1 的個數
                if (n >> i) & 1:
                    count += 1
            if count % 3:
                # 處理 Python 的負數表示問題
                if i == 31:
                    res -= (1 << i)
                else:
                    res |= (1 << i)
        return res
```

### C++
```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for (int i = 0; i < 32; ++i) {
            int count = 0;
            for (int n : nums) {
                if ((n >> i) & 1) count++;
            }
            if (count % 3 != 0) {
                res |= (1 << i);
            }
        }
        return res;
    }
};
```
