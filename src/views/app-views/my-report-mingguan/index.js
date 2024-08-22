import React from 'react'
// import ListItems from '../shared-components/ListItems'
import ItemList from './KaryawanList'
import utils from 'utils'
import {strings} from 'res'

const tableColumns = [
	{
		title: 'Start Date',
		dataIndex: 'startdate',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'startdate')
	},
	{
		title: 'End Date',
		dataIndex: 'enddate',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'enddate')
	},
	{
		title: 'Divisi ID',
		dataIndex: 'id_division',
		render:(_,elm)=>{
			if(elm.id_division){
				return(<p>{elm.id_division}</p>)
			}else{
				return(<p>All</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'id_division')
	},
	{
		title: 'Divisi',
		dataIndex: 'division',
		render:(_,elm)=>{
			if(elm.division){
				return(<p>{elm.division}</p>)
			}else{
				return(<p>All</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'division')
	},
	{
		title: 'SODA',
		dataIndex: 'soda',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'soda')
	},
	{
		title: 'Tidak Sholat',
		dataIndex: 'bad',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'bad')
	}
];

const KARYAWAN = props => {
	return (
		<div>
				<ItemList 
					tableColumns={tableColumns} 
					host={`${strings.api.host}/analisa/read`} 
					key={`${strings.api.key}`}
					delete={`${strings.api.sql_host}/users`} 
					title={"Search History"} 
					id={"_id"}
				/>
		</div>
	)
}

export default KARYAWAN