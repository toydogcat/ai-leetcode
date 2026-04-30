---
title: "LeetCode #228: Summary Ranges (匯總區間)"
categories:
  - Array
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個 **無重複元素** 的 **有序** 整數數組 `nums` 。
返回 **恰好覆蓋數組中所有數字** 的 **最小有序** 區間範圍列表。

## 解題心得：雙指針一次遍歷
因為數組已經是有序且無重複的，我們只需要找到連續數字的起點和終點即可。

**核心邏輯：**
1. 遍歷數組，用一個變量 `i` 表示當前區間的起點。
2. 使用另一個變量 `j` 向後掃描，直到發現不連續為止（即 `nums[j+1] != nums[j] + 1`）。
3. 如果 `i == j`，說明區間只有一個數字，輸出 `"nums[i]"`。
4. 否則輸出 `"nums[i]->nums[j]"`。
5. 更新 `i = j + 1`，繼續查找下一個區間。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$ (不計結果數組)。

## 程式碼實作

### Python
```python
class Solution:
    def summaryRanges(self, nums: List[int]) -> List[str]:
        res = []
        i = 0
        n = len(nums)
        
        while i < n:
            j = i
            while j + 1 < n and nums[j+1] == nums[j] + 1:
                j += 1
            
            if i == j:
                res.append(str(nums[i]))
            else:
                res.append(f"{nums[i]}->{nums[j]}")
                
            i = j + 1
            
        return res
```

### C++
```cpp
#include <vector>
#include <string>

class Solution {
public:
    std::vector<std::string> summaryRanges(std::vector<int>& nums) {
        std::vector<std::string> res;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            int start = i;
            while (i + 1 < n && nums[i+1] == nums[i] + 1) {
                i++;
            }
            if (start == i) {
                res.push_back(std::to_string(nums[start]));
            } else {
                res.push_back(std::to_string(nums[start]) + "->" + std::to_string(nums[i]));
            }
        }
        return res;
    }
};
```
