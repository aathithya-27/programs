import { WorkoutProgram, Exercise, FitnessGoal, FitnessLevel } from '../types';

export const exercises: Exercise[] = [
  // Strength Exercises
  {
    id: 'ex_001',
    name: 'Push-ups',
    category: 'strength',
    sets: 3,
    reps: '10-15',
    restTime: 60,
    instructions: [
      'Start in a plank position with hands slightly wider than shoulders',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep your core tight throughout the movement'
    ],
    muscleGroups: ['chest', 'shoulders', 'triceps', 'core'],
    equipment: ['bodyweight'],
    animationUrl: 'https://example.com/animations/pushups.gif'
  },
  {
    id: 'ex_002',
    name: 'Squats',
    category: 'compound',
    sets: 3,
    reps: '12-20',
    restTime: 90,
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting back into a chair',
      'Keep your chest up and knees behind toes',
      'Return to starting position by driving through heels'
    ],
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings', 'core'],
    equipment: ['bodyweight'],
    animationUrl: 'https://example.com/animations/squats.gif'
  },
  {
    id: 'ex_003',
    name: 'Plank',
    category: 'core',
    sets: 3,
    reps: '30-60 seconds',
    restTime: 60,
    instructions: [
      'Start in a push-up position',
      'Lower onto your forearms',
      'Keep your body in a straight line from head to heels',
      'Hold the position while breathing normally'
    ],
    muscleGroups: ['core', 'shoulders', 'back'],
    equipment: ['bodyweight'],
    animationUrl: 'https://example.com/animations/plank.gif'
  },
  {
    id: 'ex_004',
    name: 'Burpees',
    category: 'cardio',
    sets: 3,
    reps: '8-12',
    restTime: 90,
    instructions: [
      'Start standing, then squat down and place hands on floor',
      'Jump feet back into plank position',
      'Do a push-up (optional)',
      'Jump feet back to squat position',
      'Jump up with arms overhead'
    ],
    muscleGroups: ['full body'],
    equipment: ['bodyweight'],
    animationUrl: 'https://example.com/animations/burpees.gif'
  },
  {
    id: 'ex_005',
    name: 'Lunges',
    category: 'strength',
    sets: 3,
    reps: '10-12 each leg',
    restTime: 60,
    instructions: [
      'Stand with feet hip-width apart',
      'Step forward with one leg, lowering hips',
      'Both knees should be at 90-degree angles',
      'Push back to starting position',
      'Repeat with other leg'
    ],
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings', 'calves'],
    equipment: ['bodyweight'],
    animationUrl: 'https://example.com/animations/lunges.gif'
  },
  {
    id: 'ex_006',
    name: 'Mountain Climbers',
    category: 'cardio',
    sets: 3,
    reps: '30 seconds',
    restTime: 45,
    instructions: [
      'Start in plank position',
      'Bring one knee toward chest',
      'Quickly switch legs',
      'Continue alternating at a fast pace',
      'Keep core engaged throughout'
    ],
    muscleGroups: ['core', 'shoulders', 'legs'],
    equipment: ['bodyweight'],
    animationUrl: 'https://example.com/animations/mountain_climbers.gif'
  },
  {
    id: 'ex_007',
    name: 'Jumping Jacks',
    category: 'cardio',
    sets: 3,
    reps: '30 seconds',
    restTime: 30,
    instructions: [
      'Stand with feet together, arms at sides',
      'Jump while spreading legs shoulder-width apart',
      'Simultaneously raise arms overhead',
      'Jump back to starting position',
      'Maintain a steady rhythm'
    ],
    muscleGroups: ['full body'],
    equipment: ['bodyweight'],
    animationUrl: 'https://example.com/animations/jumping_jacks.gif'
  },
  {
    id: 'ex_008',
    name: 'Dumbbell Rows',
    category: 'strength',
    sets: 3,
    reps: '10-12',
    restTime: 90,
    instructions: [
      'Hold dumbbells with arms extended',
      'Hinge at hips, keeping back straight',
      'Pull dumbbells to your ribs',
      'Squeeze shoulder blades together',
      'Lower with control'
    ],
    muscleGroups: ['back', 'biceps', 'rear delts'],
    equipment: ['dumbbells'],
    animationUrl: 'https://example.com/animations/dumbbell_rows.gif'
  },
  {
    id: 'ex_009',
    name: 'Bicycle Crunches',
    category: 'core',
    sets: 3,
    reps: '15-20 each side',
    restTime: 45,
    instructions: [
      'Lie on back with hands behind head',
      'Bring knees to 90-degree angle',
      'Bring right elbow to left knee',
      'Switch sides in cycling motion',
      'Keep core engaged throughout'
    ],
    muscleGroups: ['core', 'obliques'],
    equipment: ['bodyweight'],
    animationUrl: 'https://example.com/animations/bicycle_crunches.gif'
  },
  {
    id: 'ex_010',
    name: 'Wall Sit',
    category: 'strength',
    sets: 3,
    reps: '30-60 seconds',
    restTime: 90,
    instructions: [
      'Stand with back against wall',
      'Slide down until thighs are parallel to floor',
      'Keep knees at 90-degree angle',
      'Hold position while breathing normally',
      'Keep core engaged'
    ],
    muscleGroups: ['quadriceps', 'glutes', 'core'],
    equipment: ['wall'],
    animationUrl: 'https://example.com/animations/wall_sit.gif'
  }
];

export const workoutPrograms: WorkoutProgram[] = [
  // Weight Loss Programs
  {
    id: 'prog_001',
    name: 'Fat Burn Beginner',
    goal: 'weight_loss',
    level: 'beginner',
    duration: 12,
    description: 'A comprehensive 12-week program designed for beginners to lose weight through cardio and basic strength training.',
    workouts: [
      {
        id: 'workout_001',
        name: 'Full Body Cardio',
        day: 1,
        week: 1,
        estimatedDuration: 30,
        exercises: [
          exercises.find(e => e.id === 'ex_007')!, // Jumping Jacks
          exercises.find(e => e.id === 'ex_004')!, // Burpees
          exercises.find(e => e.id === 'ex_006')!, // Mountain Climbers
          exercises.find(e => e.id === 'ex_002')!, // Squats
          exercises.find(e => e.id === 'ex_003')!, // Plank
        ]
      },
      {
        id: 'workout_002',
        name: 'Upper Body Strength',
        day: 3,
        week: 1,
        estimatedDuration: 25,
        exercises: [
          exercises.find(e => e.id === 'ex_001')!, // Push-ups
          exercises.find(e => e.id === 'ex_008')!, // Dumbbell Rows
          exercises.find(e => e.id === 'ex_003')!, // Plank
          exercises.find(e => e.id === 'ex_009')!, // Bicycle Crunches
        ]
      },
      {
        id: 'workout_003',
        name: 'Lower Body Power',
        day: 5,
        week: 1,
        estimatedDuration: 30,
        exercises: [
          exercises.find(e => e.id === 'ex_002')!, // Squats
          exercises.find(e => e.id === 'ex_005')!, // Lunges
          exercises.find(e => e.id === 'ex_010')!, // Wall Sit
          exercises.find(e => e.id === 'ex_006')!, // Mountain Climbers
        ]
      }
    ]
  },
  {
    id: 'prog_002',
    name: 'HIIT Fat Burner',
    goal: 'weight_loss',
    level: 'intermediate',
    duration: 12,
    description: 'High-intensity interval training program for faster fat loss and improved cardiovascular fitness.',
    workouts: [
      {
        id: 'workout_004',
        name: 'HIIT Circuit A',
        day: 1,
        week: 1,
        estimatedDuration: 35,
        exercises: [
          exercises.find(e => e.id === 'ex_004')!, // Burpees
          exercises.find(e => e.id === 'ex_006')!, // Mountain Climbers
          exercises.find(e => e.id === 'ex_007')!, // Jumping Jacks
          exercises.find(e => e.id === 'ex_002')!, // Squats
          exercises.find(e => e.id === 'ex_001')!, // Push-ups
        ]
      }
    ]
  },
  // Weight Gain Programs
  {
    id: 'prog_003',
    name: 'Lean Mass Builder',
    goal: 'weight_gain',
    level: 'beginner',
    duration: 12,
    description: 'Build lean muscle mass with progressive strength training and proper nutrition guidance.',
    workouts: [
      {
        id: 'workout_005',
        name: 'Upper Body Mass',
        day: 1,
        week: 1,
        estimatedDuration: 45,
        exercises: [
          exercises.find(e => e.id === 'ex_001')!, // Push-ups
          exercises.find(e => e.id === 'ex_008')!, // Dumbbell Rows
          exercises.find(e => e.id === 'ex_003')!, // Plank
        ]
      },
      {
        id: 'workout_006',
        name: 'Lower Body Mass',
        day: 3,
        week: 1,
        estimatedDuration: 45,
        exercises: [
          exercises.find(e => e.id === 'ex_002')!, // Squats
          exercises.find(e => e.id === 'ex_005')!, // Lunges
          exercises.find(e => e.id === 'ex_010')!, // Wall Sit
        ]
      }
    ]
  },
  // Bulking Programs
  {
    id: 'prog_004',
    name: 'Power Bulking',
    goal: 'bulking',
    level: 'advanced',
    duration: 12,
    description: 'Advanced bulking program for serious muscle and strength gains.',
    workouts: [
      {
        id: 'workout_007',
        name: 'Heavy Compound Day',
        day: 1,
        week: 1,
        estimatedDuration: 60,
        exercises: [
          exercises.find(e => e.id === 'ex_002')!, // Squats
          exercises.find(e => e.id === 'ex_001')!, // Push-ups
          exercises.find(e => e.id === 'ex_008')!, // Dumbbell Rows
        ]
      }
    ]
  },
  // Abs Cutting Programs
  {
    id: 'prog_005',
    name: 'Core Shredder',
    goal: 'abs_cutting',
    level: 'intermediate',
    duration: 12,
    description: 'Intensive core-focused program to build defined abs and lose belly fat.',
    workouts: [
      {
        id: 'workout_008',
        name: 'Core Blast',
        day: 1,
        week: 1,
        estimatedDuration: 30,
        exercises: [
          exercises.find(e => e.id === 'ex_003')!, // Plank
          exercises.find(e => e.id === 'ex_009')!, // Bicycle Crunches
          exercises.find(e => e.id === 'ex_006')!, // Mountain Climbers
          exercises.find(e => e.id === 'ex_004')!, // Burpees
        ]
      }
    ]
  },
  // Maintenance Programs
  {
    id: 'prog_006',
    name: 'Fitness Maintenance',
    goal: 'maintenance',
    level: 'intermediate',
    duration: 12,
    description: 'Balanced program to maintain current fitness level and overall health.',
    workouts: [
      {
        id: 'workout_009',
        name: 'Full Body Maintenance',
        day: 1,
        week: 1,
        estimatedDuration: 40,
        exercises: [
          exercises.find(e => e.id === 'ex_002')!, // Squats
          exercises.find(e => e.id === 'ex_001')!, // Push-ups
          exercises.find(e => e.id === 'ex_005')!, // Lunges
          exercises.find(e => e.id === 'ex_003')!, // Plank
          exercises.find(e => e.id === 'ex_007')!, // Jumping Jacks
        ]
      }
    ]
  }
];

export const getWorkoutsByGoal = (goal: FitnessGoal): WorkoutProgram[] => {
  return workoutPrograms.filter(program => program.goal === goal);
};

export const getWorkoutsByLevel = (level: FitnessLevel): WorkoutProgram[] => {
  return workoutPrograms.filter(program => program.level === level);
};

export const getWorkoutProgram = (id: string): WorkoutProgram | undefined => {
  return workoutPrograms.find(program => program.id === id);
};

export const getExercise = (id: string): Exercise | undefined => {
  return exercises.find(exercise => exercise.id === id);
};