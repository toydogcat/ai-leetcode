---
title: "LeetCode #269: Alien Dictionary (火星詞典)"
categories:
  - Graph
  - Breadth-First Search
  - Topological Sort
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
現有一種使用字母表的火星語言，但字母順序對你來說是未知的。
給你一個來自火星語言字典的單詞列表 `words`，其中的單詞已經按該語言的字母表順序進行了排序。

請根據這個列表，推斷出該火星語言的字母順序。如果有多個有效的順序，返回其中 **任意一個** 即可。如果沒有有效的字母順序，返回 **空字串 `""`**。

**範例 1:**
```
輸入: words = ["wrt","wrf","er","ett","rftt"]
輸出: "wertf"
```

**範例 2:**
```
輸入: words = ["z","x"]
輸出: "zx"
```

**範例 3:**
```
輸入: words = ["z","x","z"]
輸出: ""
解釋: 不存在合法順序，因為 'z' 先於 'x' 出現，但 'x' 又先於 'z' 出現。
```

## 解題心得：拓撲排序 (Topological Sort)
本題是典型的拓撲排序題目。我們需要把每個字母看作圖中的一個節點，並根據給定的單詞列表建立有向邊。

**核心邏輯**：
1. **建立鄰接表與入度表**：
   - 先將單詞列表中出現的所有字母收集為圖的節點（初始入度為 0）。
2. **尋找字母之間的先後順序**：
   - 遍歷單詞列表中相鄰的兩個單詞 `word1` 和 `word2`。
   - 找出第一個不相同的字元，例如 `word1[i] != word2[i]`，這意味著 `word1[i] -> word2[i]` 存在一條有向邊，更新 `word2[i]` 的入度加 1。
   - **特殊無解情況**：如果 `word1` 是 `word2` 的前綴，且 `len(word1) > len(word2)`（例如 `["abc", "ab"]`），這種情況在排序字典中是不合法的，應直接返回 `""`。
3. **進行拓撲排序（Kahn's Algorithm）**：
   - 使用佇列（Queue）儲存所有入度為 0 的字母節點。
   - 每次從 Queue 中取出一個字母並將其加入結果中，然後遍歷它的所有鄰接點。
   - 將鄰接點的入度減 1。若入度減為 0，則將其加入 Queue。
4. **檢查是否有環**：
   - 如果最後排列出的字母數量等於字典中所有出現過的字母個數，說明排序有效；否則表示圖中存在環，返回 `""`。

- **時間複雜度**: $O(C)$，其中 $C$ 是所有單詞的字元總數。
- **空間複雜度**: $O(V + E) = O(1)$，因為字母表大小 $V \le 26$，邊數 $E \le 26 \times 25$。

## 程式碼實作

### Python
```python
from collections import deque, defaultdict

class Solution:
    def alienOrder(self, words: List[str]) -> str:
        # 1. 紀錄所有出現過的字母節點
        adj = defaultdict(set)
        in_degree = {char: 0 for word in words for char in word}
        
        # 2. 建立有向圖
        for i in range(len(words) - 1):
            w1 = words[i]
            w2 = words[i + 1]
            min_len = min(len(w1), len(w2))
            
            # 檢查特例：如果 w1 比 w2 長且 w1 的前部等於 w2
            if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]:
                return ""
                
            for j in range(min_len):
                if w1[j] != w2[j]:
                    if w2[j] not in adj[w1[j]]:
                        adj[w1[j]].add(w2[j])
                        in_degree[w2[j]] += 1
                    break
                    
        # 3. 拓撲排序
        queue = deque([char for char, degree in in_degree.items() if degree == 0])
        res = []
        
        while queue:
            node = queue.popleft()
            res.append(node)
            for neighbor in adj[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
                    
        # 如果 res 的長度與節點數量不同，說明圖中存在環
        return "".join(res) if len(res) == len(in_degree) else ""
```

### C++
```cpp
#include <string>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <algorithm>

class Solution {
public:
    std::string alienOrder(std::vector<std::string>& words) {
        std::unordered_map<char, std::unordered_set<char>> adj;
        std::unordered_map<char, int> inDegree;

        // 初始化入度
        for (const std::string& word : words) {
            for (char c : word) {
                inDegree[c] = 0;
            }
        }

        // 構建有向圖與入度
        for (size_t i = 0; i < words.size() - 1; ++i) {
            std::string w1 = words[i];
            std::string w2 = words[i + 1];
            size_t minLen = std::min(w1.length(), w2.length());

            if (w1.length() > w2.length() && w1.substr(0, minLen) == w2.substr(0, minLen)) {
                return "";
            }

            for (size_t j = 0; j < minLen; ++j) {
                if (w1[j] != w2[j]) {
                    if (!adj[w1[j]].count(w2[j])) {
                        adj[w1[j]].insert(w2[j]);
                        inDegree[w2[j]]++;
                    }
                    break;
                }
            }
        }

        // 拓撲排序
        std::queue<char> q;
        for (const auto& pair : inDegree) {
            if (pair.second == 0) {
                q.push(pair.first);
            }
        }

        std::string res = "";
        while (!q.empty()) {
            char u = q.front();
            q.pop();
            res += u;

            for (char v : adj[u]) {
                inDegree[v]--;
                if (inDegree[v] == 0) {
                    q.push(v);
                }
            }
        }

        return res.length() == inDegree.size() ? res : "";
    }
};
```
