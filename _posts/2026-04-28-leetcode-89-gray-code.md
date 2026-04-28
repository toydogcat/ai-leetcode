---
title: "LeetCode #89: Gray Code"
categories:
  - Math
  - Bit Manipulation
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
利用公式：$G(i) = i \oplus (i >> 1)$。

### Python
```python
class Solution:
    def grayCode(self, n: int) -> List[int]:
        return [i ^ (i >> 1) for i in range(1 << n)]
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<int> grayCode(int n) {
        std::vector<int> res;
        for (int i = 0; i < (1 << n); i++) {
            res.push_back(i ^ (i >> 1));
        }
        return res;
    }
};
```
