import React from "react";
import { FormBtn } from "../Form";
import Moment from "react-moment"

function ResultCard(props) {
    const { id, name, price, img, rented, onApproveRental, index } = props;
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
        <>
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
        </>
    ))

    


    return (
        <div className="col offset-s2 s8 m6 l4 resultCardContainer " style={{
            padding: "0px",
            "margin-bottom": "10px",
            height: "auto"
        }}>
            < div className="resultCard z-depth-1">
                <div className="cardImageContainer" style={{
                    height: "200px"
                }}>
                    <img className="cardImage" src={img} alt={name} />
                </div>
                <div className="cardInfoContainer" style={{
                    height: "400px"
                }}>
                    <h6 className="cardName">{name}</h6>
                    <p className="cardLocation" style={{ padding: "0px", margin: "0px" }}>location</p>
                    <div className="row">
                        <p className="col s3 cardPrice" style={{ padding: "0px", "padding-left": "15px" }}>${price}</p>
                        <p className="col s3 perDayText" style={{ padding: "0px" }}>{' '}/ day</p>
                    </div>
                    {renderPendingRentals()}
                </div>
            </div >
        </div >
    );
}

export default ResultCard;