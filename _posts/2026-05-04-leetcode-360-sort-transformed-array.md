---
title: "LeetCode #360: Sort Transformed Array (有序轉化陣列)"
categories:
  - Two Pointers
  - Math
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個已排序的整數陣列 `nums` 以及三個常數 `a, b, c`。將每個數代入二次函數 $f(x) = ax^2 + bx + c$，並將結果升序排序。時間複雜度 $O(N)$。

## 解題心得
使用 **雙指針** 結合二次函數特性：
- 當 `a > 0` 時，二次函數開口向上，兩端的函數值大，中間的函數值小。我們可以使用雙指針 `left = 0, right = n - 1`，每次比較兩端的函數值，較大者填入結果陣列的「後方」，指針向內靠攏。
- 當 `a < 0` 時，二次函數開口向下，兩端的函數值小，中間的函數值大。我們同樣使用雙指針，比較兩端的函數值，較小者填入結果陣列的「前方」，指針向內靠攏。
- 當 `a == 0` 時，是一次函數（單調遞增或遞減），也可以用同樣的雙指針邏輯直接處理。

- **時間複雜度**: O(N)
- **空間複雜度**: O(1) 扣除回傳陣列

## 程式碼實作

### Python
```python
class Solution:
    def sortTransformedArray(self, nums: List[int], a: int, b: int, c: int) -> List[int]:
        def f(x):
            return a * x * x + b * x + c
            
        n = len(nums)
        ans = [0] * n
        left, right = 0, n - 1
        
        # 開口向上，大值在兩端
        if a >= 0:
            idx = n - 1
            while left <= right:
                v_left, v_right = f(nums[left]), f(nums[right])
                if v_left > v_right:
                    ans[idx] = v_left
                    left += 1
                else:
                    ans[idx] = v_right
                    right -= 1
                idx -= 1
        # 開口向下，小值在兩端
        else:
            idx = 0
            while left <= right:
                v_left, v_right = f(nums[left]), f(nums[right])
                if v_left < v_right:
                    ans[idx] = v_left
                    left += 1
                else:
                    ans[idx] = v_right
                    right -= 1
                idx += 1
                
        return ans
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
private:
    int f(int x, int a, int b, int c) {
        return a * x * x + b * x + c;
    }

public:
    std::vector<int> sortTransformedArray(std::vector<int>& nums, int a, int b, int c) {
        int n = nums.size();
        std::vector<int> ans(n);
        int left = 0, right = n - 1;

        if (a >= 0) {
            int idx = n - 1;
            while (left <= right) {
                int v_left = f(nums[left], a, b, c);
                int v_right = f(nums[right], a, b, c);
                if (v_left > v_right) {
                    ans[idx--] = v_left;
                    left++;
                } else {
                    ans[idx--] = v_right;
                    right--;
                }
            }
        } else {
            int idx = 0;
            while (left <= right) {
                int v_left = f(nums[left], a, b, c);
                int v_right = f(nums[right], a, b, c);
                if (v_left < v_right) {
                    ans[idx++] = v_left;
                    left++;
                } else {
                    ans[idx++] = v_right;
                    right--;
                }
            }
        }
        return ans;
    }
};
```
