import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

interface GameConfig {
  thanos: {
    scale: number;
    yPosition: number;
    hitEffect: {
      scaleIncrease: number;
      tintColor: number;
      duration: number;
    };
  };
  attackers: {
    scale: number;
    spawnYOffset: number;
    targetYOffset: number;
    animation: {
      duration: number;
      ease: string;
    };
  };
}

const CONFIG: GameConfig = {
  thanos: {
    scale: 0.55,
    yPosition: 450,
    hitEffect: {
      scaleIncrease: 0.08,
      tintColor: 0xff0000,
      duration: 49,
    },
  },
  attackers: {
    scale: 3,
    spawnYOffset: 300,
    targetYOffset: -200,
    animation: {
      duration: 700,
      ease: "Power1",
    },
  },
};

class ArenaScene extends Phaser.Scene {
  private hasHitOnce: boolean = false;
  private thanos!: Phaser.GameObjects.Image;

  constructor() {
    super("ArenaScene");
  }

  preload(): void {
    // Use existing thanos asset or fallback
    this.load.image("thanos", "/assets/thanos.png");

    // Create simple colored rectangles as placeholders for sprites
    // In a real implementation, these would be actual spritesheets

    this.load.spritesheet("orc_attack", "/assets/Orc-Attack01.png", {
      frameWidth: 88,
      frameHeight: 100,
    });
    this.load.spritesheet("soldier_attack", "/assets/Soldier-Attack01.png", {
      frameWidth: 88,
      frameHeight: 100,
    });
  }

  create(): void {
    const centerX = this.cameras.main.width / 2;

    this.thanos = this.add
      .image(centerX, CONFIG.thanos.yPosition, "thanos")
      .setScale(CONFIG.thanos.scale);

    this.anims.create({
      key: "orc_attack_anim",
      frames: this.anims.generateFrameNumbers("orc_attack", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => this.spawnAttacker(),
    });

    this.scale.on("resize", this.resize, this);
  }

  private spawnAttacker(): void {
    const isOrc = Phaser.Math.Between(0, 1) === 0;

    const spriteKey = isOrc ? "orc_attack" : "soldier_attack";

    const attacker = this.add
      .sprite(
        Phaser.Math.Between(100, this.scale.width - 100),
        this.scale.height + CONFIG.attackers.spawnYOffset,
        "orc_attack"
      )
      .setScale(CONFIG.attackers.scale)
      .play("orc_attack_anim");

    // Add a simple pulsing animation to simulate the original spritesheet animation
    this.tweens.add({
      targets: attacker,
      scaleX: CONFIG.attackers.scale * 1.1,
      scaleY: CONFIG.attackers.scale * 1.1,
      duration: 200,
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: attacker,
      x: this.thanos.x,
      y: this.thanos.y + Phaser.Math.Between(CONFIG.attackers.targetYOffset, 0),
      duration: CONFIG.attackers.animation.duration,
      ease: CONFIG.attackers.animation.ease,
      onComplete: () => {
        attacker.destroy();
        this.cameras.main.shake(300, 0.01);
        this.hitThanosEffect();

        if (!this.hasHitOnce) {
          this.hasHitOnce = true;
          this.time.delayedCall(1000, () => this.createFireworks());
        }
      },
    });
  }

  private hitThanosEffect(): void {
    this.thanos.setTint(CONFIG.thanos.hitEffect.tintColor);

    this.tweens.add({
      targets: this.thanos,
      scale: this.thanos.scale + CONFIG.thanos.hitEffect.scaleIncrease,
      duration: CONFIG.thanos.hitEffect.duration,
      yoyo: true,
      ease: "Quad.easeInOut",
      onComplete: () => this.thanos.clearTint(),
    });
  }

  private createFireworks(): void {
    for (let i = 0; i < 10; i++) {
      this.time.delayedCall(i * 200, () => {
        const x = Phaser.Math.Between(100, this.cameras.main.width - 100);
        const y = Phaser.Math.Between(100, this.cameras.main.height / 2);
        this.createFirework(x, y);
      });
    }
  }

  private createFirework(x: number, y: number): void {
    // Create simple firework effect with colored circles since we don't have the particle atlas
    const colors = [0xff0000, 0xffff00, 0x00ff00, 0x0000ff, 0xff00ff];

    for (let i = 0; i < 20; i++) {
      const particle = this.add.circle(x, y, 3, colors[i % colors.length]);

      const angle = (360 / 20) * i;
      const speed = Phaser.Math.Between(50, 150);
      const radians = Phaser.Math.DegToRad(angle);

      this.tweens.add({
        targets: particle,
        x: x + Math.cos(radians) * speed,
        y: y + Math.sin(radians) * speed + Phaser.Math.Between(50, 100),
        alpha: 0,
        scale: 0,
        duration: 1000,
        ease: "Quad.easeOut",
        onComplete: () => particle.destroy(),
      });
    }
  }

  private resize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;
    this.cameras.resize(width, height);

    if (this.thanos) {
      this.thanos.setPosition(width / 2, CONFIG.thanos.yPosition);
    }
  }
}

interface PhaserThanosGameProps {
  className?: string;
  style?: React.CSSProperties;
}

const PhaserThanosGame: React.FC<PhaserThanosGameProps> = ({
  className,
  style,
}) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
      },
      backgroundColor: "#000000",
      parent: gameRef.current,
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
      scene: [ArenaScene],
    };

    phaserGameRef.current = new Phaser.Game(config);

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={gameRef}
      id="phaser-thanos-container"
      className={className}
      style={{
        width: "800px",
        height: "600px",
        margin: "0 auto",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(139, 92, 246, 0.3)",
        ...style,
      }}
    />
  );
};

export default PhaserThanosGame;
