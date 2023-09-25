import React, {useEffect, useState} from "react";


const paymentDetailURL = 'https://pps-api.onrender.com/getStudents/getpaymentdetails?';

export default function PaymentDetailComponent(props) {
    const [paymentDetails, setPaymentDetails] = useState([]);
    async function getPaymentDetails() {
        try {
            // set studentList to empty first.
            //setStudentList({} as []);
            setPaymentDetails([]);
            console.log('change triggered');
            console.log(props.srno);
            if (props.srno) {
                const response = await fetch(paymentDetailURL + `srno=${props.srno}`);
                const responseText = await response.text();
                setPaymentDetails(JSON.parse(responseText) as any[]);
                console.log(JSON.parse(responseText));
            }
        } catch (error) {
            setPaymentDetails([]);
        }
    }
    // after rendering of component get the data
    useEffect(() => {
        getPaymentDetails();
    },[props.srno, props.refreshList]);
    return(
        <div style={{overflowY: "scroll"}}>
            <b>Payment Details for {props.name}</b><br/>
            {paymentDetails.length == 0 ? (`No Payment Details Found!`) :
                (paymentDetails.map((paymentDetail, index) =>
                <div>
                    Payment Amount <span>=</span> {paymentDetail.paymentamount}<br/>
                    Date <span>=</span> {paymentDetail.date}<br/>
                    Notes <span>=</span> {paymentDetail.notes}<br/>
                    <hr/>
                </div>
            ))
            }
        </div>
    )

}