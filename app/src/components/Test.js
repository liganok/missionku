import React from 'react';
import AddMission from './AddMission';
import {Button} from 'reactstrap';


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
        <Button color="primary">primary</Button>{' '}
      </div>
    );
  }
}

export default Test;