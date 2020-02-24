import React from "react";
// import { FormBtn } from "../Form";
import Moment from "react-moment"

function ResultCard(props) {
    const { name, price, img, rented, onApproveRental, index, description, closeModal } = props;
    console.log(props)

    console.log(rented)

    const renderPendingRentals = () => rented.map((pendingRental, subIndex) => (
        <div style={{ border: "1px solid black", marginTop: "5px", padding: "20px", overflow: "auto" }}>
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

        <>
            <div className="closeButton" onClick={closeModal}></div>
            <div className="productDetails row">
                <div className="col s12 m12 l6" id="imageContainerContainer">
                    <div className="detailsImageContainer">
                        <img src={`${img}`} />
                    </div>
                </div>
                <div className="col s12 m12 l6 productDetailsBox" style={{ height: "100%" }}>
                    <div className="row" style={{ margin: "0px" }}>
                        <p className="flow-text" id="modalItemName" style={{ "margin-top": "0px" }}>{name}</p>
                    </div>
                    <div className="row" style={{ margin: "0px" }}>
                        <p id="modalPriceArea">${price} / day</p>
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
        </>
    );
}

export default ResultCard;