---
title: "LeetCode #157: Read N Characters Given Read4 (用 Read4 讀取 N 個字元)"
categories:
  - String
  - Simulation
tags:
  - Easy
  - Python
  - C++
  - Premium
---

## 題目描述
這是一道 **LeetCode Premium** 題目。

給定一個文件和一個 API `read4`，使用 `read4` 實現一個函數來讀取 `n` 個字元。
`read4` 的 API 定義如下：
- `int read4(char *buf)` 將從文件中讀取的 4 個字元放入緩衝區 `buf` 中，並返回實際讀取的字元數。

## 解題心得：緩衝區的管理
這題的關鍵在於 `read4` 每次固定讀取 4 個字元，但我們可能只需要其中的一部分，或者文件剩下的字元不足 4 個。

**實現步驟**：
1. 準備一個長度為 4 的臨時緩衝區 `buf4`。
2. 在循環中呼叫 `read4(buf4)`。
3. 將 `buf4` 中的字元複製到目標緩衝區 `buf` 中。
4. 停止條件：
   - 已經讀取了 `n` 個字元。
   - `read4` 返回的值小於 4（代表文件已讀完）。

- **時間複雜度**: $O(n)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
"""
The read4 API is already defined for you.
@param buf4, a list of characters
@return an integer
def read4(buf4):
"""

class Solution:
    def read(self, buf, n):
        """
        :type buf: Destination buffer (List[str])
        :type n: Number of characters to read (int)
        :rtype: The number of actual characters read (int)
        """
        idx = 0
        buf4 = [''] * 4
        
        while idx < n:
            count = read4(buf4)
            if count == 0: break
            
            # 決定這次要從 buf4 複製多少個字元
            for i in range(min(count, n - idx)):
                buf[idx] = buf4[i]
                idx += 1
                
        return idx
```

### C++
```cpp
/**
 * The read4 API is defined in the parent class Reader4.
 *     int read4(char *buf4);
 */

class Solution {
public:
    int read(char *buf, int n) {
        int idx = 0;
        char buf4[4];
        
        while (idx < n) {
            int count = read4(buf4);
            if (count == 0) break;
            
            for (int i = 0; i < count && idx < n; ++i) {
                buf[idx++] = buf4[i];
            }
        }
        return idx;
    }
};
```
