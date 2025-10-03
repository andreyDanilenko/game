# Space Survival Game

A space-themed survival game built with HTML5 Canvas and JavaScript using Object-Oriented Programming principles.

## Features

- Collect regular stars for points
- Collect POWER stars for armor and special abilities
- Avoid asteroids or use your armor to survive
- Use SPACEBAR to explode all objects (costs power)
- Adjustable game speed
- Win by surviving for 60 seconds

## Project Structure

The game is organized into a modular structure for scalability and maintainability:

- **core/**: Main game logic and orchestration
- **entities/**: Game objects (player, stars, asteroids, etc.)
- **managers/**: Systems that handle groups of entities
- **ui/**: User interface components
- **utils/**: Helper functions and utilities

## How to Play

1. Click "START SURVIVAL" to begin
2. Move your mouse to control the spaceship
3. Collect yellow stars for points
4. Collect purple POWER stars for armor and power
5. Avoid red asteroids or use your armor to survive hits
6. Press SPACEBAR to explode all objects (requires 100 power)
7. Survive for 60 seconds to win!

## Development

This project follows OOP principles with:
- Clear separation of concerns
- Encapsulation of functionality
- Reusable components
- Scalable architecture

To extend the game, you can:
- Add new entity types in the entities folder
- Create new managers for game systems
- Enhance UI components
- Add new game modes or features

## Technologies Used

- HTML5 Canvas
- JavaScript (ES6 Modules)
- CSS3
