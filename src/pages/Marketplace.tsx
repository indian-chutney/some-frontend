import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Check, User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Card } from "../components/ui/card";
import { colors, fonts, spacing } from "../utils/theme";

interface MarketplaceItem {
  id: string;
  type: 'character' | 'background';
  name: string;
  description: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  imageUrl: string;
  isPurchased: boolean;
}

const Marketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'characters' | 'backgrounds'>('all');
  const [purchasedItems, setPurchasedItems] = useState<Set<string>>(new Set());

  // Mock marketplace items for PhaserThanos
  const marketplaceItems: MarketplaceItem[] = [
    {
      id: 'char-warrior',
      type: 'character',
      name: 'Elite Warrior',
      description: 'A skilled fighter with enhanced combat abilities and unique animations.',
      price: 150,
      rarity: 'epic',
      imageUrl: '/characters/warrior.png',
      isPurchased: false,
    },
    {
      id: 'char-ninja',
      type: 'character',
      name: 'Shadow Ninja',
      description: 'Swift and agile assassin with stealth capabilities and ninja techniques.',
      price: 200,
      rarity: 'legendary',
      imageUrl: '/characters/ninja.png',
      isPurchased: false,
    },
    {
      id: 'bg-cosmic',
      type: 'background',
      name: 'Cosmic Arena',
      description: 'Battle among the stars in this spectacular cosmic battlefield.',
      price: 100,
      rarity: 'rare',
      imageUrl: '/backgrounds/cosmic.png',
      isPurchased: false,
    },
    {
      id: 'bg-volcano',
      type: 'background',
      name: 'Volcanic Battleground',
      description: 'Fight in the heart of an active volcano with lava effects.',
      price: 120,
      rarity: 'epic',
      imageUrl: '/backgrounds/volcano.png',
      isPurchased: false,
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return colors.textSecondary;
      case 'rare': return colors.primary;
      case 'epic': return colors.secondary;
      case 'legendary': return '#ff6b6b';
      default: return colors.textSecondary;
    }
  };

  const filteredItems = marketplaceItems.filter(item => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'characters') return item.type === 'character';
    if (selectedCategory === 'backgrounds') return item.type === 'background';
    return true;
  });

  const handlePurchase = (itemId: string) => {
    setPurchasedItems(prev => new Set([...prev, itemId]));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        fontFamily: fonts.body,
        display: "flex",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          marginLeft: window.innerWidth >= 1024 ? "280px" : "0",
          padding: spacing["2xl"],
        }}
      >
        <motion.div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: spacing["2xl"],
              flexWrap: "wrap",
              gap: spacing.md,
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: colors.textPrimary,
                  marginBottom: spacing.sm,
                  fontFamily: fonts.logo,
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.md,
                }}
              >
                <motion.div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: colors.primary,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <ShoppingCart size={24} style={{ color: colors.textPrimary }} />
                </motion.div>
                Marketplace
              </h1>
              <p
                style={{
                  fontSize: "1rem",
                  color: colors.textSecondary,
                  margin: 0,
                }}
              >
                Enhance your PhaserThanos experience with premium characters and backgrounds
              </p>
            </div>

            {/* Currency Display */}
            <Card
              style={{
                padding: spacing.lg,
                display: "flex",
                alignItems: "center",
                gap: spacing.sm,
                background: `linear-gradient(135deg, ${colors.secondary}20 0%, ${colors.secondary}10 100%)`,
                border: `1px solid ${colors.secondary}40`,
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: colors.secondary,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  fontWeight: "700",
                }}
              >
                💰
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    color: colors.textPrimary,
                  }}
                >
                  1,250 Coins
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: colors.textSecondary,
                  }}
                >
                  Your balance
                </div>
              </div>
            </Card>
          </div>

          {/* Category Filter */}
          <Card
            style={{
              padding: spacing.sm,
              marginBottom: spacing.xl,
              display: "flex",
              gap: spacing.sm,
              flexWrap: "wrap",
            }}
          >
            {[
              { id: 'all', label: 'All Items' },
              { id: 'characters', label: 'Characters' },
              { id: 'backgrounds', label: 'Backgrounds' },
            ].map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                style={{
                  padding: `${spacing.sm} ${spacing.lg}`,
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor:
                    selectedCategory === category.id ? colors.primary : "transparent",
                  color:
                    selectedCategory === category.id
                      ? colors.textPrimary
                      : colors.textSecondary,
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                whileHover={{
                  backgroundColor:
                    selectedCategory === category.id
                      ? colors.primaryDark
                      : colors.surfaceLight,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </Card>

          {/* Items Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: spacing.xl,
            }}
          >
            {filteredItems.map((item, index) => {
              const isPurchased = purchasedItems.has(item.id);
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    hover
                    style={{
                      padding: 0,
                      overflow: "hidden",
                      position: "relative",
                      border: `2px solid ${isPurchased ? colors.success : 'transparent'}`,
                    }}
                  >
                    {/* Item Image Placeholder */}
                    <div
                      style={{
                        height: "200px",
                        background: `linear-gradient(135deg, ${getRarityColor(item.rarity)}20 0%, ${getRarityColor(item.rarity)}10 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      {/* Rarity Badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: spacing.md,
                          right: spacing.md,
                          padding: `${spacing.xs} ${spacing.sm}`,
                          backgroundColor: getRarityColor(item.rarity),
                          borderRadius: "12px",
                          fontSize: "0.7rem",
                          fontWeight: "700",
                          color: colors.textPrimary,
                          textTransform: "uppercase",
                          display: "flex",
                          alignItems: "center",
                          gap: spacing.xs,
                        }}
                      >
                        <Star size={12} />
                        {item.rarity}
                      </div>

                      {/* Purchased Badge */}
                      {isPurchased && (
                        <div
                          style={{
                            position: "absolute",
                            top: spacing.md,
                            left: spacing.md,
                            padding: `${spacing.xs} ${spacing.sm}`,
                            backgroundColor: colors.success,
                            borderRadius: "12px",
                            fontSize: "0.7rem",
                            fontWeight: "700",
                            color: colors.textPrimary,
                            display: "flex",
                            alignItems: "center",
                            gap: spacing.xs,
                          }}
                        >
                          <Check size={12} />
                          OWNED
                        </div>
                      )}

                      {/* Item Preview Icon */}
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundColor: getRarityColor(item.rarity),
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "2rem",
                        }}
                      >
                        {item.type === 'character' ? '🥷' : '🌌'}
                      </div>
                    </div>

                    {/* Item Details */}
                    <div style={{ padding: spacing.lg }}>
                      <h3
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "600",
                          color: colors.textPrimary,
                          margin: 0,
                          marginBottom: spacing.sm,
                        }}
                      >
                        {item.name}
                      </h3>
                      
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: colors.textSecondary,
                          margin: 0,
                          marginBottom: spacing.lg,
                          lineHeight: 1.5,
                        }}
                      >
                        {item.description}
                      </p>

                      {/* Price and Purchase Button */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: spacing.md,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: spacing.sm,
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: colors.textSecondary,
                            }}
                          >
                            Price:
                          </span>
                          <span
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "700",
                              color: colors.secondary,
                            }}
                          >
                            {item.price} 💰
                          </span>
                        </div>

                        <motion.button
                          onClick={() => handlePurchase(item.id)}
                          disabled={isPurchased}
                          style={{
                            padding: `${spacing.sm} ${spacing.lg}`,
                            borderRadius: "8px",
                            border: "none",
                            backgroundColor: isPurchased ? colors.success : colors.primary,
                            color: colors.textPrimary,
                            fontSize: "0.9rem",
                            fontWeight: "600",
                            cursor: isPurchased ? "default" : "pointer",
                            opacity: isPurchased ? 0.8 : 1,
                            display: "flex",
                            alignItems: "center",
                            gap: spacing.xs,
                          }}
                          whileHover={!isPurchased ? { scale: 1.05 } : {}}
                          whileTap={!isPurchased ? { scale: 0.95 } : {}}
                        >
                          {isPurchased ? (
                            <>
                              <Check size={16} />
                              Owned
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={16} />
                              Buy Now
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <motion.div
              style={{
                textAlign: "center",
                padding: spacing["3xl"],
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: spacing.lg,
                }}
              >
                🛍️
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: colors.textPrimary,
                  marginBottom: spacing.sm,
                }}
              >
                No items found
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  color: colors.textSecondary,
                  margin: 0,
                }}
              >
                Try adjusting your filter or check back later for new items!
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Marketplace;