import axiosInstance from "../../utils/axiosInstance";

const commentOnBlogAPI = async (token, comment, id) => {
  try {
    const response = await axiosInstance.post(
      `/comment/${id}`,
      { text: comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Something went wrong.");
  }
};

export default commentOnBlogAPI;
