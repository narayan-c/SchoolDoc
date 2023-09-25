import React, {useEffect, useState} from "react";


const feeDetailUrl = 'https://pps-api.onrender.com/getStudents/showfeedetails?srno=';

export default function FeeDetailComponent(props) {
    const [feeDetails, setFeeDetails] = useState([]);
    async function getFeeDetails() {
        const text = "Some text here...";
        try {
            // set studentList to empty first.
            //setStudentList({} as []);
            setFeeDetails([]);
            console.log(props.srno);
            if (props.srno) {
                const response = await fetch(feeDetailUrl + props.srno);
                const responseText = await response.text();
                setFeeDetails(JSON.parse(responseText) as any[]);
                console.log(JSON.parse(responseText));
            }
        } catch (error) {
            setFeeDetails([]);
        }
    }
    // after rendering of component get the data
    useEffect(() => {
        getFeeDetails();
    },[props.srno]);
    return(
        <div>
            <b>Fee Details for {props.name}({props.classname})</b><br/>
            {feeDetails.map((feeDetail, index) =>
                <div>
                    {feeDetail.head}<span>=</span> {feeDetail.fee}<br/>
                    {feeDetail.discount != 0 ? (
                        <div>
                            <span> Discount = {feeDetail.discount}</span><br/>
                            <span> Reason = {feeDetail.reason}</span>
                        </div>
                        ) : null}
                    <hr/>
                </div>
            )}
        </div>
    )

}
