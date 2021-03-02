import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';

import { EmployeesListPage } from '../features/employeesList/EmployeesListPage';
import { EmployeeDetails } from '../features/employeeDetails/EmployeeDetails';
import { EditEmployeePage } from '../features/editEmployee/EditEmployeePage';
import { AddEmployeePage } from '../features/addEmployee/AddEmployeePage';
import { Header } from '../components/shared/Header';

import './App.css'

export default function App() {
	return (
		<Router>
			<div className='App'>
				<Header />
				<div className='content-container'>
					<Switch>
						<Route exact path='/' component={EmployeesListPage} />
						<Route
							exact
							path='/profile/:employeeId'
							component={EmployeeDetails}
						/>
						<Route
							exact
							path='/edit/:employeeId'
							component={EditEmployeePage}
						/>
						<Route exact path='/add' component={AddEmployeePage} />
						<Redirect to='/' />
					</Switch>
				</div>
			</div>
		</Router>
	);
}
