import React from 'react';
import { Form, Input } from 'antd'
import FormItemLabel from 'antd/lib/form/FormItemLabel';

export default function Step1(props) {
    if (props.currentStep !== 2) {
        return null;
    }
    return (
        <Form.Item className="form-group">
            <FormItemLabel htmlFor="restaurantName">Restaurant Name</FormItemLabel>
            <h3>Please confirm restaurant name</h3>
            <p>You will enjoy either we promise!</p>
            <Input style={{ width: '400px' }}
                className="form-control"
                id="restaurantName"
                name="restaurantName"
                type="text"
                placeholder="Enter dine type"
                value={props.restaurantName}
                onChange={props.handleChange}
            />
        </Form.Item>
    )
}
