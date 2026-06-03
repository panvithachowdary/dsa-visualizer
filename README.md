# DSA Visualizer

DSA Visualizer is an interactive web application that helps users understand Data Structures and Algorithms through real-time visualizations, animations, and step-by-step execution.

The platform transforms complex algorithmic concepts into intuitive visual experiences, making learning more engaging for students, interview candidates, and developers.

---

## Features

### Sorting Visualizer

Visualize how sorting algorithms work internally.

Supported algorithms:

* Bubble Sort
* Merge Sort
* Quick Sort

Features:

* Custom array input
* Random array generation
* Speed control
* Play and pause controls
* Step forward and step backward navigation
* Live operation descriptions
* Complexity analysis

---

### Graph Visualizer

Explore graph traversal algorithms using custom graph inputs.

Supported algorithms:

* Breadth First Search (BFS)
* Depth First Search (DFS)

Features:

* Custom graph input
* Traversal order visualization
* Interactive node highlighting
* Real-time traversal updates

Example:

```text
1-2, 1-3, 2-4, 3-5
```

---

### Tree Visualizer

Visualize Binary Search Tree operations.

Supported operations:

* BST Search
* Inorder Traversal
* Insert Node

Features:

* Custom tree input
* Search path visualization
* Node highlighting
* Traversal order display

Example:

```text
50, 30, 70, 20, 40, 60, 80
```

---

### Problem Solver Mode

Recommend suitable algorithms based on user input.

Examples:

```text
Sort [9,4,7,1,3]
```

```text
Graph 1-2, 1-3, 2-4, 3-5
```

```text
Tree: 50,30,70,20,40,60,80
```

Features:

* Algorithm recommendation
* Input detection
* Automatic visualization loading
* Educational guidance

---

### Compare Mode

Compare algorithms side-by-side using the same input.

Metrics:

* Comparisons
* Swaps
* Writes
* Time Complexity

---

## Keyboard Shortcuts

| Key         | Action           |
| ----------- | ---------------- |
| Space       | Play / Pause     |
| Right Arrow | Next Step        |
| Left Arrow  | Previous Step    |
| R           | Reset Visualizer |

---

## Technology Stack

### Frontend

* React
* JavaScript
* CSS
* Vite

### Concepts Implemented

* Sorting Algorithms
* Graph Traversal
* Binary Search Trees
* State Management
* Algorithm Simulation
* Local Storage Persistence
* Interactive Visualization

---


## Project Structure

```text
src/
├── App.jsx
├── App.css
├── main.jsx
├── assets/

public/
├── favicon.svg
├── icons.svg
```

---

## Future Enhancements

* Dijkstra Algorithm
* AVL Tree Visualizer
* Heap Visualizer
* Drag-and-Drop Graph Builder
* Theme Customization
* Performance Benchmarking
* Additional Tree Traversals

---

## Motivation

Many students memorize algorithms without fully understanding how they operate internally.

This project aims to make algorithm learning more visual, interactive, and intuitive through animation, custom inputs, and guided exploration.

---

## Author

Panvitha Chowdary Murakonda

## License

This project is licensed under the MIT License.
