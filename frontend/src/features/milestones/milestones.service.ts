import axiosClient from "@/lib/axios";

import {
  MilestoneCreateRequest,
  MilestoneResponse,
  MilestoneUpdateRequest,
} from "./types";

class MilestonesService {
  async getAll(): Promise<MilestoneResponse[]> {
    const response = await axiosClient.get<MilestoneResponse[]>(
      "/api/milestones"
    );
    return response.data;
  }

  async getById(id: number): Promise<MilestoneResponse> {
    const response = await axiosClient.get<MilestoneResponse>(
      `/api/milestones/${id}`
    );
    return response.data;
  }

  async create(request: MilestoneCreateRequest): Promise<MilestoneResponse> {
    const response = await axiosClient.post<MilestoneResponse>(
      "/api/milestones",
      request
    );
    return response.data;
  }

  async update(
    id: number,
    request: MilestoneUpdateRequest
  ): Promise<MilestoneResponse> {
    const response = await axiosClient.put<MilestoneResponse>(
      `/api/milestones/${id}`,
      request
    );
    return response.data;
  }

  async remove(id: number): Promise<void> {
    await axiosClient.delete(`/api/milestones/${id}`);
  }
}

export const milestonesService = new MilestonesService();
