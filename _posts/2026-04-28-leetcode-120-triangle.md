---
title: "LeetCode #120: Triangle"
categories:
  - Dynamic Programming
tags:
  - Medium
  - Array
  - Python
  - C++
---

## 題目描述
給定一個三角形 `triangle` ，找出自頂向下的最小路徑和。
每一步只能移動到下一行中相鄰的結點上。相鄰的結點在這裡指的是下標為 `i` 和 `i + 1` 的兩個結點（ `i` 為當前層的下標）。

## 解題心得：自底向上的智慧
這題雖然說是「自頂向下」，但用 **「自底向上」** 的 DP 邏輯會更簡單，因為我們不需要處理邊界的特殊情況。
1. 從三角形的倒數第二層開始向上遍歷。
2. 每個位置 `triangle[i][j]` 的最小路徑和為：`triangle[i][j] + min(下一層左邊, 下一層右邊)`。
3. 最後 `triangle[0][0]` 就是我們要的答案。

### Python
```python
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        # 自底向上更新
        for i in range(len(triangle) - 2, -1, -1):
            for j in range(len(triangle[i])):
                triangle[i][j] += min(triangle[i+1][j], triangle[i+1][j+1])
        return triangle[0][0]
```

### C++
```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        for (int i = n - 2; i >= 0; --i) {
            for (int j = 0; j < triangle[i].size(); ++j) {
                triangle[i][j] += min(triangle[i + 1][j], triangle[i + 1][j + 1]);
            }
        }
        return triangle[0][0];
    }
};
```
