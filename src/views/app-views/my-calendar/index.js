import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Card, Row, Col, Tooltip } from 'antd';
import CalendarData from './CalendarData';
import {useHistory} from 'react-router-dom'

const dateFormat = 'YYYY-MM-DD'

const CalendarApp = () => {
	const [calendarList, setCalendarList] = useState(CalendarData);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);

	const history = useHistory()

	const cellRender = value => {
		const listData = getListData(value.format((dateFormat)));
		return (
			<ul className="calendar-event">
				{listData.map((item, i) => (
					<li key={`${item.title}-${i}`}>
						<Badge color={item.bullet} text={item.title}/>
					</li>
				))}
			</ul>
		);
	}

	const getListData = (value) => {
		let listData = [];
		calendarList.forEach(elm => {
			if(elm.date === value) {
				listData = elm.event
			}
		})
		return listData;
	}

	const onSelect = value => {
		console.log(value);
		const selectedDate = value.format((dateFormat))
		setModalVisible(true);
		setSelectedDate(selectedDate)
		history.push("/app/detail-calendar",{
			tanggal:selectedDate
		})
	}

	return (
		<Card className="calendar mb-0">
			<Row>
				<Col xs={24} sm={24} md={15} lg={24}>
					<Calendar 
						onSelect={val => onSelect(val)} 
						dateCellRender={cellRender}
					/>
				</Col>
			</Row>
		</Card>
	)
}

export default CalendarApp

