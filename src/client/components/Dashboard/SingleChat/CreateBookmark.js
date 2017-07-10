import React from 'react';
import FaClose from 'react-icons/lib/md/close';

class CreateBookmark extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: 11
    }

    this.handleSelection = this.handleSelection.bind(this);
    this.handleNewBookmark = this.handleNewBookmark.bind(this);
  }

  handleSelection(e) {
    this.setState({ selection: e.target.value });
  }

  handleNewBookmark() {
    const msgId = this.props.messageId;
    const catId = this.state.selection;

    this.props.bookmarkMsg({ msgId, catId });
    this.props.handleExitBookmarking();
  }

  render() {
    return (
      <div className="SingleChat-bookmark-form">
        <select onChange={this.handleSelection}>
          <option defaultValue={this.state.selection}>General</option>
          {
            this.props.categories.map((cat, i) =>
              <option
                value={cat.id}
                key={i}
                className="SingleChat-bookmark-option"
              >
                {cat.name}
              </option>
            )
          }
        </select>

        <button
          className="SingleChat-bookmark-btn"
          onClick={this.handleNewBookmark}>
          Bookmark with a category...
        </button>

        <FaClose
          onClick={this.props.handleExitBookmarking}
          className="SingleChat-bookmark-close"/>
      </div>
    )
  }
}

export default CreateBookmark;
