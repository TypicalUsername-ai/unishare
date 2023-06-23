import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: "Guest",
    id: "",
  },
  reducers: {

    setUserId: (state, action) => {
      state.id = action.payload
    },
    setName: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.name = action.payload
    },
    userLogOut: (state) => {
      state.name = "Guest"
      state.id = ""
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserId, setName, userLogOut } = userSlice.actions

export default userSlice.reducer