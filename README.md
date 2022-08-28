## About this project
This is an attempt to build a variant of the game pacman using HTML, CSS and JavaScript for training purposes.
 
The movement patterns of the ghosts and other aspects are only loosely based on the original game, so do not expect the same behavior.
<br>

## How to play
Play the game via [github-pages](https://voss29.github.io/pacman/) or upload it to a webserver. 
<br>

## External programs and resources used

* [The Pac-Man Dossier](https://pacman.holenet.info/) by Jamey Pittman for information about the original game
* [Inkscape](https://inkscape.org/) for creating the svg sprites
* [Online SVG Converter](https://svg-converter.com/minify) for minifying the svg sprites
<br>

## Ideas for improvements and additional features
* add death animation
* add sound effects
* add ability to play on mobile devices
* add level rotation
* add instruction page
* add highscore counter
* add spawn stack for respawning multiple ghosts of the same type
* represent level counter with fruits
* improve notification about victory and defeat
<br>

## Version history
<br>

##### Version 0.06
* replace div-based game screen with canvas
* replace png sprites with svg sprites
* replace deprecated KeyboardEvent.keyCode
* add animations for pacman and ghost movement
* add animation for transition between ghost states scared and scatter
* add animation for ghost respawn
* add counter for number of lifes
* refactor codebase
* fix bugs
<br>

##### Version 0.05
* add bonus element
* implement chase pattern for ghost pinky
* implement chase pattern for ghost clyde
* implement chase pattern for ghost inky
<br>

##### Version 0.04
* add visual level editor with basic functions:
    * set width and height
    * add actors and elements
    * set scatter positions for ghosts
    * set optional spawn positions for ghosts
    * send and parse custom level
<br>

##### Version 0.03
* add powerups
* add ghost doors (only accessible by ghosts)
* add movement states for ghosts:
  * Chase: chase closest pacman on the shortest path (chase pattern for ghost Blinky)
  * Scatter: move to scatter position on the shortest path and wait there until state changes
  * Scared: move randomly upon consumption of a powerup by pacman
  * Dead: move to spawn position on the shortest path
  * Respawn: wait until state changes
* add sprites for movement state scared
* add sprites for movement state dead
* add sprites for movement state respawn
* add sprites for bonus elements
<br>

##### Version 0.02
* adjust sprites of pacman and ghosts to their current direction of movement
* add teleporter tiles
* implement collision handling for pacmans
* implement collision handling for ghosts
<br>

##### Version 0.01
* build basic level from user input
* implement basic pacman behavior
  * move in four directions
  * stop on wall collision
  * consume points 
* implement basic ghost behavior
  * chase pacman on the shortest path
  * decrement pacmans health on collision
* display game on HTML-site 
* notify player about victory (no points left)
* notify player about defeat (no lifes left)
