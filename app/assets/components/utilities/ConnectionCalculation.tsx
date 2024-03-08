type Skill = {
    difficulty: string;
    category: string;
  };
  
  export function calculateBeamCV(skills: Skill[]): number[] {
    const connectionValues: number[] = [];
    let value = 0;
    if(skills.length >=3) {
      for (let i = 0; i < skills.length - 1; i++) {
        const substringS = skills.slice(i, i + 2);
        const [firstSkill, secondSkill, thirdSkill] = substringS;
        if (firstSkill.difficulty != 'A' && secondSkill.difficulty != 'A' && thirdSkill.difficulty != 'A' &&
        (firstSkill.difficulty != 'B' || secondSkill.difficulty || 'B' && thirdSkill.difficulty != 'B'))
        value += 0.1
      }
    }
  
    for (let i = 0; i < skills.length - 1; i++) {
      const substring = skills.slice(i, i + 2);
      const [firstSkill, secondSkill] = substring;
      const connectionType = (firstSkill.category === 'acro-bwd' || firstSkill.category === 'acro-fwd') && (secondSkill.category === 'acro-bwd' || secondSkill.category === 'acro-bwd') ? 'ACRO' : 'DANCE_MIXED';
      
      if (connectionType === 'ACRO') {
        if ((firstSkill.difficulty === 'C' && secondSkill.difficulty === 'C') ||
            (firstSkill.difficulty === 'B' && secondSkill.difficulty === 'E') ||
            (firstSkill.difficulty === 'B' && secondSkill.difficulty === 'D' && firstSkill.category === 'acro-bwd' && secondSkill.category === 'acro-bwd')) {
          value += 0.1;
        } else if (((firstSkill.difficulty === 'C' || firstSkill.difficulty === 'D') &&
            (secondSkill.difficulty != 'A' && secondSkill.difficulty != 'B' && secondSkill.difficulty != 'C')) ||
            (firstSkill.difficulty === 'B' && secondSkill.difficulty === 'D' && firstSkill.category === 'acro-fwd' && secondSkill.category === 'acro-fwd') ||
            (firstSkill.difficulty === 'B' && secondSkill.difficulty === 'F')) {
          value += 0.2;
        }
      } else {
        if ((firstSkill.difficulty === 'C' && secondSkill.difficulty != 'A' && secondSkill.difficulty != 'B' && 
            (firstSkill.category === 'dance' || firstSkill.category === 'turn' && secondSkill.category === 'dance' || secondSkill.category === 'turn')) ||
            (firstSkill.difficulty === 'A' && secondSkill.difficulty === 'C' && firstSkill.category === 'turn' && secondSkill.category === 'turn') ||
            (firstSkill.difficulty === 'B' && secondSkill.difficulty === 'D' && (firstSkill.category === 'acro-fwd' || secondSkill.category === 'acro-fwd' ||
            firstSkill.category === 'acro-bwd' || secondSkill.category === 'acro-bwd' || firstSkill.category === 'mount' || secondSkill.category === 'mount'))) {
          value += 0.1;
        } else if ((firstSkill.difficulty === 'D' && (secondSkill.difficulty != 'A' && secondSkill.difficulty != 'B' && secondSkill.difficulty != 'C'))) {
          value += 0.2;
        }
      }
      connectionValues.push(value);
    }
    return connectionValues;
  }


  export function calculateBarsCV(skills: Skill[]): number[] {
    const connectionValues: number[] = [];
  
    for (let i = 0; i < skills.length - 1; i++) {
      const substring = skills.slice(i, i + 2);
      const [firstSkill, secondSkill] = substring;
    
      let value = 0;
      if ((firstSkill.difficulty === 'D' && (firstSkill.category === 'flight-s' || firstSkill.category === 'flight-lh') && 
            (secondSkill.difficulty != 'A' && secondSkill.difficulty != 'B') && secondSkill.category === 'flight-s') ||
            (firstSkill.difficulty === 'E' && secondSkill.difficulty === 'E' && (firstSkill.category === 'flight-s' || 
            firstSkill.category === 'flight-lh' || firstSkill.category === 'flight-hl' || secondSkill.category === 'flight-s' || 
            secondSkill.category === 'flight-lh' || secondSkill.category === 'flight-hl')) ||
            (firstSkill.difficulty === 'F' && secondSkill.difficulty === 'D' && ((firstSkill.category === 'flight-s' || 
            firstSkill.category === 'flight-lh' || firstSkill.category === 'flight-hl') && (secondSkill.category === 'flight-s' || 
            secondSkill.category === 'flight-lh' || secondSkill.category === 'flight-hl')))) {
          value += 0.2;
        } else if ((firstSkill.difficulty != 'A' && firstSkill.difficulty != 'B' && firstSkill.difficulty != 'C') &&
            (secondSkill.difficulty != 'A' && secondSkill.difficulty != 'B' && secondSkill.difficulty != 'C')) {
          value += 0.1;
        }
      connectionValues.push(value);
    }
    return connectionValues;
  }

  export function calculateFloorCV(skills: Skill[], i_or_d: string): number[] {
    const connectionValues: number[] = [];
    let value = 0;
  
    if (i_or_d === 'Indirect') {
      if ((skills.filter(skill => skill.difficulty === 'D').length === 2) ||
          (skills.filter(skill => skill.difficulty === 'C').length >= 1 && skills.filter(skill => skill.difficulty === 'E').length === 1) ||
          (skills.filter(skill => skill.difficulty === 'E').length === 1 && skills.filter(skill => skill.difficulty === 'A').length === 2)) {
        value += 0.2;
      } else if ((skills.filter(skill => skill.difficulty === 'D').length === 1 && skills.filter(skill => skill.difficulty === 'B' || skill.difficulty === 'C').length >= 1) ||
          (skills.filter(skill => skill.difficulty === 'D').length >= 1 && skills.filter(skill => skill.difficulty === 'A').length >= 2)) {
        value += 0.1;
      }
      
      connectionValues.push(value);
    } else {
      for (let i = 0; i < skills.length - 1; i++) {
        let value = 0;
        const substring = skills.slice(i, i + 2);
        const [firstSkill, secondSkill] = substring;
        const connectionType = (firstSkill.category === 'acro-f' || firstSkill.category === 'acro-h') && (secondSkill.category === 'acro-f' || secondSkill.category === 'acro-h') ? 'ACRO' : 
          (firstSkill.category === 'turn' && firstSkill.category === 'turn') ? 'TURN' : 'MIXED';
  
        if (connectionType === 'ACRO') {
          if (((firstSkill.difficulty === 'A' && secondSkill.difficulty === 'D') || (firstSkill.difficulty === 'D' && secondSkill.difficulty === 'A')) ||
              (firstSkill.difficulty === 'C' && secondSkill.difficulty === 'C')) {
            value += 0.1;
          } else if (((firstSkill.difficulty === 'A' && secondSkill.difficulty === 'E') || (firstSkill.difficulty === 'E' && secondSkill.difficulty === 'A')) ||
              ((firstSkill.difficulty === 'C' && secondSkill.difficulty === 'D') || (firstSkill.difficulty === 'D' && secondSkill.difficulty === 'C'))) {
            value += 0.2;
          }
        } else if (connectionType === 'TURN') {
          if ((firstSkill.difficulty === 'D' && secondSkill.difficulty === 'B') || (firstSkill.difficulty === 'B' && secondSkill.difficulty === 'D')) {
            value += 0.1;
          }
        } else {
          if ((firstSkill.difficulty === 'D' && secondSkill.difficulty === 'B' && ((firstSkill.category === 'acro-f' || firstSkill.category === 'acro-h') &&
            secondSkill.category === 'dance')) ||
            (firstSkill.difficulty === 'E' && secondSkill.difficulty === 'A' && ((firstSkill.category === 'acro-f' || firstSkill.category === 'acro-h') &&
            secondSkill.category === 'dance'))) {
          value += 0.1;
          }
        }
        connectionValues.push(value);
      }
    }
    return connectionValues;
  }