import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adReducer from './slices/adSlice';
import categoryReducer from './slices/categorySlice';
import citySlice from './slices/citySlice';
import locationSlice from './slices/locationSlice';
import emailSlice from './slices/emailSlice';
import profileSlice from './slices/profileSlice';
import commentsSlice from './slices/commentsSlice';
import chatReducer from './slices/chatSlice';
import messageReducer from './slices/messageSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    ads: adReducer,
    categories: categoryReducer,
    cities:citySlice,
    location:locationSlice,
    email:emailSlice,
    profile: profileSlice,
    comments:commentsSlice,
    chat: chatReducer,
    message: messageReducer,
  },
});

export default store;
