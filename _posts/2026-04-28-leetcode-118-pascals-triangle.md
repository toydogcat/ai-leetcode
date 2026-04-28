---
title: "LeetCode #118: Pascal's Triangle"
categories:
  - Array
tags:
  - Easy
  - Dynamic Programming
  - Python
  - C++
---

## 題目描述
給定一個非負整數 `numRows`，生成「帕斯卡三角形」的前 `numRows` 行。
在帕斯卡三角形中，每個數是它左上方和右上方兩位數之和。

## 解題心得：肩膀上的責任
帕斯卡三角形（楊輝三角）的規律非常簡單：
1. 每行的第一個和最後一個元素都是 1。
2. 中間的元素 `row[i]` 是上一行的 `prev_row[i-1] + prev_row[i]`。

我們只需要雙層循環即可生成。

### Python
```python
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        res = []
        for i in range(numRows):
            row = [1] * (i + 1)
            for j in range(1, i):
                row[j] = res[i-1][j-1] + res[i-1][j]
            res.append(row)
        return res
```

### C++
```cpp
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res;
        for (int i = 0; i < numRows; ++i) {
            vector<int> row(i + 1, 1);
            for (int j = 1; j < i; ++j) {
                row[j] = res[i - 1][j - 1] + res[i - 1][j];
            }
            res.push_back(row);
        }
        return res;
    }
};
```
