import React from 'react';

class InfiniteScroll extends React.Component {
  constructor(props) {
    super(props);
    window.addEventListener('scroll', () => {
      if ((document.documentElement.clientHeight + window.scrollY) > (document.body.offsetHeight - 200) && this.props.shouldListen) {
        this.props.handleAction();
      }
    });
  }

  render() {
    return (
      <div className='infinite-scroll'>
        {this.props.children}
      </div>
    )
  }
}

export default InfiniteScroll;
