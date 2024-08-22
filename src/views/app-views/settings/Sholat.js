import React, { Component, useState, useEffect } from 'react'
import { Form, Button,message,Input } from 'antd';
import Axios from 'axios';
import { strings } from 'res';

const Sholat = () => {


    const [form] = Form.useForm();

    const onSubmit = (value) => {
      console.log(value)
      let waktuSholat = {
        ashar_soda: (`${value.ashar_soda}`),
        ashar_start: (`${value.ashar_start}`),
        ashar_stop: (`${value.ashar_stop}`),
        dhuha_soda: (`${value.dhuha_soda}`),
        dhuha_start: (`${value.dhuha_start}`),
        dhuha_stop: (`${value.dhuha_stop}`),
        dzuhur_soda: (`${value.dzuhur_soda}`),
        dzuhur_start: (`${value.dzuhur_start}`),
        dzuhur_stop: (`${value.dzuhur_stop}`),
        isya_soda: (`${value.isya_soda}`),
        isya_start: (`${value.isya_start}`),
        isya_stop: (`${value.isya_stop}`),
        maghrib_soda: (`${value.maghrib_soda}`),
        maghrib_start: (`${value.maghrib_start}`),
        maghrib_stop: (`${value.maghrib_stop}`)
      }
      Axios.post(`${strings.api.host}/waktu-sholat/update`,waktuSholat).then(doc=>{
        if(doc.data.msg === "Success"){
          message.success("Success!")
        }else{
          message.error("Error!")
        }
      })
    }

    useEffect(() => {
      Axios.get(`${strings.api.host}/waktu-sholat/read`).then(doc=>{
        console.log(doc)
        form.setFieldsValue(doc.data.doc[0])
      })
    },[])

		return (
			<>
				<h2 className="mb-4">Waktu Sholat</h2>
        <Form form={form} onFinish={onSubmit} name="advanced_search"
            className="ant-advanced-search-form">
          <Form.Item name="dhuha_start" label="Dhuha Start">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="dhuha_soda" label="Dhuha SODA">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="dhuha_stop" label="Dhuha Stop">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <br></br>
          <Form.Item name="dzuhur_start" label="Dzuhur Start">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="dzuhur_soda" label="Dzuhur SODA">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="dzuhur_stop" label="Dzuhur Stop">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <br></br>
          <Form.Item name="ashar_start" label="Ashar Start">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="ashar_soda" label="Ashar SODA">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="ashar_stop" label="Ashar Stop">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <br></br>
          <Form.Item name="maghrib_start" label="Maghrib Start">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="maghrib_soda" label="Maghrib SODA">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="maghrib_stop" label="Maghrib Stop">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <br></br>
          <Form.Item name="isya_start" label="Isya Start">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="isya_soda" label="Isya SODA">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="isya_stop" label="Isya Stop">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <br></br>
          <Form.Item >
            <Button type="primary" style={{ width: "100%" }} htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </>
		)
}

export default Sholat
