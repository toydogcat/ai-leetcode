---
title: "LeetCode #248: Strobogrammatic Number III (中心對稱數 III)"
categories:
  - Recursion
  - Math
  - String
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定兩個字符串 `low` 和 `high` 表示範圍，請你找出在 `[low, high]` 範圍內所有的中心對稱數的個數。

## 解題心得：生成法 + 範圍過濾
這是一道 Hard 題，因為範圍可能很大，我們不能遍歷數字，而是要 **生成** 中心對稱數。

**核心邏輯：**
1. 計算 `low` 和 `high` 的長度分別為 `n1` 和 `n2`。
2. 對於每一個長度 `i`（從 `n1` 到 `n2`）：
   - 使用第 247 題的遞迴思想生成長度為 `i` 的所有中心對稱數。
   - 對於生成的每一個數，檢查它是否在 `[low, high]` 之間。
3. **優化**：在生成過程中，如果當前數的長度等於 `n1` 或 `n2`，才需要進行字符串比較。

- **時間複雜度**: 指數級（但比遍歷快得多）。
- **空間複雜度**: 指數級。

## 程式碼實作

### Python
```python
class Solution:
    def strobogrammaticInRange(self, low: str, high: str) -> int:
        res = 0
        n1, n2 = len(low), len(high)
        
        for i in range(n1, n2 + 1):
            nums = self.findStrobogrammatic(i)
            for num in nums:
                if len(num) == n1 and num < low: continue
                if len(num) == n2 and num > high: continue
                res += 1
        return res

    def findStrobogrammatic(self, n):
        def helper(m, target):
            if m == 0: return [""]
            if m == 1: return ["0", "1", "8"]
            prev = helper(m - 2, target)
            res = []
            for s in prev:
                if m != target: res.append("0" + s + "0")
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
    int strobogrammaticInRange(std::string low, std::string high) {
        int count = 0;
        for (int n = low.length(); n <= high.length(); n++) {
            std::vector<std::string> nums = findStrobogrammatic(n);
            for (const std::string& num : nums) {
                if (num.length() == low.length() && num < low) continue;
                if (num.length() == high.length() && num > high) continue;
                count++;
            }
        }
        return count;
    }

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
