import React from 'react';

interface ITotalOrderProps {
    head: string,
    total: number
}
const TotalOrderInfo = ({ total, head}: ITotalOrderProps) => {
    return (
        <div>
            <p className='text text_type_main-medium'>{head}</p>
            <p className='text text_type_digits-large'>{total}</p>
        </div>
    );
};

export default TotalOrderInfo;
