import axiosClient from "@/lib/axios";

import {
  HabitCreateRequest,
  HabitResponse,
  HabitUpdateRequest,
} from "./types";

class HabitsService {
  async getAll(): Promise<HabitResponse[]> {
    const response = await axiosClient.get<HabitResponse[]>("/api/habits");
    return response.data;
  }

  async getById(id: number): Promise<HabitResponse> {
    const response = await axiosClient.get<HabitResponse>(
      `/api/habits/${id}`
    );
    return response.data;
  }

  async create(request: HabitCreateRequest): Promise<HabitResponse> {
    const response = await axiosClient.post<HabitResponse>(
      "/api/habits",
      request
    );
    return response.data;
  }

  async update(
    id: number,
    request: HabitUpdateRequest
  ): Promise<HabitResponse> {
    const response = await axiosClient.put<HabitResponse>(
      `/api/habits/${id}`,
      request
    );
    return response.data;
  }

  async complete(id: number): Promise<HabitResponse> {
    const response = await axiosClient.post<HabitResponse>(
      `/api/habits/${id}/complete`
    );
    return response.data;
  }

  async remove(id: number): Promise<void> {
    await axiosClient.delete(`/api/habits/${id}`);
  }
}

export const habitsService = new HabitsService();
