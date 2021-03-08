import { combineReducers } from 'redux';
import employeesReducer from '../features/employees/employeesSlice';
import imageReducer from '../features/image/imageSlice';

const rootReducer = combineReducers({
	employees: employeesReducer,
	image: imageReducer
});

export default rootReducer;
