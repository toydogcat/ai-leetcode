---
title: "LeetCode #284: Peeking Iterator (頂峰迭代器)"
categories:
  - Design
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
請你設計一個迭代器，除了支持 `next` 和 `hasNext` 操作以外，還支持 `peek` 操作，用來返回下一個將要被返回的元素（但並不移動指針）。

**範例 1:**
```
假設迭代器初始化為 [1,2,3]
PeekingIterator peekingIterator = new PeekingIterator(new Iterator([1,2,3]));
peekingIterator.next();    // 返回 1
peekingIterator.peek();    // 返回 2
peekingIterator.next();    // 返回 2
peekingIterator.next();    // 返回 3
peekingIterator.hasNext(); // 返回 false
```

## 解題心得：緩存機制 (Caching)
常規的迭代器（Iterator）是不支持提前看下一個元素的（一旦獲取就移動了指針）。因此為了實現 `peek`，我們可以引入一個 **緩存（Cache）** 的概念。

**核心邏輯**：
1. **快取值**：我們引入一個變數 `next_val` 用來儲存下一個預備返回的元素，以及一個變數 `has_next_val`（布林值）記錄緩存中是否有資料。
2. **提前讀取（初始化與 `next()`）**：
   - 初始化時：先檢查原始迭代器是否有下一個元素。如果有，先調用原始迭代器的 `next()`，將其儲存進緩存 `next_val` 並設置 `has_next_val = True`。
   - `peek()`：直接返回緩存中 `next_val` 的值，不對原始迭代器做任何修改。
   - `next()`：返回當前緩存中的 `next_val` 的值，然後繼續提前讀取原始迭代器的下一個元素更新緩存。
3. **判斷結束**：`hasNext()` 只需要檢查緩存標記 `has_next_val` 是否為 `true`。

- **時間複雜度**: $O(1)$，所有的操作都在常數時間內完成。
- **空間複雜度**: $O(1)$，只需要保存一個元素大小的緩存空間。

## 程式碼實作

### Python
```python
# Below is the interface for Iterator, which is already defined for you.
#
# class Iterator:
#     def __init__(self, nums):
#         """
#         Initializes an iterator object to the beginning of a list.
#         :type nums: List[int]
#         """
#
#     def hasNext(self):
#         """
#         Returns true if the iteration has more elements.
#         :rtype: bool
#         """
#
#     def next(self):
#         """
#         Returns the next element in the iteration.
#         :rtype: int
#         """

class PeekingIterator:
    def __init__(self, iterator):
        """
        Initialize your data structure here.
        :type iterator: Iterator
        """
        self.iterator = iterator
        self.next_val = None
        self.has_next_val = False
        
        # 初始化快取
        self._advance()

    def _advance(self):
        if self.iterator.hasNext():
            self.next_val = self.iterator.next()
            self.has_next_val = True
        else:
            self.next_val = None
            self.has_next_val = False

    def peek(self):
        """
        Returns the next element in the iteration without advancing the iterator.
        :rtype: int
        """
        return self.next_val

    def next(self):
        """
        Returns the next element in the iteration.
        :rtype: int
        """
        ret = self.next_val
        self._advance()
        return ret

    def hasNext(self):
        """
        Returns true if the iteration has more elements.
        :rtype: bool
        """
        return self.has_next_val
```

### C++
```cpp
#include <vector>

// Below is the interface for Iterator, which is already defined for you.
// **DO NOT** modify the interface for Iterator.
class Iterator {
    struct Data;
    Data* data;
public:
    Iterator(const std::vector<int>& nums);
    Iterator(const Iterator& iter);
    virtual ~Iterator();
    bool hasNext() const;
    int next();
};

class PeekingIterator : public Iterator {
private:
    int nextVal;
    bool hasNextVal;

    void advance() {
        if (Iterator::hasNext()) {
            nextVal = Iterator::next();
            hasNextVal = true;
        } else {
            hasNextVal = false;
        }
    }

public:
    PeekingIterator(const std::vector<int>& nums) : Iterator(nums) {
        advance();
    }

    int peek() {
        return nextVal;
    }

    int next() {
        int ret = nextVal;
        advance();
        return ret;
    }

    bool hasNext() const {
        return hasNextVal;
    }
};
```
