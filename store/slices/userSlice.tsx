import { createSlice } from '@reduxjs/toolkit'

type UserState = {
    access: string;
    refresh: string;
    user_info: {
        id: string;
        phone_number: string;
        email: string;
        first_name: string;
        last_name: string;
        user_type: string;
    }
}
const initialState = {
    user: {} as UserState
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return {
                ...state,
                user: action.payload
            }
        }
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer