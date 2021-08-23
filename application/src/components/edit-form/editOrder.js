import React, { Component } from "react";
import { Template } from "../../components";
import { connect } from "react-redux";
import { SERVER_IP } from "../../private";
import "./editOrder.css";

const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-order`;

const mapStateToProps = (state) => ({
	auth: state.auth,
});

class EditOrder extends Component {
	constructor(props) {
		super(props);

		const { order } = this.props.location;

		this.state = {
			order_item: order.order_item,
			quantity: order.quantity,
		};

		console.log(this.state);
	}

	menuItemChosen(event) {
		this.setState({ order_item: event.target.value });
	}

	menuQuantityChosen(event) {
		this.setState({ quantity: event.target.value });
	}

	editOrder(event) {
		event.preventDefault();
		if (this.state.order_item === "") return;
		fetch(EDIT_ORDER_URL, {
			method: "POST",
			body: JSON.stringify({
				id: this.props.location.order._id,
				order_item: this.state.order_item,
				quantity: this.state.quantity,
				ordered_by: this.props.auth.email || "Unknown!",
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((response) => console.log("Success", JSON.stringify(response)))
			.catch((error) => console.error(error));
	}

	render() {
		return (
			<Template>
				<div className="form-wrapper">
					<form>
						<label className="form-label">I'd like to order...</label>
						<br />
						<p>Current id {this.state.id}</p>
						<select
							value={this.state.order_item}
							onChange={(event) => this.menuItemChosen(event)}
							className="menu-select"
						>
							<option value="" defaultValue disabled hidden>
								Lunch menu
							</option>
							<option value="Soup of the Day">Soup of the Day</option>
							<option value="Linguini With White Wine Sauce">
								Linguini With White Wine Sauce
							</option>
							<option value="Eggplant and Mushroom Panini">
								Eggplant and Mushroom Panini
							</option>
							<option value="Chili Con Carne">Chili Con Carne</option>
						</select>
						<br />
						<label className="qty-label">Qty:</label>
						<select
							value={this.state.quantity}
							onChange={(event) => this.menuQuantityChosen(event)}
						>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
						</select>
						<button
							type="button"
							className="order-btn"
							onClick={(event) => this.editOrder(event)}
						>
							Edit Order
						</button>
					</form>
				</div>
			</Template>
		);
	}
}

export default connect(mapStateToProps, null)(EditOrder);
