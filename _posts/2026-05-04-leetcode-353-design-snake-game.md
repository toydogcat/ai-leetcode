---
title: "LeetCode #353: Design Snake Game (設計貪吃蛇)"
categories:
  - Design
  - Queue
  - Hash Table
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
設計一個貪吃蛇遊戲。蛇在一個大小為 `width x height` 的網格上移動，遊戲提供食物的位置。蛇每吃到一個食物長度加 1，若撞到邊界或自己則遊戲結束。

## 解題心得
使用一個雙端佇列 `deque` 記錄蛇身（蛇頭在最前，蛇尾在最後），並用一個雜湊集合 `set` 以 $O(1)$ 時間檢查蛇是否撞到自己。每次移動時，先計算新蛇頭位置：
1. 若出界，返回 -1。
2. 先移除蛇尾（除非能吃到食物），再檢查新蛇頭是否撞到剩餘的身體。
3. 若新蛇頭與食物位置吻合，代表吃到食物，此時不縮短蛇尾，並將食物索引加 1，更新得分。
4. 將新蛇頭加入佇列前端與雜湊集合中。

- **時間複雜度**: 每次移動 O(1)
- **空間複雜度**: O(W * H + F) 食物與蛇身長度

## 程式碼實作

### Python
```python
from collections import deque

class SnakeGame:
    def __init__(self, width: int, height: int, food: List[List[int]]):
        self.width = width
        self.height = height
        self.food = food
        self.food_idx = 0
        self.snake = deque([(0, 0)])
        self.snake_set = {(0, 0)}
        self.score = 0

    def move(self, direction: str) -> int:
        head_r, head_c = self.snake[0]
        if direction == "U": head_r -= 1
        elif direction == "D": head_r += 1
        elif direction == "L": head_c -= 1
        elif direction == "R": head_c += 1
        
        # 檢查撞牆
        if not (0 <= head_r < self.height and 0 <= head_c < self.width):
            return -1
            
        # 暫時彈出尾巴，因為頭可以移到尾巴原本的位置
        tail = self.snake.pop()
        self.snake_set.remove(tail)
        
        # 檢查撞自己
        if (head_r, head_c) in self.snake_set:
            return -1
            
        # 檢查吃食物
        if self.food_idx < len(self.food) and [head_r, head_c] == self.food[self.food_idx]:
            self.score += 1
            self.food_idx += 1
            # 把尾巴加回來
            self.snake.append(tail)
            self.snake_set.add(tail)
            
        self.snake.appendleft((head_r, head_c))
        self.snake_set.add((head_r, head_c))
        return self.score
```

### C++
```cpp
#include <vector>
#include <string>
#include <deque>
#include <set>

class SnakeGame {
private:
    int width, height;
    std::vector<std::vector<int>> food;
    int food_idx;
    std::deque<std::pair<int, int>> snake;
    std::set<std::pair<int, int>> snake_set;
    int score;

public:
    SnakeGame(int width, int height, std::vector<std::vector<int>>& food) 
        : width(width), height(height), food(food), food_idx(0), score(0) {
        snake.push_back({0, 0});
        snake_set.insert({0, 0});
    }
    
    int move(std::string direction) {
        int head_r = snake.front().first;
        int head_c = snake.front().second;
        
        if (direction == "U") head_r--;
        else if (direction == "D") head_r++;
        else if (direction == "L") head_c--;
        else if (direction == "R") head_c++;
        
        if (head_r < 0 || head_r >= height || head_c < 0 || head_c >= width) return -1;
        
        auto tail = snake.back();
        snake.pop_back();
        snake_set.erase(tail);
        
        if (snake_set.count({head_r, head_c})) return -1;
        
        if (food_idx < food.size() && head_r == food[food_idx][0] && head_c == food[food_idx][1]) {
            score++;
            food_idx++;
            snake.push_back(tail);
            snake_set.insert(tail);
        }
        
        snake.push_front({head_r, head_c});
        snake_set.insert({head_r, head_c});
        return score;
    }
};
```
