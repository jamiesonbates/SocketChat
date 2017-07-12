import React from 'react';
import FaBookmark from 'react-icons/lib/ti/bookmark';
import moment from 'moment';

import './BookmarksPre.scss';

const BookmarksPre = ({ recentBookmarks, handleBookmarkClick }) => {
  return (
    <div className="DefaultMain-recent">
      <div className="DefaultMain-recent-header">
        <h3>Recent Bookmarks</h3>
      </div>
      {
        recentBookmarks ?
          recentBookmarks.map((bookmark, i) => (
            <div key={i} className="BookmarksPre-bookmark" onClick={handleBookmarkClick}>
              <div>
                <FaBookmark className="BookmarksPre-bookmark-icon "/>
                <p>
                  {bookmark.first_name} {bookmark.last_name[0]}: {bookmark.message}
                </p>
              </div>

              <div>
                <p>Bookmarked on: {moment(bookmark.starred_at).format('M/D/YY')}</p>
              </div>
            </div>
          ))
        : <div className="BookmarksPre-bookmark">
            <p>You haven't bookmarked any messages yet.</p>
          </div>
      }
    </div>
  )
}

export default BookmarksPre;
