---
title: "LeetCode #349: Intersection of Two Arrays (兩個陣列的交集)"
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
給定兩個陣列 `nums1` 和 `nums2`，返回它們的交集。結果中的每個元素必須是**唯一**的。你可以按任意順序返回答案。

## 解題心得
尋找交集且要去重，最簡單高效的做法是使用 **雜湊集合 (HashSet)**：
1. 將 `nums1` 中的數字全部放入雜湊集合 `set1`。
2. 遍歷 `nums2`，如果元素存在於 `set1` 中，將其放入交集結果集合 `ans`。
3. 將結果集合轉為陣列返回。

- **時間複雜度**: O(M + N)
- **空間複雜度**: O(M + N)

## 程式碼實作

### Python
```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        set1 = set(nums1)
        ans = set()
        for num in nums2:
            if num in set1:
                ans.add(num)
        return list(ans)
```

### C++
```cpp
#include <vector>
#include <unordered_set>

class Solution {
public:
    std::vector<int> intersection(std::vector<int>& nums1, std::vector<int>& nums2) {
        std::unordered_set<int> set1(nums1.begin(), nums1.end());
        std::unordered_set<int> ans;

        for (int num : nums2) {
            if (set1.count(num)) {
                ans.insert(num);
            }
        }
        return std::vector<int>(ans.begin(), ans.end());
    }
};
```
