import {useEffect, useRef, useState} from 'react';
import dinoSpriteUrl from './assets/crate-runner-dino.png';

const GAME_HEIGHT = 190;
const DINO_WIDTH = 52;
const DINO_HEIGHT = 56;
const GROUND_HEIGHT = 28;
const DINO_X = 54;

function drawDinosaur(context, game, groundY, sprite) {
  const dinoY = Math.min(game.dinoY, groundY - DINO_HEIGHT);
  const bob = game.grounded ? Math.sin(game.elapsed / 95) * 1.5 : 0;
  const rotation = game.grounded ? 0 : Math.max(-0.12, Math.min(0.12, game.velocityY / 4200));

  context.fillStyle = '#18171622';
  context.beginPath();
  context.ellipse(DINO_X + DINO_WIDTH / 2, groundY + 3, game.grounded ? 22 : 14, game.grounded ? 5 : 3, 0, 0, Math.PI * 2);
  context.fill();
  context.save();
  context.translate(DINO_X + DINO_WIDTH / 2, dinoY + DINO_HEIGHT / 2 + bob);
  context.rotate(rotation);
  context.imageSmoothingEnabled = false;
  context.drawImage(sprite, -DINO_WIDTH / 2, -DINO_HEIGHT / 2, DINO_WIDTH, DINO_HEIGHT);
  context.restore();
}

function drawSpikeObstacle(context, obstacle, groundY) {
  context.fillStyle = '#181716';
  context.beginPath();
  context.moveTo(obstacle.x - 2, groundY);
  context.lineTo(obstacle.x + obstacle.width / 2, groundY - obstacle.height - 2);
  context.lineTo(obstacle.x + obstacle.width + 2, groundY);
  context.closePath();
  context.fill();

  const spikeWidth = obstacle.width / obstacle.count;
  for (let index = 0; index < obstacle.count; index++) {
    const left = obstacle.x + index * spikeWidth;
    const right = left + spikeWidth;
    const tip = left + spikeWidth / 2;
    const tipY = groundY - obstacle.height * (index % 2 === 0 ? 1 : 0.78);
    context.fillStyle = index % 2 === 0 ? '#d6ff3f' : '#ff5bcb';
    context.beginPath();
    context.moveTo(left, groundY);
    context.lineTo(tip, tipY);
    context.lineTo(right, groundY);
    context.closePath();
    context.fill();
    context.strokeStyle = '#181716';
    context.lineWidth = 1.5;
    context.stroke();
  }
  context.fillStyle = '#181716';
  context.fillRect(obstacle.x - 2, groundY - 2, obstacle.width + 4, 3);
}

function drawScene(canvas, game, score, mode, sprite) {
  const context = canvas.getContext('2d');
  if (!context) return;

  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = GAME_HEIGHT;
  if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
  }
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  context.fillStyle = '#f5f0e6';
  context.fillRect(0, 0, width, height);

  const groundY = height - GROUND_HEIGHT;
  context.fillStyle = '#181716';
  context.font = '9px "DM Mono", monospace';
  context.textAlign = 'left';
  context.fillText('SIDE B / 45 RPM', 14, 20);

  for (const cloud of game.clouds) {
    context.fillStyle = '#18171614';
    context.fillRect(cloud.x, cloud.y, 36, 3);
    context.fillRect(cloud.x + 8, cloud.y - 5, 22, 3);
  }

  context.fillStyle = '#181716';
  context.fillRect(0, groundY, width, 2);
  context.fillStyle = '#f5f0e6';
  context.fillRect(0, groundY + 2, width, height - groundY);

  for (let x = -(game.distance % 74) + 18; x < width; x += 74) {
    context.fillStyle = '#181716';
    context.fillRect(x, groundY + 11, 8, 2);
  }

  for (const particle of game.particles) {
    const life = 1 - particle.age / particle.life;
    context.globalAlpha = Math.max(0, life);
    context.fillStyle = particle.color;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.size * life, 0, Math.PI * 2);
    context.fill();
  }
  context.globalAlpha = 1;

  if (sprite) drawDinosaur(context, game, groundY, sprite);

  for (const obstacle of game.obstacles) {
    drawSpikeObstacle(context, obstacle, groundY);
  }

  context.fillStyle = '#181716';
  context.font = '11px "DM Mono", monospace';
  context.textAlign = 'right';
  context.fillText(`${String(score).padStart(4, '0')} CUTS`, width - 14, 20);
}

function createGame(width) {
  return {
    width,
    elapsed: 0,
    distance: 0,
    dinoY: GAME_HEIGHT - GROUND_HEIGHT - DINO_HEIGHT,
    velocityY: 0,
    grounded: true,
    obstacles: [],
    particles: [],
    clouds: [
      {x: width * 0.24, y: 54},
      {x: width * 0.68, y: 83},
    ],
    nextObstacleIn: 700,
    lastFrame: 0,
  };
}

export default function DinoGame({onInteraction}) {
  const canvasRef = useRef(null);
  const gameRef = useRef(createGame(0));
  const modeRef = useRef('ready');
  const scoreRef = useRef(0);
  const [mode, setMode] = useState('ready');
  const [score, setScore] = useState(0);
  const [sprite, setSprite] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setSprite(image);
    image.src = dinoSpriteUrl;
  }, []);

  const startGame = () => {
    const width = canvasRef.current?.clientWidth || 0;
    gameRef.current = createGame(width);
    scoreRef.current = 0;
    modeRef.current = 'running';
    setScore(0);
    setMode('running');
  };

  const jump = () => {
    const game = gameRef.current;
    if (modeRef.current === 'running' && game.grounded) {
      game.velocityY = -470;
      game.grounded = false;
      const groundY = GAME_HEIGHT - GROUND_HEIGHT;
      for (let index = 0; index < 6; index++) {
        game.particles.push({
          x: DINO_X + 18 + Math.random() * 15,
          y: groundY - 2,
          velocityX: -35 - Math.random() * 70,
          velocityY: -25 - Math.random() * 70,
          age: 0,
          life: 220 + Math.random() * 180,
          size: 2 + Math.random() * 2,
          color: index % 2 ? '#ff5bcb' : '#181716',
        });
      }
    }
  };

  const handlePlay = () => {
    if (modeRef.current === 'running') jump();
    else startGame();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const resize = () => {
      gameRef.current.width = canvas.clientWidth;
      drawScene(canvas, gameRef.current, scoreRef.current, modeRef.current, sprite);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [sprite]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    let frameId;
    let lastScoreUpdate = 0;

    const frame = (timestamp) => {
      const game = gameRef.current;
      const delta = Math.min(timestamp - (game.lastFrame || timestamp), 32);
      game.lastFrame = timestamp;
      game.elapsed += delta;
      const seconds = delta / 1000;
      const groundY = GAME_HEIGHT - GROUND_HEIGHT;
      const speed = Math.min(520, 270 + game.distance / 28);
      game.distance += speed * seconds;
      game.dinoY += game.velocityY * seconds;
      game.velocityY += 1350 * seconds;

      if (game.dinoY >= groundY - DINO_HEIGHT) {
        const landed = !game.grounded;
        game.dinoY = groundY - DINO_HEIGHT;
        game.velocityY = 0;
        game.grounded = true;
        if (landed) {
          for (let index = 0; index < 4; index++) {
            game.particles.push({
              x: DINO_X + 17 + Math.random() * 16,
              y: groundY - 2,
              velocityX: -25 + Math.random() * 50,
              velocityY: -20 - Math.random() * 45,
              age: 0,
              life: 180 + Math.random() * 140,
              size: 1.5 + Math.random() * 2,
              color: '#181716',
            });
          }
        }
      }

      game.nextObstacleIn -= speed * seconds;
      if (game.nextObstacleIn <= 0) {
        const count = Math.random() < 0.35 ? 2 : 3;
        const width = count * 17;
        const height = 28 + Math.random() * 12;
        game.obstacles.push({x: game.width + 8, width, height, count});
        game.nextObstacleIn = 570 + Math.random() * 260;
      }
      game.obstacles.forEach((obstacle) => { obstacle.x -= speed * seconds; });
      game.obstacles = game.obstacles.filter((obstacle) => obstacle.x + obstacle.width > 0);

      game.clouds.forEach((cloud) => {
        cloud.x -= speed * seconds * 0.12;
        if (cloud.x < -40) cloud.x = game.width + 20;
      });
      game.particles.forEach((particle) => {
        particle.age += delta;
        particle.x += particle.velocityX * seconds;
        particle.y += particle.velocityY * seconds;
        particle.velocityY += 240 * seconds;
      });
      game.particles = game.particles.filter((particle) => particle.age < particle.life);

      const dinoBox = {left: DINO_X + 6, right: DINO_X + DINO_WIDTH - 5, top: game.dinoY + 8, bottom: game.dinoY + DINO_HEIGHT - 3};
      const hit = game.obstacles.some((obstacle) => (
        dinoBox.right > obstacle.x + 5
        && dinoBox.left < obstacle.x + obstacle.width - 5
        && dinoBox.bottom > groundY - obstacle.height * 0.72
        && dinoBox.top < groundY
      ));
      const nextScore = Math.floor(game.distance / 25);
      if (nextScore !== scoreRef.current && timestamp - lastScoreUpdate > 100) {
        scoreRef.current = nextScore;
        setScore(nextScore);
        lastScoreUpdate = timestamp;
      }
      drawScene(canvas, game, nextScore, 'running', sprite);

      if (hit) {
        scoreRef.current = nextScore;
        setScore(nextScore);
        modeRef.current = 'over';
        setMode('over');
        return;
      }
      frameId = window.requestAnimationFrame(frame);
    };

    if (mode === 'running') {
      gameRef.current.lastFrame = 0;
      frameId = window.requestAnimationFrame(frame);
    } else {
      drawScene(canvas, gameRef.current, scoreRef.current, mode, sprite);
    }
    return () => window.cancelAnimationFrame(frameId);
  }, [mode, sprite]);
  const handleKeyDown = (event) => {
    if (event.code !== 'Space' && event.code !== 'ArrowUp') return;
    event.preventDefault();
    if (event.repeat) return;
    onInteraction?.('arcade');
    if (modeRef.current === 'running') jump();
    else startGame();
  };

  return <section className="game-section" aria-labelledby="game-title">
    <div className="section-head"><h2>03 / Take a quick spin</h2><small>Crate runner · endless mode</small></div>
    <div className="game-cabinet">
      <div className="game-heading">
        <div><span className="game-kicker">SIDE B ARCADE / 001</span><h2 id="game-title">Crate runner</h2></div>
        <span className="game-sticker">NO SKIPS<br/>JUST JUMPS</span>
      </div>
      <div className="game-screen">
        <canvas
          ref={canvasRef}
          className="game-canvas"
          height={GAME_HEIGHT}
          aria-label={`Crate Runner game. Score: ${score} cuts. Press Space or Arrow Up to jump.`}
          onClick={handlePlay}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        />
        {mode !== 'running' && <div className="game-overlay">
          <strong>{mode === 'over' ? 'RECORD SCRATCH!' : 'READY TO DIG?'}</strong>
          <span>{mode === 'over' ? `You pulled ${score} cuts. Give it another go.` : 'Jump over the stray records and keep the groove going.'}</span>
          <button type="button" className="game-start" onClick={startGame}>{mode === 'over' ? 'Play again ↻' : 'Start digging ↗'}</button>
        </div>}
      </div>
      <div className="game-controls">
        <span>SPACE / ↑ TO JUMP</span>
        <button type="button" className="game-jump" onClick={handlePlay}>{mode === 'running' ? 'JUMP ↑' : mode === 'over' ? 'PLAY AGAIN ↻' : 'JUMP IN ↗'}</button>
        <span>OR TAP THE GAME</span>
      </div>
    </div>
  </section>;
}
