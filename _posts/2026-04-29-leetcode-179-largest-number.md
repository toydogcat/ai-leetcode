---
title: "LeetCode #179: Largest Number (最大數)"
categories:
  - String
  - Greedy
  - Sorting
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一組非負整數 `nums`，重新排列每個數的順序（每個數不可拆分）使之組成一個最大的整數。

注意：輸出結果可能非常大，所以你需要返回一個字串而不是整數。

## 解題心得：自定義排序邏輯
這題的核心不在於數值的大小，而在於 **字串拼接後的優先級**。

**核心邏輯：貪心算法 (Greedy)**
對於兩個數 $a$ 和 $b$，我們如何決定誰放在前面？
- 比較 $a+b$ 和 $b+a$ 的大小（這裡的 $+$ 是字串拼接）。
- 如果 $a+b > b+a$，那麼 $a$ 應該排在 $b$ 前面。
- 反之，則 $b$ 排在 $a$ 前面。

**細節處理**：
- 如果排序後的結果第一個數字是 `"0"`，說明整個陣列都是 `0`，應直接返回 `"0"`。

- **時間複雜度**: $O(n \log n \times k)$，其中 $k$ 是字串的平均長度。
- **空間複雜度**: $O(n)$。

## 程式碼實作

### Python
```python
from functools import cmp_to_key

class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        # 將數字轉為字串
        strs = list(map(str, nums))
        
        # 自定義比較規則
        def compare(x, y):
            if x + y > y + x:
                return -1
            else:
                return 1
        
        strs.sort(key=cmp_to_key(compare))
        
        # 處理全為 0 的情況
        if strs[0] == "0":
            return "0"
            
        return "".join(strs)
```

### C++
```cpp
#include <vector>
#include <string>
#include <algorithm>

class Solution {
public:
    std::string largestNumber(std::vector<int>& nums) {
        std::vector<std::string> strs;
        for (int n : nums) {
            strs.push_back(std::to_string(n));
        }
        
        // 使用 Lambda 定義排序邏輯
        std::sort(strs.begin(), strs.end(), [](const std::string &a, const std::string &b) {
            return a + b > b + a;
        });
        
        if (strs[0] == "0") return "0";
        
        std::string res = "";
        for (std::string s : strs) {
            res += s;
        }
        return res;
    }
};
```
