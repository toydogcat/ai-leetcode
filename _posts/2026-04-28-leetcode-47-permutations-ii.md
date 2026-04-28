---
title: "LeetCode #47: Permutations II"
categories:
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個可包含重複數字的序列 `nums` ，按任意順序返回所有不重複的全排列。

## 解題心得：別讓雙胞胎重複排隊
這題是 46 題的進階版，關鍵在於處理「重複元素」。

**核心邏輯：排序 + 跳過**
1. **排序**：第一步先對 `nums` 進行排序。這樣所有相同的數字就會排在一起，像是一對對雙胞胎。
2. **規則**：在回溯過程中，如果發現當前的數字跟前一個數字一樣，且前一個數字還沒被用到，那我們就 **不能** 用當前這個數字。
3. **為什麼？** 因為如果你跳過哥哥直接選弟弟，排出來的序列會跟先選哥哥再選弟弟一模一樣。為了不重複，我們規定「相同的數字，必須按順序一個一個放」。

這就像是在排隊，如果有一對雙胞胎，我們規定只有哥哥排好了，弟弟才能排，這樣就不會出現兩套一模一樣的排隊組合。

### Python
```python
class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        def backtrack(path, used):
            if len(path) == len(nums):
                res.append(list(path))
                return
            for i in range(len(nums)):
                if used[i] or (i > 0 and nums[i] == nums[i-1] and not used[i-1]):
                    continue
                used[i] = True
                path.append(nums[i])
                backtrack(path, used)
                path.pop()
                used[i] = False
        backtrack([], [False] * len(nums))
        return res
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> permuteUnique(std::vector<int>& nums) {
        std::vector<std::vector<int>> res;
        std::sort(nums.begin(), nums.end());
        do {
            res.push_back(nums);
        } while (std::next_permutation(nums.begin(), nums.end()));
        return res;
    }
};
```
