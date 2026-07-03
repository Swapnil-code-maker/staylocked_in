import axiosClient from "@/lib/axios";

import {
  TaskCreateRequest,
  TaskResponse,
  TaskStatusUpdateRequest,
  TaskUpdateRequest,
} from "./types";

class TasksService {
  async getAll(): Promise<TaskResponse[]> {
    const response = await axiosClient.get<TaskResponse[]>("/api/tasks");
    return response.data;
  }

  async getById(id: number): Promise<TaskResponse> {
    const response = await axiosClient.get<TaskResponse>(`/api/tasks/${id}`);
    return response.data;
  }

  async create(request: TaskCreateRequest): Promise<TaskResponse> {
    const response = await axiosClient.post<TaskResponse>(
      "/api/tasks",
      request
    );
    return response.data;
  }

  async update(id: number, request: TaskUpdateRequest): Promise<TaskResponse> {
    const response = await axiosClient.put<TaskResponse>(
      `/api/tasks/${id}`,
      request
    );
    return response.data;
  }

  async updateStatus(
    id: number,
    request: TaskStatusUpdateRequest
  ): Promise<TaskResponse> {
    const response = await axiosClient.patch<TaskResponse>(
      `/api/tasks/${id}/status`,
      request
    );
    return response.data;
  }

  async remove(id: number): Promise<void> {
    await axiosClient.delete(`/api/tasks/${id}`);
  }
}

export const tasksService = new TasksService();
