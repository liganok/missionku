import React from 'react';
import AddMission from './AddMission';
//import {Button} from 'reactstrap';


class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag:false
    };
  }

  handleSaved(){
    this.setState({updateFlag:true});
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Test;