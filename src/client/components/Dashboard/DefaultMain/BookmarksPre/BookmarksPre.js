import React from 'react';

import './BookmarksPre.scss';

const BookmarksPre = ({ recentBookmarks }) => {
  console.log(recentBookmarks);
  return (
    <div>
      {
        recentBookmarks ?
          recentBookmarks.map((bookmark, i) => (
            <div>
              { bookmark.message }
            </div>
          ))
        : null
      }
    </div>
  )
}

export default BookmarksPre;
