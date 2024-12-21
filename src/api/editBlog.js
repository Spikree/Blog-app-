import axiosInstance from "../../utils/axiosInstance";

const editBlog = async (token, blogId, title, content) => {
  try {
    const response = await axiosInstance.patch(
      `/edit-blog/${blogId}`,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default editBlog;
