import * as React from "react";
import * as THREE from "three";
import { database } from "../../../firebase";
import { ref, get, set } from "firebase/database";
import $ from "./game-block.module.scss";

const GameBlock: React.FC = () => {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const gameRef = React.useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    player: THREE.Group;
    obstacles: THREE.Group[];
    backgroundElements: THREE.Group[];
    groundSegments: THREE.Mesh[];
    backgroundTexture: THREE.CanvasTexture;
    isJumping: boolean;
    jumpVelocity: number;
    gameSpeed: number;
    score: number;
    gameRunning: boolean;
    groundY: number;
    lastObstacleSpawn: number;
  } | null>(null);

  const [gameStarted, setGameStarted] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [highScore, setHighScore] = React.useState(() => {
    return parseInt(localStorage.getItem("sockJumpHighScore") || "0");
  });
  const [allTimeHighScore, setAllTimeHighScore] = React.useState(0);

  const fetchAllTimeHighScore = React.useCallback(async () => {
    try {
      const highScoreRef = ref(database, "highScore");
      const snapshot = await get(highScoreRef);
      if (snapshot.exists()) {
        setAllTimeHighScore(snapshot.val());
      }
    } catch (error) {
      console.error("Error fetching all-time high score:", error);
    }
  }, []);

  const updateAllTimeHighScore = React.useCallback(async (newScore: number) => {
    try {
      const highScoreRef = ref(database, "highScore");
      await set(highScoreRef, newScore);
      setAllTimeHighScore(newScore);
      console.log("All-time high score updated to:", newScore);
    } catch (error) {
      console.error("Error updating all-time high score:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchAllTimeHighScore();
  }, [fetchAllTimeHighScore]);

  const initGame = React.useCallback(() => {
    if (!mountRef.current) return;

    console.log("Initializing game...");

    const scene = new THREE.Scene();

    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext("2d")!;

    const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0.05, "rgba(21, 19, 107, 1)");
    gradient.addColorStop(0.3, "rgba(145, 0, 9, 1)");
    gradient.addColorStop(0.7, "rgba(20, 17, 98, 1)");
    gradient.addColorStop(0.9, "rgba(21, 19, 107, 1)");

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    scene.background = texture;

    const camera = new THREE.PerspectiveCamera(75, 800 / 400, 0.1, 1000);
    camera.position.set(0, 2, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 400);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    mountRef.current.appendChild(renderer.domElement);
    console.log("Canvas appended to DOM");

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const groundGroup = new THREE.Group();

    const createGradientTexture = (color1: string, color2: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext("2d")!;

      const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);

      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      return new THREE.CanvasTexture(canvas);
    };

    const groundGradients = [
      { color1: "rgba(34, 139, 34, 1)", color2: "rgba(0, 100, 0, 1)" }, // Forest Green gradient
      { color1: "rgba(50, 205, 50, 1)", color2: "rgba(34, 139, 34, 1)" }, // Lime Green gradient
      { color1: "rgba(144, 238, 144, 1)", color2: "rgba(50, 205, 50, 1)" }, // Light Green gradient
      { color1: "rgba(154, 205, 50, 1)", color2: "rgba(107, 142, 35, 1)" }, // Yellow Green gradient
      { color1: "rgba(107, 142, 35, 1)", color2: "rgba(85, 107, 47, 1)" }, // Olive Drab gradient
    ];
    const groundSegments = [];

    for (let i = 0; i < 20; i++) {
      const segmentWidth = 8;
      const segmentHeight = 2 + Math.random() * 3; // Random height between 2-5
      const segmentDepth = 15;

      const segmentGeometry = new THREE.BoxGeometry(
        segmentWidth,
        segmentHeight,
        segmentDepth
      );

      const randomGradient =
        groundGradients[Math.floor(Math.random() * groundGradients.length)];
      const gradientTexture = createGradientTexture(
        randomGradient.color1,
        randomGradient.color2
      );

      const segmentMaterial = new THREE.MeshLambertMaterial({
        map: gradientTexture,
      });

      const segment = new THREE.Mesh(segmentGeometry, segmentMaterial);
      segment.position.set(
        (i - 10) * segmentWidth, // Spread segments along x-axis
        -1 - segmentHeight / 2, // Position below ground level
        0
      );
      segment.receiveShadow = true;
      segment.castShadow = true;

      groundGroup.add(segment);
      groundSegments.push(segment);
    }

    scene.add(groundGroup);

    const playerGroup = new THREE.Group();

    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.2, 8);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 }); // Red
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    body.castShadow = true;
    playerGroup.add(body);

    const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbb3 }); // Skin tone
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    head.castShadow = true;
    playerGroup.add(head);

    // const hairGeometry = new THREE.SphereGeometry(0.28, 16, 16);
    // const hairMaterial = new THREE.MeshLambertMaterial({ color: 0xff69b4 }); // Pink
    // const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    // hair.position.y = 1.65;
    // hair.scale.set(1, 0.8, 1);
    // hair.castShadow = true;
    // playerGroup.add(hair);

    // Christmas hat
    const hatConeGeometry = new THREE.ConeGeometry(0.22, 0.5, 8);
    const hatConeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 }); // Red
    const hatCone = new THREE.Mesh(hatConeGeometry, hatConeMaterial);
    hatCone.position.y = 1.9;
    hatCone.castShadow = true;
    playerGroup.add(hatCone);

    // White fluffy trim
    const hatTrimGeometry = new THREE.TorusGeometry(0.22, 0.03, 8, 16);
    const hatTrimMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }); // White
    const hatTrim = new THREE.Mesh(hatTrimGeometry, hatTrimMaterial);
    hatTrim.position.y = 1.73;
    hatTrim.castShadow = true;
    playerGroup.add(hatTrim);

    // White pom-pom at the top
    const hatPomGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const hatPomMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }); // White
    const hatPom = new THREE.Mesh(hatPomGeometry, hatPomMaterial);
    hatPom.position.y = 2.15;
    hatPom.castShadow = true;
    playerGroup.add(hatPom);

    const armGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 8);
    const armMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbb3 });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.5, 0.8, 0);
    leftArm.rotation.z = Math.PI / 6;
    leftArm.castShadow = true;
    playerGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.5, 0.8, 0);
    rightArm.rotation.z = -Math.PI / 6;
    rightArm.castShadow = true;
    playerGroup.add(rightArm);

    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.2, 8);
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0x4169e1 });

    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.15, -0.6, 0);
    leftLeg.castShadow = true;
    playerGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.15, -0.6, 0);
    rightLeg.castShadow = true;
    playerGroup.add(rightLeg);

    const groundY = -0.8;
    playerGroup.position.set(-3, groundY + 0.8, 0);
    scene.add(playerGroup);

    gameRef.current = {
      scene,
      camera,
      renderer,
      player: playerGroup,
      obstacles: [],
      backgroundElements: [],
      groundSegments: groundSegments,
      backgroundTexture: texture,
      isJumping: false,
      jumpVelocity: 0,
      gameSpeed: 0.05,
      score: 0,
      gameRunning: false,
      groundY: groundY + 0.8,
      lastObstacleSpawn: 0,
    };

    for (let i = 0; i < 3; i++) {
      const backgroundGroup = new THREE.Group();

      const svgFiles = ["/christmas-tree.svg"];
      const randomSvg = svgFiles[Math.floor(Math.random() * svgFiles.length)];

      const scale = 2 + Math.random() * 1.2;

      const loader = new THREE.TextureLoader();
      loader.load(
        randomSvg,
        (texture) => {
          const elementGeometry = new THREE.PlaneGeometry(2 * scale, 2 * scale);
          const elementMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            alphaTest: 0.1,
            color: 0xc4c4c4,
          });

          const element = new THREE.Mesh(elementGeometry, elementMaterial);
          element.position.set(0, 1 * scale, 0);
          element.castShadow = false;
          element.receiveShadow = false;

          backgroundGroup.add(element);

          renderer.render(scene, camera);
        },
        undefined,
        (error) => {
          console.error(
            `Error loading initial background SVG ${randomSvg}:`,
            error
          );
        }
      );

      const randomY = -0.75;
      const randomZ = -2 - Math.random() * 3;
      const xPosition = -4 + i * 4 + Math.random() * 2; // Spread across x: 2-14

      backgroundGroup.position.set(xPosition, groundY + randomY, randomZ);
      scene.add(backgroundGroup);
      gameRef.current.backgroundElements.push(backgroundGroup);
    }

    renderer.render(scene, camera);
    console.log("Game initialized and rendered");
  }, []);

  const createObstacle = () => {
    if (!gameRef.current) return;

    const lastObstacle =
      gameRef.current.obstacles[gameRef.current.obstacles.length - 1];
    if (lastObstacle && lastObstacle.position.x > 3) {
      return;
    }

    gameRef.current.lastObstacleSpawn = 8;

    const obstacleGroup = new THREE.Group();

    const loader = new THREE.TextureLoader();
    loader.load(
      "/snowman.svg",
      (texture) => {
        const sockGeometry = new THREE.PlaneGeometry(1.2, 1.2);
        const sockMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.1,
          color: 0x9d9d9d,
        });

        const sockPile = new THREE.Mesh(sockGeometry, sockMaterial);
        sockPile.position.set(0, 0.5, 0);
        sockPile.castShadow = false;
        sockPile.receiveShadow = false;

        obstacleGroup.add(sockPile);
      },
      undefined,
      (error) => {
        console.error("Error loading sock pile SVG:", error);

        const fallbackGeometry = new THREE.PlaneGeometry(1.2, 1.2);
        const fallbackMaterial = new THREE.MeshLambertMaterial({
          color: 0xff6b6b,
          transparent: true,
          opacity: 0.8,
        });

        const fallbackSock = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
        fallbackSock.position.set(0, 0.4, 0);
        fallbackSock.castShadow = true;

        obstacleGroup.add(fallbackSock);
      }
    );

    const collisionGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.1);
    const collisionMaterial = new THREE.MeshLambertMaterial({
      transparent: false,
      opacity: 1,
      visible: false,
    });
    const collisionBox = new THREE.Mesh(collisionGeometry, collisionMaterial);
    collisionBox.position.set(0, 0.5, 0);
    collisionBox.userData = { isCollisionBox: true };
    obstacleGroup.add(collisionBox);

    obstacleGroup.position.set(8, gameRef.current.groundY - 0.8, 0);
    gameRef.current.scene.add(obstacleGroup);
    gameRef.current.obstacles.push(obstacleGroup);
  };

  const createBackgroundElement = () => {
    if (!gameRef.current) return;

    const backgroundGroup = new THREE.Group();

    const svgFiles = ["/christmas-tree.svg"];
    const randomSvg = svgFiles[Math.floor(Math.random() * svgFiles.length)];

    const scale = 2 + Math.random() * 1.2;

    const loader = new THREE.TextureLoader();
    loader.load(
      randomSvg,
      (texture) => {
        const elementGeometry = new THREE.PlaneGeometry(2 * scale, 2 * scale);
        const elementMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.1,
          color: 0xc4c4c4,
        });

        const element = new THREE.Mesh(elementGeometry, elementMaterial);
        element.position.set(0, 0.7 * scale, 0);
        element.castShadow = false;
        element.receiveShadow = false;

        backgroundGroup.add(element);
      },
      undefined,
      (error) => {
        console.error(`Error loading background SVG ${randomSvg}:`, error);
      }
    );

    const randomY = -0.75;
    const randomZ = -2 - Math.random() * 3;

    backgroundGroup.position.set(
      15,
      gameRef.current.groundY + randomY,
      randomZ
    );
    gameRef.current.scene.add(backgroundGroup);
    gameRef.current.backgroundElements.push(backgroundGroup);
  };

  const jump = () => {
    if (!gameRef.current || gameRef.current.isJumping) return;

    gameRef.current.isJumping = true;
    gameRef.current.jumpVelocity = 0.25;
  };

  const checkCollision = () => {
    if (!gameRef.current) return false;

    const playerBox = new THREE.Box3().setFromObject(gameRef.current.player);

    for (const obstacle of gameRef.current.obstacles) {
      const collisionBox = obstacle.children.find(
        (child) => child.userData.isCollisionBox
      );

      if (collisionBox) {
        const obstacleBox = new THREE.Box3().setFromObject(collisionBox);
        if (playerBox.intersectsBox(obstacleBox)) {
          return true;
        }
      }
    }
    return false;
  };

  const gameLoop = () => {
    if (!gameRef.current || !gameRef.current.gameRunning) return;

    gameRef.current.backgroundTexture.offset.x +=
      gameRef.current.gameSpeed * 0.05;
    gameRef.current.backgroundTexture.needsUpdate = true;

    gameRef.current.obstacles.forEach((obstacle, index) => {
      obstacle.position.x -= gameRef.current!.gameSpeed;

      if (obstacle.position.x < -10) {
        gameRef.current!.scene.remove(obstacle);
        gameRef.current!.obstacles.splice(index, 1);
        gameRef.current!.score += 10;
        setScore(gameRef.current!.score);
      }
    });

    gameRef.current.backgroundElements.forEach((element, index) => {
      element.position.x -= gameRef.current!.gameSpeed * 0.6;

      if (element.position.x < -15) {
        gameRef.current!.scene.remove(element);
        gameRef.current!.backgroundElements.splice(index, 1);
      }
    });

    gameRef.current.groundSegments.forEach((segment, index) => {
      segment.position.x -= gameRef.current!.gameSpeed;

      if (segment.position.x < -50) {
        gameRef.current!.scene.remove(segment);
        gameRef.current!.groundSegments.splice(index, 1);

        const segmentWidth = 8;
        const segmentHeight = 2 + Math.random() * 3;
        const segmentDepth = 15;

        const createGradientTexture = (color1: string, color2: string) => {
          const canvas = document.createElement("canvas");
          canvas.width = 256;
          canvas.height = 256;
          const context = canvas.getContext("2d")!;

          const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
          gradient.addColorStop(0, color1);
          gradient.addColorStop(1, color2);

          context.fillStyle = gradient;
          context.fillRect(0, 0, canvas.width, canvas.height);

          return new THREE.CanvasTexture(canvas);
        };

        const groundGradients = [
          { color1: "rgba(0, 255, 255, 1)", color2: "rgba(255, 0, 255, 1)" }, // Cyan to Magenta gradient
          { color1: "rgba(255, 0, 64, 1)", color2: "rgba(13, 27, 42, 1)" }, // Electric Red to Deep Navy gradient
          { color1: "rgba(255, 0, 255, 1)", color2: "rgba(0, 255, 255, 1)" }, // Magenta to Cyan gradient
          { color1: "rgba(13, 27, 42, 1)", color2: "rgba(255, 0, 64, 1)" }, // Deep Navy to Electric Red gradient
          { color1: "rgba(0, 255, 255, 1)", color2: "rgba(255, 0, 64, 1)" }, // Cyan to Electric Red gradient
        ];

        const segmentGeometry = new THREE.BoxGeometry(
          segmentWidth,
          segmentHeight,
          segmentDepth
        );

        const randomGradient =
          groundGradients[Math.floor(Math.random() * groundGradients.length)];
        const gradientTexture = createGradientTexture(
          randomGradient.color1,
          randomGradient.color2
        );

        const segmentMaterial = new THREE.MeshLambertMaterial({
          map: gradientTexture,
        });

        const newSegment = new THREE.Mesh(segmentGeometry, segmentMaterial);
        const lastSegment =
          gameRef.current!.groundSegments[
            gameRef.current!.groundSegments.length - 1
          ];
        const newX = lastSegment ? lastSegment.position.x + segmentWidth : 50;

        newSegment.position.set(newX, -1 - segmentHeight / 2, 0);
        newSegment.receiveShadow = true;
        newSegment.castShadow = true;

        gameRef.current!.scene.add(newSegment);
        gameRef.current!.groundSegments.push(newSegment);
      }
    });

    if (gameRef.current.isJumping) {
      gameRef.current.player.position.y += gameRef.current.jumpVelocity;
      gameRef.current.jumpVelocity -= 0.008;

      if (gameRef.current.player.position.y <= gameRef.current.groundY) {
        gameRef.current.player.position.y = gameRef.current.groundY;
        gameRef.current.isJumping = false;
        gameRef.current.jumpVelocity = 0;
      }
    }

    const shouldSpawn = Math.random() < 0.008;
    if (shouldSpawn) {
      createObstacle();
    }

    const shouldSpawnBackground = Math.random() < 0.025;
    if (shouldSpawnBackground) {
      createBackgroundElement();
    }

    if (checkCollision()) {
      gameRef.current.gameRunning = false;
      setGameOver(true);

      const currentScore = gameRef.current.score;

      if (currentScore > highScore) {
        setHighScore(currentScore);
        localStorage.setItem("sockJumpHighScore", currentScore.toString());
      }

      if (allTimeHighScore && currentScore > allTimeHighScore) {
        updateAllTimeHighScore(currentScore);
      }

      return;
    }

    gameRef.current.gameSpeed += 0.0001;

    gameRef.current.renderer.render(
      gameRef.current.scene,
      gameRef.current.camera
    );
    requestAnimationFrame(gameLoop);
  };

  const startGame = () => {
    if (!gameRef.current) return;

    gameRef.current.obstacles.forEach((obstacle) => {
      gameRef.current!.scene.remove(obstacle);
    });
    gameRef.current.obstacles = [];

    gameRef.current.backgroundElements.forEach((element) => {
      gameRef.current!.scene.remove(element);
    });
    gameRef.current.backgroundElements = [];

    gameRef.current.player.position.y = gameRef.current.groundY;
    gameRef.current.isJumping = false;
    gameRef.current.jumpVelocity = 0;
    gameRef.current.gameSpeed = 0.05;
    gameRef.current.score = 0;
    gameRef.current.gameRunning = true;
    gameRef.current.lastObstacleSpawn = 0;

    setScore(0);
    setGameOver(false);
    setGameStarted(true);

    gameLoop();
  };

  React.useEffect(() => {
    initGame();

    return () => {
      if (gameRef.current) {
        gameRef.current.renderer.dispose();
        if (
          mountRef.current &&
          gameRef.current.renderer.domElement.parentNode
        ) {
          mountRef.current.removeChild(gameRef.current.renderer.domElement);
        }
      }
    };
  }, []);

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        if (!gameStarted || gameOver) {
          startGame();
        } else {
          jump();
        }
      }
    };

    const handleClick = () => {
      if (!gameStarted || gameOver) {
        startGame();
      } else {
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    mountRef.current?.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      mountRef.current?.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted, gameOver]);

  return (
    <div className={$.background}>
      <div className={$.block}>
        <div className={$.gameContainer}>
          <h1 className={$.header}>
            SOCK JUMP
            <span className={$.exclamation}>!</span>
          </h1>

          <div className={$.gameWrapper}>
            <div className={$.gameCanvas} ref={mountRef} />

            <div className={$.gameUI}>
              <div className={$.scoreBoard}>
                <div>Score: {score}</div>
                <div>High Score: {highScore}</div>
                <div>All Time High Score: {allTimeHighScore || "-"}</div>
              </div>

              {!gameStarted && (
                <div className={$.instructions}>
                  <p>Help onze held met springen over de stapels sokken!</p>
                  <p>Druk op spatie of klik om te springen</p>
                  <button className={$.startButton} onClick={startGame}>
                    SPEL STARTEN
                  </button>
                </div>
              )}

              {gameOver && (
                <div className={$.gameOverScreen}>
                  <h2>Game Over!</h2>
                  <p>Eindscore: {score}</p>
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
                  <p>Druk op spatie of klik om te springen!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBlock;
