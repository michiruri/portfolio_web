# Typing Game (typing_game_rai) - Portfolio Context

## Overview
A high-octane HTML5 Canvas speed-typing game featuring dynamic boss encounters, custom canvas physics, and a rich anomaly event system. Engineered with an object-oriented architecture for varied enemy behaviors and multi-event stacking logic. The backend utilizes Node.js and Firebase Firestore for a real-time global leaderboard, complete with intelligent client-side caching and automated database pruning to strictly manage API quota limits.

## Tech Stack Used
*   **Frontend:** Vanilla JavaScript, HTML5 Canvas API (Raw programmatic rendering, no external game engines or sprite libraries), Vanilla CSS, Orbitron / Share Tech Mono Fonts.
*   **Backend:** Node.js (Raw HTTP module used for routing and API endpoints, avoiding heavy frameworks like Express).
*   **Database:** Firebase Firestore (via Firebase Admin SDK).
*   **Deployment & Networking:** Custom Local IP detection for LAN sharing, ready for platform deployment (e.g., Render.com).

## Key Architecture & Features

### 1. Object-Oriented Canvas Game Engine
*   **Polymorphic Enemy System:** Built a base `Enemy` class extended by specialized classes (`MissileEnemy`, `GlitchEnemy`, `TeleporterEnemy`, `HealerEnemy`, `TankShellEnemy`) that override `update()` and `draw()` methods for unique movement patterns and rendering logic.
*   **Custom Physics & Behaviors:** Implemented trigonometric calculations (`Math.atan2`, `Math.cos`, `Math.sin`) for homing missiles, swirling orbiters, and ballistic trajectories.

### 2. Multi-Phase Boss Fight Logic (`BossPart`)
*   **Complex Boss Variants:** Different boss types (ARCHITECT, TANK, SWARM) with distinct mechanics.
*   **Phase-Based Attacks:** Bosses execute timed abilities such as firing homing missiles, dropping tank shells synced with the player's X-axis, and spawning grid barriers.
*   **Dynamic Immunity:** Core parts become invincible until subordinate parts (Pylons, Swarm) are destroyed.

### 3. Dynamic Event System ("Anomalies")
*   **Slot-Machine Mechanics:** Triggered by destroying specific enemies, rolling a random global game modifier.
*   **Game State Mutators:** Events drastically alter the game loop physics and visual logic.
    *   `BLACK HOLE`: Drags all entities towards a central gravity well using radius/angle math.
    *   `TIME WARP`: Slows down enemy speed dramatically (`deltaTime` manipulation).
    *   `REVERSE THRUST`: Reverses enemy Y-velocity to move upwards.
    *   `CONGA LINE`: Forces all enemies to follow the leader in a snake-like pattern.
    *   `COLOR SCRAMBLE`: Randomizes canvas fill styles per frame.

### 4. Real-Time Database Optimization (Firebase)
*   **Anti-Quota Limit Strategies:** Built a custom Node.js server that listens to Firestore via `onSnapshot` and caches the top 100 high scores in server memory.
*   **Client-Side Fetching:** The frontend queries the Node.js server cache (`/api/scores`) instead of directly hitting Firestore, completely mitigating read quota exhaustion.
*   **Automated Pruning:** The backend automatically prunes scores past the top 100 during write operations to stay within Firebase's 1GB free storage limit.

### 5. Advanced Stat Tracking & Difficulty Scaling
*   **Metrics:** Calculates real-time WPM (Words Per Minute), Accuracy percentages, Combo Multipliers, and Typo counts.
*   **Dynamic Scaling:** Implemented a difficulty matrix (EASY, NORMAL, HARD, ELITE) that modifies base multipliers, spawn acceleration curves, and boss cooldown timers.

### 6. Secret Keyword Overlays
*   **Easter Eggs:** A hidden buffer listener matches specific keyboard inputs (e.g., "FESH", "CRAZY", "CAR") to dynamically swap out canvas backgrounds and trigger GIF overlays mid-game.
