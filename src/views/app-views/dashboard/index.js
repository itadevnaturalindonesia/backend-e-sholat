import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Table, message, Input, Select, Form } from 'antd';
import Flex from 'components/shared-components/Flex'
import utils from 'utils'
import { SearchOutlined, LockOutlined } from "@material-ui/icons";
import moment from "moment-timezone";
import Axios from 'axios'
import { strings } from 'res';
import TextArea from 'antd/lib/input/TextArea';

const tableColumns = [
	{
		title: 'NIK',
		dataIndex: 'nik',
		render: (_, elm) => {
			return (<p>{elm.nik}</p>)
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'nik')
	},
	{
		title: 'Tanggal',
		dataIndex: 'tgl',
		render: (_, elm) => {
			return (<p>{elm.tgl}</p>)
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'tgl')
	},
	{
		title: 'Dhuha',
		dataIndex: 'dhuha',
		render: (_, elm) => {
			if (!elm['dhuha']) {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else {
				return (<p style={{ color: "green" }}>{elm.dhuha}</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'dhuha')
	},
	{
		title: 'Dzuhur',
		dataIndex: 'dzuhur',
		render: (_, elm) => {
			if (!elm['dzuhur']) {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else {
				return (<p style={{ color: "green" }}>{elm.dzuhur}</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'dzuhur')
	},
	{
		title: 'Ashar',
		dataIndex: 'ashar',
		render: (_, elm) => {
			if (!elm['ashar']) {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else {
				return (<p style={{ color: "green" }}>{elm.ashar}</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'ashar')
	},
	{
		title: 'Isya',
		dataIndex: 'isya',
		render: (_, elm) => {
			if (!elm['isya']) {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else {
				return (<p style={{ color: "green" }}>{elm.isya}</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'isya')
	},
	{
		title: 'Haid',
		dataIndex: 'haid',
		render: (_, elm) => {
			if (elm['haid'] === "Ya") {
				return (<p>Iya</p>)
			} else {
				return (<p>Tidak</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'haid')
	},
	{
		title: 'Cuti',
		dataIndex: 'cuti',
		render: (_, elm) => {
			if (elm['cuti'] === "Ya") {
				return (<p>Iya</p>)
			} else {
				return (<p>Tidak</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'cuti')
	},
	{
		title: 'Soda Status',
		dataIndex: 'soda_status',
		render: (_, elm) => {
			if (elm['soda_status'] === "Ya") {
				return (<p>Iya</p>)
			} else {
				return (<p>Tidak</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'soda_status')
	}

]

const tableColumnSODA = [
	{
		title: 'NIK',
		dataIndex: 'nik',
		render: (_, elm) => {
			return (<p>{elm.nik}</p>)
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'nik')
	},
	{
		title: 'Tanggal',
		dataIndex: 'tgl',
		render: (_, elm) => {
			return (<p>{elm.tgl}</p>)
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'tgl')
	},
	{
		title: 'Dhuha Status',
		dataIndex: 'dhuha_status',
		render: (_, elm) => {
			if (elm['dhuha_status'] === "-1") {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else if(elm['dhuha_status'] === "0"){
				if(elm['siang'] !== "Ya"){
					return (<p style={{ color: "green" }}>Absen</p>)
				}else{
					return (<p style={{ color: "orange" }}>Sholat Biasa</p>)
				}
			}else {
				return (<p style={{ color: "green" }}>Sholat SODA</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'dhuha_status')
	},
	{
		title: 'Dzuhur Status',
		dataIndex: 'dzuhur_status',
		render: (_, elm) => {
			if (elm['dzuhur_status'] === "-1") {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else if(elm['dzuhur_status'] === "0"){
				if(elm['siang'] !== "Ya"){
					return (<p style={{ color: "green" }}>Absen</p>)
				}else{
					return (<p style={{ color: "orange" }}>Sholat Biasa</p>)
				}
			}else {
				return (<p style={{ color: "green" }}>Sholat SODA</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'dzuhur_status')
	},
	{
		title: 'Ashar Status',
		dataIndex: 'ashar_status',
		render: (_, elm) => {
			if (elm['ashar_status'] === "-1") {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else if(elm['ashar_status'] === "0"){
				if(elm['siang'] !== "Ya"){
					return (<p style={{ color: "green" }}>Absen</p>)
				}else{
					return (<p style={{ color: "orange" }}>Sholat Biasa</p>)
				}
			}else {
				return (<p style={{ color: "green" }}>Sholat SODA</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'ashar_status')
	},
	{
		title: 'Isya Status',
		dataIndex: 'isya_status',
		render: (_, elm) => {
			if (elm['isya_status'] === "-1") {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else if(elm['isya_status'] === "0"){
				if(elm['siang'] === "Ya"){
					return (<p style={{ color: "green" }}>Absen</p>)
				}else{
					return (<p style={{ color: "orange" }}>Sholat Biasa</p>)
				}
			}else {
				return (<p style={{ color: "green" }}>Sholat SODA</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'isya_status')
	},
	{
		title: 'Shift',
		dataIndex: 'shift',
		render: (_, elm) => {
			if (elm['siang'] === "Ya") {
				return (<p>Siang</p>)
			} else {
				return (<p>Malam</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'cuti')
	},
	{
		title: 'Ontime',
		dataIndex: 'soda_status',
		render: (_, elm) => {
			if (elm['siang'] === "Ya") {
				if(elm['ashar_status'] === "1" && elm['dhuha_status'] === "1" && elm['dzuhur_status'] === "1"){
					return (<p>Ya</p>)
				}else{
					return (<p>Tidak</p>)
				}
			} else {
				if(elm['isya_status'] === "1"){
					return (<p>Ya</p>)
				}else{
					return (<p>Tidak</p>)
				}
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'soda_status')
	}
]

const onSearch = e => {
	// const value = e.currentTarget.value
	// const searchArray = e.currentTarget.value? dataItem : dataItemBackup
	// const data = utils.wildCardSearch(searchArray, value)
	// setDataItem(data)
	// setSelectedRowKeys([])
}

const RecentOrder = (props) => (
	<Card title="My History">
		<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
			<Flex className="mb-1" mobileFlex={false}>
				<div className="mr-md-3 mb-3">
					<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
				</div>
			</Flex>
		</Flex>
		<Table
			pagination={true}
			columns={tableColumns}
			dataSource={props.dataKaryawan}
			rowKey='nip'
		/>
	</Card>
)

const TableSODADisplay = (props) => (
	<Card title="My SODA Today">
		<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
			<Flex className="mb-1" mobileFlex={false}>
				<div className="mr-md-3 mb-3">
					<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
				</div>
			</Flex>
		</Flex>
		<Table
			pagination={true}
			columns={tableColumnSODA}
			dataSource={props.dataKaryawan}
			rowKey='nip'
		/>
	</Card>
)

const Dashboard = () => {
	const { Option, OptGroup } = Select;
	const handleSelectChange = () => {

	}
	const [waktu, setWaktu] = useState();
	const [waktuSholat, setWaktuSholat] = useState([]);
	const [timeSholat, setTimeSholat] = useState([]);
	const [waktuSholatSekarang, setWaktuSholatSekarang] = useState("Transisi");
	const [dataKaryawan, setDataKaryawan] = useState([])
	const [singleKaryawan, setSingleKaryawan] = useState({
		name: "",
		id: "",
		nik: ""
	})
	const [todayStatus, setTodayStatus] = useState({})
	const [libur, setLibur] = useState({
		libur: "",
		render: false
	})
	const [selectValue, setSelectValue] = useState(4);
	const [loading, setLoading] = useState(false);

	const onLaporOffHaid = (values) => {
		setLoading(true)
		Axios.post(`${strings.api.sql_host}/reporting/lapor-off/?key=${strings.api.key}`, {
			nik: localStorage.getItem("nik"),
			id_status: 4
		}, {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		}).then(doc => {
			if (!(doc.data.status === "failed")) {
				message.success("Absen Off Berhasil!")
				setLoading(false)
				getReports()

			} else {
				message.error(doc.data.message)
				setLoading(false)
			}

		}).catch(err => {
			message.error("Absen Off Gagal!")
		})
	}

	const onLaporOffLainnya = (values) => {
		setLoading(true)
		Axios.post(`${strings.api.sql_host}/reporting/lapor-off/?key=${strings.api.key}`, {
			nik: localStorage.getItem("nik"),
			id_status: 5
		}, {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		}).then(doc => {
			if (!(doc.data.status === "failed")) {
				message.success("Absen Off Berhasil!")
				setLoading(false)
				getReports()

			} else {
				message.error(doc.data.message)
				setLoading(false)
			}

		}).catch(err => {
			message.error("Absen Off Gagal!")
		})
	}

	const onLaporOffCuti = (values) => {
		setLoading(true)
		Axios.post(`${strings.api.sql_host}/reporting/lapor-off/?key=${strings.api.key}`, {
			nik: localStorage.getItem("nik"),
			id_status: 3
		}, {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		}).then(doc => {
			if (!(doc.data.status === "failed")) {
				message.success("Absen Off Berhasil!")
				setLoading(false)
				getReports()

			} else {
				message.error(doc.data.message)
				setLoading(false)
			}

		}).catch(err => {
			message.error("Absen Off Gagal!")
		})
	}

	const onChangeSelect = (value) => {
		setSelectValue(value)
	}

	useEffect(() => {
		setInterval(() => {
			setWaktu(moment().tz("Asia/Jakarta").format("MMMM Do YYYY, HH:mm:ss"));
			if (timeSholat.dhuha_start < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < timeSholat.dhuha_soda) {
				setWaktuSholatSekarang("Dhuha SODA")
			} else if (`${timeSholat.dhuha_soda}` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.dhuha_stop}`) {
				setWaktuSholatSekarang("Dhuha")
			} else if (`${timeSholat.dzuhur_start}` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.dzuhur_soda}`) {
				setWaktuSholatSekarang("Dzuhur SODA")
			} else if (`${timeSholat.dzuhur_soda}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.dzuhur_stop}:00`) {
				setWaktuSholatSekarang("Dzuhur")
			} else if (`${timeSholat.ashar_start}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.ashar_soda}:00`) {
				setWaktuSholatSekarang("Ashar SODA")
			} else if (`${timeSholat.ashar_soda}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.ashar_stop}:00`) {
				setWaktuSholatSekarang("Ashar")
			} else if (`${timeSholat.maghrib_start}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.maghrib_soda}:00`) {
				setWaktuSholatSekarang("Maghrib SODA")
			} else if (`${timeSholat.maghrib_soda}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.maghrib_stop}:00`) {
				setWaktuSholatSekarang("Maghrib")
			} else if (`${timeSholat.isya_start}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.isya_soda}:00`) {
				setWaktuSholatSekarang("Isya SODA")
			} else if (`${timeSholat.isya_soda}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.isya_stop}:00`) {
				setWaktuSholatSekarang("Isya")
			}
		}, 1000);
	})

	useEffect(() => {
		Axios.get(`${strings.api.sql_host}/prayer/?key=${strings.api.key}`).then((doc) => {
			setWaktuSholat(doc.data.data)
			setTimeSholat({
				dhuha_start: doc.data.data[0].start_time_prayer,
				dhuha_soda: doc.data.data[0].soda_time_prayer,
				dhuha_stop: doc.data.data[0].end_time_prayer,

				dzuhur_start: doc.data.data[1].start_time_prayer,
				dzuhur_soda: doc.data.data[1].soda_time_prayer,
				dzuhur_stop: doc.data.data[1].end_time_prayer,

				ashar_start: doc.data.data[2].start_time_prayer,
				ashar_soda: doc.data.data[2].soda_time_prayer,
				ashar_stop: doc.data.data[2].end_time_prayer,

				isya_start: doc.data.data[4].start_time_prayer,
				isya_soda: doc.data.data[4].soda_time_prayer,
				isya_stop: doc.data.data[4].end_time_prayer
			})
		})

		Axios.get(`${strings.api.sql_host}/users/${localStorage.getItem("id_users")}&?key=${strings.api.key}`, {
			headers: {
				'content-type': 'multipart/form-data',
				"Access-Control-Allow-Origin": "*"
			}
		}).then(doc => {
			let user = doc.data.data[0]
			setSingleKaryawan({
				...singleKaryawan,
				name: user.name_users,
				id: user.id,
				nik: user.nik
			})
		}).catch(err => {
			message.error("Opps!! Something is Wrong!")
		})
		getReports()

	}, [])

	const getReports = () => {
		Axios.get(`${strings.api.sql_host}/reporting/listall/${localStorage.getItem("nik")}?key=${strings.api.key}`).then((doc) => {
			if (doc.data.data[0]) {
				setDataKaryawan([doc.data.data[0]])
				setTodayStatus({
					Dhuha: doc.data.data[0].dhuha,
					Dzuhur: doc.data.data[0].dzuhur,
					Ashar: doc.data.data[0].ashar,
					Isya: doc.data.data[0].isya,
					"Dhuha SODA": doc.data.data[0].dhuha,
					"Dzuhur SODA": doc.data.data[0].dzuhur,
					"Ashar SODA": doc.data.data[0].ashar,
					"Isya SODA": doc.data.data[0].isya
				})
			}
		})
	}

	const onLapor = (values) => {

		Axios.post(`${strings.api.sql_host}/reporting/lapor/?key=${strings.api.key}`, {
			nik: localStorage.getItem("nik"),
			password: values.password
		}, {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		}).then(doc => {
			if (doc.data.status === "Success") {
				message.success(doc.data.message)
				getReports()
			} else {
				message.error(doc.data.message)
			}
		})
	}

	const renderButton = (name) => {
		if (todayStatus[name]) {
			return (
				<Button style={{ width: "100%", color: "#FFF", background: "green" }}>Sudah {name}</Button>
			)
		}
		else if ((waktuSholatSekarang > timeSholat[name])) {
			return (
				<Button type="danger" style={{ width: "100%", color: "#FFF" }}>Belum Bisa</Button>
			)
		}
		else {
			return (
				<Button onClick={() => { absenTelat(name) }} type="primary" style={{ width: "100%" }}>Absen Non SODA</Button>
			)
		}
	}

	const absenTelat = (sholat) => {
		console.log(sholat)
		if (sholat === "Dhuha") {
			LogicTelat(1)
		} else if (sholat === "Dzuhur") {
			LogicTelat(2)
		} else if (sholat === "Ashar") {
			LogicTelat(3)
		} else if (sholat === "Isya") {
			LogicTelat(5)
		}
	}

	const LogicTelat = (code) => {
		Axios.post(`${strings.api.sql_host}/reporting/lapor-telat/?key=${strings.api.key}`, {
			nik: localStorage.getItem("nik"),
			id_sholat: code
		}, {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		}).then(doc => {
			if (doc.data.status === "Success") {
				message.success(doc.data.message)
				getReports()
			} else {
				message.error(doc.data.message)
			}
		})
	}

	const renderAbsenNow = (name) => {
		if (todayStatus[name]) {
			return (
				<Button htmlType="submit" style={{ width: "100%", color: "#FFF", background: "green" }}>Sudah {name}</Button>
			)
		}
		else {
			return (
				<Button htmlType="submit" type="primary" style={{ width: "100%" }}>Absen SODA</Button>
			)
		}
	}

	const renderLibur = () => {
		if (libur.render) {
			return (
				<h1 style={{ textAlign: "center", color: "red" }}>Libur</h1>
			)
		} else {
			return (<h1 style={{ textAlign: "center", color: "green" }}>{waktuSholatSekarang}</h1>)
		}
	}


	return (
		<>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
					<Card>
						<h1 style={{ textAlign: "center" }}>Welcome {singleKaryawan.name}</h1>
						<h1 style={{ textAlign: "center", color: "green" }}>{waktu}</h1>
						{renderLibur()}
						<Form
							layout="vertical"
							name="login-form"
							onFinish={onLapor}
						>
							<Form.Item
								name="password"
								label="Password"
								rules={[
									{
										required: true,
										message: 'Please input your password',
									}
								]}
							>
								<Input.Password prefix={<LockOutlined className="text-primary" />} />
							</Form.Item>
							<Form.Item>
								{renderAbsenNow(waktuSholatSekarang)}
							</Form.Item>
						</Form>
					</Card>
				</Col>
			</Row>
			<Row gutter={24} style={{ textAlign: "center" }}>
				{
					waktuSholat.map(doc => {
						if (doc.name_time_prayer !== 'Maghrib') {
							return (
								<Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} >
									<Card>
										<h1>{doc.name_time_prayer}</h1>
										<p>Mulai	: {doc.start_time_prayer}</p>
										<p>SODA		: {doc.soda_time_prayer}</p>
										<p>Selesai	: {doc.end_time_prayer}</p>
										{renderButton(doc.name_time_prayer)}
									</Card>
								</Col>
							)
						}
					})
				}
			</Row>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<RecentOrder tanggal={waktu} dataKaryawan={dataKaryawan} />
				</Col>
			</Row>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<TableSODADisplay tanggal={waktu} dataKaryawan={dataKaryawan} />
				</Col>
			</Row>
			<Row justify="center">
				<Button type="primary" onClick={onLaporOffHaid} style={{ width: "100%", color: "#FFF" }}>
					Absen Haid
				</Button>
			</Row>
			<br/>
			<Row justify="center">
				<Button type="primary" onClick={onLaporOffCuti} style={{ width: "100%", color: "#FFF" }}>
					Absen Cuti
				</Button>
			</Row>
			<br/>
			<Row justify="center">
				<Button type="primary" onClick={onLaporOffLainnya} style={{ width: "100%", color: "#FFF" }}>
					Absen Lainnya
				</Button>
			</Row>
		</>
	)
}

export default Dashboard