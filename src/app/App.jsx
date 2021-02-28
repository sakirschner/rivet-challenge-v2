import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';

import { EmployeesList } from '../features/employeesList/EmployeesList';
import { EmployeeDetails } from '../features/employeeDetails/EmployeeDetails';

export default function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={EmployeesList} />
                <Route exact path='/profile/:employeeId' component={EmployeeDetails} />
                <Redirect to="/" />
			</Switch>
		</Router>
	);
}
