import React from 'react'
import AbsenForm from '../../components/AbsenForm'
import QRForm from '../../components/QRForm'
import { Card, Row, Col } from "antd";
import {useHistory} from 'react-router-dom'

const backgroundStyle = {
	// backgroundImage: 'url(/img/others/img-17.jpg)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const LoginOne = props => {
	let history = useHistory()
	return (
		<div className="h-100" style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<div className="container">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={7}>
						<Card>
							<div className="my-4">
								<div className="text-center">
									<img className="img-fluid" style={{width:"50%"}} src="/img/logo.png" alt="" />
									<p>Want have a look your account? <a href="#" onClick={()=>{history.push("/auth/login")}}>Login</a></p>
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<QRForm></QRForm>
										<AbsenForm {...props} />
									</Col>
								</Row>
							</div>
						</Card>
					</Col>
				</Row>
				</div>
			</div>
		</div>
	)
}

export default LoginOne
