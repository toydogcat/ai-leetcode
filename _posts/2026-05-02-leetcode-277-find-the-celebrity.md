---
title: "LeetCode #277: Find the Celebrity (尋找名人)"
categories:
  - Two Pointers
  - Greedy
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
在一個社交聚會上，有 `n` 個人，其中有一個是 **名人（Celebrity）**。名人的定義是：
1. 名人不認識聚會上的任何其他人。
2. 聚會上的所有其他人都認識名人。

現在你只能通過一個輔助函數 `bool knows(a, b)` 來獲取這 `n` 個人之間的關係，該函數會返回 `a` 是否認識 `b`。

請找出這個名人，並返回其編號。如果沒有名人，則返回 `-1`。

**範例 1:**
```
輸入: graph = [[1,1,0],[0,1,0],[1,1,1]]
輸出: 1
解釋: 
0 認識 1 但不認識 2。
1 不認識 0 也不認識 2。
2 認識 0 和 1。
因此 1 是名人。
```

## 解題心得：貪心法選出候選人
如果要對每兩個人之間的關係都進行檢查，需要 $O(N^2)$ 的時間複雜度，這在 $N$ 很大時效率不高。

**優化想法（貪心選拔）**：
我們可以利用名人的第一個性質來排除非名人。對於每兩個人 `a` 和 `b`：
- 如果 `knows(a, b)` 為 `true`：說明 `a` 認識 `b`，那麼 **`a` 絕對不可能是名人**。名人候選人應變更為 `b`。
- 如果 `knows(a, b)` 為 `false`：說明 `a` 不認識 `b`，那麼 **`b` 絕對不可能是名人**。名人候選人維持為 `a`。

這意味著我們只需掃描一次 $0$ 到 $n - 1$，就可以排除掉 $n - 1$ 個人，最終留下唯一的候選人。

**核心邏輯**：
1. **選出候選人**：初始假設 `candidate = 0`。從 `1` 到 `n - 1` 遍歷 `i`。如果 `knows(candidate, i)` 成立，則將候選人更新為 `i`。
2. **驗證候選人**：對這個唯一的候選人進行二次遍歷，確保：
   - 候選人 `candidate` 不認識任何其他人。
   - 其他人都認識 `candidate`。
3. 若驗證成功，則返回 `candidate`，否則返回 `-1`。

- **時間複雜度**: $O(N)$。第一次掃描 $N$ 步，驗證階段 $2N$ 步，共調用 `knows` 約 $3N$ 次。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
# The knows API is already defined for you.
# return a bool, whether a knows b
# def knows(a: int, b: int) -> bool:

class Solution:
    def findCelebrity(self, n: int) -> int:
        candidate = 0
        
        # 1. 貪心法選出候選人
        for i in range(1, n):
            if knows(candidate, i):
                candidate = i
                
        # 2. 驗證候選人
        for i in range(n):
            if i == candidate:
                continue
            # 名人不應該認識任何人，且任何人都應該認識名人
            if knows(candidate, i) or not knows(i, candidate):
                return -1
                
        return candidate
```

### C++
```cpp
// The knows API is defined for you.
// bool knows(int a, int b);

class Solution {
public:
    int findCelebrity(int n) {
        int candidate = 0;

        // 1. 貪心選出候選人
        for (int i = 1; i < n; ++i) {
            if (knows(candidate, i)) {
                candidate = i;
            }
        }

        // 2. 驗證候選人
        for (int i = 0; i < n; ++i) {
            if (i == candidate) continue;
            if (knows(candidate, i) || !knows(i, candidate)) {
                return -1;
            }
        }

        return candidate;
    }
};
```
