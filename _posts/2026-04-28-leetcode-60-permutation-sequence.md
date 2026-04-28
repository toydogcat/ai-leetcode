---
title: "LeetCode #60: Permutation Sequence"
categories:
  - Math
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給出集合 `[1, 2, 3, ..., n]`，其所有元素共有 `n!` 種排列。按大小順序列出所有排列情況。給定 `n` 和 `k`，返回第 `k` 個排列。

## 解題心得：精準打擊，拒絕遍歷
這題是 Hard，因為如果你真的去算出所有排列（回溯法），當 `n=9` 時會超時。

**核心邏輯：數學計算 (康托展開的逆運算)**
想像我們要從 `[1, 2, 3, 4]` 裡選第 `k` 個排列。
1. **第一位選誰？** 我們知道以 1, 2, 3, 4 開頭的排列各有 `(4-1)! = 6` 種。
2. 如果 `k=10`，因為 $10 > 6$，所以第一位肯定不是 1。具體是誰？我們用 `(k-1) / 6` 就能算出索引。
3. **縮小範圍**：選好第一位後，剩下的位數繼續用同樣的方法「除」出來。

這就像是查字典，你不需要從第一頁翻到最後一頁，你只要看首字母、第二個字母... 就能精確跳到你要的那一頁。

### Python
```python
import math
class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        nums = [str(i) for i in range(1, n + 1)]
        k -= 1
        res = ""
        for i in range(n - 1, -1, -1):
            idx = k // math.factorial(i)
            res += nums.pop(idx)
            k %= math.factorial(i)
        return res
```

### C++
```cpp
#include <string>
#include <vector>
#include <numeric>

class Solution {
public:
    std::string getPermutation(int n, int k) {
        std::vector<int> factorial(n);
        factorial[0] = 1;
        for (int i = 1; i < n; i++) factorial[i] = factorial[i - 1] * i;
        
        std::vector<int> nums(n);
        std::iota(nums.begin(), nums.end(), 1);
        
        k--;
        std::string res = "";
        for (int i = n - 1; i >= 0; i--) {
            int idx = k / factorial[i];
            res += std::to_string(nums[idx]);
            nums.erase(nums.begin() + idx);
            k %= factorial[i];
        }
        return res;
    }
};
```
