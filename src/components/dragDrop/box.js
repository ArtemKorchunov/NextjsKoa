import React, { Component } from 'react';
import { compose } from 'redux';
import {
    DragSource,
} from 'react-dnd';
import { DragDropTypes } from '../dragDropTypes';

const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}

const boxSource = {
    beginDrag(props) {
        return { name: props.name }
    },
    endDrag(props, monitor) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()

        if (dropResult) {
            alert(`You dropped ${item.name} into ${dropResult.name}!`)
        }
    }
}

class Box extends Component {
    render() {
        const { connectDragSource, isDragging, name } = this.props;
        const opacity = isDragging ? 0.4 : 1
        return (
            connectDragSource &&
            connectDragSource(<div style={{ ...style, opacity }}>{name}</div>)
        );
    }
}

export default compose(
    DragSource(
        DragDropTypes.BOX,
        boxSource,
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        })
    )
)(Box);