import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { Card } from "../components/ui/card";
import { colors, fonts, spacing } from "../utils/theme";
import { useBackendQuery } from "../hooks/hooks";
import { isCareerAssociate, getCurrentRole } from "../utils/roleUtils";
import { RoleFallbackUI, LoadingUI, NoDataUI } from "../components/FallbackComponents";

type TabType = "team" | "individual";
type PeriodType = "today" | "week" | "this_month" | "all_time";

type individualEntry = {
  username: string;
  user_score: string;
};

type PersonalProgress = {
  rank: string;
  name: string;
  score: string;
  totalParticipants: string;
};

type teamEntry = {
  team_name: string;
  team_score: string;
};

type LeaderboardEntry = individualEntry | teamEntry;

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("team");
  const [period, setPeriod] = useState<PeriodType>("today");

  const endpoint = `/leaderboard?data=${period}&type=${activeTab}`;

  const { data, isLoading } = useBackendQuery(
    ["leaderboard", activeTab, period],
    endpoint
  );
  console.log(data);

  const leaderboardData =
    (activeTab === "team"
      ? (
          data as {
            teams: LeaderboardEntry[];
            personal_progress: PersonalProgress;
          }
        )?.teams
      : (
          data as {
            individuals: LeaderboardEntry[];
            personal_progress: PersonalProgress;
          }
        )?.individuals) || [];

  const personalProgress = {
    rank: (data as any)?.personal_progress?.rank,
    totalParticipants: (data as any)?.personal_progress?.totalParticipants,
    name: (data as any)?.personal_progress?.name,
    score: (data as any)?.personal_progress?.score,
    completedTasks: (data as any)?.personal_progress?.score,
    totalTasks: 100,
  };

  console.log(personalProgress);

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: colors.textPrimary,
              marginBottom: spacing["2xl"],
              fontFamily: fonts.logo,
            }}
          >
            Leaderboard
          </h1>

          {/* Personal Progress - Role-based conditional rendering */}
          {isCareerAssociate() ? (
            <Card
              style={{
                marginBottom: spacing.xl,
                background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}05 100%)`,
                border: `1px solid ${colors.primary}20`,
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: colors.textPrimary,
                  marginBottom: spacing.lg,
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.sm,
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: colors.primary,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    fontWeight: "700",
                    color: colors.textPrimary,
                  }}
                >
                  JD
                </div>
                My Progress
              </h2>

              {/* Enhanced error handling for personal progress */}
              {isLoading ? (
                <LoadingUI 
                  type="skeleton" 
                  message="Loading your personal progress..."
                />
              ) : !data ? (
                <NoDataUI 
                  title="No Progress Data"
                  message="We couldn't find your personal progress data. Complete some tasks to see your stats here!"
                />
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: spacing.lg,
                  }}
                >
                  {/* Rank Card */}
                  <Card>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "2rem",
                          color: colors.primary,
                          fontWeight: "700",
                        }}
                      >
                        #{personalProgress.rank || "N/A"}
                      </div>
                      <div>Current Rank</div>
                      <div style={{ color: colors.textMuted }}>
                        of {personalProgress.totalParticipants || "0"}{" "}
                        {activeTab === "team" ? "teams" : "players"}
                      </div>
                    </div>
                  </Card>

                  {/* Tasks Card */}
                  <Card>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "2rem",
                          color: colors.success,
                          fontWeight: "700",
                        }}
                      >
                        {personalProgress.completedTasks || "0"}/
                        {personalProgress.totalTasks || "0"}
                      </div>
                      <div>Tasks Completed</div>
                      <div style={{ color: colors.textMuted }}>
                        {Math.round(
                          ((personalProgress.completedTasks || 0) /
                            (personalProgress.totalTasks || 1)) *
                            100
                        )}
                        % completion
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </Card>
          ) : (
            <RoleFallbackUI
              title="Personal Leaderboard Progress" 
              message={`Detailed leaderboard analytics are available for career associates. Your current role is "${getCurrentRole() || 'not set'}". Contact your admin to access personal progress tracking.`}
            />
          )}

          {/* Tabs & Period Toggles */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: spacing.md,
              marginBottom: spacing.md,
            }}
          >
            {/* Tabs */}
            <Card style={{ display: "flex", padding: "4px" }}>
              {[
                { id: "team", label: "Teams" },
                { id: "individual", label: "Individuals" },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  style={{
                    padding: spacing.md,
                    backgroundColor:
                      activeTab === tab.id ? colors.primary : "transparent",
                    color:
                      activeTab === tab.id
                        ? colors.textPrimary
                        : colors.textSecondary,
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </Card>

            {/* Period Toggle */}
            <Card style={{ display: "flex", padding: "4px" }}>
              {[
                { id: "today", label: "Today" },
                { id: "week", label: "Week" },
                { id: "this_month", label: "Month" },
                { id: "all_time", label: "All Time" },
              ].map((p) => (
                <motion.button
                  key={p.id}
                  onClick={() => setPeriod(p.id as PeriodType)}
                  style={{
                    padding: spacing.md,
                    backgroundColor:
                      period === p.id ? colors.primary : "transparent",
                    color:
                      period === p.id
                        ? colors.textPrimary
                        : colors.textSecondary,
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {p.label}
                </motion.button>
              ))}
            </Card>
          </div>

          {/* Leaderboard */}
          <Card style={{ padding: 0, maxHeight: "600px", overflowY: "auto" }}>
            {isLoading ? (
              <div style={{ padding: spacing.lg, textAlign: "center" }}>
                Loading...
              </div>
            ) : leaderboardData.length === 0 ? (
              <div style={{ padding: spacing.lg, textAlign: "center" }}>
                No data available.
              </div>
            ) : (
              leaderboardData.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: spacing.lg,
                    borderBottom:
                      index < leaderboardData.length - 1
                        ? `1px solid ${colors.surfaceLight}`
                        : "none",
                    backgroundColor:
                      index + 1 <= 3 ? `${colors.primary}10` : "transparent",
                  }}
                >
                  <div style={{ width: "50px", textAlign: "center" }}>
                    {index + 1 <= 3 ? (
                      ["🥇", "🥈", "🥉"][index]
                    ) : (
                      <span
                        style={{ fontWeight: 700, color: colors.textSecondary }}
                      >
                        #{index + 1}
                      </span>
                    )}
                  </div>
                  <div style={{ flex: 1, marginLeft: spacing.md }}>
                    <h3 style={{ margin: 0 }}>
                      {activeTab === "team"
                        ? (entry as any).team_name
                        : (entry as any).username}
                    </h3>
                  </div>
                  <div style={{ fontWeight: "700" }}>
                    {activeTab === "team"
                      ? (entry as any).team_score
                      : (entry as any).user_score}{" "}
                    tasks
                  </div>
                </div>
              ))
            )}
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Leaderboard;