import { combineReducers } from 'redux'
import employeesReducer from '../features/employeesList/employeesSlice'
import imageReducer from '../features/uploadImage/imageSlice';

const rootReducer = combineReducers({
    employees: employeesReducer,
    image: imageReducer
})

export default rootReducer