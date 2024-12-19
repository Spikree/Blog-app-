import axiosInstance from "../../utils/axiosInstance";

const deleteBlog = async (blogId) => {
    try {
        const response = await axiosInstance.delete(`/delete/${blogId}`);
        return response.data;
    } catch (error) {
        throw error
    }
}

export default deleteBlog