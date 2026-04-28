---
title: "LeetCode #1: Two Sum (兩數之和)"
categories:
  - Array
  - Hash Table
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個整數數組 `nums` 和一個目標值 `target`，請你在該數組中找出和為目標值的那 **兩個** 整數，並返回他們的數組下標。

你可以假設每種輸入只會對應一個答案。但是，你不能重複利用這個數組中同樣的元素。

## 解題思路
使用哈希表（Hash Table）來存儲已經遍歷過的數字及其索引。當遍歷到數字 `x` 時，檢查 `target - x` 是否已經在哈希表中。如果是，則找到了答案。

- **時間複雜度**: $O(n)$，其中 $n$ 是數組的長度。
- **空間複雜度**: $O(n)$，最壞情況下需存儲所有元素。

## 數學描述
設輸入數組為 $A$，目標值為 $T$。我們尋找下標 $i, j$ 使得：
$$A[i] + A[j] = T, \quad i \neq j$$
我們利用哈希表存儲已訪問的元素，對於當前元素 $A[i]$，檢查是否存在 $x \in \text{Hashmap}$ 滿足 $x = T - A[i]$。

## 程式碼實作

### Python
```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        hashmap = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in hashmap:
                return [hashmap[complement], i]
            hashmap[num] = i
        return []
```

### C++
```cpp
#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int, int> hashmap;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (hashmap.find(complement) != hashmap.end()) {
                return {hashmap[complement], i};
            }
            hashmap[nums[i]] = i;
        }
        return {};
    }
};
```
