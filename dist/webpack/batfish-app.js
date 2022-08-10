//      
import React from 'react';
import { Router } from './router';
import ApplicationWrapper from 'batfish-internal/application-wrapper';

              
                       
               
                                      
                 
   
  

export class BatfishApp extends React.Component        {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <ApplicationWrapper>
        <Router
          startingPath={this.props.startingPath}
          startingComponent={this.props.pageModule.component}
          startingProps={this.props.pageModule.props}
        />
      </ApplicationWrapper>
    );
  }
}
