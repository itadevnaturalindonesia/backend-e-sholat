import moment from 'moment';

const m = new Date().getMonth();
const y = new Date().getFullYear();

const getDate = (date) => moment(new Date(y, m, date),).format('DD MMMM')

const CalendarData = [
	{
		date: getDate(1),
		event: [
			{
				title: '40 Soda',
				bullet: 'cyan',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '1 Bad',
				bullet: 'red',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '3 Off',
				bullet: 'blue',
				start: '11.00am',
				end: '1.00pm',
			}
		]
	},{
		date: getDate(2),
		event: [
			{
				title: '40 Soda',
				bullet: 'cyan',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '1 Bad',
				bullet: 'red',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '3 Off',
				bullet: 'blue',
				start: '11.00am',
				end: '1.00pm',
			}
		]
	},
	{
		date: getDate(3),
		event: [
			{
				title: '40 Soda',
				bullet: 'cyan',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '1 Bad',
				bullet: 'red',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '3 Off',
				bullet: 'blue',
				start: '11.00am',
				end: '1.00pm',
			}
		]
	},{
		date: getDate(4),
		event: [
			{
				title: '40 Soda',
				bullet: 'cyan',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '1 Bad',
				bullet: 'red',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '3 Off',
				bullet: 'blue',
				start: '11.00am',
				end: '1.00pm',
			}
		]
	},{
		date: getDate(5),
		event: [
			{
				title: '40 Soda',
				bullet: 'cyan',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '1 Bad',
				bullet: 'red',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '3 Off',
				bullet: 'blue',
				start: '11.00am',
				end: '1.00pm',
			}
		]
	},
	{
		date: getDate(6),
		event: [
			{
				title: '40 Soda',
				bullet: 'cyan',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '1 Bad',
				bullet: 'red',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '3 Off',
				bullet: 'blue',
				start: '11.00am',
				end: '1.00pm',
			}
		]
	},
	{
		date: getDate(7),
		event: [
			{
				title: '40 Soda',
				bullet: 'cyan',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '1 Bad',
				bullet: 'red',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '3 Off',
				bullet: 'blue',
				start: '11.00am',
				end: '1.00pm',
			}
		]
	},
	{
		date: getDate(8),
		event: [
			{
				title: '40 Soda',
				bullet: 'cyan',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '1 Bad',
				bullet: 'red',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '3 Off',
				bullet: 'blue',
				start: '11.00am',
				end: '1.00pm',
			}
		]
	},
	{
		date: getDate(9),
		event: [
			{
				title: '40 Soda',
				bullet: 'cyan',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '1 Bad',
				bullet: 'red',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '3 Off',
				bullet: 'blue',
				start: '11.00am',
				end: '1.00pm',
			}
		]
	},
	{
		date: getDate(10),
		event: [
			{
				title: '40 Soda',
				bullet: 'cyan',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '1 Bad',
				bullet: 'red',
				start: '11.00am',
				end: '1.00pm',
			},
			{
				title: '3 Off',
				bullet: 'blue',
				start: '11.00am',
				end: '1.00pm',
			}
		]
	}
]

export default CalendarData