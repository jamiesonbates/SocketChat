import React from 'react';
import moment from 'moment';

import './BookmarksPre.scss';

const BookmarksPre = ({ recentBookmarks }) => {
  console.log(recentBookmarks);
  return (
    <div className="DefaultMain-recent-container">
      <h3>Recent Bookmarks</h3>
      {
        recentBookmarks ?
          recentBookmarks.map((bookmark, i) => (
            <div key={i} className="BookmarksPre-bookmark">
              <p>
                {bookmark.first_name} {bookmark.last_name[0]}: {bookmark.message}
              </p>
              <p>{moment(bookmark).format('M/D/YY')}</p>
            </div>
          ))
        : null
      }
    </div>
  )
}

export default BookmarksPre;
