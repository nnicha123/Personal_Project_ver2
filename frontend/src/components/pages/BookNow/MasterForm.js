import React, { Component } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { Button } from 'antd'
import axios from '../../../config/axios'

class MasterForm extends React.Component {
    state = {
        currentStep: 1,
        date: '',
        time: '',
        restaurantName: '',
        paidTotal: 0
    }
    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        const { date, time, restaurantName, paidTotal } = this.state
        axios.post(`/book/${localStorage.getItem("id")}/${localStorage.getItem("resId")}`, { date, time, restaurantName, paidTotal }).then(res => console.log(res))
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
    componentDidMount = () => {
        axios.get(`/restaurant/1/${localStorage.getItem('resId')}`).then(res => { this.setState({ restaurantName: res.data.name }) })
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
                            restaurantName={this.state.restaurantName} />
                        <Step3
                            currentStep={this.state.currentStep}
                            handleChange={this.handleChange}
                            paidTotal={this.state.paidTotal} />
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