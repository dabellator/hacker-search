import React from 'react';

const List = ({ items }) => {

  return (
    <ul className='list'>
      {items.map(item => (
        <li className='list__item' key={item.objectID}>
          <a href={item.url}>{item.title || item.story_title}</a>
        </li>
      ))}
    </ul>
  )
}

export default List;
