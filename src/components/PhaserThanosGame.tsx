import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import { Card, CardContent } from "./ui/card";

interface ThanosGameProps {
  isThanosDead: boolean;
}

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
  private isThanosDead: boolean = false;
  private lightAttackTimer?: Phaser.Time.TimerEvent;
  private deathSequenceStarted: boolean = false;

  constructor() {
    super("ArenaScene");
  }

  /**
   * Initialize the scene with Thanos death state
   * @param data - Scene initialization data containing isThanosDead state
   */
  init(data: { isThanosDead: boolean }): void {
    this.isThanosDead = data.isThanosDead || false;
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

    // Start appropriate battle sequence based on death state
    this.startBattleSequence();

    this.scale.on("resize", this.resize, this);
  }

  /**
   * Start the appropriate battle sequence based on Thanos death state
   * - If alive: Start light attack loop every 4 seconds
   * - If dead: Perform single heavy attack
   */
  private startBattleSequence(): void {
    if (this.isThanosDead && !this.deathSequenceStarted) {
      // Perform single heavy attack (death sequence)
      this.deathSequenceStarted = true;
      this.time.delayedCall(1000, () => this.performHeavyAttack());
    } else if (!this.isThanosDead) {
      // Start light attack loop every 4 seconds
      this.lightAttackTimer = this.time.addEvent({
        delay: 4000, // Changed from 2000 to 4000ms as per requirements
        loop: true,
        callback: () => this.performLightAttack(),
      });
    }
  }

  /**
   * Update the death state and handle transitions
   * @param isThanosDead - New death state
   */
  updateDeathState(isThanosDead: boolean): void {
    if (this.isThanosDead !== isThanosDead) {
      this.isThanosDead = isThanosDead;
      
      if (isThanosDead && !this.deathSequenceStarted) {
        // Stop light attacks and start death sequence
        if (this.lightAttackTimer) {
          this.lightAttackTimer.destroy();
        }
        this.deathSequenceStarted = true;
        this.performHeavyAttack();
      }
    }
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

  /**
   * Perform a light attack - attacker runs in, hits Thanos, and returns
   */
  private performLightAttack(): void {
    this.spawnAttacker(false);
  }

  /**
   * Perform a heavy attack - attacker dashes in, kills Thanos, and remains
   */
  private performHeavyAttack(): void {
    this.spawnAttacker(true);
  }

  private spawnAttacker(isHeavyAttack: boolean = false): void {
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

    // Heavy attack has faster, more dramatic movement
    const attackDuration = isHeavyAttack ? CONFIG.attackers.animation.duration * 0.6 : CONFIG.attackers.animation.duration;
    const targetY = this.thanos.y + Phaser.Math.Between(CONFIG.attackers.targetYOffset, 0);

    this.tweens.add({
      targets: attacker,
      x: this.thanos.x,
      y: targetY,
      duration: attackDuration,
      ease: isHeavyAttack ? "Back.easeOut" : CONFIG.attackers.animation.ease,
      onComplete: () => {
        // Heavy attack: attacker stays, light attack: attacker returns and disappears
        if (isHeavyAttack) {
          this.performHeavyAttackEffect();
          // Attacker remains on scene for heavy attack
        } else {
          this.performLightAttackEffect();
          // Light attack: attacker returns to starting position
          this.tweens.add({
            targets: attacker,
            x: attacker.x + Phaser.Math.Between(-200, 200),
            y: this.scale.height + CONFIG.attackers.spawnYOffset,
            duration: CONFIG.attackers.animation.duration,
            ease: CONFIG.attackers.animation.ease,
            onComplete: () => attacker.destroy(),
          });
        }
      },
    });
  }

  /**
   * Light attack effect - mild hit with recovery
   */
  private performLightAttackEffect(): void {
    this.cameras.main.shake(200, 0.01);
    this.hitThanosEffect();

    if (!this.hasHitOnce) {
      this.hasHitOnce = true;
    }
  }

  /**
   * Heavy attack effect - dramatic death sequence
   */
  private performHeavyAttackEffect(): void {
    // More intense camera shake for death
    this.cameras.main.shake(800, 0.03);
    
    // Dramatic hit effect with different color and longer duration
    this.thanos.setTint(0x8B0000); // Dark red tint for death
    
    this.tweens.add({
      targets: this.thanos,
      scale: this.thanos.scale + CONFIG.thanos.hitEffect.scaleIncrease * 2,
      rotation: Phaser.Math.DegToRad(15), // Slight rotation for dramatic effect
      duration: CONFIG.thanos.hitEffect.duration * 3,
      yoyo: false, // No recovery for death
      ease: "Power2.easeOut",
      onComplete: () => {
        // Fade out effect for death
        this.tweens.add({
          targets: this.thanos,
          alpha: 0.3,
          duration: 1000,
          ease: "Power2.easeOut",
        });
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

const PhaserThanosGame: React.FC<ThanosGameProps> = ({ isThanosDead }) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const sceneRef = useRef<ArenaScene | null>(null);

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
    
    // Store reference to the scene for later updates
    phaserGameRef.current.scene.start('ArenaScene', { isThanosDead });
    sceneRef.current = phaserGameRef.current.scene.getScene('ArenaScene') as ArenaScene;

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
        sceneRef.current = null;
      }
    };
  }, []);

  // Update scene when death state changes
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.updateDeathState(isThanosDead);
    }
  }, [isThanosDead]);

  return (
    <Card style={{ 
      padding: "0", 
      overflow: "hidden",
      border: "2px solid rgba(99, 102, 241, 0.2)",
      boxShadow: "0 10px 30px rgba(99, 102, 241, 0.1)",
      background: "linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(42, 42, 42, 0.9) 100%)"
    }}>
      <div
        ref={gameRef}
        id="phaser-thanos-container"
        style={{
          width: "100%",
          height: "60vh",
          minHeight: "400px",
          maxHeight: "700px",
          borderRadius: "14px",
          overflow: "hidden",
          background: "transparent",
          position: "relative"
        }}
      />
    </Card>
  );
};

export default PhaserThanosGame;
