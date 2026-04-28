---
title: "LeetCode #39: Combination Sum"
categories:
  - Array
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個 **無重複元素** 的整數數組 `candidates` 和一個目標整數 `target` ，找出 `candidates` 中可以使數字和為目標數 `target` 的所有 **不同組合** 。`candidates` 中的同一個數字可以 **無限制重複被選取** 。

## 解題心得：吃到飽的自助餐
這題是「回溯算法」的經典練習。

**核心邏輯：**
1. **排序 (非必須但推薦)**：先對 `candidates` 排序，這樣如果當前數字已經太大（超過剩餘的 `target`），後面的數字也肯定太大，可以直接剪掉分叉（剪枝）。
2. **回溯搜索**：我們從第一個數字開始試。
   - 選了它，`target` 變小。
   - 因為可以重複選，下一個位子還可以從「當前數字」開始選。
   - 如果 `target` 剛好減到 0，恭喜！找到一組。
   - 如果減過頭了（小於 0），就退回上一步，改選下一個數字。

這就像是在自助餐拿菜，每樣菜你都可以無限次拿，只要盤子裝得下（總合等於 `target`）。

### Python
```python
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        res = []
        def backtrack(remain, path, start):
            if remain == 0:
                res.append(list(path))
                return
            for i in range(start, len(candidates)):
                if candidates[i] > remain: continue
                path.append(candidates[i])
                backtrack(remain - candidates[i], path, i)
                path.pop()
        backtrack(target, [], 0)
        return res
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<std::vector<int>> combinationSum(std::vector<int>& candidates, int target) {
        std::vector<std::vector<int>> res;
        std::vector<int> path;
        backtrack(res, path, candidates, target, 0);
        return res;
    }
    void backtrack(std::vector<std::vector<int>>& res, std::vector<int>& path, std::vector<int>& candidates, int target, int start) {
        if (target == 0) {
            res.push_back(path);
            return;
        }
        for (int i = start; i < candidates.size(); i++) {
            if (candidates[i] <= target) {
                path.push_back(candidates[i]);
                backtrack(res, path, candidates, target - candidates[i], i);
                path.pop();
            }
        }
    }
};
```
