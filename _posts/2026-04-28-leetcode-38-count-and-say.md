---
title: "LeetCode #38: Count and Say"
categories:
  - String
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
模擬過程，對上一個字串進行計數描述。

### Python
```python
class Solution:
    def countAndSay(self, n: int) -> str:
        res = "1"
        for _ in range(n - 1):
            next_res, i = "", 0
            while i < len(res):
                count = 1
                while i + 1 < len(res) and res[i] == res[i+1]:
                    i += 1
                    count += 1
                next_res += str(count) + res[i]
                i += 1
            res = next_res
        return res
```

### C++
```cpp
#include <string>

class Solution {
public:
    std::string countAndSay(int n) {
        std::string res = "1";
        for (int i = 1; i < n; i++) {
            std::string nextRes = "";
            for (int j = 0; j < res.length(); j++) {
                int count = 1;
                while (j + 1 < res.length() && res[j] == res[j+1]) {
                    j++; count++;
                }
                nextRes += std::to_string(count) + res[j];
            }
            res = nextRes;
        }
        return res;
    }
};
```
