function keyDown( /** @type (keyboardEvent) */ ev) {
    switch (ev.keyCode) {
        case 32: // space bar (shoot the laser)
            shootLaser();
            break;

        case 37: // left arrow (rolate ship left)
            ship.rot = SHIP_TURN_SPEED / 180 * Math.PI / FPS;
            break;

        case 38: // up arrow (thrust the ship forward)
            ship.thrusting = true;
            break;

        case 39: // right arrow (rolate ship right)
            ship.rot = -SHIP_TURN_SPEED / 180 * Math.PI / FPS;
            break;
    }
}

function keyUp( /** @type (keyboardEvent) */ ev) {
    switch (ev.keyCode) {
        case 32: // space bar (allow shooting again)
            ship.canShoot = true;
            break;

        case 37: // left arrow (stop rotationg left)
            ship.rot = 0;
            break;

        case 38: // up arrow (stop thrusting)
            ship.thrusting = false;
            break;

        case 39: // right arrow (stop rolatating right)
            ship.rot = 0;
            break;
    }
}