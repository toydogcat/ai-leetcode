---
title: "LeetCode #60: Permutation Sequence"
categories:
  - Math
tags:
  - Hard
  - Python
  - C++
---

## 解題思路：康托展開逆運算
我們不需要生成所有排列。利用階乘，我們可以精確地計算出每一位數字。
例如 $n=3$，以 1 開頭的排列有 $(3-1)! = 2$ 個。

- **時間複雜度**: $O(n^2)$
- **空間複雜度**: $O(n)$

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
