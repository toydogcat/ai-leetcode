---
title: "LeetCode #215: Kth Largest Element in an Array (數組中的第 K 個最大元素)"
categories:
  - Array
  - Divide and Conquer
  - Quickselect
  - Heap
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定整數數組 `nums` 和整數 `k` ，請返回數組中第 `k` 個最大的元素。
請注意，你需要找的是數組排序後的第 `k` 個最大的元素，而不是第 `k` 個不同的元素。

## 解題心得：快速選擇 (Quickselect) 與 堆 (Heap)
這是一道面試高頻題，考察對排序和數據結構的理解。

**核心邏輯：**
1. **堆排序 (Heap Sort)**：維護一個大小為 `k` 的最小堆。遍歷數組，如果當前元素大於堆頂，則彈出堆頂並壓入當前元素。最後堆頂就是第 `k` 大元素。時間複雜度 $O(N \log k)$。
2. **快速選擇 (Quickselect)**：借鑑快速排序的分區 (Partition) 思想。每次分區後，我們可以確定基準點 `pivot` 的最終位置。如果該位置剛好是我們想要的索引，則直接返回；否則只在其中一半進行遞迴。平均時間複雜度 $O(N)$，最壞 $O(N^2)$（可通過隨機化基準點避免）。

- **時間複雜度**: 平均 $O(N)$。
- **空間複雜度**: $O(\log N)$ (遞迴棧)。

## 程式碼實作

### Python (使用內建堆)
```python
import heapq

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        # heapq 實現的是最小堆，維護大小為 k 的堆即可
        return heapq.nlargest(k, nums)[-1]
```

### C++ (快速選擇)
```cpp
#include <vector>
#include <algorithm>
#include <random>

class Solution {
public:
    int findKthLargest(std::vector<int>& nums, int k) {
        int target = nums.size() - k;
        int left = 0, right = nums.size() - 1;
        
        while (true) {
            int pivotIndex = partition(nums, left, right);
            if (pivotIndex == target) {
                return nums[pivotIndex];
            } else if (pivotIndex < target) {
                left = pivotIndex + 1;
            } else {
                right = pivotIndex - 1;
            }
        }
    }

private:
    int partition(std::vector<int>& nums, int left, int right) {
        // 隨機選取基準點以優化最壞情況
        int randomIndex = left + rand() % (right - left + 1);
        std::swap(nums[randomIndex], nums[right]);
        
        int pivot = nums[right];
        int i = left;
        for (int j = left; j < right; j++) {
            if (nums[j] <= pivot) {
                std::swap(nums[i++], nums[j]);
            }
        }
        std::swap(nums[i], nums[right]);
        return i;
    }
};
```
