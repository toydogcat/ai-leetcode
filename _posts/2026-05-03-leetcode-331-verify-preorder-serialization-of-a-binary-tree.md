---
title: "LeetCode #331: Verify Preorder Serialization of a Binary Tree (驗證二元樹的前序序列化)"
categories:
  - String
  - Stack
  - Tree
  - Binary Tree
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個逗號分隔的字串，驗證它是否是一個二元樹前序走訪的合法序列。每一個非空節點都有兩個子節點，而空節點則用 `'#'` 表示。

## 解題心得
我們可以使用 **出度/入度概念 (Indegree / Outdegree)** 來驗證二元樹的結構：
- 每個節點在樹中會消耗 1 個「槽位」（入度），並且如果是「非空」節點，還會產生 2 個「槽位」（出度）。
- 初始時，我們有一個可用的空槽位（即根節點的位置）：`slots = 1`。
- 遍歷序列中的每一個節點：
  - 首先消耗一個槽位：`slots -= 1`。
  - 如果此時 `slots < 0`，代表結構在半途中斷，不合法，返回 `false`。
  - 如果該節點不是 `'#'`，代表是非空節點，能產生 2 個新槽位：`slots += 2`。
- 最終遍歷完成後，合法的二元樹所有的槽位都應該被剛好填滿，即 `slots == 0`。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1) 或 O(N) 用於字串分割

## 程式碼實作

### Python
```python
class Solution:
    def isValidSerialization(self, preorder: str) -> bool:
        slots = 1
        for node in preorder.split(','):
            slots -= 1
            if slots < 0:
                return False
            if node != '#':
                slots += 2
        return slots == 0
```

### C++
```cpp
#include <string>
#include <sstream>

class Solution {
public:
    bool isValidSerialization(std::string preorder) {
        std::stringstream ss(preorder);
        std::string node;
        int slots = 1;

        while (std::getline(ss, node, ',')) {
            slots--;
            if (slots < 0) return false;
            if (node != "#") {
                slots += 2;
            }
        }
        return slots == 0;
    }
};
```
