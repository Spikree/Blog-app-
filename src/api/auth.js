import axiosInstance from "../../utils/axiosInstance";

const login = async (email, password) => {
    try {
        const response = await axiosInstance.post('/login', {
            email,
            password
        });

        return response.data;
    } catch (error) {
        console.error("Login Error:", error.message);
        return { error: error.message };
    }
};

export { login };
