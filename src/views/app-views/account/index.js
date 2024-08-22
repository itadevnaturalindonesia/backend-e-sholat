import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { strings } from 'res';
import {
    EyeTwoTone,
    EyeInvisibleOutlined
} from '@ant-design/icons';

const Detail = () => {

    const { Option } = Select;
    const [form] = Form.useForm();
    const [shift, setShift] = useState(0)
    const [defaultValue, setDefaultValue] = useState({
        divisions: {
            id: "",
            value: ""
        },
        departments: {
            id: "",
            value: ""
        },
        positions: {
            id: "",
            value: ""
        },
        locations: {
            id: "",
            value: ""
        }
    })
    const [id, setId] = useState("");
    const [nik, setNIK] = useState("");

    const [positions, setPositions] = useState([]);
    const [lokasis, setlokasis] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [divisions, setDivisions] = useState([]);

    const setShiftSementara = () => {
        if (shift === 1) {
            confirm({
                name: "Informasi",
                content: "Apakah hendak mengubah shift?",
                onOk() {
                    Axios.post(`${strings.api.sql_host}/shift/ubahShiftDay/?key=${strings.api.key}`, {
                        "nik": nik,
                        "id_shift": 2
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(doc => {
                        if (doc.data.status === "failed") {
                            message.error(doc.data.message)
                        } else {
                            message.success("Berhasil Diubah")
                            setShift(2)
                        }
                    }).catch(() => {
                        message.error("Opps! Password is not changed! Call your admin!")
                    })
                },
                onCancel() { },
            });
        } else {
            confirm({
                name: "Informasi",
                content: "Apakah hendak mengubah shift?",
                onOk() {
                    Axios.post(`${strings.api.sql_host}/shift/ubahShiftDay/?key=${strings.api.key}`, {
                        "nik": nik,
                        "id_shift": 1
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(doc => {
                        if (doc.data.status === "failed") {
                            message.error(doc.data.message)
                        } else {
                            message.success("Berhasil Diubah")
                            setShift(1)
                        }
                    }).catch(() => {
                        message.error("Opps! Password is not changed! Call your admin!")
                    })
                },
                onCancel() { },
            });
        }
    }


    useEffect(() => {
        onDefault(localStorage.getItem("id_users"))
        fetchEntities()
    }, [])

    const onDefault = async (values) => {
        setId(values.id)
        Axios.get(`${strings.api.sql_host}/users/${localStorage.getItem("id_users")}&?key=${strings.api.key}`, {
            headers: {
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            setNIK(doc.data.data[0].nik)
            setShift(parseInt(doc.data.data[0].id_shift))
            form.setFieldsValue({
                name_users: doc.data.data[0].name_users,
                email: doc.data.data[0].email,
                nik: doc.data.data[0].nik,
                gender: doc.data.data[0].gender,
                role: doc.data.data[0].role,
                id_division: doc.data.data[0].id_division,
                id_department: doc.data.data[0].id_department,
                id_location: doc.data.data[0].id_location,
                id_position: doc.data.data[0].id_position,
                name_division: doc.data.data[0].name_division,
                name_department: doc.data.data[0].name_department,
                name_location: doc.data.data[0].name_location,
                name_position: doc.data.data[0].name_position
            })
            setId(doc.data.data[0].id_users)
        }).catch(() => {
            message.error("Opps!! Something is Wrong!")
        })
    }

    const fetchEntities = () => {
        Axios.get(`${strings.api.sql_host}/department/?key=${strings.api.key}`, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            setDepartments(doc.data.data)
        }).catch(err => {
            message.error(err.response)
        })
        Axios.get(`${strings.api.sql_host}/location/?key=${strings.api.key}`, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            setlokasis(doc.data.data)
        }).catch(err => {
            message.error(err.response)
        })
        Axios.get(`${strings.api.sql_host}/division/?key=${strings.api.key}`, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            setDivisions(doc.data.data)
        }).catch(err => {
            message.error(err.response)
        })
        Axios.get(`${strings.api.sql_host}/position/?key=${strings.api.key}`, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            setPositions(doc.data.data)
        }).catch(err => {
            message.error(err.response)
        })
    }

    const onUpdatePassword = () => {
        form.validateFields().then(values => {
            confirm({
                name: "Informasi",
                content: "Apakah hendak mengubah password?",
                onOk() {
                    Axios.post(`${strings.api.sql_host}/users/ubahPassword/?key=${strings.api.key}`, {
                        "nik": values.nik,
                        "old_pass": values.old_password,
                        "new_pass": values.new_password,
                        "pass_confir": values.confirm_password
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(doc => {
                        if (doc.data.status === "failed") {
                            message.error(doc.data.message)
                        } else {
                            message.success("Password Changed!")
                            form.setFieldsValue({
                                new_password: '',
                                old_password: '',
                                confirm_password: ''
                            })
                        }
                    }).catch(() => {
                        message.error("Opps! Password is not changed! Call your admin!")
                    })
                },
                onCancel() { },
            });
        })
    }

    const onChangeShift = () => {
        form.validateFields().then(values => {
            
        })
    }

    const renderShiftButton = () =>{
        if(shift === 1){
            return <Button type="danger" style={{ width: "100%",color:"#FFF" }} onClick={setShiftSementara}>Ganti shift ke Malam</Button>
        }else if(shift === 2){
            return <Button type="primary" style={{ width: "100%",color:"#FFF" }} onClick={setShiftSementara}>Ganti shift ke Siang</Button>
        }else{
            return <div></div>
        }
    }

    return (
        <div>
            <div style={{ margin: "10px" }}>
                {renderShiftButton()}
            </div>
            <Form
                layout="vertical"
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
            >
                <div className="container" >
                    <Col xs={24} sm={24} md={24}>
                        <Card>
                            <Form.Item name="name_users" label="Name">
                                <Input disabled placeholder="Name" />
                            </Form.Item>
                            <Form.Item name="nik" label="NIK" >
                                <Input disabled placeholder="NIK" />
                            </Form.Item>
                            {/* <Form.Item name="id_shift" label="Shift">
                            <Select>
                                <Option key="1" value="1">Siang</Option>
                                <Option key="2" value="2">Malam</Option>
                            </Select>
                        </Form.Item> */}
                            <Form.Item name="old_password" label="Password Lama" >
                                <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} type="password" placeholder="Password Lama" />
                            </Form.Item>
                            <Form.Item name="new_password" label="Password Baru" >
                                <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} type="password" placeholder="Password Baru" />
                            </Form.Item>
                            <Form.Item name="confirm_password" label="Konfirmasi Password" >
                                <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} type="password" placeholder="Konfirmasi Password" />
                            </Form.Item>
                            <Row gutter={32}>
                                <Col className="gutter-row">
                                    <Form.Item >
                                        <Button htmlType="submit" type="primary" onClick={onUpdatePassword} style={{ width: "100%" }}>Ubah Password</Button>
                                    </Form.Item>
                                </Col>
                                {/* <Col className="gutter-row">
                                    <Form.Item >
                                        <Button htmlType="submit" type="primary" onClick={onChangeShift} style={{ width: "100%" }}>Ubah Shift</Button>
                                    </Form.Item>
                                </Col> */}
                            </Row>
                        </Card>
                    </Col>
                </div>
            </Form>
        </div>
    )
}

export default Detail