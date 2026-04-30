---
title: "LeetCode #247: Strobogrammatic Number II (中心對稱數 II)"
categories:
  - Recursion
  - Math
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
找到所有長度為 `n` 的中心對稱數。

## 解題心得：遞迴構造
我們可以從小到大構造中心對稱數。長度為 `n` 的數可以由長度為 `n-2` 的數在兩頭添加對應的字符對得到。

**核心邏輯：**
1. **基結準則**：
   - `n=0`：返回 `[""]`。
   - `n=1`：返回 `["0", "1", "8"]`。
2. **遞迴過程**：
   - 先遞迴獲取長度為 `n-2` 的所有中心對稱數。
   - 對於每一個 `n-2` 的數，在其左右兩側添加：
     - `1...1`, `8...8`, `6...9`, `9...6`
     - 如果當前長度不等於目標 `n`（即不在最外層），還可以添加 `0...0`。

- **時間複雜度**: 指數級。
- **空間複雜度**: 指數級。

## 程式碼實作

### Python
```python
class Solution:
    def findStrobogrammatic(self, n: int) -> List[str]:
        def helper(m, target):
            if m == 0: return [""]
            if m == 1: return ["0", "1", "8"]
            
            prev = helper(m - 2, target)
            res = []
            for s in prev:
                if m != target:
                    res.append("0" + s + "0")
                res.append("1" + s + "1")
                res.append("6" + s + "9")
                res.append("8" + s + "8")
                res.append("9" + s + "6")
            return res
            
        return helper(n, n)
```

### C++
```cpp
#include <vector>
#include <string>

class Solution {
public:
    std::vector<std::string> findStrobogrammatic(int n) {
        return helper(n, n);
    }

    std::vector<std::string> helper(int m, int n) {
        if (m == 0) return {""};
        if (m == 1) return {"0", "1", "8"};
        
        std::vector<std::string> prev = helper(m - 2, n);
        std::vector<std::string> res;
        for (std::string s : prev) {
            if (m != n) res.push_back("0" + s + "0");
            res.push_back("1" + s + "1");
            res.push_back("6" + s + "9");
            res.push_back("8" + s + "8");
            res.push_back("9" + s + "6");
        }
        return res;
    }
};
```
