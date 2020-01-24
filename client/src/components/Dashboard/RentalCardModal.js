import React from "react";
// import { FormBtn } from "../Form";
import Moment from "react-moment"


function StatusOfRequests(props) {
    const { rentalForCard } = props;

    const items = [];

    for (const [index, value] of rentalForCard.entries()) {
        items.push(
            <div key={index} style={{ border: "2px solid gold" }}>
                <p>Start Date: <Moment format="MM/DD/YYYY">{value.startDate}</Moment></p>
                <p>End Date: <Moment format="MM/DD/YYYY">{value.endDate}</Moment></p>
                <p>Approved: {value.approved ? "approved" : "unapproved"}</p>
            </div>)
    }

    console.log(items)
    return (
        items
    )
}

function RentalCardModal(props) {
    const { name, price, img, rented, onApproveRental, index, description, rentalForCard } = props;
    console.log(props)
    return (

        <div className="productDetails row" style={{ padding: "30px", overflow: "none" }}>
            <div className="col s6" style={{}}>
                <div className="detailsImageContainer">
                    <img src={`${img}`} />
                </div>
            </div>
            <div className="col s6 productDetailsBox" style={{ padding: "20px", height: "100%" }}>
                <div className="row" style={{ margin: "0px" }}>
                    <h4 style={{ "margin-top": "0px" }}>{name}</h4>
                </div>
                <div className="row" style={{ margin: "0px" }}>
                    <p>${price} / day </p>
                </div>
                <div className="row" style={{ margin: "0px" }}>
                    <p className="descriptionText" style={{ margin: "0px" }}>Description: </p>
                    <p style={{ marginTop: "0px" }}>{description}</p>
                </div>
                <div className="row" style={{}}>
                    <div className="col s12">
                        <div className="formContainer" style={{}}>
                            <p className="descriptionText" style={{ margin: "0px" }}>Status of Requests: </p>
                            {/* {renderPendingRentals()} */}
                        </div>
                    </div>
                    <StatusOfRequests rentalForCard={rentalForCard} />
                </div>
            </div>
        </div>
    );
}

export default RentalCardModal;