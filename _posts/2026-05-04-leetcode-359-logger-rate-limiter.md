---
title: "LeetCode #359: Logger Rate Limiter (日誌速率限制器)"
categories:
  - Design
  - Hash Table
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
設計一個日誌過濾器，確保同一條日誌在 10 秒內只會被列印一次。

## 解題心得
使用一個雜湊表 `msg_map = {message: timestamp}`。
- 當一條新日誌抵達時，檢查其是否曾在雜湊表中出現。
- 若未出現，或當前時戳大於等於上次時戳加 10，則允許列印並更新時戳，返回 `true`。
- 否則，拒絕列印，返回 `false`。

- **時間複雜度**: 每次操作 O(1)
- **空間複雜度**: O(N) 其中 N 是不重複的日誌數量

## 程式碼實作

### Python
```python
class Logger:
    def __init__(self):
        self.records = {}

    def shouldPrintMessage(self, timestamp: int, message: str) -> bool:
        if message not in self.records or timestamp >= self.records[message] + 10:
            self.records[message] = timestamp
            return True
        return False
```

### C++
```cpp
#include <unordered_map>
#include <string>

class Logger {
private:
    std::unordered_map<std::string, int> records;

public:
    Logger() {}
    
    bool shouldPrintMessage(int timestamp, std::string message) {
        if (records.find(message) == records.end() || timestamp >= records[message] + 10) {
            records[message] = timestamp;
            return true;
        }
        return false;
    }
};
```
