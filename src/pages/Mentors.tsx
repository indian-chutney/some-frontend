import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Briefcase, Clock, Heart } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { colors, fonts, spacing } from "../utils/theme";

interface MentorCardProps {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  matchPercentage: number;
  image: string;
  expertise: string[];
  delay?: number;
}

const MentorCard: React.FC<MentorCardProps> = ({
  name,
  title,
  company,
  location,
  rating,
  reviewCount,
  price,
  matchPercentage,
  expertise,
  delay = 0,
}) => {
  return (
    <motion.div
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.surfaceLight}`,
        borderRadius: "16px",
        padding: spacing.xl,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 10px 30px ${colors.primary}20`,
      }}
    >
      {/* Match percentage badge */}
      <div
        style={{
          position: "absolute",
          top: spacing.md,
          right: spacing.md,
          backgroundColor: colors.primary,
          color: "white",
          borderRadius: "20px",
          padding: `${spacing.xs} ${spacing.sm}`,
          fontSize: "0.8rem",
          fontWeight: "600",
        }}
      >
        {matchPercentage}% Match
      </div>

      {/* Mentor image placeholder */}
      <div
        style={{
          width: "80px",
          height: "80px",
          backgroundColor: `${colors.secondary}20`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: spacing.lg,
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: colors.secondary,
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Mentor info */}
      <h3
        style={{
          fontSize: "1.2rem",
          fontWeight: "700",
          color: colors.textPrimary,
          marginBottom: spacing.sm,
          fontFamily: fonts.logo,
        }}
      >
        {name}
      </h3>

      <p
        style={{
          color: colors.textSecondary,
          fontSize: "0.9rem",
          marginBottom: spacing.xs,
        }}
      >
        {title}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: spacing.xs,
          marginBottom: spacing.sm,
          color: colors.textMuted,
          fontSize: "0.8rem",
        }}
      >
        <Briefcase size={14} />
        <span>{company}</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: spacing.xs,
          marginBottom: spacing.lg,
          color: colors.textMuted,
          fontSize: "0.8rem",
        }}
      >
        <MapPin size={14} />
        <span>{location}</span>
      </div>

      {/* Rating */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: spacing.sm,
          marginBottom: spacing.lg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: spacing.xs }}>
          <Star size={16} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
          <span
            style={{
              color: colors.textPrimary,
              fontWeight: "600",
              fontSize: "0.9rem",
            }}
          >
            {rating}
          </span>
        </div>
        <span style={{ color: colors.textMuted, fontSize: "0.8rem" }}>
          ({reviewCount} reviews)
        </span>
      </div>

      {/* Expertise tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: spacing.xs,
          marginBottom: spacing.lg,
        }}
      >
        {expertise.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            style={{
              backgroundColor: `${colors.primary}20`,
              color: colors.primary,
              padding: `${spacing.xs} ${spacing.sm}`,
              borderRadius: "12px",
              fontSize: "0.75rem",
              fontWeight: "500",
            }}
          >
            {skill}
          </span>
        ))}
        {expertise.length > 3 && (
          <span
            style={{
              color: colors.textMuted,
              fontSize: "0.75rem",
              padding: `${spacing.xs} ${spacing.sm}`,
            }}
          >
            +{expertise.length - 3} more
          </span>
        )}
      </div>

      {/* Price and actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span
            style={{
              color: colors.textPrimary,
              fontSize: "1.1rem",
              fontWeight: "700",
            }}
          >
            ${price}
          </span>
          <span
            style={{
              color: colors.textMuted,
              fontSize: "0.8rem",
              marginLeft: spacing.xs,
            }}
          >
            /hour
          </span>
        </div>

        <div style={{ display: "flex", gap: spacing.sm }}>
          <motion.button
            style={{
              backgroundColor: "transparent",
              border: `1px solid ${colors.surfaceLight}`,
              borderRadius: "8px",
              padding: spacing.sm,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            whileHover={{ backgroundColor: colors.surface }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart size={16} style={{ color: colors.textMuted }} />
          </motion.button>

          <motion.button
            style={{
              backgroundColor: colors.primary,
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: `${spacing.sm} ${spacing.lg}`,
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
            whileHover={{ backgroundColor: colors.secondary }}
            whileTap={{ scale: 0.95 }}
          >
            Book Session
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Mentors: React.FC = () => {
  // Mock mentor data
  const mentors = [
    {
      id: "1",
      name: "Sarah Chen",
      title: "Senior Software Engineer",
      company: "Google",
      location: "San Francisco, CA",
      rating: 4.9,
      reviewCount: 127,
      price: 120,
      matchPercentage: 95,
      image: "",
      expertise: ["React", "Node.js", "System Design", "Career Growth", "Leadership"],
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      title: "Product Manager",
      company: "Meta",
      location: "New York, NY",
      rating: 4.8,
      reviewCount: 89,
      price: 150,
      matchPercentage: 88,
      image: "",
      expertise: ["Product Strategy", "Data Analysis", "User Research", "Agile"],
    },
    {
      id: "3",
      name: "Dr. Emily Watson",
      title: "Principal Data Scientist",
      company: "Microsoft",
      location: "Seattle, WA",
      rating: 4.9,
      reviewCount: 156,
      price: 180,
      matchPercentage: 92,
      image: "",
      expertise: ["Machine Learning", "Python", "Statistics", "AI Ethics"],
    },
    {
      id: "4",
      name: "Alex Kim",
      title: "UX Designer",
      company: "Airbnb",
      location: "Austin, TX",
      rating: 4.7,
      reviewCount: 73,
      price: 100,
      matchPercentage: 85,
      image: "",
      expertise: ["UI/UX Design", "Figma", "User Testing", "Design Systems"],
    },
    {
      id: "5",
      name: "James Thompson",
      title: "Engineering Manager",
      company: "Netflix",
      location: "Los Angeles, CA",
      rating: 4.8,
      reviewCount: 94,
      price: 140,
      matchPercentage: 90,
      image: "",
      expertise: ["Team Leadership", "Scaling Teams", "Architecture", "Mentoring"],
    },
    {
      id: "6",
      name: "Priya Patel",
      title: "DevOps Engineer",
      company: "Amazon",
      location: "Boston, MA",
      rating: 4.9,
      reviewCount: 112,
      price: 130,
      matchPercentage: 87,
      image: "",
      expertise: ["AWS", "Kubernetes", "CI/CD", "Infrastructure", "Security"],
    },
  ];

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
          padding: spacing.xl,
        }}
      >
        {/* Header */}
        <motion.div
          style={{
            marginBottom: spacing["2xl"],
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              color: colors.textPrimary,
              marginBottom: spacing.md,
              fontFamily: fonts.logo,
            }}
          >
            Find Your Perfect Mentor
          </h1>
          <p
            style={{
              color: colors.textSecondary,
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Connect with experienced professionals who can guide your career journey.
            All mentors are verified and rated by the community.
          </p>
        </motion.div>

        {/* Filters section */}
        <motion.div
          style={{
            backgroundColor: colors.surface,
            border: `1px solid ${colors.surfaceLight}`,
            borderRadius: "16px",
            padding: spacing.xl,
            marginBottom: spacing["2xl"],
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.md,
              marginBottom: spacing.lg,
            }}
          >
            <Clock size={20} style={{ color: colors.primary }} />
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: colors.textPrimary,
                margin: 0,
              }}
            >
              Quick Filters
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: spacing.md,
            }}
          >
            {["All", "Software Engineering", "Product Management", "Data Science", "Design", "Leadership"].map(
              (filter, index) => (
                <motion.button
                  key={filter}
                  style={{
                    backgroundColor: index === 0 ? colors.primary : "transparent",
                    color: index === 0 ? "white" : colors.textSecondary,
                    border: `1px solid ${index === 0 ? colors.primary : colors.surfaceLight}`,
                    borderRadius: "20px",
                    padding: `${spacing.sm} ${spacing.lg}`,
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  whileHover={{
                    backgroundColor: index === 0 ? colors.secondary : colors.surface,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter}
                </motion.button>
              )
            )}
          </div>
        </motion.div>

        {/* Mentors grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: spacing.xl,
          }}
        >
          {mentors.map((mentor, index) => (
            <MentorCard
              key={mentor.id}
              {...mentor}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>

        {/* Load more button */}
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: spacing["3xl"],
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.button
            style={{
              backgroundColor: "transparent",
              border: `2px solid ${colors.primary}`,
              color: colors.primary,
              borderRadius: "12px",
              padding: `${spacing.lg} ${spacing["2xl"]}`,
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
            whileHover={{
              backgroundColor: colors.primary,
              color: "white",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Mentors
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default Mentors;