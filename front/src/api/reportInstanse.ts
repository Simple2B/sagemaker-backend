import { IFormData } from "../redux/types/reportTypes";
import { instance } from "./_axiosInstance";

export const reportApi = {
  sendFormData: async (data: IFormData): Promise<any> => {
    console.log(process.env.REACT_APP_PUBLIC_API_URL);
    try {
      const response = await instance.post("/report", data);
      console.log("POST [/report] response received successfully");
      return response.data;
    } catch (error: any) {
      console.log(`POST [/report] error message: ${error.message}`);
      throw error;
    }
  },
};
