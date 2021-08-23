import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Main, Login, OrderForm, ViewOrders } from "../components";
import EditOrder from "../components/edit-form/editOrder";

const AppRouter = (props) => {
	return (
		<Router>
			<Route path="/" exact component={Main} />
			<Route path="/login" exact component={Login} />
			<Route path="/order" exact component={OrderForm} />
			<Route path="/view-orders" exact component={ViewOrders} />
			<Route path="/edit-order" exact component={EditOrder} />
		</Router>
	);
};

export default AppRouter;
