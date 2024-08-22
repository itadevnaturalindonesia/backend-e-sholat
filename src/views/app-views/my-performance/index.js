import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Table, Tag, Select, Badge, Input } from 'antd';
import Flex from 'components/shared-components/Flex'
import DataDisplayWidget from 'components/shared-components/DataDisplayWidget';
import {
	CloudDownloadOutlined,
	ArrowUpOutlined,
	UserSwitchOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import ChartWidget from 'components/shared-components/ChartWidget';
import { COLORS } from 'constants/ChartConstant';
import {
	weeklyRevenueData,
	recentOrderData
} from './DashboardData'
import utils from 'utils'
import { SearchOutlined, StarBorderOutlined } from "@material-ui/icons";
import Axios from 'axios'
import { strings } from 'res';
import moment from "moment";

const WeeklyRevenue = (props) => (
	<Card>
		<Row gutter={16}>
			<Col xs={24} sm={24} md={24} lg={8}>
				<Flex className="h-100" flexDirection="column" justifyContent="between">
					<div>
						<h4 className="mb-0">Aktifitas Mingguan</h4>
						<span className="text-muted">{moment().format("lll")}</span>
					</div>
					<div className="mb-4">
						<h1 style={{ textAlign: "center", marginTop: "-20px" }} className="font-weight-bold">{parseInt(props.dataKaryawan[0]?.soda) + parseInt(props.dataKaryawan[1]?.soda) + parseInt(props.dataKaryawan[2]?.soda) + parseInt(props.dataKaryawan[3]?.soda) + parseInt(props.dataKaryawan[4]?.soda) + parseInt(props.dataKaryawan[0]?.sholatbiasa) + parseInt(props.dataKaryawan[1]?.sholatbiasa) + parseInt(props.dataKaryawan[2]?.sholatbiasa) + parseInt(props.dataKaryawan[3]?.sholatbiasa) + parseInt(props.dataKaryawan[4]?.sholatbiasa)}</h1>
						<p className="text-success">
							<span >
								<ArrowUpOutlined />
								<span> 17% </span>
							</span>
							<span>Total Absen</span>
						</p>
						<p>Total Aktifitas Terekam Aplikasi.</p>
					</div>
				</Flex>
			</Col>
			<Col xs={24} sm={24} md={24} lg={16}>
				<div className="mb-3 text-right">
					<Button icon={<CloudDownloadOutlined />}>Download Report</Button>
				</div>
				<ChartWidget
					card={false}
					series={weeklyRevenueData.series}
					xAxis={weeklyRevenueData.categories}
					title="Total Tidak Sholat"
					height={250}
					type="bar"
					customOptions={{ colors: COLORS }}
				/>
			</Col>
		</Row>
	</Card>
)

const DisplayDataSet = (props) => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
			<DataDisplayWidget
				icon={<UserSwitchOutlined />}
				value={parseInt(props.dataKaryawan[0]?.soda) + parseInt(props.dataKaryawan[1]?.soda) + parseInt(props.dataKaryawan[2]?.soda) + parseInt(props.dataKaryawan[3]?.soda) + parseInt(props.dataKaryawan[4]?.soda)}
				title="Total SODA"
				color="green"
				vertical={true}
				avatarSize={55}
			/>
			<DataDisplayWidget
				icon={<StarBorderOutlined />}
				value={parseInt(props.dataKaryawan[0]?.sholatbiasa) + parseInt(props.dataKaryawan[1]?.sholatbiasa) + parseInt(props.dataKaryawan[2]?.sholatbiasa) + parseInt(props.dataKaryawan[3]?.sholatbiasa) + parseInt(props.dataKaryawan[4]?.sholatbiasa)}
				title="Total Sholat Biasa"
				color="orange"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
		<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
			<DataDisplayWidget
				icon={<UserSwitchOutlined />}
				value={parseInt(props.dataKaryawan[0]?.soda) + parseInt(props.dataKaryawan[1]?.soda) + parseInt(props.dataKaryawan[2]?.soda) + parseInt(props.dataKaryawan[3]?.soda) + parseInt(props.dataKaryawan[4]?.soda) + parseInt(props.dataKaryawan[0]?.sholatbiasa) + parseInt(props.dataKaryawan[1]?.sholatbiasa) + parseInt(props.dataKaryawan[2]?.sholatbiasa) + parseInt(props.dataKaryawan[3]?.sholatbiasa) + parseInt(props.dataKaryawan[4]?.sholatbiasa)}
				title="Total Sholat"
				color="blue"
				vertical={true}
				avatarSize={55}
			/>
			<DataDisplayWidget
				icon={<SyncOutlined />}
				value={parseInt(props.dataKaryawan[0]?.tidaksholat) + parseInt(props.dataKaryawan[1]?.tidaksholat) + parseInt(props.dataKaryawan[2]?.tidaksholat) + parseInt(props.dataKaryawan[3]?.tidaksholat) + parseInt(props.dataKaryawan[4]?.tidaksholat)}
				title={"Total Tidak Sholat"}
				color="red"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
	</Row>
)

const Dashboard = () => {

	const [dataKaryawan, setDataKaryawan] = useState([]);

	useEffect(() => {
		Axios.get(`${strings.api.sql_host}/reporting/statussholat/nik/${localStorage.getItem("nik")}?key=${strings.api.key}`, {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		}).then((doc) => {
			setDataKaryawan(doc.data.data)
		})
	}, [])

	return (
		<>
			<Row gutter={16}>

				<Col xs={24} sm={24} md={24} lg={16} xl={15} xxl={14}>
					<WeeklyRevenue dataKaryawan={dataKaryawan} />
				</Col>
				<Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={10}>
					<DisplayDataSet dataKaryawan={dataKaryawan} />
				</Col>
			</Row>
			<Row gutter={24} style={{ textAlign: "center" }}>
				{dataKaryawan.map(doc => {
					return (
						<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
							<Card>
								<h1>{doc.name_time_prayer}</h1>
								<p>Sholat	: {doc.sholatbiasa}</p>
								<p>SODA		: {doc.soda}</p>
								<p>Tidak Sholat	: {doc.tidaksholat}</p>
							</Card>
						</Col>
					)
				})}
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
					<Card>
						<h1>Total</h1>
						<p>Sholat	: {parseInt(dataKaryawan[0]?.soda) + parseInt(dataKaryawan[1]?.soda) + parseInt(dataKaryawan[2]?.soda) + parseInt(dataKaryawan[3]?.soda) + parseInt(dataKaryawan[4]?.soda) + parseInt(dataKaryawan[0]?.sholatbiasa) + parseInt(dataKaryawan[1]?.sholatbiasa) + parseInt(dataKaryawan[2]?.sholatbiasa) + parseInt(dataKaryawan[3]?.sholatbiasa) + parseInt(dataKaryawan[4]?.sholatbiasa)}</p>
						<p>SODA		: {parseInt(dataKaryawan[0]?.soda) + parseInt(dataKaryawan[1]?.soda) + parseInt(dataKaryawan[2]?.soda) + parseInt(dataKaryawan[3]?.soda) + parseInt(dataKaryawan[4]?.soda)}</p>
						<p>Tidak Sholat	: {parseInt(dataKaryawan[0]?.tidaksholat) + parseInt(dataKaryawan[1]?.tidaksholat) + parseInt(dataKaryawan[2]?.tidaksholat) + parseInt(dataKaryawan[3]?.tidaksholat) + parseInt(dataKaryawan[4]?.tidaksholat)}</p>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Dashboard