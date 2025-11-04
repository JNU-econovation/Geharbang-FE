export type OauthLoginType = "kakao" | "google";

export interface loginResponse {
  accessToken: string;
  user: {
    id: string;
  };
}
