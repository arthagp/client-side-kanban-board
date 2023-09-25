import React from 'react';

const Card = ({taskName}) => {
  return (
    <div className='max-w-[290px] p-2 m-2 bg-white shadow-md rounded-lg hover:bg-slate-200'>
      <p className='text-gray-700 text-sm'>
        {taskName}
      </p>
    </div>
  );
}

export default Card;
