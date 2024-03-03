type Skill = {
    difficulty: string;
    category: string;
  };
  
  function calculateConnectionValue(skills: Skill[]): number[] {
    const connectionValues: number[] = [];
  
    for (let i = 0; i < skills.length - 1; i++) {
      const substring = skills.slice(i, i + 2);
      const [firstSkill, secondSkill] = substring;
  
      // Check category for connection type
      const connectionType = (firstSkill.category === 'acro-bwd' || firstSkill.category === 'acro-fwd') && (secondSkill.category === 'acro-bwd' || secondSkill.category === 'acro-bwd') ? 'ACRO' : 'DANCE_MIXED';
  
      // Calculate connection value based on criteria
      let value = 0;
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
  
  // Example usage
  const skillsArray: Skill[] = [
    { difficulty: 'A', category: 'dance' },
    { difficulty: 'B', category: 'dance' },
    { difficulty: 'B', category: 'acro-bwd' },
    { difficulty: 'D', category: 'acro-bwd' },
    { difficulty: 'B', category: 'acro-bwd' },
  ];
  
console.log(calculateConnectionValue(skillsArray));
  