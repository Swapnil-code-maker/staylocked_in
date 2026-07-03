import axiosClient from "@/lib/axios";

import { StreakResponse } from "./types";

class StreaksService {
  async getToday(): Promise<StreakResponse> {
    const response = await axiosClient.get<StreakResponse>(
      "/api/streaks/today"
    );
    return response.data;
  }

  async getHistory(): Promise<StreakResponse[]> {
    const response = await axiosClient.get<StreakResponse[]>(
      "/api/streaks/history"
    );
    return response.data;
  }

  async markStudyDay(studyMinutes: number): Promise<StreakResponse> {
    const response = await axiosClient.post<StreakResponse>(
      "/api/streaks/study",
      null,
      { params: { studyMinutes } }
    );
    return response.data;
  }
}

export const streaksService = new StreaksService();
