---
title: "LeetCode #166: Fraction to Recurring Decimal (分數到循環小數)"
categories:
  - Hash Table
  - Math
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定兩個整數，分別表示分子的 `numerator` 和分母的 `denominator`，以字串形式返回小數。
如果小數部分為循環小數，則將循環的部分括在括號內。

## 解題心得：模擬長除法
這題的關鍵在於如何檢測「循環」。

**核心邏輯**：
1. **處理正負號**：先確定結果的正負號，並將分子分母轉為絕對值（避免溢位，建議用 `long long`）。
2. **整數部分**：直接做除法 `a // b`。
3. **小數部分**：模擬長除法。
   - 每次將餘數乘以 10，再除以分母。
   - **關鍵：使用哈希表**。記錄每個餘數出現的位置。
   - 如果某個餘數再次出現，說明我們進入了循環，從該餘數上次出現的位置插入括號即可。

- **時間複雜度**: $O(\text{denominator})$，循環節長度最長為分母的大小。
- **空間複雜度**: $O(\text{denominator})$，哈希表存儲餘數。

## 程式碼實作

### Python
```python
class Solution:
    def fractionToDecimal(self, numerator: int, denominator: int) -> str:
        if numerator == 0: return "0"
        
        res = []
        # 處理符號
        if (numerator < 0) ^ (denominator < 0):
            res.append("-")
            
        dividend = abs(numerator)
        divisor = abs(denominator)
        
        # 整數部分
        res.append(str(dividend // divisor))
        remainder = dividend % divisor
        if remainder == 0:
            return "".join(res)
            
        res.append(".")
        
        # 小數部分
        hashmap = {}
        while remainder != 0:
            if remainder in hashmap:
                # 發現循環
                res.insert(hashmap[remainder], "(")
                res.append(")")
                break
            
            hashmap[remainder] = len(res)
            remainder *= 10
            res.append(str(remainder // divisor))
            remainder %= divisor
            
        return "".join(res)
```

### C++
```cpp
#include <string>
#include <unordered_map>
#include <cmath>

class Solution {
public:
    std::string fractionToDecimal(int numerator, int denominator) {
        if (numerator == 0) return "0";
        
        std::string res = "";
        // 處理符號
        if ((numerator < 0) ^ (denominator < 0)) res += "-";
        
        long long dividend = std::abs((long long)numerator);
        long long divisor = std::abs((long long)denominator);
        
        // 整數部分
        res += std::to_string(dividend / divisor);
        long long remainder = dividend % divisor;
        if (remainder == 0) return res;
        
        res += ".";
        
        // 小數部分
        std::unordered_map<long long, int> map;
        while (remainder != 0) {
            if (map.count(remainder)) {
                res.insert(map[remainder], "(");
                res += ")";
                break;
            }
            
            map[remainder] = res.length();
            remainder *= 10;
            res += std::to_string(remainder / divisor);
            remainder %= divisor;
        }
        
        return res;
    }
};
```
