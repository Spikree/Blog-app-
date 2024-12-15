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
        throw error;
    }
};

const signup = async (username, email, password) => {
    console.log(username,email,password)
    try {
        const response = await axiosInstance.post('/create-account', {
            userName : username,
            email,
            password
        })

        return response.data
    } catch (error) {
        console.log("signup error", error.message);
        throw error
    }
}

export { login, signup };
