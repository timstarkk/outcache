import React from "react";
import { FormBtn } from "../Form";
import Moment from "react-moment"

function ResultCard(props) {
    const { id, name, price, img, rented, onApproveRental, index, description } = props;
    console.log(props)

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // I'm trying to add one space to price.
    // price += " "
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const renderPendingRentals = () => rented.map((pendingRental, subIndex) => (
        <div style={{ border: "1px solid black", padding: "20px", overflow: "auto" }}>
            <div className="row">
                <p className="col s3" style={{ padding: "0px" }}>Start Date: <Moment format="MM/DD/YYYY">{pendingRental.startDate}</Moment></p>
                <p className="col s3" style={{ padding: "0px" }}>End Date: <Moment format="MM/DD/YYYY">{pendingRental.endDate}</Moment></p>
            </div>
            <div className="row">
                <p className="col s3" style={{ padding: "0px" }}>Approved: {pendingRental.approved ? "YES👍" : "NO👎"}</p>
                <button className="col s3" style={{
                    padding: "0px"
                }} onClick={() => onApproveRental(index, subIndex)} style={{ "margin-bottom": "5px" }}>Approve</button>
            </div>
        </div>
    ))




    return (
        // < div className="resultCard z-depth-1">
        //     <div className="cardImageContainer" style={{
        //         height: "200px"
        //     }}>
        //         <img className="cardImage" src={img} alt={name} />
        //     </div>
        //     <div className="cardInfoContainer" style={{
        //         height: "400px"
        //     }}>
        //         <h6 className="cardName">{name}</h6>
        //         <p className="cardLocation" style={{ padding: "0px", margin: "0px" }}>location</p>
        //         <div className="row">
        //             <p className="col s3 cardPrice" style={{ padding: "0px", "padding-left": "15px" }}>${price}</p>
        //             <p className="col s3 perDayText" style={{ padding: "0px" }}>{' '}/ day</p>
        //         </div>
        //         {renderPendingRentals()}
        //     </div>
        // </div >

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
                    <p>${price} / day</p>
                </div>
                <div className="row" style={{ margin: "0px" }}>
                    <p className="descriptionText" style={{ margin: "0px" }}>Description: </p>
                    <p style={{ marginTop: "0px" }}>{description}</p>
                </div>
                <div className="row" style={{}}>
                    <div className="col s12">
                        <div className="formContainer" style={{}}>
                            <p className="descriptionText" style={{ margin: "0px" }}>Requests: </p>
                            {renderPendingRentals()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultCard;