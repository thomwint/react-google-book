import React from "react";

export function DeleteBtn(props) {
    return (
        <button className="delete-btn" {...props}>
            Delete
        </button>
    );
}

export function ViewBtn(props) {
    return (
        <button className="view-btn" {...props}>
            View
      </button>
    );
}

export function SaveBtn(props) {
    return (
        <button className="save-btn" {...props}>
            Save
        </button>
    )
}