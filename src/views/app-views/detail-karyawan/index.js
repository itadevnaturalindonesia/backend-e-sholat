import { Button, Card, Col, DatePicker, Form, Input, message, Select } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { strings } from 'res';

const Detail = () => {

    const { Option, OptGroup } = Select;
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    let history = useHistory();
    const location = useLocation();
    const [gender,setGender] = useState("Laki-laki");
    const [id,setId] = useState("Laki-laki");

    useEffect(() => {
        if (location.state.status) {
            onDefault(location.state.id)
        }
    }, [])

    const onDefault = (values) => {

        Axios.get(`${strings.api.host}/karyawan/readById/${values.id}`, {
            headers: {
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            form.setFieldsValue({
                name: values.name,
                divisi: values.divisi,
                username: values.username,
                email: values.email,
                department: values.department,
                jabatan: values.jabatan,
                jenis_kelamin: values.jenis_kelamin,
                level: values.level
            })
            setId(values._id)
        }).catch(err => {
            message.error("Opps!! Something is Wrong!")
        })
    }

    const onFinish = () => {
        form.validateFields().then(values => {
            confirm({
                name: "Submit New Data",
                content: "Are you sure you wanna submit/update new data?",
                onOk() {
                    if (location.state.status) {
                        onUpdate(values)
                    } else {
                        onPost(values)
                    }
                },
                onCancel() { },
            });
        })
    }

    /**
     * Calling API
     */
    const onPost = async (values) => {
        console.log(values)
        //isLoading
        setSubmitLoading(true);
        let data = {
            name: values.name,
            password: "12345",
            divisi: values.divisi,
            email: values.email,
            username: values.username,
            department: values.department,
            jabatan: values.jabatan,
            jenis_kelamin: values.jenis_kelamin,
            level: values.level
        }
        Axios.post(`${strings.api.host}/karyawan/create`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            setSubmitLoading(false)
            message.success(`Success`)
            history.goBack()
        }).catch(e => {
            console.log('error: ', e.message)
            message.error(`Opps! Try fill all the fields`)
        })
    }

    const onUpdate = (values) => {
        //isLoading
        setSubmitLoading(true);
        let data = {
            id:id,
            name: values.name,
            divisi: values.divisi,
            email: values.email,
            username: values.username,
            department: values.department,
            jabatan: values.jabatan,
            jenis_kelamin: values.jenis_kelamin,
            level: values.level
        }
        Axios.post(`${strings.api.host}/karyawan/update`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            console.log(doc.data)
            setSubmitLoading(false)
            message.success("Success")
            history.goBack()
        }).catch(e => {
            console.log('error: ', e.message)
        })
    }

    const onChangeGender = (value) => {
        console.log(value)
        setGender(value)
    }

    return (
        <Form
            layout="vertical"
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
        >
            <div className="container" >
                <Col xs={24} sm={24} md={24}>
                    <Card>
                        <Form.Item name="name" label="Name">
                            <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item name="username" label="Username">
                            <Input placeholder="Username" />
                        </Form.Item>
                        <Form.Item name="email" label="Email">
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item name="divisi" label="Divisi">
                            <Input placeholder="Divisi" />
                        </Form.Item>
                        <Form.Item name="department" label="Department">
                            <Input placeholder="Department" />
                        </Form.Item>
                        <Form.Item name="jabatan" label="Jabatan" >
                            <Input placeholder="Jabatan" />
                        </Form.Item>
                        <Form.Item name="jenis_kelamin" label="Jenis Kelamin">
                            <Select defaultValue="Laki-laki" onChange={onChangeGender}>
                                <Option value="Laki-laki">Laki-laki</Option>
                                <Option value="Perempuan">Perempuan</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="level" label="Level">
                            <Input placeholder="Level" />
                        </Form.Item>
                        <Form.Item >
                            <Button htmlType="submit" type="primary" style={{ width: "100%" }}>Submit</Button>
                        </Form.Item>
                    </Card>
                </Col>
            </div>
        </Form>
    )
}

export default Detail