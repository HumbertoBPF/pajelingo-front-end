import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "api/user";

export const fetchUser = createAsyncThunk("user/fetchUser", getUser);
