---
title: "LeetCode #302: Smallest Rectangle Enclosing Black Pixels (包含黑色像素的最小矩形)"
categories:
  - Binary Search
  - Depth-First Search
  - Breadth-First Search
  - Matrix
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
圖片由一個二維的二進制矩陣 `image` 表示，其中 `'0'` 代表白色像素，`'1'` 代表黑色像素。所有黑色像素都是相連的。給你黑色像素的其中一個座標 `(x, y)`，求包含所有黑色像素的最小矩形的面積。

## 解題心得
由於黑色像素是相連的，因此投影到水平與垂直軸上時，黑色像素的投影區間也是連續的。這意味著我們可以使用 **二分搜尋**。我們可以分別對列和行進行二分搜尋，找到黑色像素的上下左右邊界：
- 尋找左邊界：在 `[0, y]` 區間內二分搜尋第一個包含 `'1'` 的列。
- 尋找右邊界：在 `[y + 1, N]` 區間內二分搜尋第一個不包含 `'1'` 的列。
- 尋找上邊界：在 `[0, x]` 區間內二分搜尋第一個包含 `'1'` 的行。
- 尋找下邊界：在 `[x + 1, M]` 區間內二分搜尋第一個不包含 `'1'` 的行。

- **時間複雜度**: O(M log N + N log M)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def minArea(self, image: List[List[str]], x: int, y: int) -> int:
        m, n = len(image), len(image[0])
        
        def has_black_row(row):
            return '1' in image[row]
            
        def has_black_col(col):
            return any(image[row][col] == '1' for row in range(m))
            
        def binary_search(low, high, check, find_first):
            while low < high:
                mid = (low + high) // 2
                if check(mid) == find_first:
                    high = mid
                else:
                    low = mid + 1
            return low

        top = binary_search(0, x, has_black_row, True)
        bottom = binary_search(x + 1, m, has_black_row, False)
        left = binary_search(0, y, has_black_col, True)
        right = binary_search(y + 1, n, has_black_col, False)
        
        return (bottom - top) * (right - left)
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
private:
    bool hasBlackRow(const std::vector<std::vector<char>>& image, int row) {
        for (char c : image[row]) {
            if (c == '1') return true;
        }
        return false;
    }

    bool hasBlackCol(const std::vector<std::vector<char>>& image, int col) {
        for (int r = 0; r < image.size(); ++r) {
            if (image[r][col] == '1') return true;
        }
        return false;
    }

    int searchRow(const std::vector<std::vector<char>>& image, int low, int high, bool findFirst) {
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (hasBlackRow(image, mid) == findFirst) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }

    int searchCol(const std::vector<std::vector<char>>& image, int low, int high, bool findFirst) {
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (hasBlackCol(image, mid) == findFirst) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }

public:
    int minArea(std::vector<std::vector<char>>& image, int x, int y) {
        int m = image.size();
        int n = image[0].size();
        
        int top = searchRow(image, 0, x, true);
        int bottom = searchRow(image, x + 1, m, false);
        int left = searchCol(image, 0, y, true);
        int right = searchCol(image, y + 1, n, false);
        
        return (bottom - top) * (right - left);
    }
};
```
