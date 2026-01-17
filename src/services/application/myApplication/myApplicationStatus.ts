import { MyApplicationStatus } from "@/src/types/models/application/myApplication/MyApplicationStatus";
import { axiosPrivate } from "../../api/customAxios";

type MyApplicationStatusResponse = {
  applicationRecords: MyApplicationStatus[];
};

type myApplicationStatusParams = {
  onlyAccepted?: boolean;
  pageNumber?: number;
};
export const getMyApplicationStatus = async (
  params: myApplicationStatusParams
) => {
  const response = await axiosPrivate.get<MyApplicationStatusResponse>(
    "/api/v1/application-records/my",
    {
      params: {
        onlyAccepted: params.onlyAccepted,
        pageNumber: params.pageNumber,
      },
    }
  );

  return response.data;
};
