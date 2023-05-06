import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./slices/userInfo.slice";


export default configureStore({
    reducer: {
        userInfo
    }
})