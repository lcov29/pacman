## About this project
This is an attempt to build a variant of the game pacman using HTML and JavaScript for training purposes.


## How to play
Play the game via github-pages or upload it to a webserver. 


## Ideas for improvements and additional features
* animate pacmans mouth
* improve movement animation for ghosts and pacman to be smoother
* add death animation
* add visual representation of the change from state scared to normal
* add sound effects
* add ability to play on mobile devices
* add bonus elements
* add level rotation
* add instruction page
* add highscore counter
* add spawn stack for respawning multiple ghosts of the same type
* represent number of lifes with visual pacman characters
* represent level counter with fruits


## Version history

*Version 0.04*
* add visual level editor with basic functions:
    * set width and height
    * add actors and elements
    * set scatter positions for ghosts
    * set optional spawn positions for ghosts
    * send and parse custom level

*Version 0.03*
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


*Version 0.02*
* adjust sprites of pacman and ghosts to their current direction of movement
* add teleporter tiles
* implement collision handling for pacmans
* implement collision handling for ghosts


*Version 0.01*
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