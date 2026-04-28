---
title: "LeetCode #119: Pascal's Triangle II"
categories:
  - Array
tags:
  - Easy
  - Dynamic Programming
  - Python
  - C++
---

## 題目描述
給定一個非負索引 `rowIndex`，返回「帕斯卡三角形」的第 `rowIndex` 行（索引從 0 開始）。

## 解題心得：空間省一點
這題是 #118 的進階版，要求優化空間複雜度到 O(k)。
我們可以只用一個數組來滾動更新。
**關鍵：** 從後往前更新，這樣就不會覆蓋掉上一行還需要用到的數據。
例如更新第 `i` 行時：`row[j] = row[j] + row[j-1]`。

### Python
```python
class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        res = [1] * (rowIndex + 1)
        for i in range(2, rowIndex + 1):
            for j in range(i - 1, 0, -1):
                res[j] = res[j] + res[j-1]
        return res
```

### C++
```cpp
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<int> res(rowIndex + 1, 1);
        for (int i = 2; i <= rowIndex; ++i) {
            for (int j = i - 1; j > 0; --j) {
                res[j] = res[j] + res[j - 1];
            }
        }
        return res;
    }
};
```
