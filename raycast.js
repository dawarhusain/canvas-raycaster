// Raycast
// output dimension: 500 x 500

const frameRate = 40; // fps
const epsilon = 1e-9;

// Canvas Properties

let flatmap = document.getElementById("flatmap");
let flatctx = flatmap.getContext("2d");
let flatmapH = flatmap.height;
let flatmapW = flatmap.width;

// Level Properties

let levelPlan = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
	[1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
	[1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
	[1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
	[1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
	[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
	[1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
	[1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
	[1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
	[1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const planH = levelPlan.length;
const planW = levelPlan[0].length;
const box = 20;

// Player Constants

const playerRad = 5;
const playerSpeed = 50; // pixel per second
const rotateStep = Math.PI/90;
const step = (1/frameRate) * playerSpeed;
const pointerLength = 30;

let playerX = box+playerRad, playerY = box+playerRad;
let playerTheta = 0;

// Raycast Properties

let projection = document.getElementById("projection");
let projctx = projection.getContext("2d");
let projW = projection.width, projH = projection.height;

const wallWidth = 1;
const fov = Math.PI / 3;

// Ray Properties

class Ray {
	constructor (length) {
		this.length = length;
	}
};


let rayCount = Math.floor(projW/wallWidth);
let ray = Array();
for (let i = 0; i < rayCount; ++i) {
	let rayTemp = new Ray(0);
	ray.push(rayTemp);
}

const rayColor = "rgba(255,255,0,0.6)";

// Event Properties

let keyPressed = {"w": false, "s": false, "a": false, "d": false};

document.addEventListener("keydown", (e)=>{
	keyPressed[e.key] = true;
});

document.addEventListener("keyup", (e)=>{
	keyPressed[e.key] = false;
});

function gameLoop () {
	let oldTime = performance.now();

	getRayIntersections();
	clearGame();
	drawGame();
	pollEvent();

	let newTime = performance.now();
	let delay = newTime - oldTime;
	delay = Math.max(0, 1000/frameRate-delay);

	//console.log("fps", 1000/(delay));
	
	setTimeout(gameLoop, delay);
}

function clearGame () {
	flatctx.clearRect(0, 0, flatmapW, flatmapH);
	flatctx.fillStyle = "#DDD";
	flatctx.fillRect(0, 0, planW*box, planH*box);

	projctx.clearRect(0, 0, projW, projH);
	projctx.fillStyle = "rgb(0, 0, 0)";
	projctx.fillRect(0, 0, projW, projH);

	projctx.fillStyle = "lightgreen";
	projctx.fillRect(0, projH/2, projW, projH/2);
	projctx.fillStyle = "lightblue";
	projctx.fillRect(0, 0, projW, projH/2);
}

function drawGame () {
	
	drawRays();
	drawPlayer();
	drawGrid();
	drawPointer();
	drawProjection();
	
}

function drawGrid() {
	for (let i = 0; i < planH; ++i) {
		for (let j = 0; j < planW; ++j) {
			if (levelPlan[i][j] === 1) {
				flatctx.beginPath();
				flatctx.fillStyle = "#AAA";
				flatctx.strokeStyle = "888";
				flatctx.rect(j*box, i*box, box, box);
				flatctx.fill();
				flatctx.stroke();
				flatctx.closePath()
			}
		}
	}
}

function drawPlayer() {
	flatctx.beginPath();
	flatctx.fillStyle = "blue";
	flatctx.arc(playerX, playerY, playerRad, 0, 2*Math.PI);
	flatctx.closePath();
	flatctx.fill();
}

function drawRays () {
	let markerRadius = 1;
	let angleStep = (fov/rayCount), curAngle = playerTheta + fov/2;

	flatctx.save();
	flatctx.translate(playerX, playerY);
	flatctx.strokeStyle = rayColor;
	flatctx.fillStyle = "red";
	flatctx.rotate(-curAngle);

	for (let i = 0; i < rayCount; i++) {
		flatctx.beginPath();
		flatctx.moveTo(0, 0);
		flatctx.rotate(angleStep);
		flatctx.lineTo(ray[i].length, 0);
		flatctx.stroke();
		flatctx.closePath();

		flatctx.beginPath();
		flatctx.arc(ray[i].length, 0, markerRadius, 0, 2*Math.PI);
		flatctx.fill();
		flatctx.closePath();
	}

	flatctx.restore();
}

function drawPointer() {
	let arrowLength = pointerLength/8;
	flatctx.save();
	flatctx.translate(playerX, playerY);

	flatctx.beginPath();
	flatctx.strokeStyle = "blue";
	flatctx.moveTo(0, 0);
	flatctx.rotate(-playerTheta);
	flatctx.lineTo(pointerLength, 0);
	flatctx.lineTo(pointerLength-arrowLength, -arrowLength);
	flatctx.moveTo(pointerLength, 0);
	flatctx.lineTo(pointerLength-arrowLength, arrowLength);
	flatctx.stroke();

	flatctx.restore();
}

function drawProjection() {
	// Draw wall projections

	for (let i = 0; i < rayCount; ++i) {
		let curRay = ray[i], curAngle =  fov/2 - i*fov/rayCount;

		let rayDistance = curRay.length*Math.cos(curAngle);
		let distProjectionPlane = projW/ (2 * Math.tan(fov));

		let wallHeight = 2*box/rayDistance * distProjectionPlane;

		// drawing
		let dullFac = 1 - (rayDistance/(10*planH));
		projctx.fillStyle = `hsl(42, ${dullFac*100}%, 75%)`; // sandstone
		projctx.fillRect(i*wallWidth, projH/2 - wallHeight/2, wallWidth, wallHeight);
	}
}

function getRayIntersections() {
	let angleStep = (fov/rayCount), curAngle = playerTheta + fov/2;
	let cosTheta, sinTheta, dirX, dirY;

	for (let j = 0; j < rayCount; ++j) {
		// get intersection for ith ray
		cosTheta = Math.cos(curAngle), sinTheta = Math.sin(curAngle);
		dirX = Math.sign(cosTheta), dirY = -Math.sign(sinTheta);

		let firstX, firstY, deltaX, deltaY, nextX, nextY, planX, planY;

		// horizontal intersect
		let distHoriz = Infinity;
		firstY = Math.floor(playerY/box) * box + (dirY > 0 ? box : 0);
		firstX = playerX + (playerY - firstY)/Math.tan(curAngle);
		deltaY = box*dirY, deltaX = Math.abs(deltaY / Math.tan(curAngle)) * dirX;

		nextX = firstX, nextY = firstY;

		for (let i = 0; i < planH; ++i) {
			planX = Math.floor((nextX + dirX*epsilon)/box), planY = Math.floor((nextY + dirY*epsilon)/box);
			if (planX >= 0 && planY >= 0 && planX < planW && planY < planH && levelPlan[planY][planX]) {
				distHoriz = Math.min(distHoriz, distance(playerX, playerY, nextX, nextY));
				break;
			}
			nextX += deltaX, nextY += deltaY;
		}


		// vertical intersect
		let distVert = Infinity;
		firstX = Math.floor(playerX/box) * box + (dirX > 0 ? box : 0);
		firstY = playerY + (playerX - firstX)*Math.tan(curAngle);
		deltaX = box*dirX, deltaY = Math.abs(deltaX *Math.tan(curAngle)) * dirY;

		nextX = firstX, nextY = firstY;

		for (let i = 0; i < planW; ++i) {
			planY = Math.floor((nextY + dirY*epsilon)/box), planX = Math.floor((nextX + dirX*epsilon)/box);
			if (planX >= 0 && planY >= 0 && planX < planW && planY < planH && levelPlan[planY][planX]) {
				distVert = Math.min(distVert, distance(playerX, playerY, nextX, nextY));
				break;
			}
			nextX += deltaX, nextY += deltaY;
		}

		ray[j].length = Math.min(distVert, distHoriz);

		curAngle -= angleStep;
	}
}

function pollEvent() {
	let dL = 0;
	if (keyPressed["w"]) {
		dL += step;
	}
	if (keyPressed["s"]) {
		dL -= step;
	}
	if (keyPressed["a"]) {
		playerTheta += rotateStep;
	}
	if (keyPressed["d"]) {
		playerTheta -= rotateStep;
	}

	resolveCollision(dL);
}

function resolveCollision(dL) {
	if (dL === 0) {
		return;
	}
	let x = Math.floor(playerX/box), y = Math.floor(playerY/box);

	let newX = playerX + dL*Math.cos(playerTheta), newY = playerY - dL*Math.sin(playerTheta);
	let collided = false;

	let arrayX = [-1, 1, 1, -1, 0, 1, 0, -1];
	let arrayY = [-1, -1, 1, 1, -1, 0, 1, 0];

	for (let i = 7; i >= 0; --i) {
		let dirX = arrayX[i], dirY = arrayY[i];
		let centreX = (x+dirX)*box + (box/2), centreY = (y+dirY)*box + (box/2);

		if (x+dirX >= 0 && x+dirX < planW && y+dirY >= 0 && y+dirY < planH && levelPlan[y+dirY][x+dirX]) {
			if (!dirX && !dirY) {
				continue;
			}
			else if (dirX && dirY) {
				let cornerX = centreX - dirX*(box/2), cornerY = centreY - dirY*(box/2);
				if (distance(cornerX, cornerY, newX, newY) - playerRad  < epsilon) {
					collided = true;

					let cosTheta = (centreX - playerX)*(1) + (centreY - playerY)*(0);
					cosTheta /= (distance(centreX, centreY, playerX, playerY) * 1);

					let sinTheta = (centreX - playerX)*(0) - (centreY - playerY)*(1);
					sinTheta /=  (distance(centreX, centreY, playerX, playerY) * step);

					let shift = Math.abs(distance(cornerX, cornerY, newX, newY) - playerRad) + epsilon;

					newX -= shift*cosTheta;
					newY += shift*sinTheta;

					playerX = newX, playerY = newY;
				}
			}
			else {
				let wallX = centreX - dirX*(box/2), wallY = centreY - dirY*(box/2);
				(dirX === 0 ? wallX = newX : wallY = newY);
				if (distance(wallX, wallY, newX, newY) - playerRad < epsilon) {
					collided = true;

					let shift = Math.abs(distance(wallX, wallY, newX, newY) - playerRad) + epsilon;
					newY -= dirY*shift;
					newX -= dirX*shift
					playerX = newX, playerY = newY;
				}
			}
		}
	}
	if (!collided) {
		playerX = newX;
		playerY = newY;
	}
}

function distance (x1, y1, x2, y2) {
	return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

gameLoop();