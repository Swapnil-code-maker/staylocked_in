import axiosClient from "@/lib/axios";

import { DashboardResponse } from "./types";

class DashboardService {
  async get(): Promise<DashboardResponse> {
    const response = await axiosClient.get<DashboardResponse>(
      "/api/dashboard"
    );
    return response.data;
  }
}

export const dashboardService = new DashboardService();
