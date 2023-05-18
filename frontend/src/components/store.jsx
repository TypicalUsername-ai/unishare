import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from '../reducers/tokenSlice'
import userReducer from '../reducers/userSlice'

export default configureStore({
	reducer: {
		token: tokenReducer,
		user: userReducer,
	}
})