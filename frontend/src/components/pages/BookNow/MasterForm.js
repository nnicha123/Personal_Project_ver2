import React, { Component } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { Button } from 'antd'

class MasterForm extends React.Component {
    state = {
        currentStep: 1,
        date: '',
        time: '',
        username: '',
        password: ''
    }
    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        const { date, time, username, password } = this.state
        alert(`Your registration detail:\n
        Date: ${date}\n
        Time:${time}\n
        Username:${username}\n
        Password:${password}`)
    }
    _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 2 ? 3 : currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }
    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }
    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1) {
            return (
                <Button
                    className="btn btn-secondary"
                    type="Button" onClick={this._prev}>
                    Previous
                </Button>
            )
        }
        return null
    }
    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 3) {
            return (
                <Button
                    className="btn btn-primary float-right"
                    type="Button" onClick={this._next}>
                    Next
                </Button>
            )
        }
        return null
    }
    render() {
        return (
            <div className="bookingOuter">
                <h1></h1>
                <div className="steps">
                    <h2>Step {this.state.currentStep}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <Step1
                            currentStep={this.state.currentStep}
                            handleChange={this.handleChange}
                            date={this.state.date}
                            time={this.state.time} />
                        <Step2
                            currentStep={this.state.currentStep}
                            handleChange={this.handleChange}
                            username={this.state.username} />
                        <Step3
                            currentStep={this.state.currentStep}
                            handleChange={this.handleChange}
                            password={this.state.password} />
                        <div className="navigateButtons">
                            {this.previousButton()}
                            {this.nextButton()}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default MasterForm