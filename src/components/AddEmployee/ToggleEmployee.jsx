import React from "react";
import { useDispatch,  } from "react-redux";

const toggleEmployee = (props) =>{

const dispatch = useDispatch();

    const toggleStatus = () => {
    
        const updateStatus = props.emp.employee_status === true ? false : true;
        dispatch({
            type: "EMPLOYEE_TOGGLE_STATUS",
            payload:{id: props.emp.id, 
                employee_status: updateStatus}
                
        })
    }

    return(
        
        <button className='employee-toggle' onClick={toggleStatus}>
        {props.emp.employee_status === true ? 'Active' : 'Inactive'}
        </button>
    
    )
    }
    export default toggleEmployee;