import React from 'react';

import './BookmarksPre.scss';

const BookmarksPre = ({ recentBookmarks }) => {
  return (
    <div className="DefaultMain-recent-container">
      <h3>Recent Bookmarks</h3>
      {
        recentBookmarks ?
          recentBookmarks.map((bookmark, i) => (
            <div className="BookmarksPre-bookmark">
              { bookmark.message }
            </div>
          ))
        : null
      }
    </div>
  )
}

export default BookmarksPre;
