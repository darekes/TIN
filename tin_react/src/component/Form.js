import React from "react";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

class Form extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            age: '',
            formErrors: {name: '', email: '', age: ''}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () => {this.checkField(name, value)});
    };

    checkField(fieldName, value){
        let validationErrors = this.state.formErrors;
        let emailPattern = /^\S+@\S+/;
        switch(fieldName){
            case 'name':
                if(value.length < 5){
                    validationErrors.name = ' cannot be shorther than 5 characters.'
                } else {
                    validationErrors.name= ''
                }
                break;
            case 'email':
                if(!emailPattern.test(value)) {
                    validationErrors.email = ' is not defined in correct email address format.'
                } else {
                    validationErrors.email= ''
                }
                break;
            case 'age':
                if(value < 0 || value > 100) {
                    validationErrors.age = ' must be defined between 0 and 100 years.'
                } else {
                    validationErrors.age= ''
                }
                break;
            default:
                break;
        }
        this.setState({formErrors: validationErrors});
    }


    handleSubmit = (e) => {
        this.setState({
            name: '',
            email: '',
            age: '',
            formErrors: {name: '', email: '', age: ''}
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Simple react form</h1>

                <fieldset>
                    <div>
                        <Label htmlFor='name' value='Your name:'/>
                        <input id='name' name='name' type='text' required onChange={this.handleChange}
                               value={this.state.name}/>
                    </div>

                    <div>
                        <Label htmlFor='email' value='Your email:'/>
                        <input id='email' name='email' type='email' required onChange={this.handleChange}
                               value={this.state.email}/>
                    </div>

                    <div>
                        <Label htmlFor='age' value='Your age:'/>
                        <input id='age' name='age' type='number' required onChange={this.handleChange}
                               value={this.state.age}/>
                    </div>

                    <div>
                        <input id='submit' name='submit' value='Submit form!' type='submit'/>
                    </div>
                    <div>
                        <ErrorMessage formErrors={this.state.formErrors}/>
                    </div>
                </fieldset>
            </form>
        )
    }
}

export default Form;