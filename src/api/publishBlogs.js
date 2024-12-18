import axiosInstance from "../../utils/axiosInstance";

const publishBlogs = async (title, content,token) => {
    try {
        const response = await axiosInstance.post("/create-blog", {
            title: title,
            content : content,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data
    } catch (error) {
        throw error
    }
}

export default publishBlogs