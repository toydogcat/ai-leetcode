---
title: "LeetCode #90: Subsets II"
categories:
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個整數數組 `nums`，其中可能包含 **重複的元素**，請你返回該數組所有可能的子集。解集 **不能** 包含重複的子集。

## 解題心得：別讓重複的數字搗亂
這題是「子集」問題的進階版。
如果數組是 `[1, 2, 2]`，正常的子集算法會算出兩個 `[1, 2]`，但題目說不准重複。

**核心邏輯：**
1. **先排序**：這步最關鍵！把相同的數字排在一起（例如 `[2, 2]`），我們才能一眼認出它們。
2. **「這顆球我拿過了嗎？」**：在每一層挑數字時，如果當前數字跟前一個一樣，且前一個數字剛才並沒被放進我們的籃子裡，那就說明「以這個數字開頭的情況我們已經考慮過了」，直接跳過它。
3. **白話理解**：如果有兩個一模一樣的紅球，我們在同一個位置放哪顆紅球，結果都是一樣的，所以我們只放第一顆，第二顆就別放了。

### Python
```python
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        def backtrack(start, path):
            res.append(list(path))
            for i in range(start, len(nums)):
                if i > start and nums[i] == nums[i-1]: continue
                path.append(nums[i])
                backtrack(i + 1, path)
                path.pop()
        backtrack(0, [])
        return res
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> subsetsWithDup(std::vector<int>& nums) {
        std::sort(nums.begin(), nums.end());
        std::vector<std::vector<int>> res;
        std::vector<int> path;
        backtrack(res, path, 0, nums);
        return res;
    }
    void backtrack(std::vector<std::vector<int>>& res, std::vector<int>& path, int start, std::vector<int>& nums) {
        res.push_back(path);
        for (int i = start; i < nums.size(); i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            path.push_back(nums[i]);
            backtrack(res, path, i + 1, nums);
            path.pop_back();
        }
    }
};
```
