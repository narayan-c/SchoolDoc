import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Modal from '@mui/material/Modal';


const paymentURL = 'https://pps-api.onrender.com/getStudents/addpaymentdetails?';

export default function NewPaymentComponent(props) {
    const [qrModalOpen, setQRModalOpen] = React.useState(false);

    const handleClose = () => {
        setQRModalOpen(false);
    };

    const handleOpen = (feeamount) => {
        setQRModalOpen(true);
        // Fetch QR Image and set QR Image URL
        genQR(feeamount);
    };

    var divstyle = {
        width: '-webkit-fill-available'
    }
    var colstyle = {
        margin: 'auto'
    }
    var buttonstyle = {
        margin: 'auto',
        justifyContent: 'center'
    }

    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [qrImage, setQRImage] = useState('');
    async function genQR(amount) {
        const text = "Some text here...";
        try {
            let url = "https://upiqr.in/api/qr?";
            url = url + "vpa="+encodeURIComponent('parishkaaramschool@ybl');
            url = url + "&name="+encodeURIComponent('Parishkaaram Public School');
            url = url + "&amount="+amount+'.00';
            // set image to empty first.
            setQRImage('');
            const response = await fetch(url);
            const responseText = await response.text();
            setQRImage(responseText);
        } catch (error) {
            setQRImage("Request error!");
        }
    }
    async function addPaymentDetails() {
        const text = "Some text here...";
        try {
            // set studentList to empty first.
            //setStudentList({} as []);
            //setFeeDetails([]);
            console.log(props.srno);
            if (props.srno && amount && date) {
                const response = await fetch(paymentURL + `srno=${props.srno}&amount=${amount}&date=${date}&notes=${notes}`);
                const responseText = await response.text();
                //setFeeDetails(JSON.parse(responseText) as any[]);
                console.log(JSON.parse(responseText));
                props.refreshListHandler();
                alert('Payment Added Successfully!');
                //Clear text box values.
                setAmount('');
                setDate('');
            } else {
                alert('Please enter amount and date!');
            }
        } catch (error) {
            //setFeeDetails([]);
        }
    }
    // after rendering of component get the data
    useEffect(() => {
        //getFeeDetails();
    },[props.srno]);
    return(
        <div style={divstyle}>
            <b>Fee payment for {props.name}</b><br/><hr/>
            <Container fluid="true">
                <Row>
                    <Col style={colstyle} class="col--6" >Class={props.classname}</Col>
                    <Col style={colstyle} class="col--6" >
                        <label>Amount</label>
                        <input type="text" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                    </Col>
                </Row>
                <Row>
                    <Col style={colstyle} class="col--6" >
                        <label>Date</label>
                        <input type="text" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                    </Col>
                    <Col style={colstyle} class="col--6" >
                        <label>Notes</label>
                        <input type="text" name="notes" value={notes} onChange={(e) => setNotes(e.target.value)}/>
                    </Col>
                </Row>
                <Row style={buttonstyle}>
                    <button className="btn btn-primary" onClick={()=>{ addPaymentDetails();}}>Add Payment</button>
                    {amount?<button className="btn btn-primary" onClick={()=>{ handleOpen(amount)}}>QR Code</button>:null}
                </Row>
                <Modal
                    onClose={handleClose}
                    open={qrModalOpen}
                    style={{
                        position: 'absolute',
                        border: '2px solid #000',
                        backgroundColor: 'gray',
                        boxShadow: '2px solid black',
                        height: 400,
                        width: 400,
                        margin: 'auto'
                    }}
                >
                    <div className="board-row" style={{width:'400px'}} dangerouslySetInnerHTML={{__html: qrImage}} >
                    </div>
                </Modal>
            </Container>
        </div>
    )

}