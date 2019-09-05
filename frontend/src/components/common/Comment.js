import React from 'react'


const Comment = ({user, createdAt, content, handledelete, _id}) => {
  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>USERNAME</strong>
            {' '}
            <small>{(new Date(createdAt)).toLocaleDateString()}</small>
            <hr className="linebreaker"/>
            {content}
          </p>
          <span className="title is-2 has-text-centered">
          </span>
        </div>
      </div>
      <div className="media-right">
        <button id={_id} onClick={handledelete} className="delete"></button>
      </div>
    </article>
  )
}

export default Comment
