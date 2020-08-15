import React from 'react';
import { Form, Input, DatePicker } from 'antd'
import FormItemLabel from 'antd/lib/form/FormItemLabel';

export default function Step1(props) {
    if (props.currentStep !== 1) {
        return null;
    }
    return (

        <Form.Item className="form-group">
            {/* <FormItemLabel htmlFor="date">Select Dine Date</FormItemLabel> */}
            <h3>Please select date and time in which you wish to dine with us</h3>
            <p>We are open everyday on weekdays, but please excuse our holidays!</p>
            <DatePicker style={{ width: '400px' }}
                className="form-control"
                id="date"
                name="date"
                type="text"
                placeholder="Select Date"
                value={props.date}
                onChange={props.onChange}
            />
            {/* <DatePicker onChange={props.handleChange} value={props.date} style={{ width: '400px' }} /> */}
            <br />
            <h3 style={{ marginTop: '20px' }}>Then select time and click next!</h3>
            <Input style={{ width: '400px' }}
                className="form-control"
                id="time"
                name="time"
                type="text"
                placeholder="Select Time"
                value={props.time}
                onChange={props.handleChange}
            />
        </Form.Item>
    )
}
