import axiosClient from "@/lib/axios";

import {
  GoalCreateRequest,
  GoalResponse,
  GoalUpdateRequest,
} from "./types";

class GoalsService {
  async getAll(): Promise<GoalResponse[]> {
    const response = await axiosClient.get<GoalResponse[]>("/api/goals");
    return response.data;
  }

  async getById(id: number): Promise<GoalResponse> {
    const response = await axiosClient.get<GoalResponse>(`/api/goals/${id}`);
    return response.data;
  }

  async create(request: GoalCreateRequest): Promise<GoalResponse> {
    const response = await axiosClient.post<GoalResponse>(
      "/api/goals",
      request
    );
    return response.data;
  }

  async update(id: number, request: GoalUpdateRequest): Promise<GoalResponse> {
    const response = await axiosClient.put<GoalResponse>(
      `/api/goals/${id}`,
      request
    );
    return response.data;
  }

  async remove(id: number): Promise<void> {
    await axiosClient.delete(`/api/goals/${id}`);
  }
}

export const goalsService = new GoalsService();
