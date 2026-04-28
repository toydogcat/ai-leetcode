---
title: "LeetCode #127: Word Ladder"
categories:
  - Hash Table
  - String
  - BFS
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
字典 `wordList` 中從單詞 `beginWord` 到 `endWord` 的 **最短轉換序列** 中的單詞數目。
每次只能改變一個字母，轉換後的單詞必須在 `wordList` 中。

## 解題心得：地圖的最短距離
找最短路徑，第一反應就是 **BFS (廣度優先搜索)**。
這題的「圖」中，節點是單詞，邊是「相差一個字母」。
我們可以使用隊列來記錄當前層級的單詞，並用一個集合 `visited` 記錄已訪問過的單詞，防止死循環。

### Python
```python
from collections import deque

class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        wordSet = set(wordList)
        if endWord not in wordSet: return 0
        
        queue = deque([(beginWord, 1)])
        while queue:
            word, length = queue.popleft()
            if word == endWord:
                return length
            
            for i in range(len(word)):
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    next_word = word[:i] + c + word[i+1:]
                    if next_word in wordSet:
                        queue.append((next_word, length + 1))
                        wordSet.remove(next_word) # 標記為已訪問
                        
        return 0
```

### C++
```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return 0;
        
        queue<pair<string, int>> q;
        q.push({beginWord, 1});
        
        while (!q.empty()) {
            string word = q.front().first;
            int length = q.front().second;
            q.pop();
            
            if (word == endWord) return length;
            
            for (int i = 0; i < word.length(); ++i) {
                char original = word[i];
                for (char c = 'a'; c <= 'z'; ++c) {
                    word[i] = c;
                    if (dict.count(word)) {
                        q.push({word, length + 1});
                        dict.erase(word);
                    }
                }
                word[i] = original;
            }
        }
        return 0;
    }
};
```
