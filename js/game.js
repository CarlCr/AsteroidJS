function update() {
    let blinkOn = ship.blinkNum % 2 == 0;
    let exploding = ship.exploideTime > 0;

    // draw space
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    //draw the asteroids

    let a, r, x, y, offs, vert;
    for (let i = 0; i < roids.length; i++) {
        ctx.strokeStyle = "slategrey";
        ctx.lineWidth = SHIP_SIZE / 20;

        //get the asterods propieties
        a = roids[i].a;
        r = roids[i].r;
        x = roids[i].x;
        y = roids[i].y;
        offs = roids[i].offs;
        vert = roids[i].vert;

        // draw a path
        ctx.beginPath();
        ctx.moveTo(
            x + r * offs[0] * Math.cos(a),
            y + r * offs[0] * Math.sin(a)
        );

        // draw the polygon
        for (let j = 1; j < vert; j++) {
            ctx.lineTo(
                x + r * offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
                y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
            );
        }
        ctx.closePath();
        ctx.stroke();

        // show asteroids collosion circle
        if (SHOW_BOUNDING) {
            ctx.strokeStyle = "orange";
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, false);
            ctx.stroke();
        }


    }

    // thrust the ship
    if (ship.thrusting) {
        ship.thrust.x += (SHIP_THRUST * Math.cos(ship.a) / FPS);
        ship.thrust.y -= (SHIP_THRUST * Math.sin(ship.a) / FPS);

        // draw  the thruster
        if (!exploding && blinkOn) {
            ctx.fillStyle = "red";
            ctx.strokeStyle = "white";
            ctx.lineWidth = SHIP_SIZE / 10;
            ctx.beginPath();
            ctx.moveTo( // rear left
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
            );
            ctx.lineTo( // rear center behind the ship
                ship.x - ship.r * 5 / 3 * Math.cos(ship.a),
                ship.y + ship.r * 5 / 3 * Math.sin(ship.a)
            );
            ctx.lineTo( // rear right
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
            );
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    } else {

        ship.thrust.x -= (FRICTION * ship.thrust.x / FPS);
        ship.thrust.Y -= (FRICTION * ship.thrust.Y / FPS);
    }

    // draw triangular ship
    if (!exploding) {
        if (blinkOn) {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = SHIP_SIZE / 20;
            ctx.beginPath();
            ctx.moveTo( // nose of the ship
                ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
                ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
            );
            ctx.lineTo( // rear left
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))
            );
            ctx.lineTo( // rear right
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))
            );
            ctx.closePath();
            ctx.stroke();
        }

        // hendle blinking
        if (ship.blinkNum > 0) {
            // reduce the blink time
            ship.blinkTime--;

            // reduce the blink number
            if (ship.blinkTime == 0) {
                ship.blinkTime = Math.ceil(SHIP_BLINK_DUR * FPS);
                ship.blinkNum--;
            }
        }
    } else {
        // draw explosion 
        ctx.fillStyle = "darkred";
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 1.7, 0, Math.PI * 2, false);
        ctx.fill();

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 1.4, 0, Math.PI * 2, false);
        ctx.fill();

        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 1.1, 0, Math.PI * 2, false);
        ctx.fill();

        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 0.8, 0, Math.PI * 2, false);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r * 0.5, 0, Math.PI * 2, false);
        ctx.fill();
    }

    if (SHOW_BOUNDING) {
        ctx.strokeStyle = "orange";
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
        ctx.stroke();
    }

    if (SHOW_CENTRE_DOT) {
        ctx.fillStyle = "red";
        ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
    }

    // draw the lasers
    for (let i = 0; i < ship.lasers.length; i++) {
        if (ship.lasers[i].exploideTime == 0) {
            ctx.fillStyle = "salmon";
            ctx.beginPath();
            ctx.arc(ship.lasers[i].x, ship.lasers[i].y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
            ctx.fill();
        } else {
            // draw the explosion
            ctx.fillStyle = "orangered";
            ctx.beginPath();
            ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.75, 0, Math.PI * 2, false);
            ctx.fill();

            ctx.fillStyle = "salmon";
            ctx.beginPath();
            ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.3, 0, Math.PI * 2, false);
            ctx.fill();

            ctx.fillStyle = "pink";
            ctx.beginPath();
            ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.25, 0, Math.PI * 2, false);
            ctx.fill();
        }
    }

    // detect  laser hits on asteroids 
    let ax, ay, ar, lx, ly;
    for (let i = roids.length - 1; i >= 0; i--) {

        // grab the asteroids properties
        ax = roids[i].x;
        ay = roids[i].y;
        ar = roids[i].r;

        // loop over the lasers 
        for (let j = ship.lasers.length - 1; j >= 0; j--) {

            // grab laser properties
            lx = ship.lasers[j].x;
            ly = ship.lasers[j].y;

            // detect hits
            if (ship.lasers[j].explodeTime == 0 && distBetweenPoints(ax, ay, lx, ly) < ar) {

                //destroy  the asteroids and activate the lasers explosion
                destroyAsteroids(i);
                ship.lasers[j].explodeTime = Math.ceil(LASER_EXPLOD_DUR * FPS);
                break;
            }
        }
    }

    // check for asteroids collisions  (when not exploring)
    if (!exploding) {

        // only check when blinking
        if (ship.blinkNum == 0) {
            for (let i = 0; i < roids.length; i++) {
                if (distBetweenPoints(ship.x, ship.y, roids[i].x, roids[i].y) < ship.r + roids[i].r) {
                    exploideShip();
                    destroyAsteroids(i);
                    break;
                }
            }
        }

        //rolate ship
        ship.a += ship.rot;

        //move the ship
        ship.x += ship.thrust.x;
        ship.y += ship.thrust.y;
    } else {
        ship.exploideTime--;

        if (ship.exploideTime == 0) {
            ship = newShip();
        }
    }

    //hendle edge of screens
    if (ship.x < 0 - ship.r) {
        ship.x = canv.width + ship.r;
    } else if (ship.x > canv.width + ship.r) {
        ship.x = 0 - ship.r;
    }

    if (ship.y < 0 - ship.r) {
        ship.y = canv.height + ship.r;
    } else if (ship.y > canv.height + ship.r) {
        ship.y = 0 - ship.r;
    }

    //move the lasers
    for (let i = ship.lasers.length - 1; i >= 0; i--) {
        //check distance travalled 
        if (ship.lasers[i].dist > LASER_DIST * canv.width) {
            ship.lasers.splice(i, 1);
            continue;
        }

        //hendle the explosion 
        if (ship.lasers[i].explodeTime > 0) {
            ship.lasers[i].explodeTime--;

            //destroy the laser after duration is up
            if (ship.lasers[i].explodeTime == 0) {
                ship.lasers.splice(i, 1);
                continue;
            }
        } else {

            // move the laser
            ship.lasers[i].x += ship.lasers[i].xv;
            ship.lasers[i].y += ship.lasers[i].yv;

            // calculate the distance travelled
            ship.lasers[i].dist += Math.sqrt(Math.pow(ship.lasers[i].xv, 2) + Math.pow(ship.lasers[i].yv, 2));
        }
        //hendle edge of screens
        if (ship.lasers[i].x < 0) {
            ship.lasers[i].x = canv.width;
        } else if (ship.lasers[i].x > canv.width) {
            ship.lasers[i].x = 0;
        }

        if (ship.lasers[i].y < 0) {
            ship.lasers[i].y = canv.height;
        } else if (ship.lasers[i].y > canv.height) {
            ship.lasers[i].y = 0;
        }
    }

    // move the asteroids 
    for (let i = 0; i < roids.length; i++) {


        roids[i].x += roids[i].xv;
        roids[i].y += roids[i].yv;

        // hendle edge of the screen
        if (roids[i].x < 0 - roids[i].r) {
            roids[i].x = canv.width + roids[i].r;
        } else if (roids[i].x > canv.width + roids[i].r) {
            roids[i].x = 0 - roids[i].r
        }

        if (roids[i].y < 0 - roids[i].r) {
            roids[i].y = canv.height + roids[i].r;
        } else if (roids[i].y > canv.height + roids[i].r) {
            roids[i].y = 0 - roids[i].r
        }
    }
}