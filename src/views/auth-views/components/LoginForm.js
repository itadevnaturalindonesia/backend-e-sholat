import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, message, Alert } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import {  
	showLoading, 
	showAuthMessage, 
	hideAuthMessage,
	authenticated
} from 'redux/actions/Auth';
// import JwtAuthService from 'services/JwtAuthService'
import axios from 'axios';
import {strings} from 'res'
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"

export const LoginForm = (props) => {
	let history = useHistory();

	const { 
		otherSignIn, 
		showForgetPassword, 
		onForgetPasswordClick,
		extra,
	} = props

	const [loading,showLoading] = useState(false)
	const [authMessage,showAuthMessage] = useState("")

	const onLogin = (values)=>{

		axios.post(`${strings.api.sql_host}/login/?key=${strings.api.key}`, {
			email_nik: values.nik,
			password: values.password
		}, {
		  headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin":"*"
		  }
		}).then(doc => {
			if(doc.data.status === "success"){
				message.success("Berhasil!")
				localStorage.setItem("isLoggedIn",true)
				localStorage.setItem("data",doc.data.data[0])
				localStorage.setItem("id_users",doc.data.data[0].id_users)
				localStorage.setItem("nik",doc.data.data[0].nik)
				localStorage.setItem("name_users",doc.data.data[0].name_users)
				history.push("/app/dashboard")
			}else{
				message.error("Gagal!")
			}
		})

	  }

	useEffect(() => {
		// if (localStorage.getItem('token') !== null) {
		// 	history.push("/app/dashboard")
		// }
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
						Sign In
					</Button>
				</Form.Item>
				{
					otherSignIn ? null : null
				}
				{ extra }
			</Form>
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
