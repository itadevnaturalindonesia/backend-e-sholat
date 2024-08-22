import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Row,Col,Card, Alert } from "antd";
import PropTypes from 'prop-types';
import {  
	showLoading, 
	showAuthMessage, 
	hideAuthMessage,
	authenticated
} from 'redux/actions/Auth';
import moment from "moment-timezone";
import {strings} from 'res'
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"
import Axios from 'axios'
import QRCode from "react-qr-code";


export const LoginForm = (props) => {
	let history = useHistory();
	const [waktuSholat, setWaktuSholat] = useState({});
	const [waktuSholatSekarang, setWaktuSholatSekarang] = useState("Transisi");
	const [waktu, setWaktu] = useState();

	const [authMessage,showAuthMessage] = useState("")

    useEffect(() => {
		setInterval(() => {
			setWaktu(moment().tz("Asia/Jakarta").format("HH:mm"));
			if (waktuSholat.dhuha_start < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < waktuSholat.dhuha_soda) {
				setWaktuSholatSekarang("Dhuha SODA")
			} else if (`${waktuSholat.dhuha_soda}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${waktuSholat.dhuha_stop}:00`) {
				setWaktuSholatSekarang("Dhuha")
			} else if (`${waktuSholat.dzuhur_start}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${waktuSholat.dzuhur_soda}:00`) {
				setWaktuSholatSekarang("Dzuhur SODA")
			} else if (`${waktuSholat.dzuhur_soda}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${waktuSholat.dzuhur_stop}:00`) {
				setWaktuSholatSekarang("Dzuhur")
			} else if (`${waktuSholat.ashar_start}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${waktuSholat.ashar_soda}:00`) {
				setWaktuSholatSekarang("Ashar SODA")
			} else if (`${waktuSholat.ashar_soda}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${waktuSholat.ashar_stop}:00`) {
				setWaktuSholatSekarang("Ashar")
			} else if (`${waktuSholat.maghrib_start}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${waktuSholat.maghrib_soda}:00`) {
				setWaktuSholatSekarang("Maghrib SODA")
			} else if (`${waktuSholat.maghrib_soda}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${waktuSholat.maghrib_stop}:00`) {
				setWaktuSholatSekarang("Maghrib")
			} else if (`${waktuSholat.isya_start}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${waktuSholat.isya_soda}:00`) {
				setWaktuSholatSekarang("Isya SODA")
			} else if (`${waktuSholat.isya_soda}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${waktuSholat.isya_stop}:00`) {
				setWaktuSholatSekarang("Isya")
			}
		}, 1000);
	})

	useEffect(() => {
		Axios.get(`${strings.api.host}/waktu-sholat/read`).then((doc) => {
			setWaktuSholat(doc.data.doc[0])
		})
	},[]);

	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: authMessage ? 1 : 0,
					marginBottom: authMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={authMessage}></Alert>
			</motion.div>
			<Row gutter={24}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                 {/* <div style={{margin:"auto",width:"85%",textAlign: "center"}}>
                    <QRCode value={waktuSholatSekarang} />
                 </div> */}
                </Col>
            </Row>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
	const {loading, message, showMessage, token, redirect} = auth;
  	return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
