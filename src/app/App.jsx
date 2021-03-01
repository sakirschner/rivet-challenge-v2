import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';

import { EmployeesList } from '../features/employeesList/EmployeesList';
import { EmployeeDetails } from '../features/employeeDetails/EmployeeDetails';
import { EditEmployeeForm } from '../features/editEmployee/EditEmployeeForm';

export default function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={EmployeesList} />
                <Route exact path='/profile/:employeeId' component={EmployeeDetails} />
                <Route exact path='/edit/:employeeId' component={EditEmployeeForm} />
				<Redirect to="/" />
			</Switch>
		</Router>
	);
}
