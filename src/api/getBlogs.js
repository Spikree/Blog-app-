import axiosInstance from "../../utils/axiosInstance";

const getBlogs = async (token) => {
    try {
        const response = await axiosInstance.get("/get-all-blogs",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data
    } catch (error) {
        throw error
    }
}

export {getBlogs}