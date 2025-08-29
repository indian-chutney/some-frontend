import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, MessageSquare, Star, MoreHorizontal, Filter } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { colors, fonts, spacing } from "../utils/theme";

interface BookingCardProps {
  id: string;
  mentorName: string;
  mentorTitle: string;
  date: string;
  time: string;
  duration: number;
  type: "video" | "chat";
  status: "upcoming" | "completed" | "cancelled";
  price: number;
  rating?: number;
  delay?: number;
}

const BookingCard: React.FC<BookingCardProps> = ({
  mentorName,
  mentorTitle,
  date,
  time,
  duration,
  type,
  status,
  price,
  rating,
  delay = 0,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "upcoming":
        return colors.primary;
      case "completed":
        return colors.secondary;
      case "cancelled":
        return "#ef4444";
      default:
        return colors.textMuted;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "upcoming":
        return "Upcoming";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <motion.div
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.surfaceLight}`,
        borderRadius: "16px",
        padding: spacing.xl,
        position: "relative",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Status badge */}
      <div
        style={{
          position: "absolute",
          top: spacing.md,
          right: spacing.md,
          backgroundColor: `${getStatusColor()}20`,
          color: getStatusColor(),
          borderRadius: "12px",
          padding: `${spacing.xs} ${spacing.sm}`,
          fontSize: "0.8rem",
          fontWeight: "600",
        }}
      >
        {getStatusText()}
      </div>

      {/* Mentor avatar */}
      <div
        style={{
          width: "60px",
          height: "60px",
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
            width: "40px",
            height: "40px",
            backgroundColor: colors.secondary,
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Mentor info */}
      <h3
        style={{
          fontSize: "1.1rem",
          fontWeight: "700",
          color: colors.textPrimary,
          marginBottom: spacing.xs,
          fontFamily: fonts.logo,
        }}
      >
        {mentorName}
      </h3>

      <p
        style={{
          color: colors.textSecondary,
          fontSize: "0.9rem",
          marginBottom: spacing.lg,
        }}
      >
        {mentorTitle}
      </p>

      {/* Session details */}
      <div style={{ marginBottom: spacing.lg }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
            marginBottom: spacing.sm,
            color: colors.textMuted,
            fontSize: "0.9rem",
          }}
        >
          <Calendar size={16} />
          <span>{date}</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
            marginBottom: spacing.sm,
            color: colors.textMuted,
            fontSize: "0.9rem",
          }}
        >
          <Clock size={16} />
          <span>{time} ({duration} min)</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
            color: colors.textMuted,
            fontSize: "0.9rem",
          }}
        >
          {type === "video" ? <Video size={16} /> : <MessageSquare size={16} />}
          <span>{type === "video" ? "Video Call" : "Text Chat"}</span>
        </div>
      </div>

      {/* Rating (for completed sessions) */}
      {status === "completed" && rating && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
            marginBottom: spacing.lg,
          }}
        >
          <Star size={16} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
          <span
            style={{
              color: colors.textPrimary,
              fontWeight: "600",
              fontSize: "0.9rem",
            }}
          >
            {rating}/5
          </span>
          <span style={{ color: colors.textMuted, fontSize: "0.8rem" }}>
            (Your rating)
          </span>
        </div>
      )}

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
        </div>

        <div style={{ display: "flex", gap: spacing.sm }}>
          {status === "upcoming" && (
            <>
              <motion.button
                style={{
                  backgroundColor: "transparent",
                  border: `1px solid ${colors.surfaceLight}`,
                  borderRadius: "8px",
                  padding: `${spacing.sm} ${spacing.md}`,
                  color: colors.textSecondary,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
                whileHover={{ backgroundColor: colors.surface }}
                whileTap={{ scale: 0.95 }}
              >
                Reschedule
              </motion.button>

              <motion.button
                style={{
                  backgroundColor: colors.primary,
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: `${spacing.sm} ${spacing.md}`,
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                whileHover={{ backgroundColor: colors.secondary }}
                whileTap={{ scale: 0.95 }}
              >
                Join Session
              </motion.button>
            </>
          )}

          {status === "completed" && !rating && (
            <motion.button
              style={{
                backgroundColor: colors.secondary,
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: `${spacing.sm} ${spacing.md}`,
                fontSize: "0.9rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
              whileHover={{ backgroundColor: colors.primary }}
              whileTap={{ scale: 0.95 }}
            >
              Rate Session
            </motion.button>
          )}

          <motion.button
            style={{
              backgroundColor: "transparent",
              border: "none",
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
            <MoreHorizontal size={16} style={{ color: colors.textMuted }} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ClientBookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "all">("all");

  // Mock booking data
  const bookings = [
    {
      id: "1",
      mentorName: "Sarah Chen",
      mentorTitle: "Senior Software Engineer at Google",
      date: "Dec 15, 2024",
      time: "2:00 PM",
      duration: 60,
      type: "video" as const,
      status: "upcoming" as const,
      price: 120,
    },
    {
      id: "2",
      mentorName: "Michael Rodriguez",
      mentorTitle: "Product Manager at Meta",
      date: "Dec 12, 2024",
      time: "10:00 AM",
      duration: 45,
      type: "chat" as const,
      status: "completed" as const,
      price: 150,
      rating: 5,
    },
    {
      id: "3",
      mentorName: "Dr. Emily Watson",
      mentorTitle: "Principal Data Scientist at Microsoft",
      date: "Dec 18, 2024",
      time: "4:00 PM",
      duration: 90,
      type: "video" as const,
      status: "upcoming" as const,
      price: 180,
    },
    {
      id: "4",
      mentorName: "Alex Kim",
      mentorTitle: "UX Designer at Airbnb",
      date: "Dec 8, 2024",
      time: "1:00 PM",
      duration: 60,
      type: "video" as const,
      status: "completed" as const,
      price: 100,
    },
    {
      id: "5",
      mentorName: "James Thompson",
      mentorTitle: "Engineering Manager at Netflix",
      date: "Dec 5, 2024",
      time: "11:00 AM",
      duration: 75,
      type: "chat" as const,
      status: "cancelled" as const,
      price: 140,
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true;
    return booking.status === activeTab;
  });

  const tabs = [
    { id: "all", label: "All Bookings", count: bookings.length },
    { id: "upcoming", label: "Upcoming", count: bookings.filter(b => b.status === "upcoming").length },
    { id: "completed", label: "Completed", count: bookings.filter(b => b.status === "completed").length },
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
            My Bookings
          </h1>
          <p
            style={{
              color: colors.textSecondary,
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Manage your mentoring sessions and track your learning progress.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          style={{
            display: "flex",
            gap: spacing.lg,
            marginBottom: spacing["2xl"],
            borderBottom: `1px solid ${colors.surfaceLight}`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              style={{
                backgroundColor: "transparent",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab.id ? colors.primary : "transparent"}`,
                color: activeTab === tab.id ? colors.primary : colors.textSecondary,
                padding: `${spacing.md} 0`,
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: spacing.sm,
              }}
              whileHover={{ color: colors.primary }}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
              <span
                style={{
                  backgroundColor: activeTab === tab.id ? colors.primary : colors.surfaceLight,
                  color: activeTab === tab.id ? "white" : colors.textMuted,
                  borderRadius: "10px",
                  padding: `2px ${spacing.xs}`,
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  minWidth: "20px",
                  textAlign: "center",
                }}
              >
                {tab.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Filter and sort */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "between",
            marginBottom: spacing.xl,
            gap: spacing.md,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button
            style={{
              backgroundColor: colors.surface,
              border: `1px solid ${colors.surfaceLight}`,
              borderRadius: "12px",
              padding: `${spacing.sm} ${spacing.md}`,
              display: "flex",
              alignItems: "center",
              gap: spacing.sm,
              color: colors.textSecondary,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
            whileHover={{ backgroundColor: colors.background }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter size={16} />
            Filter & Sort
          </motion.button>
        </motion.div>

        {/* Bookings grid */}
        {filteredBookings.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: spacing.xl,
            }}
          >
            {filteredBookings.map((booking, index) => (
              <BookingCard
                key={booking.id}
                {...booking}
                delay={0.3 + index * 0.1}
              />
            ))}
          </div>
        ) : (
          <motion.div
            style={{
              textAlign: "center",
              padding: spacing["4xl"],
              backgroundColor: colors.surface,
              borderRadius: "16px",
              border: `1px solid ${colors.surfaceLight}`,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Calendar size={48} style={{ color: colors.textMuted, marginBottom: spacing.lg }} />
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                color: colors.textPrimary,
                marginBottom: spacing.md,
              }}
            >
              No bookings found
            </h3>
            <p
              style={{
                color: colors.textSecondary,
                marginBottom: spacing.xl,
              }}
            >
              {activeTab === "all" 
                ? "You haven't booked any mentoring sessions yet."
                : `No ${activeTab} sessions found.`}
            </p>
            <motion.button
              style={{
                backgroundColor: colors.primary,
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: `${spacing.md} ${spacing.xl}`,
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
              whileHover={{ backgroundColor: colors.secondary }}
              whileTap={{ scale: 0.95 }}
            >
              Find a Mentor
            </motion.button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ClientBookings;