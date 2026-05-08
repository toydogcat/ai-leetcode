---
title: "LeetCode #315: Count of Smaller Numbers After Self (計算右側小於當前元素的個數)"
categories:
  - Binary Indexed Tree
  - Segment Tree
  - Merge Sort
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個整數陣列 `nums`，按要求返回一個新陣列 `counts`。其中 `counts[i]` 是 `nums[i]` 右側小於 `nums[i]` 的元素的數量。

## 解題心得
本題如果使用雙重迴圈，時間複雜度為 $O(N^2)$，會導致逾時。我們可以使用 **合併排序 (Merge Sort)** 來計算逆序對：
- 在合併排序的過程中，我們會將左右兩個有序子陣列進行合併。
- 當我們把右半邊的元素放入合併後的陣列時，表示它比左半邊剩餘的某些元素小，這時可以累加逆序對計數。
- 或者，我們可以使用 **樹狀陣列 (Binary Indexed Tree / BIT)**：
  1. 將 `nums` 中的數字進行離散化（排序並分配排名）。
  2. 從右向左遍歷 `nums`，每次將當前數字在樹狀陣列中的頻率 + 1，並查詢小於當前排名的數字總數。

- **時間複雜度**: O(N log N)
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
class Solution:
    def countSmaller(self, nums: List[int]) -> List[int]:
        n = len(nums)
        ans = [0] * n
        indices = list(range(n))  # 追蹤原始索引
        
        def mergeSort(left, right):
            if right - left <= 1:
                return
            mid = (left + right) // 2
            mergeSort(left, mid)
            mergeSort(mid, right)
            
            temp = []
            i, j = left, mid
            while i < mid or j < right:
                # 若右半邊元素較小，或者左半邊已經排完
                if j < right and (i >= mid or nums[indices[i]] > nums[indices[j]]):
                    temp.append(indices[j])
                    j += 1
                else:
                    # 關鍵：此時右邊已經有 (j - mid) 個元素被排到前面，這些都是右邊小於當前左邊元素的個數
                    ans[indices[i]] += j - mid
                    temp.append(indices[i])
                    i += 1
            indices[left:right] = temp

        mergeSort(0, n)
        return ans
```

### C++
```cpp
#include <vector>
#include <numeric>

class Solution {
private:
    std::vector<int> ans;
    std::vector<int> indices;

    void mergeSort(std::vector<int>& nums, int left, int right) {
        if (right - left <= 1) return;
        int mid = left + (right - left) / 2;
        mergeSort(nums, left, mid);
        mergeSort(nums, mid, right);

        std::vector<int> temp;
        int i = left, j = mid;
        while (i < mid || j < right) {
            if (j < right && (i >= mid || nums[indices[i]] > nums[indices[j]])) {
                temp.push_back(indices[j]);
                j++;
            } else {
                ans[indices[i]] += j - mid;
                temp.push_back(indices[i]);
                i++;
            }
        }
        for (int k = 0; k < temp.size(); ++k) {
            indices[left + k] = temp[k];
        }
    }

public:
    std::vector<int> countSmaller(std::vector<int>& nums) {
        int n = nums.size();
        ans.resize(n, 0);
        indices.resize(n);
        std::iota(indices.begin(), indices.end(), 0);
        mergeSort(nums, 0, n);
        return ans;
    }
};
```
