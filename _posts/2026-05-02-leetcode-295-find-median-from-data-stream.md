---
title: "LeetCode #295: Find Median from Data Stream (從數據流中尋找中位數)"
categories:
  - Design
  - Heap
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
**中位數** 是有序整數列表中的中間值。如果列表的大小是偶數，則沒有中間值，中位數是兩個中間值的平均值。

例如：
- `[2,3,4]` 的中位數是 `3`。
- `[2,3]` 的中位數是 `(2 + 3) / 2 = 2.5`。

請設計一個支持以下兩種操作的數據結構：
- `void addNum(int num)`：從數據流中添加一個整數到數據結構中。
- `double findMedian()`：返回目前所有元素的中位數。

**範例 1:**
```
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // 數組為 [1]
medianFinder.addNum(2);    // 數組為 [1,2]
medianFinder.findMedian(); // 返回 1.5
medianFinder.addNum(3);    // 數組為 [1,2,3]
medianFinder.findMedian(); // 返回 2.0
```

## 解題心得：雙堆疊維護中位數 (Two Heaps)
要在數據流中快速獲取中位數，如果每次加入數字都進行排序，時間複雜度為 $O(N \log N)$，效率較低。

一個高效的做法是使用兩個堆疊（Heaps）：
1. **大頂堆（Max-Heap）**：儲存所有數字中 **較小的前半部分**。
2. **小頂堆（Min-Heap）**：儲存所有數字中 **較大的後半部分**。

**核心邏輯**：
- **大小平衡**：我們約定 `Max-Heap` 的大小總是等於 `Min-Heap` 的大小，或是比 `Min-Heap` 多一個元素。
- **添加數字 (`addNum`)**：
  - 先將 `num` 放入 `Max-Heap`。
  - 為了保持大小平衡，我們將 `Max-Heap` 的堆頂元素彈出，並放入 `Min-Heap`。
  - 如果此時 `Min-Heap` 的大小大於 `Max-Heap` 的大小，我們再將 `Min-Heap` 的堆頂元素彈出並放回 `Max-Heap`。
- **獲取中位數 (`findMedian`)**：
  - 如果兩堆的大小不相等，中位數就是 `Max-Heap` 的堆頂元素。
  - 如果兩堆的大小相等，中位數就是兩堆堆頂元素的平均值。

- **時間複雜度**: `addNum` $O(\log N)$，`findMedian` $O(1)$。
- **空間複雜度**: $O(N)$，用於儲存所有數據流中的數字。

## 程式碼實作

### Python
```python
import heapq

class MedianFinder:
    def __init__(self):
        # Python 預設為小頂堆，大頂堆需要存負數
        self.small = []  # max-heap，儲存較小的前半段
        self.large = []  # min-heap，儲存較大的後半段

    def addNum(self, num: int) -> None:
        # 1. 放入大頂堆
        heapq.heappush(self.small, -num)
        
        # 2. 轉移至小頂堆
        val = -heapq.heappop(self.small)
        heapq.heappush(self.large, val)
        
        # 3. 保持 small 堆的大小等於或大於 large 堆
        if len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return -self.small[0]
        else:
            return (-self.small[0] + self.large[0]) / 2.0
```

### C++
```cpp
#include <queue>
#include <vector>

class MedianFinder {
private:
    std::priority_queue<int> small; // 大頂堆，儲存較小的前半部分
    std::priority_queue<int, std::vector<int>, std::greater<int>> large; // 小頂堆，儲存較大的後半部分

public:
    MedianFinder() {}

    void addNum(int num) {
        small.push(num);

        large.push(small.top());
        small.pop();

        if (large.size() > small.size()) {
            small.push(large.top());
            large.pop();
        }
    }

    double findMedian() {
        if (small.size() > large.size()) {
            return small.top();
        } else {
            return (small.top() + large.top()) / 2.0;
        }
    }
};
```
