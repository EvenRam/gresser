import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UnionBox from './UnionBox'; 

const Trades = () => {
    const dispatch = useDispatch();
    const unions = useSelector((state) => state.unionReducer);
    const unionBox = useSelector((state) => state.unionBoxReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_EMPLOYEE_UNION' });
        dispatch({ type: 'FETCH_UNIONS_WITH_EMPLOYEES' });
    }, [dispatch]);




    return (
        <>
            <h2>Unions</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {unionBox.map(union => (
                    <UnionBox
                        key={union.id}
                        id={union.id}
                        union_name={union.union_name}
                        employees={union.employees}
                    />
                ))}
            </div>
        </>
    );
};

export default Trades;


