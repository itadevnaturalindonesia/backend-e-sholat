import React,{useState} from 'react'
import { Card, Row, Col, Input,Button,Form ,Select,message} from "antd";
import { useHistory } from 'react-router-dom'
import TextArea from 'antd/lib/input/TextArea';
import Axios from 'axios'
import {strings} from 'res'

const backgroundStyle = {
    // backgroundImage: 'url(/img/others/img-17.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}

const LaporOff = props => {
    let history = useHistory()
    const { Option, OptGroup } = Select;
    const [selectValue, setSelectValue] = useState(4);
    const [loading, setLoading] = useState(false);

    const onLapor = (values)=>{
        console.log(values)
        setLoading(true)
        Axios.post(`${strings.api.sql_host}/reporting/lapor-off/?key=${strings.api.key}`,{
            nik:values.nik,
            id_status:selectValue
        }, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin":"*"
            }
          }).then(doc=>{
            console.log(doc)
            message.success("Absen Off Berhasil!")
            setLoading(false)
        }).catch(err=>{
            message.error("Absen Off Gagal!")
        })
    }

    const onChangeSelect = (value)=>{
        console.log(value)
        setSelectValue(value)
    }

    return (
        <div className="h-100" style={backgroundStyle}>
            <div className="container d-flex flex-column justify-content-center h-100">
                <div className="container">
                    <Row justify="center">
                        <Col xs={20} sm={20} md={20} lg={7}>
                            <Card>
                                <div className="my-4">
                                    <div className="text-center">
                                        <img className="img-fluid" style={{ width: "50%" }} src="/img/logo.png" alt="" />
                                        <p>Wanna go back? <a href="#" onClick={() => { history.push("/auth/absen") }}>Absen</a></p>
                                    </div>
                                    <Row justify="center">
                                        <Col xs={24} sm={24} md={20} lg={20}>
                                            <Form
                                            layout="vertical" 
                                            name="login-form"
                                            onFinish={onLapor}
                                            >
                                                <Form.Item
                                                    name="nik"
                                                    label="NIK">
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="id_status"
                                                    label="Status">
                                                    <Select defaultValue={"Haid"} onChange={onChangeSelect}>
                                                        <Option value={4}>Haid</Option>
                                                        <Option value={3}>Cuti</Option>
                                                        <Option value={5}>Lainnya</Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    name="keterangan"
                                                    label="Keterangan (Wajib Bagi Status 'Lainnya')">
                                                        <TextArea name="keterangan" rows={5} placeholder="Keterangan"></TextArea>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit" style={{width:"100%",color:"#FFF"}}>
                                                        Absen
					                                </Button>
                                                </Form.Item>
                                            </Form>
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

export default LaporOff
