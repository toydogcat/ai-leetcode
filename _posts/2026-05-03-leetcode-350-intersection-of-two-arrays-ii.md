---
title: "LeetCode #350: Intersection of Two Arrays II (兩個陣列的交集 II)"
categories:
  - Array
  - Hash Table
  - Two Pointers
  - Binary Search
  - Sorting
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定兩個陣列 `nums1` 和 `nums2`，返回它們的交集。
與 I 相比，本題要求返回結果中每個元素出現的次數，應與元素在兩個陣列中都出現的次數一致。你可以按任意順序返回答案。

## 解題心得
為了完整保留每個元素出現的頻率，我們可以使用 **雜湊計數表 (HashMap / Counter)**：
1. 用雜湊表計數 `nums1` 中各數字出現的頻率。
2. 遍歷 `nums2`，如果當前數字在雜湊表中的計數大於 0：
   - 將其加入結果陣列。
   - 雜湊表中的計數減 1。

- **時間複雜度**: O(M + N)
- **空間複雜度**: O(min(M, N))

## 程式碼實作

### Python
```python
class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        counts = {}
        for num in nums1:
            counts[num] = counts.get(num, 0) + 1
            
        ans = []
        for num in nums2:
            if counts.get(num, 0) > 0:
                ans.append(num)
                counts[num] -= 1
                
        return ans
```

### C++
```cpp
#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> intersect(std::vector<int>& nums1, std::vector<int>& nums2) {
        std::unordered_map<int, int> counts;
        for (int num : nums1) counts[num]++;

        std::vector<int> ans;
        for (int num : nums2) {
            if (counts[num] > 0) {
                ans.push_back(num);
                counts[num]--;
            }
        }
        return ans;
    }
};
```
