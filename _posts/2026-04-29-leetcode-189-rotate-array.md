---
title: "LeetCode #189: Rotate Array (輪轉陣列)"
categories:
  - Array
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個整數陣列 `nums`，將陣列中的元素向右輪轉 `k` 個位置，其中 `k` 是非負數。

進階：你可以使用空間複雜度為 $O(1)$ 的原地解法嗎？

## 解題心得：三步翻轉法
雖然可以用額外空間來做，但原地 (In-place) 解法最能展示對空間的掌控。

**核心邏輯：三步翻轉 (Reverse Trick)**
假設陣列長度為 $n$，我們需要將其向右移動 $k$ 位（注意 $k = k \pmod n$）：
1. **翻轉整個陣列**：`reverse(nums, 0, n - 1)`
2. **翻轉前 k 個元素**：`reverse(nums, 0, k - 1)`
3. **翻轉剩餘的元素**：`reverse(nums, k, n - 1)`

例如 `[1,2,3,4,5,6,7]`, `k=3`：
1. 翻轉全部: `[7,6,5,4,3,2,1]`
2. 翻轉前 3: `[5,6,7,4,3,2,1]`
3. 翻轉後 4: `[5,6,7,1,2,3,4]` -> 完成！

- **時間複雜度**: $O(n)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        k %= n
        
        def reverse(l, r):
            while l < r:
                nums[l], nums[r] = nums[r], nums[l]
                l += 1
                r -= 1
                
        reverse(0, n - 1)
        reverse(0, k - 1)
        reverse(k, n - 1)
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    void rotate(std::vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        
        std::reverse(nums.begin(), nums.end());
        std::reverse(nums.begin(), nums.begin() + k);
        std::reverse(nums.begin() + k, nums.end());
    }
};
```
