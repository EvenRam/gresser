import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Trades = () => {
    const dispatch = useDispatch();
    const unions = useSelector((state) => state.unionReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_EMPLOYEE_UNION' });
        dispatch({ type: 'FETCH_UNIONS_WITH_EMPLOYEES' });
    }, [dispatch]);

    return (
        <>
            <h2>Union Boxes</h2>
            <div>
                {unions.map(union => (
                    <div key={union.id} style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
                        <h4>{union.union_name}</h4>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Trades;

