import React from 'react'
import Auth from '../../lib/Auth'

const Comment = ({user, createdAt, content, handledelete, id}) => {
  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>Notes:</strong>
            {' '}
            <small>{(new Date(createdAt)).toLocaleDateString()}</small>
            {content}
          </p>
          <span className="title is-2 has-text-centered">
          </span>
        </div>
      </div>
      {Auth.isCurrentUser(user) && <div className="media-right">
        <button id={id} onClick={handledelete} className="delete"></button>
      </div>}
    </article>
  )
}

export default Comment
