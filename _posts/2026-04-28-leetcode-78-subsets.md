---
title: "LeetCode #78: Subsets"
categories:
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個整數數組 `nums` ，數組中的元素 **互不相同** 。返回該數組所有可能的子集（冪集）。解集不能包含重複的子集。你可以按 **任意順序** 返回解集。

## 解題心得：選或不選，這是個問題
子集問題是回溯法（Backtracking）最典型的應用之一。

**直覺思考：**
想像你有一個籃子和三顆不同的球 `[1, 2, 3]`。對於每一顆球，你都有兩個選擇：
1. **把它放進籃子**。
2. **不把它放進籃子**。

當你對所有球都做完決定時，籃子裡的狀態就是一個子集。

**代碼實現：**
我們從左到右遍歷數組，每遇到一個數字，就把它加進「當前路徑」，然後以此為基礎繼續往後找。找完了，再把它拿出來（回溯），試試不加它的情況。

### Python
```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = []
        def backtrack(start, path):
            res.append(list(path))
            for i in range(start, len(nums)):
                path.append(nums[i])
                backtrack(i + 1, path)
                path.pop()
        backtrack(0, [])
        return res
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<std::vector<int>> subsets(std::vector<int>& nums) {
        std::vector<std::vector<int>> res;
        std::vector<int> path;
        backtrack(res, path, 0, nums);
        return res;
    }
    void backtrack(std::vector<std::vector<int>>& res, std::vector<int>& path, int start, std::vector<int>& nums) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            backtrack(res, path, i + 1, nums);
            path.pop_back();
        }
    }
};
```
