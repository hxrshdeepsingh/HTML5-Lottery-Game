const BALLS_COUNT = 75
const BALL_RADIUS = 10
const CANVAS_WIDTH = 550
const CANVAS_HEIGHT = 550

const canvas = document.getElementById('matter-canvas');

const Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Runner = Matter.Runner,
  Events = Matter.Events

const engine = Engine.create()
const runner = Runner.run(engine)

const render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    wireframes: false,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    background: 'transparent'
  }
})

const balls = []
const ballImagePaths = [
  'static/images/1.png',
  'static/images/2.png',
  'static/images/3.png',
  'static/images/4.png',
  'static/images/5.png',
  'static/images/6.png',
  'static/images/7.png',
  'static/images/8.png',
  'static/images/9.png',
  'static/images/10.png',
  'static/images/11.png',
  'static/images/12.png',
  'static/images/13.png',
  'static/images/14.png',
  'static/images/15.png',
  'static/images/16.png',
  'static/images/17.png',
  'static/images/18.png',
  'static/images/19.png',
  'static/images/20.png',
  'static/images/21.png',
  'static/images/22.png',
  'static/images/23.png',
  'static/images/24.png',
  'static/images/25.png',
  'static/images/26.png',
  'static/images/27.png',
  'static/images/28.png',
  'static/images/29.png',
  'static/images/30.png',
  'static/images/31.png',
  'static/images/32.png',
  'static/images/33.png',
  'static/images/34.png',
  'static/images/35.png',
  'static/images/36.png',
  'static/images/37.png',
  'static/images/38.png',
  'static/images/39.png',
  'static/images/40.png'
]

const createBall = () => {
  const ball = Bodies.circle(
    render.canvas.width / 2 - BALL_RADIUS,
    render.canvas.height / 2 - 2 * BALL_RADIUS,
    BALL_RADIUS, {
    restitution: 1.03,
    render: {
      sprite: {
        texture: ballImagePaths[Math.round(Math.random() * (ballImagePaths.length - 1))]
      }
    }
  })
  balls.push(ball)
  return ball
}

const onRenderTick = () => {
  balls.forEach(ball => {
    if (ball.position.y >= render.canvas.height - 200) {
      Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: 0.003, y: -0.0001 });
    }
    if (ball.position.y < 180) {
      Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: -0.0001, y: 0.0001 });
    }

    if (ball.position.x < 80) {
      Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: 0.0001, y: -0.0001 });
    }

    if (ball.position.x > render.canvas.width - 80) {
      Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: -0.0001, y: 0.0001 });
    }
  });
};


for (let i = 0; i < BALLS_COUNT; i++) {
  World.add(engine.world, createBall())
}

Engine.run(engine)
Render.run(render)

const addBody = (...bodies) => {
  World.add(engine.world, ...bodies)
}

const addRect = ({ x = 0, y = 0, w = 10, h = 10, options = {} } = {}) => {
  const body = Bodies.rectangle(x, y, w, h, options)
  addBody(body)
  return body
}

const sW = CANVAS_WIDTH
const sH = CANVAS_WIDTH
const m = Math.min(sW, sH)
const rat = 1 / 4.5 * 2
const r = m * rat
const pegCount = 64
const TAU = Math.PI * 2
for (let i = 0; i < pegCount; i++) {
  const segment = TAU / pegCount
  const angle2 = i / pegCount * TAU + segment / 2
  const x2 = Math.cos(angle2)
  const y2 = Math.sin(angle2)
  const cx2 = x2 * r + sW / 2
  const cy2 = y2 * r + sH / 2
  addRect({
    x: cx2,
    y: cy2,
    w: 100 / 1000 * m,
    h: 3000 / 1000 * m,
    options: {
      angle: angle2,
      isStatic: true,
      density: 1,
      render: {
        fillStyle: 'transparent',
        strokeStyle: 'white',
        lineWidth: 0
      }
    }
  })
}

function startRotation(){
  startFanRotate();
  Events.on(runner, 'tick', onRenderTick)
  startAudio();
}

function stopRotation(){
  goDown();
  stopAudio();
  document.getElementById('startButtonSphere').style.display = "block";
  Events.off(runner, 'tick', onRenderTick)
}