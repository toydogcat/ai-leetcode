---
title: "LeetCode #40: Combination Sum II"
categories:
  - Array
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個候選人編號的集合 `candidates` 和一個目標數 `target` ，找出 `candidates` 中所有可以使數字和為 `target` 的組合。`candidates` 中的每個數字在每個組合中只能使用 **一次** 。

## 解題心得：別重複選雙胞胎
這題跟 39 題很像，但有兩個不同點：
1. 每個數字只能用 **一次**。
2. `candidates` 可能有重複的數字。

**核心邏輯：排序 + 跳過**
1. **排序**：同樣先排好序。
2. **跳過重複**：在回溯的每一層遍歷時，如果發現當前的數字跟「同一層」的前一個數字一樣，我們就跳過它。
   - **為什麼？** 因為如果你已經嘗試過用第一個 `2` 去湊結果，那麼用第二個 `2` 湊出來的組合肯定會重複。

這就像是在挑零食，如果架上有兩包一樣的樂事，你已經試過拿一包配可樂了，就不需要再試拿「另一包」樂事配可樂，因為結果是一樣的。
### Python
```python
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res = []
        def backtrack(remain, path, start):
            if remain == 0:
                res.append(list(path))
                return
            for i in range(start, len(candidates)):
                if i > start and candidates[i] == candidates[i-1]: continue
                if candidates[i] > remain: break
                path.append(candidates[i])
                backtrack(remain - candidates[i], path, i + 1)
                path.pop()
        backtrack(target, [], 0)
        return res
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> combinationSum2(std::vector<int>& candidates, int target) {
        std::sort(candidates.begin(), candidates.end());
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
            if (i > start && candidates[i] == candidates[i-1]) continue;
            if (candidates[i] > target) break;
            path.push_back(candidates[i]);
            backtrack(res, path, candidates, target - candidates[i], i + 1);
            path.pop();
        }
    }
};
```
