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
            {/* <h2>Unions</h2> */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '50%' }}>
                    {unionBox.map(union => (
                        <div key={union.id} style={{ width: '35%', boxSizing: 'border-box', padding: '10px' }}>
                            <UnionBox
                                id={union.id}
                                union_name={union.union_name}
                                employees={union.employees}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Trades;


