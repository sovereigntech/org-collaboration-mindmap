// Data loading and management module
export let collaborationValues = [];
export let centerContent = {};

// Load data from JSON file
export async function loadData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    collaborationValues = data.values;
    centerContent = data.centerContent;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error loading data:', error);
    
    // Fallback to default data if JSON loading fails
    collaborationValues = [
      {
        id: 'method-mission',
        title: '📋 Method with Mission',
        position: 0,
        dailyWork: ['Working groups align activities with public benefit'],
        skills: ['Project management for mission alignment']
      }
    ];
    
    centerContent = {
      overview: {
        title: 'Collaboration Values Overview',
        description: 'This interactive visualization shows the core collaboration values.',
        instructions: 'Click on any value around the circle to explore:',
        features: ['How each value affects daily work', 'Skills needed to build collaboration']
      },
      values: {
        title: 'All Collaboration Values'
      }
    };
    
    return { success: false, error };
  }
} 