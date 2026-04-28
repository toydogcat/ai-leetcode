---
title: "LeetCode #43: Multiply Strings"
categories:
  - Math
  - String
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
模擬大數乘法。建立一個長度為 `len(num1) + len(num2)` 的數組存儲每一位的結果。

### Python
```python
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if num1 == "0" or num2 == "0": return "0"
        res = [0] * (len(num1) + len(num2))
        for i in range(len(num1) - 1, -1, -1):
            for j in range(len(num2) - 1, -1, -1):
                mul = int(num1[i]) * int(num2[j])
                p1, p2 = i + j, i + j + 1
                total = mul + res[p2]
                res[p2] = total % 10
                res[p1] += total // 10
        
        ans = "".join(map(str, res))
        return ans.lstrip("0")
```

### C++
```cpp
#include <string>
#include <vector>

class Solution {
public:
    std::string multiply(std::string num1, std::string num2) {
        if (num1 == "0" || num2 == "0") return "0";
        std::vector<int> res(num1.size() + num2.size(), 0);
        for (int i = num1.size() - 1; i >= 0; i--) {
            for (int j = num2.size() - 1; j >= 0; j--) {
                int mul = (num1[i] - '0') * (num2[j] - '0');
                int p1 = i + j, p2 = i + j + 1;
                int sum = mul + res[p2];
                res[p2] = sum % 10;
                res[p1] += sum / 10;
            }
        }
        std::string s = "";
        for (int x : res) if (!(s.empty() && x == 0)) s += std::to_string(x);
        return s;
    }
};
```
