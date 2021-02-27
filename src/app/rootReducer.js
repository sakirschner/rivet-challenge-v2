import { combineReducers } from 'redux'
import employeesReducer from '../features/employeesList/employeesSlice'

const rootReducer = combineReducers({
    employees: employeesReducer
})

export default rootReducer