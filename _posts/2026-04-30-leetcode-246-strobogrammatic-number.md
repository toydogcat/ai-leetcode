---
title: "LeetCode #246: Strobogrammatic Number (中心對稱數)"
categories:
  - Hash Table
  - Two Pointers
  - Math
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
中心對稱數是指一個數字旋轉 180 度（上下顛倒）後看起來還是一樣的數字。
給定一個字符串 `num` ，判斷它是否是中心對稱數。

## 解題心得：雙指針 + 對應表
中心對稱的數字對包括：
- `0` 旋轉後是 `0`
- `1` 旋轉後是 `1`
- `8` 旋轉後是 `8`
- `6` 旋轉後是 `9`
- `9` 旋轉後是 `6`

**核心邏輯：**
1. 建立一個對應關係表。
2. 使用雙指針 `left, right` 從兩端向中間掃描。
3. 檢查 `num[left]` 和 `num[right]` 是否是一對中心對稱的字符。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def isStrobogrammatic(self, num: str) -> bool:
        maps = {'0':'0', '1':'1', '6':'9', '8':'8', '9':'6'}
        l, r = 0, len(num) - 1
        
        while l <= r:
            if num[l] not in maps or maps[num[l]] != num[r]:
                return False
            l += 1
            r -= 1
            
        return True
```

### C++
```cpp
#include <string>
#include <unordered_map>

class Solution {
public:
    bool isStrobogrammatic(std::string num) {
        std::unordered_map<char, char> m = {{'0','0'}, {'1','1'}, {'6','9'}, {'8','8'}, {'9','6'}};
        int l = 0, r = num.length() - 1;
        while (l <= r) {
            if (m.find(num[l]) == m.end() || m[num[l]] != num[r]) {
                return false;
            }
            l++; r--;
        }
        return true;
    }
};
```
