## About this project
This is an attempt to build a variant of the game pacman using HTML and JavaScript for training purposes.


## How to play
Play the game via github-pages or upload it to a webserver. 


## Ideas for additional features



## Version history

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


