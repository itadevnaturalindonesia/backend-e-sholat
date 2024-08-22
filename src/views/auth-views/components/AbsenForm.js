import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Modal, Alert, message } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import {  
	showLoading, 
	showAuthMessage, 
	hideAuthMessage,
	authenticated
} from 'redux/actions/Auth';
import moment from "moment-timezone";
import axios from 'axios';
import {strings} from 'res'
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"
import Axios from 'axios'

export const LoginForm = (props) => {
	let history = useHistory();
	const [waktuSholat, setWaktuSholat] = useState({});
	const [waktuSholatSekarang, setWaktuSholatSekarang] = useState("Transisi");
	const [waktu, setWaktu] = useState();

	const { 
		otherSignIn, 
		showForgetPassword, 
		onForgetPasswordClick,
		extra,
	} = props

	const [loading,showLoading] = useState(false)
	const [authMessage,showAuthMessage] = useState("")

    useEffect(() => {
		setInterval(() => {
			setWaktu(moment().tz("Asia/Jakarta").format("MMMM Do YYYY, HH:mm:ss"));
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

	const onLogin = (values)=>{

		axios.post(`${strings.api.sql_host}/reporting/lapor/?key=${strings.api.key}`, {
			nik: values.nik,
			password: values.password
		}, {
		  headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin":"*"
		  }
		}).then(doc => {
			console.log(doc.data)
			if(doc.data.status === "Success"){
				message.success(doc.data.message)
			}else{
				message.error(doc.data.message)
			}
		})
	  }

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
			<Form 
				layout="vertical" 
				name="login-form"
				onFinish={onLogin}
			>
				<Form.Item 
					name="nik" 
					label="NIK" 
					rules={[
						{ 
							required: true,
							message: 'Please input your NIK',
						}
					]}>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label={
						<div className={`${showForgetPassword? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							<span>Password</span>
							{
								showForgetPassword && 
								<span 
									onClick={() => onForgetPasswordClick} 
									className="cursor-pointer font-size-sm font-weight-normal text-muted"
								>
									Forget Password?
								</span>
							} 
						</div>
					} 
					rules={[
						{ 
							required: true,
							message: 'Please input your password',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Absen
					</Button>
				</Form.Item>
			</Form>
			<p style={{textAlign:"center"}}>Ingin lapor Cuti, Haid dan lainnya? <a href="#" href="#" onClick={()=>{history.push("/auth/off")}}>Laporkan</a></p>
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
