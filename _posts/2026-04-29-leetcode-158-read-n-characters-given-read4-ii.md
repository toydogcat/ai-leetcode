---
title: "LeetCode #158: Read N Characters Given Read4 II (用 Read4 讀取 N 個字元 II - 多次呼叫)"
categories:
  - String
  - Simulation
tags:
  - Hard
  - Python
  - C++
  - Premium
---

## 題目描述
這是一道 **LeetCode Premium** 題目。

這題是 [157. Read N Characters Given Read4](file:///home/toymsi/documents/projects/Github/ai-leetcode/_posts/2026-04-30-leetcode-157-read-n-characters-given-read4.md) 的進階版。
現在 `read` 函數可能會被 **多次呼叫**。

## 解題心得：剩餘資料的處理
為什麼多次呼叫會讓題目變難？
因為 `read4` 可能一次讀取了 4 個字元，但第一次呼叫 `read` 只需要 1 個字元。剩下的 3 個字元不能丟掉，必須存起來留給下一次 `read` 呼叫使用。

**實現步驟**：
1. 在類別中維護全域的緩衝區 `queue` 或 `buffer` 系統。
2. 每次呼叫 `read` 時：
   - 先從全域緩衝區中提取字元。
   - 如果緩衝區空了，呼叫 `read4` 補充資料到緩衝區。
   - 繼續這個過程直到讀滿 `n` 個字元或文件結束。

- **時間複雜度**: $O(n)$。
- **空間複雜度**: $O(1)$，全域緩衝區最大也就 4 個字元。

## 程式碼實作

### Python
```python
class Solution:
    def __init__(self):
        self.queue = []

    def read(self, buf, n):
        idx = 0
        while idx < n:
            # 如果 queue 裡有東西，先用掉
            if self.queue:
                buf[idx] = self.queue.pop(0)
                idx += 1
            else:
                # queue 空了，呼叫 read4 拿新的
                buf4 = [''] * 4
                count = read4(buf4)
                if count == 0: break
                self.queue.extend(buf4[:count])
                
        return idx
```

### C++
```cpp
class Solution {
private:
    char buf4[4];
    int bufPtr = 0;
    int bufCnt = 0;

public:
    int read(char *buf, int n) {
        int idx = 0;
        while (idx < n) {
            // 如果內部 buffer 已經空了，就補貨
            if (bufPtr == bufCnt) {
                bufCnt = read4(buf4);
                bufPtr = 0;
                if (bufCnt == 0) break;
            }
            // 從內部 buffer 搬運到目標 buf
            while (idx < n && bufPtr < bufCnt) {
                buf[idx++] = buf4[bufPtr++];
            }
        }
        return idx;
    }
};
```
