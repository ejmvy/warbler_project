import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage } from '../store/actions/messages';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    handleNewMessage = event => {
        event.preventDefault();
        this.props.postNewMessage(this.state.message);
        this.setState({ message: '' });
        this.props.history.push('/');
    };

    render() {
        return(
            <div className="row justify-content-md-center text-center">
                <div className="col-md-6">
                    <form className="newMessageForm" onSubmit={this.handleNewMessage}>
                        {this.props.errors.message && (
                            <div className='aler alert-danger'>{this.props.errors.message}</div>
                        )}
                        <input 
                            type="text" 
                            className='form-control'
                            id="newMessage"
                            value={this.state.message}
                            onChange={e => this.setState({ message: e.target.value })}
                        />
                        <button type='submit' className='messageBtn'>
                            Add my message!
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);