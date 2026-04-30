---
title: "LeetCode #255: Verify Preorder Sequence in Binary Search Tree (驗證 BST 的前序遍歷)"
categories:
  - Stack
  - Tree
  - Binary Search Tree
  - Monotonic Stack
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個整數數組，判斷該數組是否為一個二叉搜索樹 (BST) 的 **前序遍歷** 結果。

## 解題心得：單調棧 (Monotonic Stack)
二叉搜索樹的前序遍歷具有如下規律：`[根, 左子樹, 右子樹]`。
且對於 BST，左子樹所有值 < 根，右子樹所有值 > 根。

**核心邏輯：**
1. **模擬右轉過程**：當我們在遍歷過程中遇到一個比之前大的數時，說明我們進入了某個節點的右子樹。
2. **維護最小值下界**：一旦進入右子樹，之後出現的所有數字都必須大於該子樹的父節點。
3. **具體步驟**：
   - 使用一個棧 `st` 存放遍歷過的元素（模擬左路下行）。
   - 維護一個 `lower_bound` (初始為負無窮)。
   - 遍歷數組 `num`：
     - 如果 `num < lower_bound`，返回 `false`。
     - 當 `num` 大於棧頂時：不斷彈出棧頂，並將彈出的最後一個值更新為 `lower_bound`（這表示我們正在向右轉，彈出的是父節點）。
     - 將 `num` 壓入棧。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
class Solution:
    def verifyPreorder(self, preorder: List[int]) -> bool:
        stack = []
        lower_bound = float('-inf')
        
        for n in preorder:
            # 如果出現比下界還小的數，不符合 BST 性質
            if n < lower_bound:
                return False
            
            # 當前值大於棧頂，說明正在進入右子樹
            while stack and n > stack[-1]:
                # 彈出的最後一個值就是當前右子樹的父節點
                lower_bound = stack.pop()
            
            stack.append(n)
            
        return True
```

### C++
```cpp
#include <vector>
#include <stack>
#include <climits>

class Solution {
public:
    bool verifyPreorder(std::vector<int>& preorder) {
        std::stack<int> st;
        int lowerBound = INT_MIN;
        
        for (int n : preorder) {
            if (n < lowerBound) return false;
            
            while (!st.empty() && n > st.top()) {
                lowerBound = st.top();
                st.pop();
            }
            st.push(n);
        }
        return true;
    }
};
```
