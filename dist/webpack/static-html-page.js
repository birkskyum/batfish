//      
import React from 'react';

              
                       
                          
                          
                               
                               
                     
  

// This component is used by static-render-pages to create an HTML document.
class StaticHtmlPage extends React.Component        {
  // This should never be updated by React
  shouldComponentUpdate() {
    return false;
  }

  render() {
    let head = null;
    if (this.props.appendToHead) {
      head = (
        <head
          dangerouslySetInnerHTML={{
            __html: this.props.appendToHead.join('\n')
          }}
        />
      );
    }

    let appendToBody = null;
    if (this.props.appendToBody) {
      appendToBody = (
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.appendToBody.join('\n')
          }}
        />
      );
    }

    let app = <div id="batfish-content">{this.props.content}</div>;
    if (this.props.rawAppHtml) {
      app = (
        <div
          id="batfish-content"
          dangerouslySetInnerHTML={{ __html: this.props.rawAppHtml }}
        />
      );
    }

    return (
      <html lang="en" {...this.props.htmlAttributes}>
        {head}
        <body {...this.props.bodyAttributes}>
          {app}
          {appendToBody}
        </body>
      </html>
    );
  }
}

export { StaticHtmlPage };
