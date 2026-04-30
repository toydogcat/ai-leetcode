---
title: "LeetCode #216: Combination Sum III (組合總和 III)"
categories:
  - Array
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
找出所有相加之和為 `n` 的 `k` 個數的組合，且滿足下列條件：
- 只使用數字 1 到 9。
- 每個數字 **最多使用一次** 。

返回 **所有可能的有效組合列表** 。該列表不能包含相同的組合兩次，組合可以以任何順序返回。

## 解題心得：回溯算法 (Backtracking)
這是組合求和系列的第三題，限定了數字範圍 [1, 9] 且限定了個數 `k`。

**核心邏輯：**
1. **路徑選擇**：從 1 到 9 依次選擇數字。為了避免重複組合（如 `[1, 2]` 和 `[2, 1]`），我們每次只從比當前數字大的數字中選取。
2. **終止條件**：
   - 當路徑長度等於 `k` 時，如果剩餘目標和 `target` 為 0，則存入結果。
   - 如果當前路徑長度已達 `k` 但和不對，或者 `target < 0`，則剪枝返回。
3. **剪枝優化**：如果當前剩餘的數字不足以湊齊 `k` 個，或者剩餘數字最小值之和已經大於 `target`，可以提前終止。

- **時間複雜度**: $O(C_{9}^{k})$，從 9 個數字中選 $k$ 個。
- **空間複雜度**: $O(k)$，遞迴深度。

## 程式碼實作

### Python
```python
class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        res = []
        
        def backtrack(start, target, path):
            if len(path) == k:
                if target == 0:
                    res.append(list(path))
                return
            
            for i in range(start, 10):
                if i > target: # 剪枝
                    break
                path.append(i)
                backtrack(i + 1, target - i, path)
                path.pop() # 回溯
                
        backtrack(1, n, [])
        return res
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<std::vector<int>> combinationSum3(int k, int n) {
        std::vector<std::vector<int>> res;
        std::vector<int> path;
        backtrack(1, n, k, path, res);
        return res;
    }

private:
    void backtrack(int start, int target, int k, std::vector<int>& path, std::vector<std::vector<int>>& res) {
        if (path.size() == k) {
            if (target == 0) res.push_back(path);
            return;
        }
        
        for (int i = start; i <= 9; i++) {
            if (i > target) break; // 剪枝
            path.push_back(i);
            backtrack(i + 1, target - i, k, path, res);
            path.pop_back();
        }
    }
};
```
