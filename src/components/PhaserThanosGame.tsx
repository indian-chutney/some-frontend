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
  private attackMode: string = "light"; // Constant attack mode
  private currentHP: number = 1000;
  private lightButton!: Phaser.GameObjects.Text;
  private heavyButton!: Phaser.GameObjects.Text;
  private isPerformingHeavyAttack: boolean = false;

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

    // Create attack buttons
    this.createAttackButtons();

    // Set up global HP function
    this.setupGlobalHPFunction();

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

  private createAttackButtons(): void {
    const buttonY = 50;
    const buttonStyle = {
      fontSize: "18px",
      fill: "#ffffff",
      backgroundColor: "#333333",
      padding: { x: 20, y: 10 },
      borderRadius: 5,
    };

    // LIGHT button
    this.lightButton = this.add
      .text(100, buttonY, "LIGHT", buttonStyle)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.performLightAttack())
      .on("pointerover", () => this.lightButton.setStyle({ fill: "#ffff00" }))
      .on("pointerout", () => this.lightButton.setStyle({ fill: "#ffffff" }));

    // HEAVY button
    this.heavyButton = this.add
      .text(220, buttonY, "HEAVY", buttonStyle)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.performHeavyAttack())
      .on("pointerover", () => this.heavyButton.setStyle({ fill: "#ff0000" }))
      .on("pointerout", () => this.heavyButton.setStyle({ fill: "#ffffff" }));
  }

  private setupGlobalHPFunction(): void {
    // Expose global function for Dashboard to set HP
    (window as any).__thanosSetHP = (hp: number) => {
      const previousHP = this.currentHP;
      this.currentHP = hp;
      
      // Auto-trigger heavy attack when HP reaches 0
      if (hp <= 0 && previousHP > 0 && !this.isPerformingHeavyAttack) {
        this.performHeavyAttack();
      }
    };
  }

  private performLightAttack(): void {
    if (this.isPerformingHeavyAttack) return;
    
    // Light attack is the current default behavior - just visual feedback
    this.cameras.main.shake(200, 0.005);
    this.lightButton.setStyle({ fill: "#00ff00" });
    this.time.delayedCall(300, () => {
      this.lightButton.setStyle({ fill: "#ffffff" });
    });
  }

  private performHeavyAttack(): void {
    if (this.isPerformingHeavyAttack) return;
    
    this.isPerformingHeavyAttack = true;
    this.heavyButton.setStyle({ fill: "#ff0000" });

    // Stage 1: Charge (pause and scale up)
    this.tweens.add({
      targets: this.thanos,
      scale: CONFIG.thanos.scale + 0.2,
      duration: 800,
      ease: "Power2.easeIn",
      onComplete: () => {
        // Stage 2: Dash (quick movement and scale back)
        this.tweens.add({
          targets: this.thanos,
          scale: CONFIG.thanos.scale + 0.1,
          y: CONFIG.thanos.yPosition - 50,
          duration: 200,
          ease: "Power3.easeOut",
          onComplete: () => {
            // Stage 3: Impact (shake, effects, return to position)
            this.cameras.main.shake(800, 0.02);
            this.thanos.setTint(0xff0000);
            
            // Create explosion effect
            const explosion = this.add.circle(this.thanos.x, this.thanos.y, 10, 0xffaa00);
            this.tweens.add({
              targets: explosion,
              radius: 200,
              alpha: 0,
              duration: 600,
              onComplete: () => explosion.destroy(),
            });

            // Return thanos to normal
            this.tweens.add({
              targets: this.thanos,
              scale: CONFIG.thanos.scale,
              y: CONFIG.thanos.yPosition,
              duration: 400,
              ease: "Bounce.easeOut",
              onComplete: () => {
                this.thanos.clearTint();
                this.isPerformingHeavyAttack = false;
                this.heavyButton.setStyle({ fill: "#ffffff" });
                
                // If HP is 0, trigger death sequence
                if (this.currentHP <= 0) {
                  this.triggerDeathSequence();
                }
              },
            });
          },
        });
      },
    });
  }

  private triggerDeathSequence(): void {
    // Death sequence - fade out thanos and show game over effect
    this.tweens.add({
      targets: this.thanos,
      alpha: 0.3,
      scale: CONFIG.thanos.scale * 0.5,
      duration: 2000,
      ease: "Power2.easeOut",
    });

    // Add death text
    const deathText = this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY, "DEFEAT", {
        fontSize: "48px",
        fill: "#ff0000",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setAlpha(0);

    this.tweens.add({
      targets: deathText,
      alpha: 1,
      duration: 1000,
      ease: "Power2.easeOut",
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

    // Keep buttons at consistent positions
    if (this.lightButton) {
      this.lightButton.setPosition(100, 50);
    }
    if (this.heavyButton) {
      this.heavyButton.setPosition(220, 50);
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
        borderRadius: "20px",
        overflow: "hidden",
        background: "transparent",
      }}
    />
  );
};

export default PhaserThanosGame;
