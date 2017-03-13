import React from 'react';
import AddMission from './AddMission';
import List from './List';


class Tasks extends React.Component {
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
        <AddMission type={'TASK'} onSaved={this.handleSaved.bind(this)}/>
        <List type={'TASK'} updateFlag={this.state.updateFlag}/>
      </div>
    );
  }
}

export default Tasks;