---
title: "LeetCode #75: Sort Colors"
categories:
  - Array
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個包含紅色、白色和藍色、共 `n` 個元素的數組 `nums` ， **原地** 對它們進行排序，使得相同顏色的元素相鄰，並按照紅色、白色、藍色順序排列。我們使用整數 `0`、 `1` 和 `2` 分別表示紅色、白色和藍色。

## 解題心得：荷蘭國旗問題 (Three-way Partition)
這題雖然可以用普通的排序演算法（$O(n \log n)$），但題目要求我們用 $O(n)$ 一次遍歷搞定。

**核心邏輯：分三堆**
1. **0 往左移，2 往右移**：我們準備三個指針。
   - `p0` 紀錄「下一個 0 應該放的位置」。
   - `p2` 紀錄「下一個 2 應該放的位置」。
   - `curr` 是我們目前正在看的指針。
2. **遇到 0**：把它丟到 `p0` 的位置，然後 `p0` 往右挪。
3. **遇到 2**：把它丟到 `p2` 的位置，然後 `p2` 往左挪。
4. **遇到 1**：什麼都不做，讓它留在中間就好。

這就像是在清理垃圾分類，看到瓶罐往左丟，看到紙張往右丟，剩下的留在原地，最後自然就分好了。

### Python
```python
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        p0, curr, p2 = 0, 0, len(nums) - 1
        while curr <= p2:
            if nums[curr] == 0:
                nums[p0], nums[curr] = nums[curr], nums[p0]
                p0 += 1; curr += 1
            elif nums[curr] == 2:
                nums[p2], nums[curr] = nums[curr], nums[p2]
                p2 -= 1
            else:
                curr += 1
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    void sortColors(std::vector<int>& nums) {
        int p0 = 0, curr = 0, p2 = nums.size() - 1;
        while (curr <= p2) {
            if (nums[curr] == 0) std::swap(nums[p0++], nums[curr++]);
            else if (nums[curr] == 2) std::swap(nums[p2--], nums[curr]);
            else curr++;
        }
    }
};
```
