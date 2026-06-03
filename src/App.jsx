import { useEffect, useState } from "react";
import "./App.css";

const categories = [
  { id: "sorting", title: "Sorting", desc: "Visualize Bubble, Merge, and Quick Sort step-by-step." },
  { id: "graph", title: "Graph", desc: "Explore BFS, DFS, and Dijkstra shortest path." },
  { id: "tree", title: "Tree", desc: "Learn BST insert, search, and traversals." },
];

const algorithms = {
  sorting: ["Bubble Sort", "Merge Sort", "Quick Sort"],
  graph: ["BFS", "DFS", "Dijkstra"],
  tree: ["BST Insert", "BST Search", "Inorder Traversal"],
};

function App() {
  const [mode, setMode] = useState("home");
  const [category, setCategory] = useState("sorting");
  const [selectedAlgo, setSelectedAlgo] = useState("Bubble Sort");

  const [array, setArray] = useState([45, 80, 30, 60, 100, 25, 70, 50]);
  const [customInput, setCustomInput] = useState("45, 80, 30, 60, 100, 25, 70, 50");
  const [arraySize, setArraySize] = useState(10);

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [description, setDescription] = useState("Ready");
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const [problem, setProblem] = useState("");
  const [matches, setMatches] = useState([]);

  const [compareLeft, setCompareLeft] = useState("Bubble Sort");
  const [compareRight, setCompareRight] = useState("Merge Sort");
  const [compareArray, setCompareArray] = useState([40, 75, 20, 90, 35, 60, 15, 80]);

  const [visitedNodes, setVisitedNodes] = useState([]);
  const [graphInput, setGraphInput] = useState("1-2, 1-3, 2-4, 3-5");
  const [graphStart, setGraphStart] = useState("1");
  const [graphOrder, setGraphOrder] = useState([]);

  const [treeValue, setTreeValue] = useState("");
  const [highlightNode, setHighlightNode] = useState(null);
  const [treeInput, setTreeInput] = useState("50, 30, 70, 20, 40, 60, 80");
  const [treeOrder, setTreeOrder] = useState([]);

  function clearAnimation(message) {
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setComparisons(0);
    setSwaps(0);
    setDescription(message);
  }

  function generateRandomArray(size = arraySize) {
    const nums = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
    setArray(nums);
    setCustomInput(nums.join(", "));
    clearAnimation("New random array generated");
  }

  function applyCustomArray() {
    const nums = customInput
      .split(",")
      .map((num) => Number(num.trim()))
      .filter((num) => !isNaN(num) && num > 0);

    if (nums.length === 0) {
      setDescription("Please enter valid numbers separated by commas");
      return;
    }

    setArray(nums);
    setArraySize(nums.length);
    clearAnimation("Custom array loaded");
  }

  function generateBubbleSortSteps() {
    const arr = [...array];
    const tempSteps = [];
    let compareCount = 0;
    let swapCount = 0;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        compareCount++;

        tempSteps.push({
          array: [...arr],
          compare: [j, j + 1],
          comparisons: compareCount,
          swaps: swapCount,
          description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
        });

        if (arr[j] > arr[j + 1]) {
          const left = arr[j];
          const right = arr[j + 1];
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapCount++;

          tempSteps.push({
            array: [...arr],
            swap: [j, j + 1],
            comparisons: compareCount,
            swaps: swapCount,
            description: `${left} > ${right}, so swapping them`,
          });
        }
      }
    }

    tempSteps.push({
      array: [...arr],
      comparisons: compareCount,
      swaps: swapCount,
      description: "Array sorted successfully using Bubble Sort",
    });

    setSteps(tempSteps);
    setCurrentStep(0);
    setIsPlaying(false);
    setComparisons(0);
    setSwaps(0);
    setDescription("Bubble Sort steps generated. Press Play.");
  }

  function generateMergeSortSteps() {
    const arr = [...array];
    const tempSteps = [];
    let compareCount = 0;
    let writeCount = 0;

    function mergeSort(left, right) {
      if (left >= right) return;

      const mid = Math.floor((left + right) / 2);
      mergeSort(left, mid);
      mergeSort(mid + 1, right);

      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);

      let i = 0;
      let j = 0;
      let k = left;

      while (i < leftArr.length && j < rightArr.length) {
        compareCount++;

        tempSteps.push({
          array: [...arr],
          compare: [left + i, mid + 1 + j],
          comparisons: compareCount,
          swaps: writeCount,
          description: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
        });

        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          i++;
        } else {
          arr[k] = rightArr[j];
          j++;
        }

        writeCount++;

        tempSteps.push({
          array: [...arr],
          swap: [k],
          comparisons: compareCount,
          swaps: writeCount,
          description: `Writing ${arr[k]} at index ${k}`,
        });

        k++;
      }

      while (i < leftArr.length) {
        arr[k] = leftArr[i];
        writeCount++;
        tempSteps.push({
          array: [...arr],
          swap: [k],
          comparisons: compareCount,
          swaps: writeCount,
          description: `Copying remaining ${arr[k]} at index ${k}`,
        });
        i++;
        k++;
      }

      while (j < rightArr.length) {
        arr[k] = rightArr[j];
        writeCount++;
        tempSteps.push({
          array: [...arr],
          swap: [k],
          comparisons: compareCount,
          swaps: writeCount,
          description: `Copying remaining ${arr[k]} at index ${k}`,
        });
        j++;
        k++;
      }
    }

    mergeSort(0, arr.length - 1);

    tempSteps.push({
      array: [...arr],
      comparisons: compareCount,
      swaps: writeCount,
      description: "Array sorted successfully using Merge Sort",
    });

    setSteps(tempSteps);
    setCurrentStep(0);
    setIsPlaying(false);
    setComparisons(0);
    setSwaps(0);
    setDescription("Merge Sort steps generated. Press Play.");
  }

  function generateQuickSortSteps() {
    const arr = [...array];
    const tempSteps = [];
    let compareCount = 0;
    let swapCount = 0;

    function partition(low, high) {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        compareCount++;

        tempSteps.push({
          array: [...arr],
          compare: [j, high],
          comparisons: compareCount,
          swaps: swapCount,
          description: `Comparing ${arr[j]} with pivot ${pivot}`,
        });

        if (arr[j] < pivot) {
          i++;
          const left = arr[i];
          const right = arr[j];
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swapCount++;

          tempSteps.push({
            array: [...arr],
            swap: [i, j],
            comparisons: compareCount,
            swaps: swapCount,
            description: `Swapping ${left} and ${right}`,
          });
        }
      }

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      swapCount++;

      tempSteps.push({
        array: [...arr],
        swap: [i + 1, high],
        comparisons: compareCount,
        swaps: swapCount,
        description: `Placing pivot ${pivot} in correct position`,
      });

      return i + 1;
    }

    function quickSort(low, high) {
      if (low < high) {
        const pivotIndex = partition(low, high);
        quickSort(low, pivotIndex - 1);
        quickSort(pivotIndex + 1, high);
      }
    }

    quickSort(0, arr.length - 1);

    tempSteps.push({
      array: [...arr],
      comparisons: compareCount,
      swaps: swapCount,
      description: "Array sorted successfully using Quick Sort",
    });

    setSteps(tempSteps);
    setCurrentStep(0);
    setIsPlaying(false);
    setComparisons(0);
    setSwaps(0);
    setDescription("Quick Sort steps generated. Press Play.");
  }

  function runSelectedAlgorithm() {
    if (selectedAlgo === "Bubble Sort") generateBubbleSortSteps();
    else if (selectedAlgo === "Merge Sort") generateMergeSortSteps();
    else if (selectedAlgo === "Quick Sort") generateQuickSortSteps();
    else setDescription(`${selectedAlgo} animation will be added next`);
  }

  function resetVisualizer() {
    const base = [45, 80, 30, 60, 100, 25, 70, 50];
    setArray(base);
    setCustomInput(base.join(", "));
    setArraySize(10);
    clearAnimation("Ready");
  }

  useEffect(() => {
    if (!isPlaying || steps.length === 0) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [isPlaying, steps, speed]);

  useEffect(() => {
    if (steps.length > 0) {
      const step = steps[currentStep];
      setArray(step.array);
      setDescription(step.description);
      setComparisons(step.comparisons || 0);
      setSwaps(step.swaps || 0);
    }
  }, [currentStep, steps]);

  useEffect(() => {
    function handleKey(e) {
      if (mode !== "explorer") return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }

      if (e.key === "ArrowRight") {
        setCurrentStep((s) => Math.min(s + 1, Math.max(steps.length - 1, 0)));
      }

      if (e.key === "ArrowLeft") {
        setCurrentStep((s) => Math.max(s - 1, 0));
      }

      if (e.key.toLowerCase() === "r") {
        resetVisualizer();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [mode, steps.length]);

  useEffect(() => {
    const savedArray = localStorage.getItem("dsa-array");
    const savedCustomInput = localStorage.getItem("dsa-customInput");
    const savedSpeed = localStorage.getItem("dsa-speed");
    const savedGraphInput = localStorage.getItem("dsa-graphInput");
    const savedGraphStart = localStorage.getItem("dsa-graphStart");
    const savedTreeInput = localStorage.getItem("dsa-treeInput");

    if (savedArray) {
      try {
        const parsed = JSON.parse(savedArray);
        if (Array.isArray(parsed)) {
          setArray(parsed);
          setArraySize(parsed.length);
        }
      } catch {
        localStorage.removeItem("dsa-array");
      }
    }

    if (savedCustomInput) setCustomInput(savedCustomInput);
    if (savedSpeed) setSpeed(Number(savedSpeed));
    if (savedGraphInput) setGraphInput(savedGraphInput);
    if (savedGraphStart) setGraphStart(savedGraphStart);
    if (savedTreeInput) setTreeInput(savedTreeInput);
  }, []);

  useEffect(() => {
    localStorage.setItem("dsa-array", JSON.stringify(array));
    localStorage.setItem("dsa-customInput", customInput);
    localStorage.setItem("dsa-speed", String(speed));
    localStorage.setItem("dsa-graphInput", graphInput);
    localStorage.setItem("dsa-graphStart", graphStart);
    localStorage.setItem("dsa-treeInput", treeInput);
  }, [array, customInput, speed, graphInput, graphStart, treeInput]);

  function buildGraphFromInput() {
    const graph = {};

    graphInput.split(",").forEach((edge) => {
      const [a, b] = edge.split("-").map((x) => x.trim());

      if (!a || !b) return;

      if (!graph[a]) graph[a] = [];
      if (!graph[b]) graph[b] = [];

      graph[a].push(b);
      graph[b].push(a);
    });

    return graph;
  }

  function runBFS() {
    const graph = buildGraphFromInput();
    const start = graphStart.trim();

    if (!graph[start]) {
      setDescription("Start node not found in graph");
      return;
    }

    const queue = [start];
    const visited = new Set();
    const order = [];

    while (queue.length) {
      const node = queue.shift();

      if (visited.has(node)) continue;

      visited.add(node);
      order.push(node);

      graph[node].forEach((next) => {
        if (!visited.has(next)) queue.push(next);
      });
    }

    setGraphOrder(order);
    setVisitedNodes([]);
    setDescription("BFS started");

    order.forEach((node, index) => {
      setTimeout(() => {
        setVisitedNodes((prev) => [...prev, node]);
        setDescription(`BFS visiting node ${node}`);
      }, index * 700);
    });
  }

  function runDFS() {
    const graph = buildGraphFromInput();
    const start = graphStart.trim();

    if (!graph[start]) {
      setDescription("Start node not found in graph");
      return;
    }

    const visited = new Set();
    const order = [];

    function dfs(node) {
      if (visited.has(node)) return;

      visited.add(node);
      order.push(node);

      graph[node].forEach((next) => dfs(next));
    }

    dfs(start);

    setGraphOrder(order);
    setVisitedNodes([]);
    setDescription("DFS started");

    order.forEach((node, index) => {
      setTimeout(() => {
        setVisitedNodes((prev) => [...prev, node]);
        setDescription(`DFS visiting node ${node}`);
      }, index * 700);
    });
  }

  function getTreeNumbers() {
    return treeInput
      .split(",")
      .map((num) => Number(num.trim()))
      .filter((num) => !isNaN(num));
  }

  function searchNode() {
    const nums = getTreeNumbers();
    const value = Number(treeValue);

    if (!value || nums.length === 0) {
      setDescription("Enter tree values and search value");
      return;
    }

    let current = nums[0];
    const path = [];

    while (current !== undefined) {
      path.push(current);

      if (value === current) break;

      const nextNums = nums.filter((n) =>
        value < current ? n < current : n > current
      );

      current = nextNums.find((n) =>
        value < current
          ? n === Math.max(...nextNums)
          : n === Math.min(...nextNums)
      );

      if (!current) break;
    }

    setTreeOrder(path);
    setHighlightNode(null);

    path.forEach((node, index) => {
      setTimeout(() => {
        setHighlightNode(node);
        setDescription(`Searching node ${node}`);
      }, index * 700);
    });
  }

  function inorderTraversal() {
    const nums = getTreeNumbers().sort((a, b) => a - b);

    if (nums.length === 0) {
      setDescription("Enter tree values first");
      return;
    }

    setTreeOrder(nums);
    setHighlightNode(null);

    nums.forEach((node, index) => {
      setTimeout(() => {
        setHighlightNode(node);
        setDescription(`Inorder visiting ${node}`);
      }, index * 600);
    });
  }

  function insertNode() {
    if (!treeValue) {
      setDescription("Enter a value to insert");
      return;
    }

    const nums = getTreeNumbers();
    const value = Number(treeValue);

    if (!nums.includes(value)) nums.push(value);

    setTreeInput(nums.join(", "));
    setDescription(`Inserted ${treeValue}`);
  }

  function resetTree() {
    setHighlightNode(null);
    setTreeValue("");
    setTreeOrder([]);
    setDescription("Tree reset");
  }

  function findAlgorithms() {
    const text = problem.toLowerCase();
    const result = [];

    const hasArray = /\[[0-9,\s]+\]/.test(problem);
    const hasGraph = /(\d+\s*-\s*\d+)/.test(problem);
    const hasTree =
      text.includes("tree") ||
      text.includes("bst") ||
      text.includes("binary search tree");

    if (hasArray || text.includes("sort") || text.includes("array")) {
      result.push({
        name: "Quick Sort",
        category: "sorting",
        reason: "Fast average-case sorting for arrays.",
        time: "O(n log n)",
      });

      result.push({
        name: "Merge Sort",
        category: "sorting",
        reason: "Guaranteed O(n log n) sorting.",
        time: "O(n log n)",
      });

      result.push({
        name: "Bubble Sort",
        category: "sorting",
        reason: "Best for learning comparisons step-by-step.",
        time: "O(n²)",
      });
    }

    if (
      hasGraph ||
      text.includes("graph") ||
      text.includes("path") ||
      text.includes("traverse")
    ) {
      result.push({
        name: "BFS",
        category: "graph",
        reason: "Level-order traversal from a start node.",
        time: "O(V + E)",
      });

      result.push({
        name: "DFS",
        category: "graph",
        reason: "Depth-first traversal through connected nodes.",
        time: "O(V + E)",
      });
    }

    if (hasTree) {
      result.push({
        name: "BST Search",
        category: "tree",
        reason: "Search values using BST rules.",
        time: "O(h)",
      });

      result.push({
        name: "Inorder Traversal",
        category: "tree",
        reason: "Returns values in sorted order.",
        time: "O(n)",
      });
    }

    if (result.length === 0) {
      result.push({
        name: "BFS",
        category: "graph",
        reason: "General-purpose traversal for connected data.",
        time: "O(V + E)",
      });
    }

    setMatches(result);
  }

  function useAlgorithm(item) {
    const foundArray = problem.match(/\[([0-9,\s]+)\]/);

    if (foundArray) {
      const nums = foundArray[1]
        .split(",")
        .map((x) => Number(x.trim()))
        .filter((x) => !isNaN(x));

      if (nums.length) {
        setArray(nums);
        setCustomInput(nums.join(", "));
        setArraySize(nums.length);
      }
    }

    const graphEdges = problem.match(/(\d+\s*-\s*\d+)/g);

    if (graphEdges) {
      setGraphInput(graphEdges.join(", "));
      const firstStart = graphEdges[0].split("-")[0].trim();
      setGraphStart(firstStart);
    }

    const treeValues = problem.match(/tree:\s*([0-9,\s]+)/i);

    if (treeValues) {
      setTreeInput(treeValues[1]);
    }

    setCategory(item.category);
    setSelectedAlgo(item.name);
    setMode("explorer");

    setVisitedNodes([]);
    setGraphOrder([]);
    setTreeOrder([]);
    setHighlightNode(null);
    setDescription(`Loaded ${item.name} from Problem Solver`);
  }

  function getSortedPreview(algo) {
    const sorted = [...compareArray].sort((a, b) => a - b);

    if (algo === "Bubble Sort") {
      return {
        comparisons: (compareArray.length * (compareArray.length - 1)) / 2,
        swaps: Math.floor(compareArray.length * 1.5),
        time: "O(n²)",
        result: sorted,
      };
    }

    if (algo === "Merge Sort") {
      return {
        comparisons: Math.ceil(compareArray.length * Math.log2(compareArray.length)),
        swaps: compareArray.length,
        time: "O(n log n)",
        result: sorted,
      };
    }

    return {
      comparisons: Math.ceil(compareArray.length * Math.log2(compareArray.length)),
      swaps: Math.floor(compareArray.length),
      time: "O(n log n) avg",
      result: sorted,
    };
  }

  function regenerateCompareArray() {
    const nums = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
    setCompareArray(nums);
  }

  function selectCategory(item) {
    setCategory(item.id);
    setSelectedAlgo(algorithms[item.id][0]);
    setVisitedNodes([]);
    setGraphOrder([]);
    setTreeOrder([]);
    setHighlightNode(null);
    clearAnimation(`${item.title} category selected`);
  }

  const activeStep = steps[currentStep] || {};

  const graphNodes = [
    ...new Set(
      graphInput
        .replaceAll("-", ",")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
    ),
  ].slice(0, 8);

  const treeNumbers = getTreeNumbers().slice(0, 7);

  return (
    <div className="app">
      <div className="floating-bg">
        <span>O(n log n)</span>
        <span>BFS</span>
        <span>DFS</span>
        <span>Quick Sort</span>
        <span>BST</span>
        <span>Dijkstra</span>
      </div>

      <div className="orb orb-one"></div>
      <div className="orb orb-two"></div>

      <header className="header">
        <div className="brand" onClick={() => setMode("home")}>
          <div className="brand-dot"></div>
          <div>
          <h1>Algo<span>Vision</span></h1>
          <p>DSA visualizer for algorithms.</p>
          </div>
        </div>

        <div className="nav">
          <button className={mode === "home" ? "nav-active" : ""} onClick={() => setMode("home")}>
            Home
          </button>
          <button className={mode === "explorer" ? "nav-active" : ""} onClick={() => setMode("explorer")}>
            Explorer
          </button>
          <button className={mode === "solver" ? "nav-active" : ""} onClick={() => setMode("solver")}>
            Problem Solver
          </button>
          <button className={mode === "compare" ? "nav-active" : ""} onClick={() => setMode("compare")}>
            Compare
          </button>
        </div>
      </header>

      {mode === "home" && (
        <main>
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-tag">⬡ Interactive Algorithm Visualizer</div>

              <h2>
                Algorithms,
                <span>Finally Visible.</span>
              </h2>

              <p>
                Watch every comparison, swap, traversal, and search through smooth
                step-by-step animations. Built for learning, interviews, and portfolios.
              </p>

              <div className="hero-actions">
                <button className="primary-cta" onClick={() => setMode("explorer")}>
                  Open Explorer →
                </button>
                <button className="secondary-cta" onClick={() => setMode("solver")}>
                  Solve a Problem
                </button>
              </div>
            </div>
          </section>

          <section className="landing-stats">
            <div><strong>6+</strong><span>Algorithms</span></div>
            <div><strong>3</strong><span>Categories</span></div>
            <div><strong>∞</strong><span>Inputs</span></div>
            <div><strong>3</strong><span>Modes</span></div>
          </section>

          <section className="mode-section">
            <p className="section-label">// choose your mode</p>
            <h2>Three ways to learn.</h2>

            <div className="mode-grid">
              <article className="mode-card" onClick={() => setMode("explorer")}>
                <div className="mode-icon">⬡</div>
                <h3>Explorer</h3>
                <p>Browse algorithms by category. Pick one, customize the input, and control the animation step-by-step.</p>
                <div className="chips">
                  <span>Sorting</span><span>Graphs</span><span>Trees</span><span>Step-by-step</span>
                </div>
                <b>Start exploring →</b>
              </article>

              <article className="mode-card solver-card" onClick={() => setMode("solver")}>
                <div className="mode-icon">◈</div>
                <h3>Problem Solver</h3>
                <p>Describe your problem in plain English and get matched with the right algorithm instantly.</p>
                <div className="chips">
                  <span>Keyword Engine</span><span>Your Input</span><span>Ranked Cards</span>
                </div>
                <b>Try it now →</b>
              </article>

              <article className="mode-card" onClick={() => setMode("compare")}>
                <div className="mode-icon">⇄</div>
                <h3>Compare</h3>
                <p>Run two algorithms on the same array and compare time, swaps, and comparisons side-by-side.</p>
                <div className="chips">
                  <span>Bubble</span><span>Merge</span><span>Quick</span>
                </div>
                <b>Compare now →</b>
              </article>
            </div>
          </section>
        </main>
      )}

      {mode === "explorer" && (
        <main>
          <section className="mode-title">
            <h2>Explorer Mode</h2>
            <p>Pick a category, choose an algorithm, and watch it step-by-step.</p>
          </section>

          <div className="grid">
            {categories.map((item) => (
              <section
                className={`card ${category === item.id ? "active-card" : ""}`}
                key={item.id}
                onClick={() => selectCategory(item)}
              >
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </section>
            ))}
          </div>

          <section className="workspace">
            <aside className="sidebar">
              <h3>Algorithms</h3>

              {algorithms[category].map((algo) => (
                <button
                  key={algo}
                  onClick={() => {
                    setSelectedAlgo(algo);
                    setVisitedNodes([]);
                    setGraphOrder([]);
                    setTreeOrder([]);
                    setHighlightNode(null);
                    clearAnimation(`${algo} selected`);
                  }}
                  className={selectedAlgo === algo ? "active-btn" : ""}
                >
                  {algo}
                </button>
              ))}
            </aside>

            <section className="canvas">
              <h2>{selectedAlgo}</h2>

              {category === "sorting" ? (
                <>
                  <div className="input-panel">
                    <label>
                      Array Size: {arraySize}
                      <input
                        type="range"
                        min="5"
                        max="20"
                        value={arraySize}
                        onChange={(e) => {
                          const size = Number(e.target.value);
                          setArraySize(size);
                          generateRandomArray(size);
                        }}
                      />
                    </label>

                    <label>
                      Speed: {speed}ms
                      <input
                        type="range"
                        min="100"
                        max="1000"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                      />
                    </label>

                    <div className="custom-row">
                      <input
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="Example: 5, 2, 8, 1"
                      />
                      <button onClick={applyCustomArray}>Apply</button>
                    </div>
                  </div>

                  <div className="controls">
                    <button onClick={() => generateRandomArray()}>Generate Array</button>
                    <button onClick={runSelectedAlgorithm}>Run {selectedAlgo}</button>
                    <button onClick={() => setIsPlaying(true)} disabled={steps.length === 0}>Play</button>
                    <button onClick={() => setIsPlaying(false)}>Pause</button>
                    <button onClick={() => setCurrentStep((s) => Math.min(s + 1, steps.length - 1))} disabled={steps.length === 0}>Next</button>
                    <button onClick={() => setCurrentStep((s) => Math.max(s - 1, 0))} disabled={steps.length === 0}>Previous</button>
                    <button onClick={resetVisualizer}>Reset</button>
                  </div>

                  <div className="stats">
                    <div>Comparisons: {comparisons}</div>
                    <div>{selectedAlgo === "Merge Sort" ? "Writes" : "Swaps"}: {swaps}</div>
                    <div>Step: {steps.length === 0 ? 0 : currentStep + 1}/{steps.length}</div>
                  </div>

                  <div className="bars">
                    {array.map((value, index) => (
                      <div
                        className={`bar ${activeStep.compare?.includes(index) ? "compare" : ""} ${activeStep.swap?.includes(index) ? "swap" : ""}`}
                        key={index}
                        style={{ height: `${value * 3}px` }}
                      >
                        {value}
                      </div>
                    ))}
                  </div>

                  <div className="step-info">
                    <h3>Current Step</h3>
                    <p>{description}</p>
                  </div>
                </>
              ) : category === "graph" ? (
                <div className="graph-panel">
                  <div className="graph-inputs">
                    <input
                      value={graphInput}
                      onChange={(e) => setGraphInput(e.target.value)}
                      placeholder="Edges: 1-2, 1-3"
                    />

                    <input
                      value={graphStart}
                      onChange={(e) => setGraphStart(e.target.value)}
                      placeholder="Start"
                    />
                  </div>

                  <div className="graph-controls">
                    <button onClick={runBFS}>BFS</button>
                    <button onClick={runDFS}>DFS</button>
                    <button onClick={() => setDescription("Dijkstra will be added next")}>
                      Dijkstra
                    </button>
                  </div>

                  <div className="graph-canvas">
                    {graphNodes.map((node, index) => (
                      <div
                        key={node}
                        className={`node graph-node-${index} ${visitedNodes.includes(node) ? "visited" : ""}`}
                      >
                        {node}
                      </div>
                    ))}
                  </div>

                  <div className="step-info">
                    <h3>Traversal Order</h3>
                    <p>{graphOrder.length ? graphOrder.join(" → ") : "Run BFS or DFS"}</p>
                  </div>
                </div>
              ) : (
                <div className="tree-panel">
                  <div className="tree-controls">
                    <input
                      value={treeInput}
                      onChange={(e) => setTreeInput(e.target.value)}
                      placeholder="Tree: 50, 30, 70"
                    />

                    <input
                      type="number"
                      placeholder="Value"
                      value={treeValue}
                      onChange={(e) => setTreeValue(e.target.value)}
                    />

                    <button onClick={insertNode}>Insert</button>
                    <button onClick={searchNode}>Search</button>
                    <button onClick={inorderTraversal}>Inorder</button>
                    <button onClick={resetTree}>Reset</button>
                  </div>

                  <div className="tree-canvas">
                    {treeNumbers.map((value, index) => (
                      <div
                        key={`${value}-${index}`}
                        className={`tree-node tree-pos-${index} ${highlightNode === value ? "found" : ""}`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>

                  <div className="step-info">
                    <h3>Tree Order</h3>
                    <p>{treeOrder.length ? treeOrder.join(" → ") : "Search or run inorder traversal"}</p>
                  </div>
                </div>
              )}
            </section>

            <aside className="info">
              <h3>Info Panel</h3>
              <p>{description}</p>

              <h4>Complexity</h4>

              {selectedAlgo === "Bubble Sort" && (
                <>
                  <p>Best: O(n)</p><p>Average: O(n²)</p><p>Worst: O(n²)</p><p>Space: O(1)</p>
                </>
              )}

              {selectedAlgo === "Merge Sort" && (
                <>
                  <p>Best: O(n log n)</p><p>Average: O(n log n)</p><p>Worst: O(n log n)</p><p>Space: O(n)</p>
                </>
              )}

              {selectedAlgo === "Quick Sort" && (
                <>
                  <p>Best: O(n log n)</p><p>Average: O(n log n)</p><p>Worst: O(n²)</p><p>Space: O(log n)</p>
                </>
              )}

              {selectedAlgo === "BFS" && (
                <>
                  <p>Time: O(V + E)</p><p>Space: O(V)</p>
                </>
              )}

              {selectedAlgo === "DFS" && (
                <>
                  <p>Time: O(V + E)</p><p>Space: O(V)</p>
                </>
              )}

              {category === "tree" && (
                <>
                  <p>Search: O(h)</p><p>Traversal: O(n)</p><p>Space: O(h)</p>
                </>
              )}

              <h4>Pseudocode</h4>

              {selectedAlgo === "Bubble Sort" && (
                <pre>{`for i from 0 to n
  for j from 0 to n-i-1
    if arr[j] > arr[j+1]
      swap`}</pre>
              )}

              {selectedAlgo === "Merge Sort" && (
                <pre>{`divide array into two halves
sort left half
sort right half
merge both sorted halves`}</pre>
              )}

              {selectedAlgo === "Quick Sort" && (
                <pre>{`choose pivot
partition smaller values left
partition larger values right
quick sort left and right`}</pre>
              )}

              {selectedAlgo === "BFS" && (
                <pre>{`queue = [start]
while queue is not empty
  node = queue.shift()
  visit node
  add unvisited neighbors`}</pre>
              )}

              {selectedAlgo === "DFS" && (
                <pre>{`dfs(node)
  visit node
  for each neighbor
    if not visited
      dfs(neighbor)`}</pre>
              )}

              {category === "tree" && (
                <pre>{`insert/search using BST rule
left values < root
right values > root
inorder gives sorted order`}</pre>
              )}
            </aside>
          </section>
        </main>
      )}

      {mode === "solver" && (
        <main className="solver">
          <h2>Problem Solver Mode</h2>
          <p>Example: Sort this array [5, 2, 8, 1, 9]</p>

          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Type your problem here..."
          />

          <button onClick={findAlgorithms}>Recommend Algorithm</button>

          <div className="results">
            {matches.map((item) => (
              <section className="card" key={item.name}>
                <h2>{item.name}</h2>
                <p>{item.reason}</p>
                <p><b>Time:</b> {item.time}</p>
                <button onClick={() => useAlgorithm(item)}>Visualize with my input</button>
              </section>
            ))}
          </div>
        </main>
      )}

      {mode === "compare" && (
        <main className="compare-page">
          <section className="mode-title">
            <h2>Compare Algorithms</h2>
            <p>Run two algorithms on the same input and compare their behavior.</p>
          </section>

          <div className="compare-actions">
            <button onClick={regenerateCompareArray}>Generate Same Array</button>
          </div>

          <section className="compare-grid">
            {[compareLeft, compareRight].map((algo, panelIndex) => {
              const data = getSortedPreview(algo);

              return (
                <article className="compare-panel" key={panelIndex}>
                  <div className="compare-head">
                    <select
                      value={algo}
                      onChange={(e) =>
                        panelIndex === 0
                          ? setCompareLeft(e.target.value)
                          : setCompareRight(e.target.value)
                      }
                    >
                      <option>Bubble Sort</option>
                      <option>Merge Sort</option>
                      <option>Quick Sort</option>
                    </select>

                    <span>Algorithm {panelIndex === 0 ? "A" : "B"}</span>
                  </div>

                  <div className="compare-bars">
                    {data.result.map((value, index) => (
                      <div
                        className="compare-bar"
                        key={index}
                        style={{ height: `${value * 2}px` }}
                      />
                    ))}
                  </div>

                  <div className="compare-metrics">
                    <div><span>Comparisons</span><b>{data.comparisons}</b></div>
                    <div><span>{algo === "Merge Sort" ? "Writes" : "Swaps"}</span><b>{data.swaps}</b></div>
                    <div><span>Time</span><b>{data.time}</b></div>
                  </div>
                </article>
              );
            })}
          </section>
        </main>
      )}
      <footer className="footer">
  <p>Built with React • DSA Visualizer • 2026</p>
</footer>
    </div>
  );
}

export default App;
