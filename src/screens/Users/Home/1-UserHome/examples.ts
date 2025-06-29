import { IUserWorkoutsLog } from '@hooks/authTypes'

const cachedUserWorkoutsLog = {
  workoutExerciseId: '6glzSuA3w2jzvNoJOCjM',
  workoutExerciseSets: [
    {
      repetitionData: [
        {
          isReps: false,
          isTime: true,
          sets_insensitive: '10m',
          timeInSeconds: 600,
          createdAt: 1751129241045,
          updatedAt: 1751129241045,
        },
      ],
      selectedRepetitionData: {
        checkedSet: '',
        createdAt: 1751129241045,
        updatedAt: 1751129241045,
      },
      restTimeData: {
        restTimeNumber: 0,
        restTime_insensitive: {
          us: 'No rest',
          'pt-br': 'Sem descanso',
        },
        createdAt: 1751129241045,
        updatedAt: 1751129241045,
      },
      weightData: {
        value: '2',
        createdAt: 1751129269126,
        updatedAt: 1751129269126,
      },
      completedData: {
        isCompleted: true,
        createdAt: 1751129241045,
        updatedAt: 1751129270542,
      },
      createdAt: 1751129241045,
      updatedAt: 1751129270542,
    },
  ],
  workoutExerciseIndex: 0,
  createdAt: 1751129241045, // Sat Jun 28 2025 13:47:21 GMT-0300 (Brasilia Standard Time)
  updatedAt: 1751129270542,
  notes: {
    value: '',
    createdAt: 1751129241045,
    updatedAt: 1751129241045,
  },
}

const myWorkout = {
  userId: 'VvKxOEHwZHcf7RtREHAmOntyUZr1',
  createdAt: 1751129215769, // Sat Jun 28 2025 13:46:55 GMT-0300 (Brasilia Standard Time)
  updatedAt: 1751129215769,
  data: [
    {
      id: 'dU0X0ngICeeqD0gOL5hn',
      data: {
        workoutId: 'dU0X0ngICeeqD0gOL5hn',
        workoutsUniquesTypes: [
          'machineEquipament',
          'pulleyEquipament',
          'freeEquipament',
        ],
        workoutPeriod: {
          period_insensitive: {
            'pt-br': '8 semanas',
            us: '8 weeks',
          },
          periodNumber: 8,
        },
        workoutLevel: {
          'pt-br': 'intermediário',
          us: 'intermediate',
        },
        workoutCategoryId: 'ygo29Kg2BMhbXUl4UtxQ',
        workoutCategoryName: {
          'pt-br': 'Emagrecimento',
          us: 'Fat loss',
        },
        workoutsUniquesFilters: {
          pulleyHandles: [
            {
              'pt-br': 'barra curvada tríceps',
              us: 'tricep straight bar',
            },
            {
              'pt-br': 'corda',
              us: 'rope',
            },
            {
              'pt-br': 'barra reta tríceps',
              us: 'tricep straight bar',
            },
            {
              us: 'stirrup handle pulldown',
              'pt-br': 'puxador estribo',
            },
          ],
          weight: [
            {
              us: 'weight plate',
              'pt-br': 'anilha',
            },
            {
              'pt-br': 'halter',
              us: 'dumbbell',
            },
          ],
          bar: [
            {
              'pt-br': 'barra reta',
              us: 'straight bar',
            },
          ],
          bench: [
            {
              us: 'flat bench',
              'pt-br': 'banco reto',
            },
            {
              us: 'incline bench',
              'pt-br': 'banco inclinado',
            },
          ],
          pulley: [
            {
              us: 'high pulley with seat',
              'pt-br': 'polia alta com assento',
            },
            {
              'pt-br': 'polia baixa com assento',
              us: 'low pulley with seat',
            },
            {
              us: 'low pulley',
              'pt-br': 'polia baixa',
            },
            {
              'pt-br': 'polia alta',
              us: 'high pulley',
            },
          ],
          other: [
            {
              'pt-br': 'step',
              us: 'step',
            },
            {
              'pt-br': 'peso do corpo',
              us: 'bodyweight',
            },
          ],
          machine: [
            {
              'pt-br': 'esteira',
              us: 'treadmill',
            },
            {
              us: 'leg press machine',
              'pt-br': 'leg press',
            },
            {
              us: 'leg extension machine',
              'pt-br': 'cadeira extensora',
            },
            {
              'pt-br': 'cadeira flexora',
              us: 'leg curl machine',
            },
            {
              'pt-br': 'smith',
              us: 'smith machine',
            },
            {
              'pt-br': 'panturrilha sentado',
              us: 'seated calf raise',
            },
            {
              us: 'incline treadmill',
              'pt-br': 'esteira inclinada',
            },
            {
              'pt-br': 'supino reto',
              us: 'flat chest press machine',
            },
            {
              us: 'lying leg curl machine',
              'pt-br': 'mesa flexora',
            },
            {
              'pt-br': 'cadeira abdutora',
              us: 'abductor machine',
            },
            {
              us: 'adductor machine',
              'pt-br': 'cadeira adutora',
            },
          ],
        },
        workoutGender: {
          'pt-br': 'feminino',
          us: 'female',
        },
        workoutsUniquesMuscles: [
          {
            'pt-br': 'cardio',
            us: 'cardio',
          },
          {
            'pt-br': 'costas',
            us: 'back',
          },
          {
            us: 'biceps',
            'pt-br': 'bíceps',
          },
          {
            'pt-br': 'pernas',
            us: 'legs',
          },
          {
            us: 'calf',
            'pt-br': 'panturrilha',
          },
          {
            us: 'chest',
            'pt-br': 'peitoral',
          },
          {
            'pt-br': 'tríceps',
            us: 'triceps',
          },
          {
            'pt-br': 'glúteos',
            us: 'glutes',
          },
        ],
        workoutGoal: {
          'pt-br': 'emagrecimento',
          us: 'weight loss',
        },
        workoutName: {
          us: 'Burns Fast',
          'pt-br': 'Queima Rápida',
        },
        workoutActive: true,
        myfitflowWorkoutsId: 'dU0X0ngICeeqD0gOL5hn',
        updatedAt: {
          seconds: 1749694162,
          nanoseconds: 55000000,
        },
        workoutByWeek: {
          sessionsByWeek_insensitive: {
            us: '4 workouts',
            'pt-br': '4 treinos',
          },
          sessionsByWeekNumber: 4,
        },
        workoutMuscleFocus: [
          {
            us: 'balanced',
            'pt-br': 'equilibrado',
          },
        ],
        createdAt: {
          seconds: 1749694162,
          nanoseconds: 55000000,
        },
        workoutDivision: {
          division: 'A, B, C, D',
          divisionNumber: 4,
        },
        workoutCardPhoto: {
          photoFileName: '1749693972649',
          photoFilePath:
            'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsCategories%2Fygo29Kg2BMhbXUl4UtxQ%2Fworkouts%2FdU0X0ngICeeqD0gOL5hn%2FworkoutsImages%2F1749693972649.png?alt=media&token=6ab3832b-59fd-4c01-8ad5-410c6132b0ff',
          photoMIME: '.png',
        },
        workoutTime: {
          timeBySession_insensitive: {
            'pt-br': '1h',
            us: '1h',
          },
          timeBySessionRangeNumber: [60],
        },
        workoutDescription: {
          us: 'Dynamic workout with minimal rest to burn fat',
          'pt-br': 'Treino dinâmico com pouco descanso para secar',
        },
      },
      createdAt: 1751129215769,
      updatedAt: 1751129215769,
      isShared: false,
      isActive: true,
      isExpired: false,
      isCopied: false,
    },
  ],
  activeData: [
    {
      id: 'dU0X0ngICeeqD0gOL5hn',
      createdAt: 1751129215769,
      updatedAt: 1751129215769,
      workoutStartAt: 1751129215769,
      workoutEndsAt: 1755967615769,
    },
  ],
  expiredData: [],
  mySharedWorkouts: [],
  copiedWorkouts: [],
}

/* 

Ao selecionar o Treino ele cria o MyWorkout
o primeiro active [0]


Ao interagir com o  Treino ele armazena em cache 

usando a createdAt do activeWorkout[0] ( o que ta disponivel)

quando eu vou avancando no treino selecionado ele usa o createdAt
e vai atualizando o cache do 

*/
const t1 = [
  {
    workoutCardsLogData: [
      {
        cardIndex: 0,
        weightDoneLogs: [
          {
            workoutExerciseId: '6glzSuA3w2jzvNoJOCjM',
            workoutExerciseSets: [
              {
                repetitionData: [
                  {
                    isReps: false,
                    isTime: true,
                    sets_insensitive: '10m',
                    timeInSeconds: 600,
                    createdAt: 1751211159307,
                    updatedAt: 1751211159307,
                  },
                ],
                selectedRepetitionData: {
                  checkedSet: '',
                  createdAt: 1751211159307,
                  updatedAt: 1751211159307,
                },
                restTimeData: {
                  restTimeNumber: 0,
                  restTime_insensitive: {
                    'pt-br': 'Sem descanso',
                    us: 'No rest',
                  },
                  createdAt: 1751211159307,
                  updatedAt: 1751211159307,
                },
                weightData: {
                  value: '12',
                  createdAt: 1751211164240,
                  updatedAt: 1751211164240,
                },
                completedData: {
                  isCompleted: true,
                  createdAt: 1751211159307,
                  updatedAt: 1751211165314,
                },
                createdAt: 1751211159307,
                updatedAt: 1751211165314,
              },
            ],
            workoutExerciseIndex: 0,
            createdAt: 1751211159307,
            updatedAt: 1751211165314,
            notes: {
              value: '',
              createdAt: 1751211159307,
              updatedAt: 1751211159307,
            },
          },
        ],
        totalSessionsCompleted: 1,
        updatedAt: 1751211165314,
        createdAt: 1751211165314,
        lastCompletedFormattedDay: {
          'pt-br': 'domingo',
          us: 'Sunday',
        },
        lastCompletedFormattedDate: '29/06/2025',
      },
    ],
    workoutId: 'dU0X0ngICeeqD0gOL5hn',
    createdAt: 1751211165314,
    updatedAt: 1751211165314,
  },
]

const t2 = [
  {
    workoutCardsLogData: [
      {
        cardIndex: 0,
        weightDoneLogs: [
          {
            workoutExerciseId: '6glzSuA3w2jzvNoJOCjM',
            workoutExerciseSets: [
              {
                repetitionData: [
                  {
                    isReps: false,
                    isTime: true,
                    sets_insensitive: '10m',
                    timeInSeconds: 600,
                    createdAt: 1751211372625,
                    updatedAt: 1751211372625,
                  },
                ],
                selectedRepetitionData: {
                  checkedSet: '',
                  createdAt: 1751211372625,
                  updatedAt: 1751211372625,
                },
                restTimeData: {
                  restTimeNumber: 0,
                  restTime_insensitive: {
                    'pt-br': 'Sem descanso',
                    us: 'No rest',
                  },
                  createdAt: 1751211372625,
                  updatedAt: 1751211372625,
                },
                weightData: {
                  value: '242',
                  createdAt: 1751211381120,
                  updatedAt: 1751211381120,
                },
                completedData: {
                  isCompleted: true,
                  createdAt: 1751211372625,
                  updatedAt: 1751211384712,
                },
                createdAt: 1751211372625,
                updatedAt: 1751211384712,
              },
            ],
            workoutExerciseIndex: 0,
            createdAt: 1751211372625,
            updatedAt: 1751211384712,
            notes: {
              value: '',
              createdAt: 1751211372625,
              updatedAt: 1751211372625,
            },
          },
        ],
        totalSessionsCompleted: 1,
        updatedAt: 1751211384712,
        createdAt: 1751211384712,
        lastCompletedFormattedDay: {
          'pt-br': 'domingo',
          us: 'Sunday',
        },
        lastCompletedFormattedDate: '29/06/2025',
      },
    ],
    workoutId: 'LEbuugzMv76LJIl6tluK',
    createdAt: 1751211384712,
    updatedAt: 1751211384712,
  },
]

const t3 = [
  {
    workoutCardsLogData: [
      {
        cardIndex: 0,
        weightDoneLogs: [
          {
            workoutExerciseId: '6glzSuA3w2jzvNoJOCjM',
            workoutExerciseSets: [
              {
                repetitionData: [
                  {
                    isReps: false,
                    isTime: true,
                    sets_insensitive: '10m',
                    timeInSeconds: 600,
                    createdAt: 1751211529567,
                    updatedAt: 1751211529567,
                  },
                ],
                selectedRepetitionData: {
                  checkedSet: '',
                  createdAt: 1751211529567,
                  updatedAt: 1751211529567,
                },
                restTimeData: {
                  restTimeNumber: 0,
                  restTime_insensitive: {
                    'pt-br': 'Sem descanso',
                    us: 'No rest',
                  },
                  createdAt: 1751211529567,
                  updatedAt: 1751211529567,
                },
                weightData: {
                  value: '65',
                  createdAt: 1751211535299,
                  updatedAt: 1751211535299,
                },
                completedData: {
                  isCompleted: true,
                  createdAt: 1751211529567,
                  updatedAt: 1751211536496,
                },
                createdAt: 1751211529567,
                updatedAt: 1751211536496,
              },
            ],
            workoutExerciseIndex: 0,
            createdAt: 1751211529567,
            updatedAt: 1751211536496,
            notes: {
              value: '',
              createdAt: 1751211529567,
              updatedAt: 1751211529567,
            },
          },
        ],
        totalSessionsCompleted: 1,
        updatedAt: 1751211536496,
        createdAt: 1751211536496,
        lastCompletedFormattedDay: {
          'pt-br': 'domingo',
          us: 'Sunday',
        },
        lastCompletedFormattedDate: '29/06/2025',
      },
    ],
    workoutId: 'dU0X0ngICeeqD0gOL5hn',
    createdAt: 1751211536496,
    updatedAt: 1751211536496,
  },
]

const ttudo: IUserWorkoutsLog = {
  workoutsLog: [
    {
      workoutCardsLogData: [
        {
          cardIndex: 0,
          weightDoneLogs: [
            {
              workoutExerciseId: '6glzSuA3w2jzvNoJOCjM',
              workoutExerciseSets: [
                {
                  repetitionData: [
                    {
                      isReps: false,
                      isTime: true,
                      sets_insensitive: '10m',
                      timeInSeconds: 600,
                      createdAt: 1751211529567,
                      updatedAt: 1751211529567,
                    },
                  ],
                  selectedRepetitionData: {
                    checkedSet: '',
                    createdAt: 1751211529567,
                    updatedAt: 1751211529567,
                  },
                  restTimeData: {
                    restTimeNumber: 0,
                    restTime_insensitive: {
                      'pt-br': 'Sem descanso',
                      us: 'No rest',
                    },
                    createdAt: 1751211529567,
                    updatedAt: 1751211529567,
                  },
                  weightData: {
                    value: '65',
                    createdAt: 1751211535299,
                    updatedAt: 1751211535299,
                  },
                  completedData: {
                    isCompleted: true,
                    createdAt: 1751211529567,
                    updatedAt: 1751211536496,
                  },
                  createdAt: 1751211529567,
                  updatedAt: 1751211536496,
                },
              ],
              workoutExerciseIndex: 0,
              createdAt: 1751211529567,
              updatedAt: 1751211536496,
              notes: {
                value: '',
                createdAt: 1751211529567,
                updatedAt: 1751211529567,
              },
            },
          ],
          totalSessionsCompleted: 1,
          updatedAt: 1751211536496,
          createdAt: 1751211536496,
          lastCompletedFormattedDay: {
            'pt-br': 'domingo',
            us: 'Sunday',
          },
          lastCompletedFormattedDate: '29/06/2025',
        },
      ],
      workoutId: 'dU0X0ngICeeqD0gOL5hn',
      createdAt: 1751211536496,
      updatedAt: 1751211536496,
    },
  ],
  userId: 'VvKxOEHwZHcf7RtREHAmOntyUZr1',
  createdAt: 1751211536496,
  updatedAt: 1751211536496,
}

const as = ttudo
