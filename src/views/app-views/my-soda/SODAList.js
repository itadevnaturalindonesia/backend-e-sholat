import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Table, message,Input } from 'antd';
import Flex from 'components/shared-components/Flex'
import utils from 'utils'
import { SearchOutlined } from "@material-ui/icons";
import Axios from 'axios'
import { strings } from 'res';

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
	<Card title="My SODA Status">
		<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
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

const MySODA = () => {
	const [waktu, setWaktu] = useState();
	const [dataKaryawan,setDataKaryawan] = useState([])
	const [singleKaryawan, setSingleKaryawan] = useState({
		name:"",
		id:"",
		nik:""
	})



	useEffect(() => {

		Axios.get(`${strings.api.sql_host}/users/${localStorage.getItem("id_users")}&?key=${strings.api.key}`, {
            headers: {
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
			let user = doc.data.data[0]
			console.log(user.name_users)
			setSingleKaryawan({
				...singleKaryawan,
				name:user.name_users,
				id:user.id,
				nik:user.nik
			})
        }).catch(err => {
            message.error("Opps!! Something is Wrong!")
        })

		Axios.get(`${strings.api.sql_host}/reporting/listall/${localStorage.getItem("nik")}?key=${strings.api.key}`).then((doc) => {
			console.log(doc.data.data)
			setDataKaryawan(doc.data.data)
		})
	}, [])


	return (
		<>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<RecentOrder title={"SODA Status"} tanggal={waktu} dataKaryawan={dataKaryawan} />
				</Col>
			</Row>
		</>
	)
}

export default MySODA