import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "./base";

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(`${baseUrl}/user/`, {
            headers: {
                Authorization: `Token ${user.token}`,
            }
        })
        if (!response.ok) {
            localStorage.removeItem("user");
            return null;
        }else{
            const data = await response.json();
            const updatedUser = {
                token: user.token,
                username: data.username,
                bio: data.bio,
                email: data.email
            }
            localStorage.setItem("user", JSON.stringify(updatedUser));
            return {...updatedUser, picture: data.picture};
        }
    }
)