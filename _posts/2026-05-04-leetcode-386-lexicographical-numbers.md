---
title: "LeetCode #386: Lexicographical Numbers (字典序排數)"
categories:
  - Trie
  - Depth-First Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個整數 `n`，按字典序返回 1 到 `n` 的所有整數。時間複雜度 $O(N)$，空間複雜度 $O(1)$。

## 解題心得
這可以看作是對十叉樹（Trie）進行 **深度優先搜尋 (DFS)** 的走訪：
- 從 1 開始。
- 每次我們將當前數字 `curr` 乘以 10。如果 `curr * 10 <= n`，則前進到下一層（優先權最高，因為字典序中 10 比 2 先）。
- 如果不能乘以 10，我們嘗試 `curr + 1`。如果尾數變為 0 或是大於 `n`，說明當前子樹走訪完畢，我們回溯：`curr //= 10` 並 `curr += 1` 繼續走訪。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1) 扣除回傳陣列

## 程式碼實作

### Python
```python
class Solution:
    def lexicalOrder(self, n: int) -> List[int]:
        ans = []
        curr = 1
        for _ in range(n):
            ans.append(curr)
            if curr * 10 <= n:
                curr *= 10
            else:
                while curr % 10 == 9 or curr + 1 > n:
                    curr //= 10
                curr += 1
        return ans
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<int> lexicalOrder(int n) {
        std::vector<int> ans;
        int curr = 1;
        for (int i = 0; i < n; ++i) {
            ans.push_back(curr);
            if (curr * 10 <= n) {
                curr *= 10;
            } else {
                while (curr % 10 == 9 || curr + 1 > n) {
                    curr /= 10;
                }
                curr++;
            }
        }
        return ans;
    }
};
```
