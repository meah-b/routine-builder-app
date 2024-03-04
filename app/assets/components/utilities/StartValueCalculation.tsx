import React, {useState} from 'react';
interface Props {
    skills: any[];
    connections: any[];
  };
  
  export default function StartValueCalculation(props: Props) {
    const {skills, connections} = props;
    const [startValue, setStartValue] = useState(0)
    


    return startValue;
  }


  