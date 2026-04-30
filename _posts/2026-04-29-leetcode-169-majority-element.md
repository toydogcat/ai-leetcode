---
title: "LeetCode #169: Majority Element (多數元素)"
categories:
  - Array
  - Hash Table
  - Divide and Conquer
  - Sorting
  - Counting
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個大小為 `n` 的陣列 `nums` ，返回其中的多數元素。多數元素是指在陣列中出現次數 **大於** `⌊ n/2 ⌋` 的元素。

你可以假設陣列是非空的，並且給定的陣列總是存在多數元素。

## 解題心得：Boyer-Moore 投票演算法
這題有很多種解法（雜湊表、排序法），但最經典且最高效的演算法是 **Boyer-Moore Voting Algorithm**。

**核心邏輯：同歸於盡**
想像陣列中有一群士兵在混戰：
1. 我們先隨便選一個候選人 `candidate`。
2. 有一個 `count` 記錄目前候選人的「兵力」。
3. 遍歷陣列中的每一個數 `x`：
   - 如果 `count == 0`：選當前的 `x` 作為新的候選人。
   - 如果 `x == candidate`：`count` 加 1（援軍到了）。
   - 如果 `x != candidate`：`count` 減 1（與敵人同歸於盡）。
4. 因為多數元素的數量超過了一半，即便它與所有其他元素一對一互換，最後剩下的那個人一定還是多數元素。

- **時間複雜度**: $O(n)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        count = 0
        candidate = None
        
        for n in nums:
            if count == 0:
                candidate = n
            
            count += (1 if n == candidate else -1)
            
        return candidate
```

### C++
```cpp
#include <vector>

class Solution {
public:
    int majorityElement(std::vector<int>& nums) {
        int count = 0;
        int candidate = 0;
        
        for (int n : nums) {
            if (count == 0) {
                candidate = n;
            }
            count += (n == candidate) ? 1 : -1;
        }
        
        return candidate;
    }
};
```
