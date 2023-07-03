import React from "react";

class UserClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.name + ' - child constructor');
    }
    componentDidMount() {
        console.log(this.props.name + ' - Child Component Did Mount');
    }
    componentWillUnmount() {
        console.log('component will unmount called');
    }
    render() {
        console.log(this.props.name + ' - child render');
        const {avatar_url, name, location, contact} = this.props;
        return (
            <div className="user-card">
                <img src={avatar_url} />
                <h2>Name: {name}</h2>
                <h2>Location: {location}</h2>
                <h2>Contact: {contact}</h2>
            </div>
        );
    }
}

export default UserClass;
