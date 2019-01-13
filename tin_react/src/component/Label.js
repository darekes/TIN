import React from "react";
import PropTypes from "prop-types";

class Label extends React.Component {
    render() {
        return (
            <label htmlFor={this.props.htmlFor}>{this.props.value}</label>
        )
    }
}
Label.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
};
export default Label;