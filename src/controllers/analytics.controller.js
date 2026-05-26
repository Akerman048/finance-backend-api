import { getMonthlyAnalyticsService } from "../services/analytics.service.js";

export const getMonthlyAnalytics = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const analytics = await getMonthlyAnalyticsService(userId);

    res.json(analytics);
  } catch (error) {
    next(error);
  }
};
