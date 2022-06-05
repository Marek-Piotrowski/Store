import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { User } from "../../app/models/user";
import { setBasket } from "../Basket/BasketSlice";

interface AccountState{
    user: User | null,

}

const initialState: AccountState = {
    user: null,

}



export const signInUser = createAsyncThunk<User, FieldValues>(
    "account/signInUser",
    async(data, thunkAPI) => {
        try{
            const userDto = await agent.Account.login(data);
            // we are extracting basket, and rest of preperties as a user
            const {basket, ...user} = userDto;
            //if basket exists than set that basket as a logged in user basket
            if(basket){
                thunkAPI.dispatch(setBasket(basket));
            }

            localStorage.setItem("user",JSON.stringify(user));
            return user;

        }catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    "account/fetchCurrentUser",
    async(_, thunkAPI) => {
        // if we have token inside local storage
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));

        try{
            const userDto = await agent.Account.currentUser();
            const {basket, ...user} = userDto;
            //if basket exists than set that basket as a logged in user basket
            if(basket){
                thunkAPI.dispatch(setBasket(basket));
            }
            localStorage.setItem("user",JSON.stringify(user));
            return user;

        }catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        // if we do not have token inside localstorage than we are not gonna make api request
        condition: () => {
            if(!localStorage.getItem("user")) return false;
        }
    }
)

export const AccountSlice = createSlice({

    name: "account",
    initialState,
    reducers: {
        signOut: (state) =>{
            state.user = null;
            localStorage.removeItem("user");
            window.location.pathname = "/";
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        // case when fetching current users fails, maybe because of invalid token
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem("user");
            toast.error("Session expired - please login again");
            console.log("token expired");
            window.location.pathname = "/";
        });
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action)=>{
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(signInUser.rejected), (state,action)=> {
            throw action.payload;
        })
    }
})

export const {signOut, setUser} = AccountSlice.actions;