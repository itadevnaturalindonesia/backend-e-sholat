import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Tag, Select, Menu, Input } from 'antd';
import Flex from 'components/shared-components/Flex'
import DataDisplayWidget from 'components/shared-components/DataDisplayWidget';
import {

	UserSwitchOutlined,
	SyncOutlined,
	EyeOutlined,DeleteOutlined
} from '@ant-design/icons';
import utils from 'utils'
import { SearchOutlined, StarBorderOutlined } from "@material-ui/icons";
import moment from "moment-timezone";
import Axios from 'axios'
import { strings } from 'res';
import {useHistory,useLocation} from 'react-router-dom'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';

const DisplayDataSet = (props) => (
	<Row gutter={24}>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<UserSwitchOutlined />}
				value={props.karyawan}
				title="SODA"
				color="blue"
				vertical={true}
				avatarSize={55}
			/>

		</Col>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<StarBorderOutlined />}
				value={props.totalKaryawanAktif}
				title="Sholat"
				color="green"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<UserSwitchOutlined />}
				value={props.totalKaryawanOff}
				title="Off"
				color="gray"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<SyncOutlined />}
				value="0"
				title="Tidak Sholat"
				color="red"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
	</Row>
)

const dropdownMenu = row => (
	<Menu>
		<Menu.Item onClick={() => viewDetails(row)}>
			<Flex alignItems="center">
				<EyeOutlined />
				<span className="ml-2">View Detail</span>
			</Flex>
		</Menu.Item>
	</Menu>
);

const viewDetails = row => {
	window.location.href = "/app/detail-sholat-harian"
}

const tableColumns = [
	{
		title: 'Siang',
		dataIndex: 'siang',
		render: (_, elm) => {
			if (elm['siang']) {
				return (<p>Iya</p>)
			} else {
				return (<p>Tidak</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'siang')
	},
	{
		title: 'Malam',
		dataIndex: 'malam',
		render: (_, elm) => {
			if (elm['malam']) {
				return (<p>Iya</p>)
			} else {
				return (<p>Tidak</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'malam')
	},
	{
		title: 'Dhuha',
		dataIndex: 'dhuha',
		render: (_, elm) => {
			if (elm['dhuha'] === 0) {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else if (elm['dhuha'] === 1) {
				return (<p style={{ color: "blue" }}>Sudah Sholat</p>)
			} else {
				return (<p style={{ color: "green" }}>SODA</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'dzuhur')
	},
	{
		title: 'Dzuhur',
		dataIndex: 'dzuhur',
		render: (_, elm) => {
			if (elm['dzuhur'] === 0) {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else if (elm['dzuhur'] === 1) {
				return (<p style={{ color: "blue" }}>Sudah Sholat</p>)
			} else {
				return (<p style={{ color: "green" }}>SODA</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'dzuhur')
	},
	{
		title: 'Ashar',
		dataIndex: 'ashar',
		render: (_, elm) => {
			if (elm['ashar'] === 0) {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else if (elm['ashar'] === 1) {
				return (<p style={{ color: "blue" }}>Sudah Sholat</p>)
			} else {
				return (<p style={{ color: "green" }}>SODA</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'ashar')
	},
	{
		title: 'Maghrib',
		dataIndex: 'maghrib',
		render: (_, elm) => {
			if (elm['maghrib'] === 0) {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else if (elm['maghrib'] === 1) {
				return (<p style={{ color: "blue" }}>Sudah Sholat</p>)
			} else {
				return (<p style={{ color: "green" }}>SODA</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'maghrib')
	},
	{
		title: 'Isya',
		dataIndex: 'isya',
		render: (_, elm) => {
			if (elm['isya'] === 0) {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else if (elm['isya'] === 1) {
				return (<p style={{ color: "blue" }}>Sudah Sholat</p>)
			} else {
				return (<p style={{ color: "green" }}>SODA</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'isya')
	},
	{
		title: 'Haid',
		dataIndex: 'haid',
		render: (_, elm) => {
			if (elm['haid']) {
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
			if (elm['cuti']) {
				return (<p>Iya</p>)
			} else {
				return (<p>Tidak</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'cuti')
	},
	{
		title: '',
		dataIndex: '',
		render: (_, elm) => (
			<div className="text-center">
				<EllipsisDropdown menu={dropdownMenu(elm)}/>
			</div>
		)
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
	<Card title={`History Tanggal ${props.tanggal}`}>
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

const DetailCalendar = () => {
	const [waktu, setWaktu] = useState();
	const [totalKaryawan, setTotalKaryawan] = useState(0);
	const [totalKaryawanAktif, setTotalKaryawanAktif] = useState(0);
	const [totalKaryawanOff, setTotalKaryawanOff] = useState(0);
	const [dataKaryawan, setDataKaryawan] = useState([])
	const location =useLocation()

	const getObjects = (array, key, value) => {
		return array.filter(object => object[key] === value);
	}

	useEffect(() => {
		if(location.state.tanggal){
			setWaktu(location.state.tanggal)
			Axios.get(`${strings.api.sql_host}/reporting/resumetotal/1/14522001?key=${strings.api.key}`,{
				headers: {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin": "*"
				}
			}).then(doc=>{
				console.log(doc.data.data)
			})
		}
	}, [])


	return (
		<>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
					<Card>
						<h1 style={{ textAlign: "center" }}>{waktu}</h1>
							</Card>
				</Col>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
					<DisplayDataSet karyawan={totalKaryawan} totalKaryawanAktif={totalKaryawanAktif} totalKaryawanOff={totalKaryawanOff} />
					
				</Col>
			</Row>
			<Row gutter={24} style={{ textAlign: "center" }}>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
					<Card>
						<h1>Dhuha</h1>
						<p>SODA	: 0</p>
						<p>Sholat		: 0</p>
						<p>Tidak Sholat	: 0</p>
					</Card>
				</Col>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
					<Card>
						<h1>Dzuhur</h1>
						<p>SODA	: 0</p>
						<p>Sholat		: 0</p>
						<p>Tidak Sholat	: 0</p>
					</Card>
				</Col>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
					<Card>
						<h1>Ashar</h1>
						<p>SODA	: 0</p>
						<p>Sholat		: 0</p>
						<p>Tidak Sholat	: 0</p>
					</Card>
				</Col>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
					<Card>
						<h1>Maghrib</h1>
						<p>SODA	: 0</p>
						<p>Sholat		: 0</p>
						<p>Tidak Sholat	: 0</p>
					</Card>
				</Col>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
					<Card>
						<h1>Isya</h1>
						<p>SODA	: 0</p>
						<p>Sholat		: 0</p>
						<p>Tidak Sholat	: 0</p>
					</Card>
				</Col>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
					<Card>
						<h1>Final</h1>
						<p>SODA	: 0</p>
						<p>Sholat		: 0</p>
						<p>Tidak Sholat	: 0</p>
					</Card>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<RecentOrder tanggal={waktu} dataKaryawan={dataKaryawan} />
				</Col>
			</Row>
		</>
	)
}

export default DetailCalendar