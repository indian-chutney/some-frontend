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
    this.load.image("thanos", "/assets/thanos.png");

    this.load.spritesheet("orc_attack", "/assets/Orc-Attack01.png", {
      frameWidth: 100,
      frameHeight: 100,
    });
    this.load.spritesheet("soldier_attack", "/assets/Soldier-Attack01.png", {
      frameWidth: 100,
      frameHeight: 100,
    });
  }

  create(): void {
    const centerX = this.cameras.main.width / 2;

    this.createAnimations();

    this.thanos = this.add
      .image(centerX, CONFIG.thanos.yPosition, "thanos")
      .setScale(CONFIG.thanos.scale);

    this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => this.spawnAttacker(),
    });

    this.scale.on("resize", this.resize, this);
  }

  createAnimations(): void {
    this.anims.create({
      key: "orc_attack_anim",
      frames: this.anims.generateFrameNumbers("orc_attack", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "soldier_attack_anim",
      frames: this.anims.generateFrameNumbers("soldier_attack", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  private spawnAttacker(): void {
    const isOrc = Phaser.Math.Between(0, 1) === 0;

    const key = isOrc ? "orc_attack" : "soldier_attack";
    const animKey = isOrc ? "orc_attack_anim" : "soldier_attack_anim";

    const attacker = this.add
      .sprite(
        Phaser.Math.Between(100, this.scale.width - 100),
        this.scale.height + CONFIG.attackers.spawnYOffset,
        key
      )
      .setScale(CONFIG.attackers.scale);
    attacker.play(animKey);

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

  private resize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;
    this.cameras.resize(width, height);

    if (this.thanos) {
      this.thanos.setPosition(width / 2, CONFIG.thanos.yPosition);
    }
  }
}

const PhaserThanosGame: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: "100%",
        height: "100%",
      },
      backgroundColor: "transparent",
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
      style={{
        width: "100%",
        height: "90vh",
        minHeight: "60vh",
        borderRadius: "0",
        overflow: "hidden",
        background: "transparent",
      }}
    />
  );
};

export default PhaserThanosGame;
