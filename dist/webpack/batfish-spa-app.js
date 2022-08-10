//      
import React from 'react';
import ApplicationWrapper from 'batfish-internal/application-wrapper';

              
               
                                      
                 
   
  

export class BatfishSpaApp extends React.Component        {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const body = React.createElement(
      this.props.pageModule.component,
      this.props.pageModule.props
    );
    return <ApplicationWrapper>{body}</ApplicationWrapper>;
  }
}
