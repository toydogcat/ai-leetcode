---
title: "LeetCode #355: Design Twitter (設計推特)"
categories:
  - Design
  - Hash Table
  - Heap (Priority Queue)
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
設計一個簡化版的推特，支援發送推文、關注/取消關注其他用戶、以及獲取用戶新鮮事（最新 10 條推文）。

## 解題心得
使用物件導向與多路歸併：
- 使用雜湊表記錄用戶關注的集合 `follows = {userId: set(followeeIds)}`。
- 使用雜湊表儲存每個用戶的推文鏈表或清單 `tweets = {userId: list(Tweet)}`，每條推文需帶有全域遞增的時戳 `timestamp`。
- 獲取新鮮事 `getNewsFeed` 時，我們把當前用戶以及他關注的所有用戶的最新推文，利用 **最大堆疊 (Max-Heap)** 或 **多路歸併 (K-way Merge)** 提取時戳最新的前 10 條推文。

- **時間複雜度**: getNewsFeed O(F \log 10) 其中 F 是關注的人數；其餘操作 O(1)
- **空間複雜度**: O(U + T) 用戶數與推文總數

## 程式碼實作

### Python
```python
import heapq

class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets = {}  # userId -> list of (time, tweetId)
        self.follows = {} # userId -> set of followeeId

    def postTweet(self, userId: int, tweetId: int) -> None:
        if userId not in self.tweets:
            self.tweets[userId] = []
        self.tweets[userId].append((self.time, tweetId))
        self.time += 1

    def getNewsFeed(self, userId: int) -> List[int]:
        candidates = []
        users = {userId}
        if userId in self.follows:
            users.update(self.follows[userId])
            
        for u in users:
            if u in self.tweets:
                # 取得該用戶最新的 10 條推文
                for t in self.tweets[u][-10:]:
                    candidates.append(t)
                    
        # 根據時間排序，取出前 10 個最新的
        newest_10 = sorted(candidates, key=lambda x: x[0], reverse=True)[:10]
        return [t[1] for t in newest_10]

    def follow(self, followerId: int, followeeId: int) -> None:
        if followerId not in self.follows:
            self.follows[followerId] = set()
        self.follows[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        if followerId in self.follows and followeeId in self.follows[followerId]:
            self.follows[followerId].remove(followeeId)
```

### C++
```cpp
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>
#include <queue>

class Twitter {
private:
    int time;
    std::unordered_map<int, std::vector<std::pair<int, int>>> tweets; // userId -> vector of {time, tweetId}
    std::unordered_map<int, std::unordered_set<int>> follows; // userId -> set of followeeIds

public:
    Twitter() : time(0) {}
    
    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({time++, tweetId});
    }
    
    std::vector<int> getNewsFeed(int userId) {
        std::vector<std::pair<int, int>> candidates;
        std::unordered_set<int> users = {userId};
        if (follows.count(userId)) {
            users.insert(follows[userId].begin(), follows[userId].end());
        }

        for (int u : users) {
            if (tweets.count(u)) {
                auto const& u_tweets = tweets[u];
                int start = std::max(0, (int)u_tweets.size() - 10);
                for (int i = start; i < u_tweets.size(); ++i) {
                    candidates.push_back(u_tweets[i]);
                }
            }
        }

        std::sort(candidates.begin(), candidates.end(), [](const std::pair<int, int>& a, const std::pair<int, int>& b) {
            return a.first > b.first;
        });

        std::vector<int> feed;
        for (int i = 0; i < std::min(10, (int)candidates.size()); ++i) {
            feed.push_back(candidates[i].second);
        }
        return feed;
    }
    
    void follow(int followerId, int followeeId) {
        follows[followerId].insert(followeeId);
    }
    
    void unfollow(int followerId, int followeeId) {
        if (follows.count(followerId)) {
            follows[followerId].erase(followeeId);
        }
    }
};
```
