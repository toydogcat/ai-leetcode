---
title: "LeetCode #390: Elimination Game (消除遊戲)"
categories:
  - Math
  - Recursion
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
1 到 n 的整數排成一列。從左到右、從右到左交替消除奇數項，求最後剩下的數字。時間複雜度 $O(\log N)$。

## 解題心得
這是一道巧妙的 **數學規律題**：
- 我們維護三個變數：當前數列的起點 `head`、相鄰數之間的步長 `step`、以及剩餘數字個數 `remaining`。
- 初始時：`head = 1`，`step = 1`，`remaining = n`，方向為 `left_to_right = True`。
- 在每一輪消除中：
  - 若方向是從左到右，起點 `head` 必定會被消除，因此 `head` 更新為 `head + step`。
  - 若方向是從右到左，且剩餘個數 `remaining` 是奇數，起點 `head` 也會被消除，更新為 `head + step`。
  - 每一輪結束後，步長倍增 `step *= 2`，剩餘個數減半 `remaining //= 2`，方向取反。
- 當 `remaining == 1` 時，`head` 即為答案。

- **時間複雜度**: O(\log N)
- **空間複雜度**: O(1)

## 程式碼實作

### Python
```python
class Solution:
    def lastRemaining(self, n: int) -> int:
        head = 1
        step = 1
        remaining = n
        left_to_right = True
        
        while remaining > 1:
            if left_to_right or remaining % 2 == 1:
                head += step
            step *= 2
            remaining //= 2
            left_to_right = not left_to_right
            
        return head
```

### C++
```cpp
class Solution {
public:
    int lastRemaining(int n) {
        int head = 1;
        int step = 1;
        int remaining = n;
        bool left_to_right = true;

        while (remaining > 1) {
            if (left_to_right || remaining % 2 == 1) {
                head += step;
            }
            step *= 2;
            remaining /= 2;
            left_to_right = !left_to_right;
        }
        return head;
    }
};
```
