import * as React from "react";
import * as THREE from "three";
import { database } from "../../../firebase";
import { ref, get, set } from "firebase/database";
import $ from "./sock-snake-block.module.scss";

const GRID_SIZE = 20;
const CELL_SIZE = 1;
const GAME_SPEED = 150; // milliseconds between moves

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const SockSnakeBlock: React.FC = () => {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const gameRef = React.useRef<{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    snake: Position[];
    direction: Direction;
    nextDirection: Direction;
    food: Position | null;
    foodMesh: THREE.Mesh | null;
    snakeMeshes: THREE.Mesh[];
    gameRunning: boolean;
    gameLoopId: number | null;
  } | null>(null);

  const [gameStarted, setGameStarted] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [highScore, setHighScore] = React.useState(() => {
    return parseInt(localStorage.getItem("sockSnakeHighScore") || "0");
  });
  const [allTimeHighScore, setAllTimeHighScore] = React.useState(0);
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);

  const fetchAllTimeHighScore = React.useCallback(async () => {
    try {
      const highScoreRef = ref(database, "highScoreSnake");
      const snapshot = await get(highScoreRef);
      if (snapshot.exists()) {
        setAllTimeHighScore(snapshot.val());
      }
    } catch (error) {
      console.error("Error fetching high score:", error);
    }
  }, []);

  const updateAllTimeHighScore = React.useCallback(async (newScore: number) => {
    try {
      const highScoreRef = ref(database, "highScoreSnake");
      await set(highScoreRef, newScore);
      setAllTimeHighScore(newScore);
      console.log("High score updated to:", newScore);
    } catch (error) {
      console.error("Error updating high score:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchAllTimeHighScore();
  }, [fetchAllTimeHighScore]);

  const initGame = React.useCallback(() => {
    if (!mountRef.current) return;

    console.log("Initializing Snake game...");

    const scene = new THREE.Scene();

    // Create background gradient
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;

    // Use OrthographicCamera for 2D rendering
    const viewSize = GRID_SIZE;
    const camera = new THREE.OrthographicCamera(
      -viewSize / 2,
      viewSize / 2,
      viewSize / 2,
      -viewSize / 2,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // Smaller size for desktop - will be responsive via CSS
    const size = 450;
    renderer.setSize(size, size);

    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    mountRef.current.appendChild(renderer.domElement);

    // Create game board background
    const boardGeometry = new THREE.PlaneGeometry(GRID_SIZE, GRID_SIZE);
    const boardMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const board = new THREE.Mesh(boardGeometry, boardMaterial);
    board.position.set(0, 0, -1);
    scene.add(board);

    // Initialize snake
    const initialSnake: Position[] = [
      { x: 5, y: 10 },
      { x: 4, y: 10 },
      { x: 3, y: 10 },
    ];

    const snakeMeshes: THREE.Mesh[] = [];

    // Create snake head (sock puppet)
    const loader = new THREE.TextureLoader();
    loader.load(
      "/sock-puppet.svg",
      (texture) => {
        const headGeometry = new THREE.PlaneGeometry(CELL_SIZE * 0.9, CELL_SIZE * 0.9);
        const headMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.1,
        });
        const headMesh = new THREE.Mesh(headGeometry, headMaterial);
        headMesh.position.set(
          initialSnake[0].x - GRID_SIZE / 2 + 0.5,
          GRID_SIZE / 2 - initialSnake[0].y - 0.5,
          0
        );
        headMesh.visible = false; // Hide until game starts
        scene.add(headMesh);
        snakeMeshes[0] = headMesh;
      },
      undefined,
      (error) => {
        console.error("Error loading sock puppet SVG:", error);
        // Fallback: use colored box
        const headGeometry = new THREE.BoxGeometry(CELL_SIZE * 0.9, CELL_SIZE * 0.9, 0.1);
        const headMaterial = new THREE.MeshBasicMaterial({ color: 0x800080 });
        const headMesh = new THREE.Mesh(headGeometry, headMaterial);
        headMesh.position.set(
          initialSnake[0].x - GRID_SIZE / 2 + 0.5,
          GRID_SIZE / 2 - initialSnake[0].y - 0.5,
          0
        );
        headMesh.visible = false; // Hide until game starts
        scene.add(headMesh);
        snakeMeshes[0] = headMesh;
      }
    );

    // Create snake body segments
    for (let i = 1; i < initialSnake.length; i++) {
      const bodyGeometry = new THREE.BoxGeometry(CELL_SIZE * 0.8, CELL_SIZE * 0.8, 0.1);
      const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x9c89b8 });
      const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
      bodyMesh.position.set(
        initialSnake[i].x - GRID_SIZE / 2 + 0.5,
        GRID_SIZE / 2 - initialSnake[i].y - 0.5,
        0
      );
      bodyMesh.visible = false; // Hide until game starts
      scene.add(bodyMesh);
      snakeMeshes.push(bodyMesh);
    }

    // Create food
    const foodGeometry = new THREE.PlaneGeometry(CELL_SIZE * 0.8, CELL_SIZE * 0.8);
    const foodMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8c42,
      transparent: true,
    });
    const foodMesh = new THREE.Mesh(foodGeometry, foodMaterial);
    foodMesh.visible = false;
    scene.add(foodMesh);

    // Load music icon texture for food
    loader.load(
      "/music-icon.svg",
      (texture) => {
        foodMaterial.map = texture;
        foodMaterial.alphaTest = 0.1;
        foodMaterial.needsUpdate = true;
      },
      undefined,
      (error) => {
        console.error("Error loading music icon SVG:", error);
      }
    );

    gameRef.current = {
      scene,
      camera,
      renderer,
      snake: initialSnake,
      direction: "RIGHT",
      nextDirection: "RIGHT",
      food: null,
      foodMesh,
      snakeMeshes,
      gameRunning: false,
      gameLoopId: null,
    };

    spawnFood();
    renderer.render(scene, camera);
    console.log("Snake game initialized");
  }, []);

  const spawnFood = () => {
    if (!gameRef.current) return;

    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      gameRef.current.snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );

    gameRef.current.food = newFood;
    if (gameRef.current.foodMesh) {
      gameRef.current.foodMesh.position.set(
        newFood.x - GRID_SIZE / 2 + 0.5,
        GRID_SIZE / 2 - newFood.y - 0.5,
        0
      );
      gameRef.current.foodMesh.visible = true;
    }
  };

  const moveSnake = () => {
    if (!gameRef.current || !gameRef.current.gameRunning) return;

    const { snake, direction, nextDirection, food } = gameRef.current;

    // Update direction (prevent reversing into itself)
    const oppositeDirections: Record<Direction, Direction> = {
      UP: "DOWN",
      DOWN: "UP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    };

    if (oppositeDirections[direction] !== nextDirection) {
      gameRef.current.direction = nextDirection;
    }

    const head = { ...snake[0] };
    const currentDirection = gameRef.current.direction;

    // Move head based on direction
    switch (currentDirection) {
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "RIGHT":
        head.x += 1;
        break;
    }

    // Check wall collision
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      endGame();
      return;
    }

    // Check self collision
    if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
      endGame();
      return;
    }

    const newSnake = [head, ...snake];

    // Check if food eaten
    if (food && head.x === food.x && head.y === food.y) {
      setScore((prev) => prev + 10);
      spawnFood();
    } else {
      newSnake.pop(); // Remove tail if no food eaten
    }

    gameRef.current.snake = newSnake;

    // Update meshes
    updateSnakeMeshes();
    gameRef.current.renderer.render(gameRef.current.scene, gameRef.current.camera);
  };

  const updateSnakeMeshes = () => {
    if (!gameRef.current) return;

    const { snake, snakeMeshes } = gameRef.current;

    // Ensure we have enough meshes
    while (snakeMeshes.length < snake.length) {
      const bodyGeometry = new THREE.BoxGeometry(CELL_SIZE * 0.8, CELL_SIZE * 0.8, 0.1);
      const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x9c89b8 });
      const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
      gameRef.current.scene.add(bodyMesh);
      snakeMeshes.push(bodyMesh);
    }

    // Remove excess meshes
    while (snakeMeshes.length > snake.length) {
      const mesh = snakeMeshes.pop()!;
      gameRef.current.scene.remove(mesh);
      mesh.geometry.dispose();
      if (mesh.material instanceof THREE.Material) {
        mesh.material.dispose();
      }
    }

    // Update positions
    snake.forEach((segment, index) => {
      if (snakeMeshes[index]) {
        snakeMeshes[index].position.set(
          segment.x - GRID_SIZE / 2 + 0.5,
          GRID_SIZE / 2 - segment.y - 0.5,
          0
        );
      }
    });
  };

  const gameLoop = React.useCallback(() => {
    if (!gameRef.current || !gameRef.current.gameRunning) return;

    moveSnake();

    if (gameRef.current.gameRunning) {
      const id = window.setTimeout(() => {
        gameLoop();
      }, GAME_SPEED);
      gameRef.current.gameLoopId = id;
    }
  }, []);

  const endGame = () => {
    if (!gameRef.current) return;

    gameRef.current.gameRunning = false;
    if (gameRef.current.gameLoopId !== null) {
      clearTimeout(gameRef.current.gameLoopId);
      gameRef.current.gameLoopId = null;
    }

    setGameOver(true);

    const currentScore = score;

    if (currentScore > highScore) {
      setHighScore(currentScore);
      localStorage.setItem("sockSnakeHighScore", currentScore.toString());
    }

    if (allTimeHighScore && currentScore > allTimeHighScore) {
      updateAllTimeHighScore(currentScore);
    } else if (!allTimeHighScore && currentScore > 0) {
      updateAllTimeHighScore(currentScore);
    }
  };

  const changeDirection = React.useCallback((newDirection: Direction) => {
    if (!gameRef.current) return;
    const { nextDirection } = gameRef.current;
    
    const oppositeDirections: Record<Direction, Direction> = {
      UP: "DOWN",
      DOWN: "UP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    };

    if (oppositeDirections[nextDirection] !== newDirection) {
      gameRef.current.nextDirection = newDirection;
    }
  }, []);

  const startGame = React.useCallback(() => {
    if (!gameRef.current) return;

    // Reset game state
    const initialSnake: Position[] = [
      { x: 5, y: 10 },
      { x: 4, y: 10 },
      { x: 3, y: 10 },
    ];

    gameRef.current.snake = initialSnake;
    gameRef.current.direction = "RIGHT";
    gameRef.current.nextDirection = "RIGHT";
    gameRef.current.gameRunning = true;

    // Clear existing meshes except head
    while (gameRef.current.snakeMeshes.length > 1) {
      const mesh = gameRef.current.snakeMeshes.pop()!;
      gameRef.current.scene.remove(mesh);
      mesh.geometry.dispose();
      if (mesh.material instanceof THREE.Material) {
        mesh.material.dispose();
      }
    }

    // Reset head position and make visible
    if (gameRef.current.snakeMeshes[0]) {
      gameRef.current.snakeMeshes[0].position.set(
        initialSnake[0].x - GRID_SIZE / 2 + 0.5,
        GRID_SIZE / 2 - initialSnake[0].y - 0.5,
        0
      );
      gameRef.current.snakeMeshes[0].visible = true;
    }

    // Recreate body segments and make visible
    for (let i = 1; i < initialSnake.length; i++) {
      const bodyGeometry = new THREE.BoxGeometry(CELL_SIZE * 0.8, CELL_SIZE * 0.8, 0.1);
      const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x9c89b8 });
      const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
      bodyMesh.position.set(
        initialSnake[i].x - GRID_SIZE / 2 + 0.5,
        GRID_SIZE / 2 - initialSnake[i].y - 0.5,
        0
      );
      bodyMesh.visible = true;
      gameRef.current.scene.add(bodyMesh);
      gameRef.current.snakeMeshes.push(bodyMesh);
    }

    updateSnakeMeshes();
    spawnFood();

    setScore(0);
    setGameOver(false);
    setGameStarted(true);

    gameLoop();
  }, [gameLoop]);

  React.useEffect(() => {
    initGame();

    return () => {
      if (gameRef.current) {
        if (gameRef.current.gameLoopId !== null) {
          clearTimeout(gameRef.current.gameLoopId);
        }
        gameRef.current.renderer.dispose();
        if (
          mountRef.current &&
          gameRef.current.renderer.domElement.parentNode
        ) {
          mountRef.current.removeChild(gameRef.current.renderer.domElement);
        }
      }
    };
  }, [initGame]);

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!gameRef.current) return;

      const key = event.key.toLowerCase();

      // Prevent default behavior for arrow keys and game controls to prevent page scrolling
      if (
        key === "arrowup" ||
        key === "arrowdown" ||
        key === "arrowleft" ||
        key === "arrowright" ||
        key === "w" ||
        key === "s" ||
        key === "a" ||
        key === "d" ||
        key === " " ||
        key === "enter"
      ) {
        event.preventDefault();
      }

      if (key === "arrowup" || key === "w") {
        changeDirection("UP");
      } else if (key === "arrowdown" || key === "s") {
        changeDirection("DOWN");
      } else if (key === "arrowleft" || key === "a") {
        changeDirection("LEFT");
      } else if (key === "arrowright" || key === "d") {
        changeDirection("RIGHT");
      } else if (key === " " || key === "enter") {
        if (!gameStarted || gameOver) {
          startGame();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameStarted, gameOver, startGame, changeDirection]);

  // Touch/swipe gesture handlers
  React.useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current || !gameRef.current || !gameRef.current.gameRunning) {
        return;
      }

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const minSwipeDistance = 30;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            changeDirection("RIGHT");
          } else {
            changeDirection("LEFT");
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY > 0) {
            changeDirection("DOWN");
          } else {
            changeDirection("UP");
          }
        }
      }

      touchStartRef.current = null;
    };

    const gameCanvas = mountRef.current;
    if (gameCanvas) {
      gameCanvas.addEventListener("touchstart", handleTouchStart, { passive: true });
      gameCanvas.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      if (gameCanvas) {
        gameCanvas.removeEventListener("touchstart", handleTouchStart);
        gameCanvas.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [changeDirection]);

  return (
    <div className={$.background}>
      <div className={$.block}>
        <div className={$.gameContainer}>
          <h1 className={$.header}>
            SOCK SNAKE
            <span className={$.exclamation}>!</span>
          </h1>

          <div className={$.gameWrapper}>
            <div className={$.gameCanvas} ref={mountRef} />

            <div className={$.gameUI}>
              <div className={$.scoreBoard}>
                <div>Score: {score}</div>
                <div>High Score: {highScore}</div>
                <div>2026 High Score: {allTimeHighScore || "-"}</div>
              </div>

              {!gameStarted && (
                <div className={$.instructions}>
                  <p>Help de sok om muzieknoten te verzamelen!</p>
                  <p className={$.desktopInstructions}>
                    Gebruik pijltjestoetsen of WASD om te bewegen
                  </p>
                  <p className={$.mobileInstructions}>
                    Veeg over het speelveld of gebruik de knoppen om te bewegen
                  </p>
                  <button className={$.startButton} onClick={startGame}>
                    SPEL STARTEN
                  </button>
                </div>
              )}

              {gameOver && (
                <div className={$.gameOverScreen}>
                  <h2>Game Over!</h2>
                  {score === highScore && (
                    <p className={$.newRecord}>Nieuwe High Score! 🎉</p>
                  )}
                  <button className={$.restartButton} onClick={startGame}>
                    SPEEL OPNIEUW
                  </button>
                </div>
              )}

              {gameStarted && !gameOver && (
                <div className={$.gameControls}>
                  <p className={$.desktopInstructions}>
                    Gebruik pijltjestoetsen of WASD om te bewegen!
                  </p>
                  <p className={$.mobileInstructions}>
                    Veeg over het speelveld of gebruik de knoppen
                  </p>
                  <div className={$.directionButtons}>
                    <button
                      className={$.directionButton}
                      onClick={() => changeDirection("UP")}
                      aria-label="Omhoog"
                    >
                      ↑
                    </button>
                    <div className={$.directionRow}>
                      <button
                        className={$.directionButton}
                        onClick={() => changeDirection("LEFT")}
                        aria-label="Links"
                      >
                        ←
                      </button>
                      <button
                        className={$.directionButton}
                        onClick={() => changeDirection("DOWN")}
                        aria-label="Omlaag"
                      >
                        ↓
                      </button>
                      <button
                        className={$.directionButton}
                        onClick={() => changeDirection("RIGHT")}
                        aria-label="Rechts"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SockSnakeBlock;

