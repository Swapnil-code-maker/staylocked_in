import axiosClient from "@/lib/axios";

import { AnalyticsResponse } from "./types";

class AnalyticsService {
  async get(): Promise<AnalyticsResponse> {
    const response = await axiosClient.get<AnalyticsResponse>(
      "/api/analytics"
    );
    return response.data;
  }
}

export const analyticsService = new AnalyticsService();
