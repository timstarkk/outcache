import React from "react";
// import { FormBtn } from "../Form";
import Moment from "react-moment"


function StatusOfRequests(props) {
    const { rentalForCard } = props;

    const items = [];

    for (const [index, value] of rentalForCard.entries()) {
        items.push(
            <div key={index} className="requestStatusBox">
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
    const { name, price, img, rented, onApproveRental, index, description, rentalForCard, closeModal } = props;
    console.log(props)
    console.log(closeModal);
    return (
        <>
            <div className="closeButton" onClick={closeModal}></div>
            <div className="productDetails row">
                <div className="col s12 m12 l6" id="imageContainerContainer" style={{}}>
                    <div className="detailsImageContainer">
                        <img src={`${img}`} />
                    </div>
                </div>
                <div className="col s12 m12 l6 productDetailsBox" style={{ height: "100%", }}>
                    <div className="row" style={{ margin: "0px" }}>
                        <p className="flow-text" id="modalItemName" style={{ "margin-top": "0px" }}>{name}</p>
                    </div>
                    <div className="row" style={{ margin: "0px" }}>
                        <p id="modalPriceArea">${price} / day </p>
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
        </>
    );
}

export default RentalCardModal;