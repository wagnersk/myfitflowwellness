import { IMyWorkoutsData } from '@hooks/authTypes'

export const fakeMyWorkoutDataArray = {
  userId: 'bST2FN4W7sTLMlvWZlhPez288FD2',
  createdAt: 1743879325172,
  updatedAt: 1743879325172,
  data: [
    {
      id: 'HDSQsxAokDBbaTrDCA63',
      data: {
        workoutId: 'HDSQsxAokDBbaTrDCA63',
        workoutSequence: [
          { index: 0, label: 'Treino A' },
          { index: 1, label: 'Treino B' },
          { label: 'Treino C', index: 2 },
        ],
        workoutsData: [
          {
            index: 0,
            cardExerciseLabel: 'Treino A',
            cardExerciseData: [
              {
                workoutExerciseId: '5Wt7756IxvQZZIhjmyAp',
                workoutExerciseIndex: 0,
                workoutExerciseTechniqueTitle: {
                  'pt-br': 'Adicionar mais peso a cada série',
                  us: 'Add more weight to each set',
                },
                workoutExerciseTechniqueDescription: {
                  'pt-br':
                    'Aumentar progressivamente o peso em cada série do exercício.',
                  us: 'Progressively increase the weight in each set of the exercise.',
                },
                workoutExerciseName_insensitive: {
                  us: 'plate press',
                  'pt-br': 'anilha press',
                },
                workoutExerciseRepetition: '3x',
                isEnabled: true,
                workoutExercisePrimaryMuscleGroup: {
                  us: 'chest',
                  'pt-br': 'peitoral',
                },
                workoutExerciseSets: ['8', '8', '8'],
                workoutExerciseName: {
                  us: 'Plate press',
                  'pt-br': 'Anilha press',
                },
                workoutExerciseRestTimeNumber: 45,
                workoutExerciseTypes: 'freeEquipament',
                workoutExerciseFilters: {
                  bar: { us: null, 'pt-br': null },
                  weight: { 'pt-br': 'anilha', us: 'weight plate' },
                  other: { us: null, 'pt-br': null },
                  bench: { us: null, 'pt-br': null },
                  pulleyHandles: { 'pt-br': null, us: null },
                  pulley: { 'pt-br': null, us: null },
                  machine: { us: null, 'pt-br': null },
                },
                id: 'hiJT59cY1ZIHf3jwV7JX',
                workoutExerciseRestTime: { 'pt-br': '45 s', us: '45 s' },
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731638278452',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731638278452.mp4?alt=media&token=fa24ad5f-4969-46d8-8590-cfeb04fd38d6',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731638278452',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731638278452.jpeg?alt=media&token=54ede179-2047-4971-b2ff-152c37239cf4',
                workoutExerciseVideoSize: 45046,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: {
                  'pt-br': 'peitoral',
                  us: 'chest',
                },
              },
              {
                workoutExerciseRestTime: { us: '1 min', 'pt-br': '1 min' },
                workoutExerciseIndex: 1,
                workoutExerciseTechniqueDescription: { us: '', 'pt-br': '' },
                workoutExercisePrimaryMuscleGroup: {
                  'pt-br': 'peitoral',
                  us: 'chest',
                },
                workoutExerciseRepetition: '3x',
                workoutExerciseName_insensitive: {
                  us: 'flat bench press',
                  'pt-br': 'supino reto',
                },
                workoutExerciseFilters: {
                  weight: { 'pt-br': 'anilha', us: 'weight plate' },
                  pulleyHandles: { 'pt-br': null, us: null },
                  other: { us: null, 'pt-br': null },
                  bar: { us: 'straight bar', 'pt-br': 'barra reta' },
                  pulley: { 'pt-br': null, us: null },
                  bench: { 'pt-br': 'banco reto', us: 'flat bench' },
                  machine: { 'pt-br': null, us: null },
                },
                workoutExerciseName: {
                  'pt-br': 'Supino reto',
                  us: 'Flat bench press',
                },
                workoutExerciseId: 'zFwXucyG32HalMUz8XT6',
                workoutExerciseRestTimeNumber: 60,
                isEnabled: true,
                workoutExerciseSets: ['8', '8', '8'],
                workoutExerciseTypes: 'freeEquipament',
                id: 'pyhMnUK3QxLUeH7r93qx',
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731639917680',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731639917680.mp4?alt=media&token=799bba3f-6f7d-420c-95d2-e4491f7e8690',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731639917680',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731639917680.jpeg?alt=media&token=fc88b0a8-55dc-42b1-aa2f-7810fca45574',
                workoutExerciseVideoSize: 67188,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: {
                  'pt-br': 'peitoral',
                  us: 'chest',
                },
              },
              {
                isEnabled: true,
                workoutExerciseName_insensitive: {
                  'pt-br': 'tríceps francês barra w',
                  us: 'w-bar french press',
                },
                workoutExerciseTypes: 'freeEquipament',
                workoutExerciseSets: ['8', '8', '8'],
                workoutExerciseName: {
                  us: 'W-bar french press',
                  'pt-br': 'Tríceps francês barra w',
                },
                workoutExercisePrimaryMuscleGroup: {
                  'pt-br': 'tríceps',
                  us: 'triceps',
                },
                id: 'qnyVE5oEeQrGWU5nk06M',
                workoutExerciseRestTimeNumber: 90,
                workoutExerciseId: 'AyLzgudD0CvxoxZM4nRO',
                workoutExerciseIndex: 2,
                workoutExerciseFilters: {
                  other: { us: null, 'pt-br': null },
                  bar: { 'pt-br': 'barra w', us: 'w-bar' },
                  machine: { us: null, 'pt-br': null },
                  weight: { 'pt-br': 'anilha', us: 'weight plate' },
                  pulley: { us: null, 'pt-br': null },
                  bench: { us: 'flat bench', 'pt-br': 'banco reto' },
                  pulleyHandles: { us: null, 'pt-br': null },
                },
                workoutExerciseTechniqueDescription: { us: '', 'pt-br': '' },
                workoutExerciseRestTime: {
                  'pt-br': '1 min 30 s',
                  us: '1 min 30 s',
                },
                workoutExerciseRepetition: '3x',
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731647663372',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731647663372.mp4?alt=media&token=617c064a-9936-4e23-884c-3bb429b1e39d',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731647663372',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731647663372.jpeg?alt=media&token=481b2512-f6c3-45c5-84a7-4a78113309ec',
                workoutExerciseVideoSize: 28178,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: {
                  us: 'triceps',
                  'pt-br': 'tríceps',
                },
              },
              {
                workoutExerciseId: 'QU2PcoqtiRmrWOcVg6BA',
                workoutExerciseTypes: 'freeEquipament',
                workoutExerciseTechniqueDescription: { 'pt-br': '', us: '' },
                workoutExercisePrimaryMuscleGroup: {
                  us: 'triceps',
                  'pt-br': 'tríceps',
                },
                workoutExerciseRestTimeNumber: 120,
                isEnabled: true,
                workoutExerciseRestTime: { 'pt-br': '2 min', us: '2 min' },
                workoutExerciseIndex: 3,
                workoutExerciseName: {
                  'pt-br': 'Tríceps testa com barra pegada invertida',
                  us: 'Reverse grip barbell skull crushers',
                },
                workoutExerciseFilters: {
                  pulleyHandles: { us: null, 'pt-br': null },
                  bench: { 'pt-br': 'banco reto', us: 'flat bench' },
                  pulley: { us: null, 'pt-br': null },
                  machine: { us: null, 'pt-br': null },
                  other: { 'pt-br': null, us: null },
                  bar: { 'pt-br': 'barra reta', us: 'straight bar' },
                  weight: { us: 'weight plate', 'pt-br': 'anilha' },
                },
                workoutExerciseSets: ['5', '5', '5', '5'],
                workoutExerciseRepetition: '4x',
                workoutExerciseName_insensitive: {
                  us: 'reverse grip barbell skull crushers',
                  'pt-br': 'tríceps testa com barra pegada invertida',
                },
                id: 'WAQ3qhR2ROiJbxHES8kp',
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731647697816',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731647697816.mp4?alt=media&token=cf2158ed-f7da-4bc6-95c5-d930032e00c9',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731647697816',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731647697816.jpeg?alt=media&token=6bdf4270-a0b0-43df-9274-b48e660b0d9d',
                workoutExerciseVideoSize: 58923,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: {
                  'pt-br': 'tríceps',
                  us: 'triceps',
                },
              },
            ],
            cardExerciseUniquesMuscles: [
              { 'pt-br': 'peitoral', us: 'chest' },
              { us: 'triceps', 'pt-br': 'tríceps' },
            ],
          },
          {
            index: 1,
            cardExerciseLabel: 'Treino B',
            cardExerciseData: [
              {
                workoutExerciseRestTimeNumber: 60,
                workoutExerciseIndex: 0,
                workoutExerciseRestTime: { us: '1 min', 'pt-br': '1 min' },
                isEnabled: true,
                workoutExerciseSets: ['10', '10', '10'],
                workoutExercisePrimaryMuscleGroup: {
                  us: 'back',
                  'pt-br': 'costas',
                },
                workoutExerciseName: {
                  us: 'Front pulley with supinated grip',
                  'pt-br': 'Pulley frente pegada supinada',
                },
                workoutExerciseTechniqueDescription: { us: '', 'pt-br': '' },
                workoutExerciseName_insensitive: {
                  us: 'front pulley with supinated grip',
                  'pt-br': 'pulley frente pegada supinada',
                },
                id: 'iBhuAqxti7AYAzRpiBaU',
                workoutExerciseTypes: 'pulleyEquipament',
                workoutExerciseRepetition: '3x',
                workoutExerciseId: '0rWQOfeZlU6JqtsLHX94',
                workoutExerciseFilters: {
                  other: { 'pt-br': null, us: null },
                  weight: { us: null, 'pt-br': null },
                  pulley: {
                    us: 'high pulley with seat',
                    'pt-br': 'polia alta com assento',
                  },
                  bench: { us: null, 'pt-br': null },
                  machine: { 'pt-br': null, us: null },
                  pulleyHandles: {
                    us: 'tricep straight bar',
                    'pt-br': 'barra reta tríceps',
                  },
                  bar: { us: null, 'pt-br': null },
                },
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731727308441',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731727308441.mp4?alt=media&token=60dfb7e4-957f-4a47-8c58-ae2bbe775c30',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731727308441',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731727308441.jpeg?alt=media&token=0659b913-f692-4d3d-95a1-997763fe437d',
                workoutExerciseVideoSize: 32429,
                workoutExerciseMode: 'pulleyEquipament',
                workoutExerciseMuscleGroup: { us: 'back', 'pt-br': 'costas' },
              },
              {
                workoutExerciseName_insensitive: {
                  us: 'high pulldown with triangle',
                  'pt-br': 'puxada alta com triângulo',
                },
                workoutExerciseFilters: {
                  machine: { us: null, 'pt-br': null },
                  pulleyHandles: { 'pt-br': 'triângulo', us: 'triangle bar' },
                  pulley: {
                    'pt-br': 'polia alta com assento',
                    us: 'high pulley with seat',
                  },
                  bench: { us: null, 'pt-br': null },
                  other: { us: null, 'pt-br': null },
                  bar: { us: null, 'pt-br': null },
                  weight: { 'pt-br': null, us: null },
                },
                workoutExerciseId: 'Xh7JEJxgEVf1SG38v2Ia',
                workoutExerciseSets: ['10', '10', '10'],
                workoutExerciseName: {
                  us: 'High pulldown with triangle',
                  'pt-br': 'Puxada alta com triângulo',
                },
                workoutExerciseIndex: 1,
                isEnabled: true,
                workoutExerciseRestTime: { us: '1 min', 'pt-br': '1 min' },
                workoutExerciseTechniqueDescription: { us: '', 'pt-br': '' },
                workoutExerciseRestTimeNumber: 60,
                workoutExerciseTypes: 'pulleyEquipament',
                id: 'xBXgo4Ny0630x1owHh0p',
                workoutExerciseRepetition: '3x',
                workoutExercisePrimaryMuscleGroup: {
                  'pt-br': 'costas',
                  us: 'back',
                },
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731727635050',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731727635050.mp4?alt=media&token=74675bdb-7773-4d79-89f4-6d633297e222',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731727635050',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731727635050.jpeg?alt=media&token=4b3c2f42-e255-44b3-8c3a-89e2ed7f04dc',
                workoutExerciseVideoSize: 47015,
                workoutExerciseMode: 'pulleyEquipament',
                workoutExerciseMuscleGroup: { us: 'back', 'pt-br': 'costas' },
              },
              {
                workoutExerciseTechniqueDescription: { us: '', 'pt-br': '' },
                workoutExerciseName: {
                  'pt-br': 'Rosca com barra',
                  us: 'Barbell curl',
                },
                workoutExerciseFilters: {
                  pulleyHandles: { 'pt-br': null, us: null },
                  machine: { us: null, 'pt-br': null },
                  bench: { us: null, 'pt-br': null },
                  weight: { 'pt-br': 'anilha', us: 'weight plate' },
                  other: { us: null, 'pt-br': null },
                  pulley: { 'pt-br': null, us: null },
                  bar: { 'pt-br': 'barra reta', us: 'straight bar' },
                },
                workoutExerciseName_insensitive: {
                  'pt-br': 'rosca com barra',
                  us: 'barbell curl',
                },
                workoutExerciseRepetition: '4x',
                workoutExerciseId: 'XpWPFplx1Vf89WJTFbT6',
                id: '6TrSj7kSiSRjdyF41L8k',
                workoutExerciseTypes: 'freeEquipament',
                workoutExerciseSets: ['10', '10', '10', '10'],
                isEnabled: true,
                workoutExerciseIndex: 2,
                workoutExerciseRestTime: { 'pt-br': '2 min', us: '2 min' },
                workoutExercisePrimaryMuscleGroup: {
                  'pt-br': 'bíceps',
                  us: 'biceps',
                },
                workoutExerciseRestTimeNumber: 120,
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731650781835',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731650781835.mp4?alt=media&token=a6945087-1a94-4f69-bbc9-ad473b2f91d0',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731650781835',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731650781835.jpeg?alt=media&token=01321955-2f61-4bcf-9c8c-9158ee43f5d3',
                workoutExerciseVideoSize: 53573,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: { 'pt-br': 'bíceps', us: 'biceps' },
              },
              {
                workoutExerciseId: 'ReuWTUmkWXOFKoIZ2dPb',
                workoutExerciseName_insensitive: {
                  'pt-br': 'rosca concentrada',
                  us: 'concentration curl',
                },
                workoutExerciseRepetition: '3x',
                workoutExercisePrimaryMuscleGroup: {
                  us: 'biceps',
                  'pt-br': 'bíceps',
                },
                workoutExerciseFilters: {
                  other: { us: null, 'pt-br': null },
                  machine: { us: null, 'pt-br': null },
                  pulleyHandles: { 'pt-br': null, us: null },
                  bar: { us: null, 'pt-br': null },
                  pulley: { us: null, 'pt-br': null },
                  weight: { 'pt-br': 'halter', us: 'dumbbell' },
                  bench: { us: 'flat bench', 'pt-br': 'banco reto' },
                },
                isEnabled: true,
                workoutExerciseRestTimeNumber: 90,
                workoutExerciseSets: ['8', '8', '8'],
                workoutExerciseName: {
                  us: 'Concentration curl',
                  'pt-br': 'Rosca concentrada',
                },
                workoutExerciseTechniqueDescription: { 'pt-br': '', us: '' },
                id: 'RJU0Bg5FnOfhOzmMERlV',
                workoutExerciseRestTime: {
                  'pt-br': '1 min 30 s',
                  us: '1 min 30 s',
                },
                workoutExerciseTypes: 'freeEquipament',
                workoutExerciseIndex: 3,
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731652055852',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731652055852.mp4?alt=media&token=b342bfae-8d32-4c43-b277-cd6dae85255f',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731652055852',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731652055852.jpeg?alt=media&token=f43a6354-561d-4250-a855-7b6dd078ae59',
                workoutExerciseVideoSize: 47453,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: { 'pt-br': 'bíceps', us: 'biceps' },
              },
            ],
            cardExerciseUniquesMuscles: [
              { us: 'back', 'pt-br': 'costas' },
              { 'pt-br': 'bíceps', us: 'biceps' },
            ],
          },
          {
            index: 2,
            cardExerciseLabel: 'Treino C',
            cardExerciseData: [
              {
                id: 'zOoEP1SSMHaasivyEGF9',
                isEnabled: true,
                workoutExerciseId: 'gee99jvKngv0f5yo6xT3',
                workoutExerciseFilters: {
                  other: { us: null, 'pt-br': null },
                  bench: { us: null, 'pt-br': null },
                  weight: { 'pt-br': 'anilha', us: 'weight plate' },
                  machine: { us: null, 'pt-br': null },
                  bar: { us: 'straight bar', 'pt-br': 'barra reta' },
                  pulleyHandles: { us: null, 'pt-br': null },
                  pulley: { us: null, 'pt-br': null },
                },
                workoutExerciseName: {
                  us: 'Upright row with barbell',
                  'pt-br': 'Remada alta com barra',
                },
                workoutExercisePrimaryMuscleGroup: {
                  us: 'shoulders',
                  'pt-br': 'ombros',
                },
                workoutExerciseIndex: 0,
                workoutExerciseRestTimeNumber: 30,
                workoutExerciseRepetition: '3x',
                workoutExerciseTechniqueDescription: {
                  'pt-br': '10 min na esteira ou elíptico.',
                  us: '',
                },
                workoutExerciseName_insensitive: {
                  'pt-br': 'remada alta com barra',
                  us: 'upright row with barbell',
                },
                workoutExerciseTypes: 'freeEquipament',
                workoutExerciseTechniqueTitle: { 'pt-br': '', us: '' },
                workoutExerciseRestTime: { 'pt-br': '30 s', us: '30 s' },
                workoutExerciseSets: ['8', '8', '8'],
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731714104990',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731714104990.mp4?alt=media&token=699fc1d9-6428-43d3-88e4-256e918a2dc6',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731714104990',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731714104990.jpeg?alt=media&token=a8b78ac1-885f-4ad0-9fa1-aeaff4c007ad',
                workoutExerciseVideoSize: 26193,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: {
                  us: 'shoulders',
                  'pt-br': 'ombros',
                },
              },
              {
                workoutExerciseTechniqueDescription: { 'pt-br': '', us: '' },
                id: 'p7sOD7D2nT7wCNwAJJag',
                workoutExerciseTypes: 'machineEquipament',
                workoutExerciseName_insensitive: {
                  'pt-br': 'leg press',
                  us: 'leg press',
                },
                workoutExerciseRestTimeNumber: 90,
                workoutExerciseRepetition: '3x',
                workoutExerciseId: 'y9h8bwyaj5qxC5OClDs3',
                workoutExerciseName: { 'pt-br': 'Leg press', us: 'Leg press' },
                workoutExerciseRestTime: {
                  us: '1 min 30 s',
                  'pt-br': '1 min 30 s',
                },
                workoutExercisePrimaryMuscleGroup: {
                  us: 'legs',
                  'pt-br': 'pernas',
                },
                workoutExerciseIndex: 1,
                workoutExerciseSets: ['10', '10', '10'],
                isEnabled: true,
                workoutExerciseFilters: {
                  weight: { us: null, 'pt-br': null },
                  other: { us: null, 'pt-br': null },
                  bar: { us: null, 'pt-br': null },
                  pulley: { 'pt-br': null, us: null },
                  bench: { us: null, 'pt-br': null },
                  pulleyHandles: { us: null, 'pt-br': null },
                  machine: { 'pt-br': 'leg press', us: 'leg press machine' },
                },
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1732006166362',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1732006166362.mp4?alt=media&token=8301b9ae-c78f-48b0-98c7-407b638132ff',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1732006166362',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1732006166362.jpeg?alt=media&token=a7ec1e3f-2eb3-4340-b79f-87f324f6282a',
                workoutExerciseVideoSize: 37586,
                workoutExerciseMode: 'machineEquipament',
                workoutExerciseMuscleGroup: { 'pt-br': 'pernas', us: 'legs' },
              },
              {
                workoutExerciseTypes: 'machineEquipament',
                workoutExerciseId: '6xMS78ZFc1SPNt2FjfnP',
                workoutExerciseFilters: {
                  pulley: { 'pt-br': null, us: null },
                  bench: { 'pt-br': null, us: null },
                  weight: { 'pt-br': null, us: null },
                  machine: {
                    'pt-br': 'cadeira adutora',
                    us: 'adductor machine',
                  },
                  bar: { us: null, 'pt-br': null },
                  other: { 'pt-br': null, us: null },
                  pulleyHandles: { us: null, 'pt-br': null },
                },
                workoutExerciseName: {
                  'pt-br': 'Cadeira adutora',
                  us: 'Hip adductor',
                },
                workoutExerciseName_insensitive: {
                  'pt-br': 'cadeira adutora',
                  us: 'hip adductor',
                },
                workoutExerciseSets: ['6', '6', '6'],
                workoutExerciseIndex: 2,
                id: 'raDocmcLTMEqoHBwivrB',
                workoutExerciseRestTimeNumber: 45,
                workoutExerciseTechniqueDescription: { us: '', 'pt-br': '' },
                workoutExercisePrimaryMuscleGroup: {
                  us: 'legs',
                  'pt-br': 'pernas',
                },
                workoutExerciseRestTime: { us: '45 s', 'pt-br': '45 s' },
                workoutExerciseRepetition: '3x',
                isEnabled: true,
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1732005610040',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1732005610040.mp4?alt=media&token=f1d7b50c-17e9-4a39-8194-8749c32f6818',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1732005610040',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1732005610040.jpeg?alt=media&token=994f9f86-498c-47fe-ae53-b747a04ae306',
                workoutExerciseVideoSize: 37617,
                workoutExerciseMode: 'machineEquipament',
                workoutExerciseMuscleGroup: { us: 'legs', 'pt-br': 'pernas' },
              },
              {
                workoutExerciseFilters: {
                  bench: { 'pt-br': 'banco reto', us: 'flat bench' },
                  machine: { us: null, 'pt-br': null },
                  bar: { us: null, 'pt-br': null },
                  weight: { 'pt-br': 'halter', us: 'dumbbell' },
                  pulley: { us: null, 'pt-br': null },
                  other: { us: null, 'pt-br': null },
                  pulleyHandles: { us: null, 'pt-br': null },
                },
                workoutExerciseRepetition: '4x',
                workoutExerciseId: 'zEkx2qF8sxUekWNylYmR',
                workoutExerciseTechniqueDescription: { 'pt-br': '', us: '' },
                workoutExercisePrimaryMuscleGroup: {
                  us: 'shoulders',
                  'pt-br': 'ombros',
                },
                workoutExerciseIndex: 3,
                workoutExerciseSets: ['10', '10', '10', '10'],
                workoutExerciseName_insensitive: {
                  'pt-br': 'desenvolvimento arnold',
                  us: 'arnold press',
                },
                workoutExerciseRestTime: {
                  us: '1 min 30 s',
                  'pt-br': '1 min 30 s',
                },
                isEnabled: true,
                workoutExerciseTypes: 'freeEquipament',
                workoutExerciseRestTimeNumber: 90,
                id: 'ZCyYDOeBrszvrDg3HKkV',
                workoutExerciseName: {
                  'pt-br': 'Desenvolvimento arnold',
                  us: 'Arnold press',
                },
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731715595947',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731715595947.mp4?alt=media&token=78621398-e4d9-4a03-aaa5-132d00889ff2',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731715595947',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731715595947.jpeg?alt=media&token=88de5fef-6501-47e4-aecd-1901af965dea',
                workoutExerciseVideoSize: 47660,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: {
                  'pt-br': 'ombros',
                  us: 'shoulders',
                },
              },
            ],
            cardExerciseUniquesMuscles: [
              { 'pt-br': 'ombros', us: 'shoulders' },
              { 'pt-br': 'pernas', us: 'legs' },
            ],
          },
        ],
      },
      createdAt: 1743879325172,
      updatedAt: 1743879325172,
    },
    {
      id: 'FVSytF9Cl8z3zmuxogNj',
      data: {
        workoutId: 'FVSytF9Cl8z3zmuxogNj',
        workoutSequence: [{ label: 'Treino A', index: 0 }],
        workoutsData: [
          {
            index: 0,
            cardExerciseLabel: 'Treino A',
            cardExerciseData: [
              {
                workoutExerciseFilters: {
                  bar: { us: null, 'pt-br': null },
                  other: { us: null, 'pt-br': null },
                  pulleyHandles: { 'pt-br': null, us: null },
                  weight: { 'pt-br': 'anilha', us: 'weight plate' },
                  pulley: { us: null, 'pt-br': null },
                  machine: { us: null, 'pt-br': null },
                  bench: { 'pt-br': null, us: null },
                },
                workoutExercisePrimaryMuscleGroup: {
                  'pt-br': 'peitoral',
                  us: 'chest',
                },
                workoutExerciseId: '5Wt7756IxvQZZIhjmyAp',
                workoutExerciseTypes: 'freeEquipament',
                workoutExerciseName_insensitive: {
                  us: 'plate press',
                  'pt-br': 'anilha press',
                },
                id: 'T7FhxyiVzn5vXMzgAVs6',
                isEnabled: true,
                workoutExerciseSets: [
                  {
                    techiesData: {
                      description: { us: '', 'pt-br': '' },
                      title: { us: '', 'pt-br': '' },
                    },
                    repetitionData: [
                      {
                        isReps: true,
                        sets_insensitive: '2',
                        isTime: false,
                        timeInSeconds: 0,
                      },
                      {
                        sets_insensitive: '10',
                        timeInSeconds: 0,
                        isTime: false,
                        isReps: true,
                      },
                    ],
                    restTimeData: {
                      restTime_insensitive: { 'pt-br': '45 s', us: '45 s' },
                      restTimeNumber: 45,
                    },
                  },
                  {
                    restTimeData: {
                      restTime_insensitive: {
                        'pt-br': '1 min 30 s',
                        us: '1 min 30 s',
                      },
                      restTimeNumber: 90,
                    },
                    techiesData: {
                      title: { us: '', 'pt-br': '' },
                      description: { 'pt-br': '', us: '' },
                    },
                    repetitionData: [
                      {
                        timeInSeconds: 0,
                        isTime: false,
                        sets_insensitive: '2',
                        isReps: true,
                      },
                      {
                        isReps: false,
                        sets_insensitive: '10"',
                        isTime: true,
                        timeInSeconds: 10,
                      },
                      {
                        sets_insensitive: '5',
                        isTime: false,
                        isReps: true,
                        timeInSeconds: 0,
                      },
                    ],
                  },
                ],
                workoutExerciseName: {
                  us: 'Plate press',
                  'pt-br': 'Anilha press',
                },
                workoutExerciseIndex: 0,
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731638278452',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731638278452.mp4?alt=media&token=fa24ad5f-4969-46d8-8590-cfeb04fd38d6',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731638278452',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731638278452.jpeg?alt=media&token=54ede179-2047-4971-b2ff-152c37239cf4',
                workoutExerciseVideoSize: 45046,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: {
                  us: 'chest',
                  'pt-br': 'peitoral',
                },
              },
              {
                workoutExerciseFilters: {
                  machine: { us: null, 'pt-br': null },
                  bench: { 'pt-br': 'banco reto', us: 'flat bench' },
                  other: { us: null, 'pt-br': null },
                  weight: { us: 'weight plate', 'pt-br': 'anilha' },
                  pulleyHandles: { 'pt-br': null, us: null },
                  pulley: { 'pt-br': null, us: null },
                  bar: { us: 'straight bar', 'pt-br': 'barra reta' },
                },
                workoutExerciseId: 'zFwXucyG32HalMUz8XT6',
                workoutExerciseName_insensitive: {
                  us: 'flat bench press',
                  'pt-br': 'supino reto',
                },
                id: 'eX8vm9naYav9LigJsvVM',
                workoutExerciseIndex: 1,
                workoutExerciseTypes: 'freeEquipament',
                workoutExerciseName: {
                  us: 'Flat bench press',
                  'pt-br': 'Supino reto',
                },
                isEnabled: true,
                workoutExerciseSets: [
                  {
                    techiesData: {
                      description: { us: '', 'pt-br': '' },
                      title: { 'pt-br': '', us: '' },
                    },
                    restTimeData: {
                      restTime_insensitive: { us: '1 min', 'pt-br': '1 min' },
                      restTimeNumber: 60,
                    },
                    repetitionData: [
                      {
                        sets_insensitive: '6',
                        isTime: false,
                        timeInSeconds: 0,
                        isReps: true,
                      },
                      {
                        timeInSeconds: 20,
                        isTime: true,
                        sets_insensitive: '20"',
                        isReps: false,
                      },
                      {
                        isReps: false,
                        sets_insensitive: '30"',
                        timeInSeconds: 30,
                        isTime: true,
                      },
                    ],
                  },
                  {
                    restTimeData: {
                      restTime_insensitive: { 'pt-br': '1 min', us: '1 min' },
                      restTimeNumber: 60,
                    },
                    repetitionData: [
                      {
                        timeInSeconds: 0,
                        isTime: false,
                        sets_insensitive: '2',
                        isReps: true,
                      },
                      {
                        isReps: true,
                        sets_insensitive: '4',
                        timeInSeconds: 0,
                        isTime: false,
                      },
                    ],
                    techiesData: {
                      title: { 'pt-br': '', us: '' },
                      description: { 'pt-br': '', us: '' },
                    },
                  },
                  {
                    restTimeData: {
                      restTimeNumber: 45,
                      restTime_insensitive: { us: '45 s', 'pt-br': '45 s' },
                    },
                    repetitionData: [
                      {
                        sets_insensitive: '2',
                        isTime: false,
                        timeInSeconds: 0,
                        isReps: true,
                      },
                      {
                        timeInSeconds: 15,
                        isTime: true,
                        isReps: false,
                        sets_insensitive: '15"',
                      },
                      {
                        timeInSeconds: 0,
                        isTime: false,
                        sets_insensitive: '5',
                        isReps: true,
                      },
                    ],
                    techiesData: {
                      description: { us: '', 'pt-br': '' },
                      title: { 'pt-br': '', us: '' },
                    },
                  },
                ],
                workoutExercisePrimaryMuscleGroup: {
                  us: 'chest',
                  'pt-br': 'peitoral',
                },
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731639917680',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731639917680.mp4?alt=media&token=799bba3f-6f7d-420c-95d2-e4491f7e8690',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731639917680',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731639917680.jpeg?alt=media&token=fc88b0a8-55dc-42b1-aa2f-7810fca45574',
                workoutExerciseVideoSize: 67188,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: {
                  'pt-br': 'peitoral',
                  us: 'chest',
                },
              },
            ],
            cardExerciseUniquesMuscles: [{ us: 'chest', 'pt-br': 'peitoral' }],
          },
        ],
      },
      createdAt: 1743880418470,
      updatedAt: 1743880418470,
    },
    {
      id: 'jLTQqb6oeTcnVM3pRLkK',
      data: {
        workoutId: 'jLTQqb6oeTcnVM3pRLkK',
        workoutSequence: [
          { label: 'Treino A', index: 0 },
          { index: 1, label: 'Treino B' },
        ],
        workoutsData: [
          {
            index: 0,
            cardExerciseLabel: 'Treino A',
            cardExerciseData: [
              {
                workoutExerciseId: 'nKFwLA9czq2NNEflrLVz',
                isEnabled: true,
                workoutExerciseSets: [
                  {
                    techiesData: {
                      title: { 'pt-br': 'Drop Set', us: 'Drop Set' },
                      description: {
                        us: 'Reduce the weight after reaching muscle failure and continue the exercise.',
                        'pt-br':
                          'Reduza o peso após atingir a falha muscular e continue o exercício.',
                      },
                    },
                    restTimeData: {
                      restTime_insensitive: { 'pt-br': '30 s', us: '30 s' },
                      restTimeNumber: 30,
                    },
                    repetitionData: [
                      {
                        isReps: true,
                        sets_insensitive: '6',
                        isTime: false,
                        timeInSeconds: 0,
                      },
                    ],
                  },
                ],
                workoutExerciseTypes: 'freeEquipament',
                id: 'vLWNkqEe4DW2swHSW8jm',
                workoutExercisePrimaryMuscleGroup: {
                  'pt-br': 'peitoral',
                  us: 'chest',
                },
                workoutExerciseFilters: {
                  bar: { 'pt-br': 'barra reta', us: 'straight bar' },
                  pulleyHandles: { us: null, 'pt-br': null },
                  weight: { 'pt-br': 'anilha', us: 'weight plate' },
                  machine: { us: null, 'pt-br': null },
                  bench: { 'pt-br': 'banco inclinado', us: 'incline bench' },
                  pulley: { us: null, 'pt-br': null },
                  other: { 'pt-br': null, us: null },
                },
                workoutExerciseIndex: 0,
                workoutExerciseName: {
                  'pt-br': 'Supino inclinado com barra',
                  us: 'Incline barbell bench press',
                },
                workoutExerciseName_insensitive: {
                  us: 'incline barbell bench press',
                  'pt-br': 'supino inclinado com barra',
                },
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731642008748',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731642008748.mp4?alt=media&token=aa2153fe-43a9-4c11-8572-c85823b52e1b',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731642008748',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731642008748.jpeg?alt=media&token=3f5d00db-5d3f-45d0-a256-749f1e0cf30b',
                workoutExerciseVideoSize: 37523,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: {
                  us: 'chest',
                  'pt-br': 'peitoral',
                },
              },
              {
                workoutExerciseTypes: 'freeEquipament',
                workoutExerciseFilters: {
                  pulley: { 'pt-br': null, us: null },
                  pulleyHandles: { us: null, 'pt-br': null },
                  weight: { us: 'weight plate', 'pt-br': 'anilha' },
                  bar: { 'pt-br': 'barra w', us: 'w-bar' },
                  machine: { us: null, 'pt-br': null },
                  bench: { us: 'flat bench', 'pt-br': 'banco reto' },
                  other: { us: null, 'pt-br': null },
                },
                workoutExerciseSets: [
                  {
                    restTimeData: {
                      restTimeNumber: 30,
                      restTime_insensitive: { 'pt-br': '30 s', us: '30 s' },
                    },
                    repetitionData: [
                      {
                        timeInSeconds: 0,
                        isTime: false,
                        isReps: true,
                        sets_insensitive: '6',
                      },
                    ],
                    techiesData: {
                      description: { 'pt-br': '', us: '' },
                      title: { 'pt-br': '', us: '' },
                    },
                  },
                  {
                    repetitionData: [
                      {
                        timeInSeconds: 0,
                        isReps: true,
                        isTime: false,
                        sets_insensitive: '8',
                      },
                    ],
                    techiesData: {
                      title: { 'pt-br': '', us: '' },
                      description: { us: '', 'pt-br': '' },
                    },
                    restTimeData: {
                      restTimeNumber: 45,
                      restTime_insensitive: { 'pt-br': '45 s', us: '45 s' },
                    },
                  },
                ],
                workoutExerciseName_insensitive: {
                  'pt-br': 'tríceps francês barra w',
                  us: 'w-bar french press',
                },
                isEnabled: true,
                workoutExerciseName: {
                  us: 'W-bar french press',
                  'pt-br': 'Tríceps francês barra w',
                },
                workoutExercisePrimaryMuscleGroup: {
                  us: 'triceps',
                  'pt-br': 'tríceps',
                },
                workoutExerciseId: 'AyLzgudD0CvxoxZM4nRO',
                workoutExerciseIndex: 1,
                id: 'JYP9gI4W3CDZ4R39LCUO',
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731647663372',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731647663372.mp4?alt=media&token=617c064a-9936-4e23-884c-3bb429b1e39d',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731647663372',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731647663372.jpeg?alt=media&token=481b2512-f6c3-45c5-84a7-4a78113309ec',
                workoutExerciseVideoSize: 28178,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: {
                  us: 'triceps',
                  'pt-br': 'tríceps',
                },
              },
              {
                workoutExerciseTypes: 'freeEquipament',
                workoutExerciseId: '0jkS1piYwCiodxRnb9Rq',
                workoutExercisePrimaryMuscleGroup: {
                  us: 'chest',
                  'pt-br': 'peitoral',
                },
                workoutExerciseFilters: {
                  bar: { us: null, 'pt-br': null },
                  machine: { us: null, 'pt-br': null },
                  bench: { us: null, 'pt-br': null },
                  weight: { us: null, 'pt-br': null },
                  pulleyHandles: { 'pt-br': null, us: null },
                  other: { us: 'dips', 'pt-br': 'paralelas' },
                  pulley: { 'pt-br': null, us: null },
                },
                workoutExerciseName_insensitive: {
                  'pt-br': 'paralelas',
                  us: 'dips',
                },
                workoutExerciseIndex: 2,
                id: '692Dt6IDQTAsYaU2VZBI',
                isEnabled: true,
                workoutExerciseName: { us: 'Dips', 'pt-br': 'Paralelas' },
                workoutExerciseSets: [
                  {
                    restTimeData: {
                      restTimeNumber: 45,
                      restTime_insensitive: { us: '45 s', 'pt-br': '45 s' },
                    },
                    techiesData: {
                      description: { 'pt-br': '', us: '' },
                      title: { 'pt-br': '', us: '' },
                    },
                    repetitionData: [
                      {
                        isReps: true,
                        timeInSeconds: 0,
                        sets_insensitive: '6',
                        isTime: false,
                      },
                    ],
                  },
                  {
                    repetitionData: [
                      {
                        isTime: false,
                        sets_insensitive: '8',
                        isReps: true,
                        timeInSeconds: 0,
                      },
                    ],
                    techiesData: {
                      description: { 'pt-br': '', us: '' },
                      title: { 'pt-br': '', us: '' },
                    },
                    restTimeData: {
                      restTime_insensitive: { us: '30 s', 'pt-br': '30 s' },
                      restTimeNumber: 30,
                    },
                  },
                  {
                    restTimeData: {
                      restTimeNumber: 45,
                      restTime_insensitive: { 'pt-br': '45 s', us: '45 s' },
                    },
                    repetitionData: [
                      {
                        isReps: true,
                        sets_insensitive: '10',
                        timeInSeconds: 0,
                        isTime: false,
                      },
                      {
                        sets_insensitive: '12',
                        isReps: true,
                        timeInSeconds: 0,
                        isTime: false,
                      },
                    ],
                    techiesData: {
                      description: { us: '', 'pt-br': '' },
                      title: { us: '', 'pt-br': '' },
                    },
                  },
                ],
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731644523395',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731644523395.mp4?alt=media&token=dfc68c2d-5c6f-4625-895b-0ebb281a0599',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731644523395',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731644523395.jpeg?alt=media&token=5a7059ce-02f9-4ce3-b88f-7b51b88f19aa',
                workoutExerciseVideoSize: 57368,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: {
                  'pt-br': 'peitoral',
                  us: 'chest',
                },
              },
            ],
            cardExerciseUniquesMuscles: [
              { 'pt-br': 'peitoral', us: 'chest' },
              { us: 'triceps', 'pt-br': 'tríceps' },
            ],
          },
          {
            index: 1,
            cardExerciseLabel: 'Treino B',
            cardExerciseData: [
              {
                workoutExerciseName: { 'pt-br': 'Barra fixa', us: 'Pull-up' },
                workoutExerciseId: '6EtsaZKn3dgqg1s0EhUc',
                workoutExerciseName_insensitive: {
                  'pt-br': 'barra fixa',
                  us: 'pull-up',
                },
                workoutExercisePrimaryMuscleGroup: {
                  'pt-br': 'costas',
                  us: 'back',
                },
                workoutExerciseSets: [
                  {
                    restTimeData: {
                      restTimeNumber: 45,
                      restTime_insensitive: { 'pt-br': '45 s', us: '45 s' },
                    },
                    techiesData: {
                      description: { 'pt-br': '', us: '' },
                      title: { 'pt-br': '', us: '' },
                    },
                    repetitionData: [
                      {
                        timeInSeconds: 0,
                        sets_insensitive: '10',
                        isTime: false,
                        isReps: true,
                      },
                    ],
                  },
                ],
                isEnabled: true,
                workoutExerciseIndex: 0,
                workoutExerciseFilters: {
                  other: { us: 'bodyweight', 'pt-br': 'peso do corpo' },
                  weight: { us: null, 'pt-br': null },
                  pulleyHandles: { 'pt-br': null, us: null },
                  bar: { us: 'fixed bar', 'pt-br': 'barra fixa' },
                  pulley: { 'pt-br': null, us: null },
                  machine: { us: null, 'pt-br': null },
                  bench: { 'pt-br': null, us: null },
                },
                workoutExerciseTypes: 'freeEquipament',
                id: '6bL3mygFUOM4VfbNs4ek',
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731724101228',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731724101228.mp4?alt=media&token=d72fd7d4-2263-4495-b825-82ad54bb7f98',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731724101228',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731724101228.jpeg?alt=media&token=b1433ac8-835e-44eb-a550-f3aad6d21def',
                workoutExerciseVideoSize: 50414,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: { us: 'back', 'pt-br': 'costas' },
              },
              {
                workoutExerciseIndex: 1,
                workoutExerciseId: 'Qeaa3blESYxLPXXVgRZk',
                workoutExerciseName_insensitive: {
                  us: 'straight barbell curl',
                  'pt-br': 'rosca direta com barra',
                },
                workoutExerciseFilters: {
                  bar: { us: 'straight bar', 'pt-br': 'barra reta' },
                  other: { 'pt-br': null, us: null },
                  machine: { 'pt-br': null, us: null },
                  pulleyHandles: { 'pt-br': null, us: null },
                  weight: { 'pt-br': 'anilha', us: 'weight plate' },
                  bench: { us: null, 'pt-br': null },
                  pulley: { 'pt-br': null, us: null },
                },
                workoutExercisePrimaryMuscleGroup: {
                  'pt-br': 'bíceps',
                  us: 'biceps',
                },
                id: 'GbVoavFer0DwfAkDrd0D',
                workoutExerciseSets: [
                  {
                    repetitionData: [
                      {
                        timeInSeconds: 0,
                        sets_insensitive: '6',
                        isReps: true,
                        isTime: false,
                      },
                    ],
                    techiesData: {
                      title: { us: '', 'pt-br': '' },
                      description: { us: '', 'pt-br': '' },
                    },
                    restTimeData: {
                      restTime_insensitive: { 'pt-br': '45 s', us: '45 s' },
                      restTimeNumber: 45,
                    },
                  },
                  {
                    restTimeData: {
                      restTimeNumber: 45,
                      restTime_insensitive: { us: '45 s', 'pt-br': '45 s' },
                    },
                    repetitionData: [
                      {
                        isTime: false,
                        sets_insensitive: '8',
                        timeInSeconds: 0,
                        isReps: true,
                      },
                    ],
                    techiesData: {
                      description: { us: '', 'pt-br': '' },
                      title: { 'pt-br': '', us: '' },
                    },
                  },
                ],
                workoutExerciseTypes: 'freeEquipament',
                isEnabled: true,
                workoutExerciseName: {
                  'pt-br': 'Rosca direta com barra',
                  us: 'Straight barbell curl',
                },
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731651237418',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731651237418.mp4?alt=media&token=3992d814-f531-479f-9e39-0e2e98d60dcb',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731651237418',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731651237418.jpeg?alt=media&token=8bca8bf1-cd28-4fa3-9454-d43f9825b7d6',
                workoutExerciseVideoSize: 45398,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: { 'pt-br': 'bíceps', us: 'biceps' },
              },
              {
                id: '4sgI9QoeUaQSut9jDU8I',
                workoutExerciseIndex: 2,
                workoutExerciseId: 'XpWPFplx1Vf89WJTFbT6',
                workoutExercisePrimaryMuscleGroup: {
                  us: 'biceps',
                  'pt-br': 'bíceps',
                },
                workoutExerciseFilters: {
                  other: { us: null, 'pt-br': null },
                  pulley: { 'pt-br': null, us: null },
                  pulleyHandles: { 'pt-br': null, us: null },
                  bar: { 'pt-br': 'barra reta', us: 'straight bar' },
                  bench: { us: null, 'pt-br': null },
                  machine: { us: null, 'pt-br': null },
                  weight: { 'pt-br': 'anilha', us: 'weight plate' },
                },
                workoutExerciseTypes: 'freeEquipament',
                workoutExerciseName_insensitive: {
                  us: 'barbell curl',
                  'pt-br': 'rosca com barra',
                },
                workoutExerciseName: {
                  us: 'Barbell curl',
                  'pt-br': 'Rosca com barra',
                },
                workoutExerciseSets: [
                  {
                    restTimeData: {
                      restTime_insensitive: { us: '45 s', 'pt-br': '45 s' },
                      restTimeNumber: 45,
                    },
                    repetitionData: [
                      {
                        isTime: false,
                        isReps: true,
                        sets_insensitive: '10',
                        timeInSeconds: 0,
                      },
                    ],
                    techiesData: {
                      description: { us: '', 'pt-br': '' },
                      title: { 'pt-br': '', us: '' },
                    },
                  },
                  {
                    restTimeData: {
                      restTime_insensitive: {
                        'pt-br': '1 min 30 s',
                        us: '1 min 30 s',
                      },
                      restTimeNumber: 90,
                    },
                    techiesData: {
                      description: { 'pt-br': '', us: '' },
                      title: { us: '', 'pt-br': '' },
                    },
                    repetitionData: [
                      {
                        timeInSeconds: 0,
                        sets_insensitive: '10',
                        isTime: false,
                        isReps: true,
                      },
                    ],
                  },
                  {
                    restTimeData: {
                      restTimeNumber: 45,
                      restTime_insensitive: { us: '45 s', 'pt-br': '45 s' },
                    },
                    repetitionData: [
                      {
                        sets_insensitive: '10',
                        timeInSeconds: 0,
                        isTime: false,
                        isReps: true,
                      },
                    ],
                    techiesData: {
                      description: { us: '', 'pt-br': '' },
                      title: { 'pt-br': '', us: '' },
                    },
                  },
                ],
                isEnabled: true,
                workoutExerciseVideoMIME: '.mp4',
                workoutExerciseVideoFileName: '1731650781835',
                workoutExerciseVideoUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesVideos%2F1731650781835.mp4?alt=media&token=a6945087-1a94-4f69-bbc9-ad473b2f91d0',
                workoutExerciseThumbnailMIME: '.jpeg',
                workoutExerciseThumbnailFileName: '1731650781835',
                workoutExerciseThumbnailUrl:
                  'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/workoutsExercisesThumbnails%2F1731650781835.jpeg?alt=media&token=01321955-2f61-4bcf-9c8c-9158ee43f5d3',
                workoutExerciseVideoSize: 53573,
                workoutExerciseMode: 'freeEquipament',
                workoutExerciseMuscleGroup: { us: 'biceps', 'pt-br': 'bíceps' },
              },
            ],
            cardExerciseUniquesMuscles: [
              { 'pt-br': 'costas', us: 'back' },
              { 'pt-br': 'bíceps', us: 'biceps' },
            ],
          },
        ],
      },
      createdAt: 1743896372138,
      updatedAt: 1743896372138,
    },
  ],
} as IMyWorkoutsData
