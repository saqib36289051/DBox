import { createSlice } from '@reduxjs/toolkit'

type UserState = {
    value: number
}
const initialState: UserState = {
    value: 0,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
})

// export const { } = userSlice.actions

export default userSlice.reducer