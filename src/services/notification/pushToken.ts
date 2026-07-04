import { axiosPrivate } from "@/src/services/api/customAxios";

interface PushTokenRegisterRequest {
  token: string;
  platform: string;
}

export const registerPushToken = async (
  request: PushTokenRegisterRequest,
): Promise<void> => {
  await axiosPrivate.post("/api/v1/push-tokens", request);
};

export const unregisterPushToken = async (
  request: PushTokenRegisterRequest,
): Promise<void> => {
  await axiosPrivate.delete("/api/v1/push-tokens", {
    data: request,
  });
};
