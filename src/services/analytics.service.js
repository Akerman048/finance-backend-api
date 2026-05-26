import { getMonthlyAnalyticsRepository } from "../repositories/analytics.repository.js";

export const getMonthlyAnalyticsService = async (userId) => {
  return await getMonthlyAnalyticsRepository(userId);
};
