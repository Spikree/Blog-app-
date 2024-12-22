import axiosInstance from "../../utils/axiosInstance";

const likeBlog = async (token,blogId) => {
    try {
        const response = await axiosInstance.put(`/like/${blogId}`,{},{
            headers : {
                Authorization: `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        throw error
    }
}

export {likeBlog}