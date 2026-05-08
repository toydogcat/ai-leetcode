---
title: "LeetCode #358: Rearrange String k Distance Apart (整理字串使得相同字元距離為 k)"
categories:
  - Greedy
  - Heap (Priority Queue)
  - Hash Table
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個字串 `s` 和一個非負整數 `k`，重新排列字串，使得相同字元之間的最小距離為 `k`。如果無法做到，返回空字串。

## 解題心得
使用 **貪心演算法** 與 **最大堆疊**：
1. 用雜湊表統計每個字元出現的頻率。
2. 將所有字元及其頻率放入最大堆疊，頻率最高的字元優先。
3. 每次我們從堆疊中彈出頻率最高的前 `k` 個字元，並將其依序加入結果。
4. 用一個臨時佇列記錄已經使用過且仍有剩餘頻率的字元，直到其距離滿足大於等於 `k` 後，再重新放回堆疊。
5. 若在某一步驟堆疊已空但我們還未湊齊 `k` 個字元（且剩餘字元仍有頻率），則代表無法排列，返回空字串。

- **時間複雜度**: O(N \log A) 其中 A 是字元集大小（本題為 26）
- **空間複雜度**: O(A)

## 程式碼實作

### Python
```python
from collections import Counter, deque
import heapq

class Solution:
    def rearrangeString(self, s: str, k: int) -> str:
        if k <= 1: return s
        counts = Counter(s)
        heap = [(-freq, char) for char, freq in counts.items()]
        heapq.heapify(heap)
        
        queue = deque()
        ans = []
        
        while heap:
            freq, char = heapq.heappop(heap)
            ans.append(char)
            # 頻率是負數，+1 代表頻率減少 1
            queue.append((freq + 1, char))
            
            # 當佇列長度達到 k 時，彈出前端元素放回堆疊
            if len(queue) >= k:
                f, c = queue.popleft()
                if f < 0:
                    heapq.heappush(heap, (f, c))
                    
        return "".join(ans) if len(ans) == len(s) else 
```

### C++
```cpp
#include <string>
#include <unordered_map>
#include <queue>
#include <vector>

class Solution {
public:
    std::string rearrangeString(std::string s, int k) {
        if (k <= 1) return s;
        std::unordered_map<char, int> counts;
        for (char c : s) counts[c]++;

        std::priority_queue<std::pair<int, char>> pq;
        for (auto const& [char_val, freq] : counts) {
            pq.push({freq, char_val});
        }

        std::queue<std::pair<int, char>> q;
        std::string ans = "";

        while (!pq.empty()) {
            auto [freq, char_val] = pq.top();
            pq.pop();
            ans += char_val;
            q.push({freq - 1, char_val});

            if (q.size() >= k) {
                auto front = q.front();
                q.pop();
                if (front.first > 0) {
                    pq.push(front);
                }
            }
        }
        return ans.length() == s.length() ? ans : "";
    }
};
```
