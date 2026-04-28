---
title: "LeetCode #88: Merge Sorted Array"
categories:
  - Array
  - Two Pointers
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你兩個按 **非遞減順序** 排列的整數數組 `nums1` 和 `nums2`，另有兩個整數 `m` 和 `n` 分別代表數組中的元素數目。請你將 `nums2` 合併到 `nums1` 中，使合併後的數組同樣按 **非遞減順序** 排列。

## 解題心得：從後往前，避免追撞
通常我們合併數組會從頭開始比，誰小就放誰。但這題有個麻煩：`nums1` 的後面原本就是空的（用 0 填充），如果你從頭開始放，可能會覆蓋掉 `nums1` 還沒被比過的數字。

**核心邏輯：**
1. **逆向思維**：與其從小的開始放，不如 **從大的開始放**！
2. 我們比較 `nums1[m-1]` 和 `nums2[n-1]`，誰大誰就放到 `nums1` 的最末端。
3. 這樣我們就利用了 `nums1` 後端的空位，完全不需要額外的空間，也不會覆蓋到任何有用的數據。

### Python
```python
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        p1, p2, p = m - 1, n - 1, m + n - 1
        while p2 >= 0:
            if p1 >= 0 and nums1[p1] > nums2[p2]:
                nums1[p] = nums1[p1]
                p1 -= 1
            else:
                nums1[p] = nums2[p2]
                p2 -= 1
            p -= 1
```

### C++
```cpp
#include <vector>

class Solution {
public:
    void merge(std::vector<int>& nums1, int m, std::vector<int>& nums2, int n) {
        int p1 = m - 1, p2 = n - 1, p = m + n - 1;
        while (p2 >= 0) {
            if (p1 >= 0 && nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];
            else nums1[p--] = nums2[p2--];
        }
    }
};
```
