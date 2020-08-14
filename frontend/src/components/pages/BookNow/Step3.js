import React from 'react';
import { Form, Input } from 'antd'


export default function Step1(props) {
    if (props.currentStep !== 3) {
        return null;
    }
    return (
        <div className="form-group">
            <h3>Last step! Please enter payment total</h3>
            <p>We really hope to serve you at the restaurant!</p>
            <div style={{ display: 'flex' }}>
                <Input style={{ width: '400px' }}
                    className="form-control"
                    id="paidTotal"
                    name="paidTotal"
                    type="text"
                    placeholder="Enter paidTotal"
                    value={props.paidTotal}
                    onChange={props.handleChange}
                />
                <button type="submit" style={{ position: 'absolute', bottom: '30px', left: '56%' }}>Submit</button>
            </div>
        </div>
    )
}
