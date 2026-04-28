---
title: "LeetCode #146: LRU Cache"
categories:
  - Hash Table
  - Linked List
  - Design
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
請你設計並實現一個滿足  **LRU (最近最少使用) 緩存** 約束的數據結構。
- `LRUCache(int capacity)` 以正整數作為容量 `capacity` 初始化 LRU 緩存。
- `get` 和 `put` 必須以 `O(1)` 的平均時間複雜度運行。

## 解題心得：記憶的淘汰
LRU 的核心是：**最近訪問的放在前面，最久沒用的放在後面。**
為了達到 `O(1)`，我們需要：
1. **HashMap：** 用來快速定位 Key 在哪裡。
2. **雙向鏈表 (Doubly Linked List)：** 用來快速移動、刪除和插入節點。

每當我們 `get` 或 `put` 一個 Key，就把對應節點移動到鏈表的頭部。如果容量滿了，就刪除鏈表尾部的節點。

### Python
```python
class Node:
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {} # key -> node
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_to_head(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add_to_head(node)
            return node.value
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self.cache[key] = node
        self._add_to_head(node)
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]
```

### C++
```cpp
struct Node {
    int key, value;
    Node *prev, *next;
    Node(int k = 0, int v = 0) : key(k), value(v), prev(nullptr), next(nullptr) {}
};

class LRUCache {
    int cap;
    unordered_map<int, Node*> cache;
    Node *head, *tail;

public:
    LRUCache(int capacity) : cap(capacity) {
        head = new Node();
        tail = new Node();
        head->next = tail;
        tail->prev = head;
    }

    void remove(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    void addToHead(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }

    int get(int key) {
        if (!cache.count(key)) return -1;
        Node* node = cache[key];
        remove(node);
        addToHead(node);
        return node->value;
    }

    void put(int key, int value) {
        if (cache.count(key)) {
            remove(cache[key]);
            delete cache[key];
        }
        Node* node = new Node(key, value);
        cache[key] = node;
        addToHead(node);
        if (cache.size() > cap) {
            Node* lru = tail->prev;
            cache.erase(lru->key);
            remove(lru);
            delete lru;
        }
    }
};
```
