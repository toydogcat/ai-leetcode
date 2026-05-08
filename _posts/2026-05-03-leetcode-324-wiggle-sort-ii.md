---
title: "LeetCode #324: Wiggle Sort II (擺動排序 II)"
categories:
  - Array
  - Divide and Conquer
  - Sorting
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個整數陣列 `nums`，將其重新排列成 `nums[0] < nums[1] > nums[2] < nums[3]...` 的擺動形式。
你可以假設總是存在一個合法的排列。

## 解題心得
為了確保嚴格的交替大小關係，特別是當有重複數字時，最安全的方法是 **排序 + 穿插擺放**：
1. 將陣列先進行排序。
2. 將排序後的陣列切分為兩半，分別為「較小的一半」與「較大的一半」。
3. 為了防止在分界處因為相同數值相鄰而違反嚴格大於小於的規定，我們需要 **從後向前**（從大到小）穿插擺放：
   - 奇數位置（擺動高點）放置較大一半的逆序。
   - 偶數位置（擺動低點）放置較小一半的逆序。

- **時間複雜度**: O(N log N) 排序，若使用快速選擇 Quickselect 可最佳化至 O(N)
- **空間複雜度**: O(N) 複製副本

## 程式碼實作

### Python
```python
class Solution:
    def wiggleSort(self, nums: List[int]) -> None:
        temp = sorted(nums)
        n = len(nums)
        # 較小部分與較大部分的末端指針
        mid = (n - 1) // 2
        right = n - 1
        
        # 穿插擺放
        for i in range(n):
            if i % 2 == 0:
                nums[i] = temp[mid]
                mid -= 1
            else:
                nums[i] = temp[right]
                right -= 1
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    void wiggleSort(std::vector<int>& nums) {
        std::vector<int> temp = nums;
        std::sort(temp.begin(), temp.end());
        int n = nums.size();
        
        int mid = (n - 1) / 2;
        int right = n - 1;

        for (int i = 0; i < n; ++i) {
            if (i % 2 == 0) {
                nums[i] = temp[mid--];
            } else {
                nums[i] = temp[right--];
            }
        }
    }
};
```
