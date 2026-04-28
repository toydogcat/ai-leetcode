---
title: "LeetCode #126: Word Ladder II"
categories:
  - Hash Table
  - String
  - BFS
  - Backtracking
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
按字典 `wordList` 完成從單詞 `beginWord` 到單詞 `endWord` 轉化，一個表示最小轉換序列的 **列表** 。
每次轉換只能改變一個字母，且轉換後的單詞必須在 `wordList` 中。

## 解題心得：地圖與導航
這題是 Word Ladder 的進階版，不只要長度，還要所有最短路徑。
這需要兩步走：
1. **BFS 建立圖：** 找到每個單詞到 `beginWord` 的最短距離，並建立一個後繼節點的映射表（只包含能讓路徑變短的邊）。
2. **DFS/回溯 找路徑：** 根據建立好的圖，從 `beginWord` 遞迴到 `endWord`。

### Python
```python
from collections import defaultdict, deque

class Solution:
    def findLadders(self, beginWord: str, endWord: str, wordList: List[str]) -> List[List[int]]:
        wordSet = set(wordList)
        if endWord not in wordSet: return []
        
        # 1. BFS 找出每個單詞所在的層級，並建立鄰接表
        layer = {beginWord: [[beginWord]]}
        while layer:
            new_layer = defaultdict(list)
            for word, paths in layer.items():
                if word == endWord:
                    return layer[word]
                for i in range(len(word)):
                    for c in 'abcdefghijklmnopqrstuvwxyz':
                        next_word = word[:i] + c + word[i+1:]
                        if next_word in wordSet:
                            for path in paths:
                                new_layer[next_word].append(path + [next_word])
            wordSet -= set(new_layer.keys())
            layer = new_layer
            
        return []
```

### C++
```cpp
class Solution {
public:
    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return {};
        
        unordered_map<string, int> distance;
        unordered_map<string, vector<string>> adj;
        
        queue<string> q;
        q.push(beginWord);
        distance[beginWord] = 0;
        
        bool found = false;
        while (!q.empty() && !found) {
            int size = q.size();
            unordered_set<string> visited_this_level;
            for (int i = 0; i < size; ++i) {
                string curr = q.front(); q.pop();
                string next_word = curr;
                for (int j = 0; j < curr.size(); ++j) {
                    char original = next_word[j];
                    for (char c = 'a'; c <= 'z'; ++c) {
                        next_word[j] = c;
                        if (dict.count(next_word)) {
                            if (!distance.count(next_word)) {
                                distance[next_word] = distance[curr] + 1;
                                q.push(next_word);
                                adj[curr].push_back(next_word);
                                visited_this_level.insert(next_word);
                            } else if (distance[next_word] == distance[curr] + 1) {
                                adj[curr].push_back(next_word);
                            }
                            if (next_word == endWord) found = true;
                        }
                    }
                    next_word[j] = original;
                }
            }
        }
        
        vector<vector<string>> res;
        vector<string> path = {beginWord};
        dfs(beginWord, endWord, adj, path, res);
        return res;
    }
    
    void dfs(string& curr, string& target, unordered_map<string, vector<string>>& adj, vector<string>& path, vector<vector<string>>& res) {
        if (curr == target) {
            res.push_back(path);
            return;
        }
        for (string& next : adj[curr]) {
            path.push_back(next);
            dfs(next, target, adj, path, res);
            path.pop_back();
        }
    }
};
```
