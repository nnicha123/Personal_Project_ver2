import React from 'react';
import { Form, Input } from 'antd'
import FormItemLabel from 'antd/lib/form/FormItemLabel';

export default function Step1(props) {
    if (props.currentStep !== 2) {
        return null;
    }
    return (
        <Form.Item className="form-group">
            <FormItemLabel htmlFor="username">Username</FormItemLabel>
            <h3>Please select the dine category, we have 2 choices for you, buffet or normal dining</h3>
            <p>You will enjoy either we promise!</p>
            <Input style={{ width: '400px' }}
                className="form-control"
                id="username"
                name="username"
                type="text"
                placeholder="Enter dine type"
                value={props.username}
                onChange={props.handleChange}
            />
        </Form.Item>
    )
}
