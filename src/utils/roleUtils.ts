/**
 * Utility functions for role-based access control
 */

export type UserType = "client" | "mentor" | "admin";

/**
 * Check if the current user has career-associate or equivalent roles
 * @returns boolean indicating if user has access to career associate features
 */
export const isCareerAssociate = (): boolean => {
  const role = localStorage.getItem("role");
  return role === "career-associate" || role === "CA" || role === "Team Lead" || role === "Junior CA";
};

/**
 * Get the current user's role from localStorage
 * @returns string role or null if not set
 */
export const getCurrentRole = (): string | null => {
  return localStorage.getItem("role");
};

/**
 * Get the current user's type from localStorage
 * @returns UserType or null if not set
 */
export const getUserType = (): UserType | null => {
  return localStorage.getItem("userType") as UserType || null;
};

/**
 * Check if the current user is a client (job seeker)
 * @returns boolean indicating if user is a client
 */
export const isClient = (): boolean => {
  return getUserType() === "client";
};

/**
 * Check if the current user is a mentor
 * @returns boolean indicating if user is a mentor
 */
export const isMentor = (): boolean => {
  return getUserType() === "mentor";
};

/**
 * Check if the current user is an admin
 * @returns boolean indicating if user is an admin
 */
export const isAdmin = (): boolean => {
  return getUserType() === "admin";
};