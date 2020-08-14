import React from 'react';
import { Form, Input } from 'antd'


export default function Step1(props) {
    if (props.currentStep !== 3) {
        return null;
    }
    return (
        <div className="form-group">
            <h3>Last step! Please enter payment evidence</h3>
            <p>We really hope to serve you at the restaurant!</p>
            <div style={{ display: 'flex' }}>
                <Input style={{ width: '400px' }}
                    className="form-control"
                    id="password"
                    name="password"
                    type="text"
                    placeholder="Enter password"
                    value={props.password}
                    onChange={props.handleChange}
                />
                <button type="submit" style={{ position: 'absolute', bottom: '30px', left: '56%' }}>Submit</button>
            </div>
        </div>
    )
}
