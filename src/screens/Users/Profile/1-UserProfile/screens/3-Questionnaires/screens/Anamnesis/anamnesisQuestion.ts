/* // screens/Anamnesis/anamnesisQuestions.ts
export const anamnesisQuestions = [
  {
    id: '1', // Usando IDs com letras para diferenciar do PAR-Q
    'pt-br': {
      question:
        'Qual é o seu principal objetivo ao iniciar atividades físicas?',
      type: 'text', // Indica que é um campo de texto livre
      placeholder: 'Ex: Emagrecer, ganhar massa, melhorar saúde...',
    },
    us: {
      question: 'What is your main goal when starting physical activities?',
      type: 'text',
      placeholder: 'Ex: Lose weight, gain muscle, improve health...',
    },
  },
  {
    id: '2',
    'pt-br': {
      question:
        'Você possui alguma doença crônica diagnosticada (diabetes, asma, problema de tireoide, etc.) ou toma algum medicamento contínuo não relacionado a coração/pressão?',
      type: 'text', // Pode ser um campo de texto para listar
      placeholder: 'Liste aqui, se houver',
    },
    us: {
      question:
        'Do you have any other diagnosed chronic disease (diabetes, asthma, thyroid problem, etc.) or take any continuous medication not related to heart/blood pressure?',
      type: 'text',
      placeholder: 'List here, if any',
    },
  },
  {
    id: '3',
    'pt-br': {
      question:
        'Você já passou por alguma cirurgia ou internação hospitalar importante? Quando e por quê?',
      type: 'text',
      placeholder: 'Descreva brevemente',
    },
    us: {
      question:
        'Have you ever had any major surgery or hospitalization? When and why?',
      type: 'text',
      placeholder: 'Describe briefly',
    },
  },
  {
    id: '4',
    'pt-br': {
      question:
        'Você fuma ou consome bebidas alcoólicas regularmente? Com que frequência?',
      type: 'text',
      placeholder: 'Ex: Fumo 5 cigarros/dia; Bebo 3x por semana',
    },
    us: {
      question:
        'Do you smoke or consume alcoholic beverages regularly? How often?',
      type: 'text',
      placeholder: 'Ex: Smoke 5 cigarettes/day; Drink 3x a week',
    },
  },
  {
    id: '5',
    'pt-br': {
      question:
        'Você tem alguma lesão, dor crônica ou limitação de movimento atual que devamos saber?',
      type: 'text',
      placeholder: 'Descreva a lesão/dor/limitação e em qual região do corpo',
    },
    us: {
      question:
        'Do you have any current injury, chronic pain, or movement limitation that we should know about?',
      type: 'text',
      placeholder: 'Describe the injury/pain/limitation and body area',
    },
  },
  {
    id: '6',
    'pt-br': {
      question: 'Como é sua rotina de sono (quantas horas, qualidade)?',
      type: 'text',
      placeholder: 'Ex: Durmo 7h, mas acordo cansado',
    },
    us: {
      question: 'What is your sleep routine like (how many hours, quality)?',
      type: 'text',
      placeholder: 'Ex: I sleep 7h, but wake up tired',
    },
  },
  {
    id: '7',
    'pt-br': {
      question:
        'Você tem alguma experiência anterior com atividade física? Quais modalidades?',
      type: 'text',
      placeholder: 'Ex: Academia, corrida, dança, natação',
    },
    us: {
      question:
        'Do you have any previous experience with physical activity? What modalities?',
      type: 'text',
      placeholder: 'Ex: Gym, running, dance, swimming',
    },
  },
  {
    id: '8',
    'pt-br': {
      question:
        'Há algo mais que você gostaria de nos informar sobre sua saúde ou histórico que seja relevante para o treino?',
      type: 'text',
      placeholder: 'Campo livre',
    },
    us: {
      question:
        'Is there anything else you would like to inform us about your health or history that is relevant for training?',
      type: 'text',
      placeholder: 'Free text field',
    },
  },
]
 */ // screens/Anamnesis/anamnesisQuestions.ts
export const anamnesisQuestions = [
  {
    id: '1',
    'pt-br': {
      question:
        'Qual é o seu principal objetivo ao iniciar atividades físicas?',
      type: 'text',
      placeholder:
        'Ex: Emagrecer, ganhar massa muscular, melhorar a saúde geral, performance em esporte, etc.',
    },
    us: {
      question: 'What is your main goal when starting physical activities?',
      type: 'text',
      placeholder:
        'Ex: Lose weight, gain muscle, improve general health, sports performance, etc.',
    },
  },
  {
    id: '2',
    'pt-br': {
      question:
        'Alguém na sua família (pais, avós, irmãos) possui ou já teve doenças como diabetes, problemas cardíacos, pressão alta, câncer ou colesterol alto?',
      type: 'text',
      placeholder: 'Liste quais doenças e o parentesco, se souber.',
    },
    us: {
      question:
        'Does anyone in your family (parents, grandparents, siblings) have or have had diseases such as diabetes, heart problems, high blood pressure, cancer, or high cholesterol?',
      type: 'text',
      placeholder: 'List diseases and relationship, if known.',
    },
  },
  {
    id: '3',
    'pt-br': {
      question:
        'Você tem alguma doença crônica não mencionada anteriormente (ex: diabetes, problemas na tireoide, asma, epilepsia, doenças renais, etc.)?',
      type: 'text',
      placeholder: 'Liste as doenças crônicas, se houver.',
    },
    us: {
      question:
        'Do you have any other chronic disease not mentioned before (e.g., diabetes, thyroid problems, asthma, epilepsy, kidney disease, etc.)?',
      type: 'text',
      placeholder: 'List chronic diseases, if any.',
    },
  },
  {
    id: '4',
    'pt-br': {
      question:
        'Você tem alguma alergia a medicamentos, alimentos ou outros fatores? Qual(is)?',
      type: 'text',
      placeholder: 'Descreva suas alergias, se houver.',
    },
    us: {
      question:
        'Do you have any allergies to medications, food, or other factors? Which one(s)?',
      type: 'text',
      placeholder: 'Describe your allergies, if any.',
    },
  },
  {
    id: '5',
    'pt-br': {
      question:
        'Você já realizou alguma cirurgia ou teve internações hospitalares importantes? Quais, quando e por quê?',
      type: 'text',
      placeholder: 'Descreva as cirurgias/internações, datas e motivos.',
    },
    us: {
      question:
        'Have you ever had any major surgery or important hospitalizations? Which ones, when, and why?',
      type: 'text',
      placeholder: 'Describe surgeries/hospitalizations, dates, and reasons.',
    },
  },
  {
    id: '6',
    'pt-br': {
      question:
        'Você utiliza algum tipo de prótese, órtese ou possui algum implante metálico no corpo? Qual(is)?',
      type: 'text',
      placeholder: 'Especifique o tipo e localização.',
    },
    us: {
      question:
        'Do you use any type of prosthesis, orthosis, or have any metal implant in your body? Which one(s)?',
      type: 'text',
      placeholder: 'Specify type and location.',
    },
  },
  {
    id: '7',
    'pt-br': {
      question:
        'Você fuma ou já fumou? Se sim, com que frequência e por quanto tempo?',
      type: 'text',
      placeholder:
        'Ex: Fumo 5 cigarros/dia há 10 anos; Já fumei, parei há 2 anos.',
    },
    us: {
      question:
        'Do you smoke or have you smoked? If so, how often and for how long?',
      type: 'text',
      placeholder:
        'Ex: Smoke 5 cigarettes/day for 10 years; Used to smoke, stopped 2 years ago.',
    },
  },
  {
    id: '8',
    'pt-br': {
      question:
        'Você consome bebidas alcoólicas? Se sim, com que frequência e em que quantidade?',
      type: 'text',
      placeholder: 'Ex: 3x por semana, 2 cervejas; Raramente.',
    },
    us: {
      question:
        'Do you consume alcoholic beverages? If so, how often and in what quantity?',
      type: 'text',
      placeholder: 'Ex: 3x a week, 2 beers; Rarely.',
    },
  },
  {
    id: '9',
    'pt-br': {
      question:
        'Como você descreveria sua alimentação diária (consome frutas, verduras, alimentos processados, etc.)?',
      type: 'text',
      placeholder: 'Descreva sua rotina alimentar.',
    },
    us: {
      question:
        'How would you describe your daily diet (do you consume fruits, vegetables, processed foods, etc.)?',
      type: 'text',
      placeholder: 'Describe your eating habits.',
    },
  },
  {
    id: '10',
    'pt-br': {
      question:
        'Quantas horas você costuma dormir por noite? Você se sente descansado(a) ao acordar?',
      type: 'text',
      placeholder: 'Ex: Durmo 7h, sim; Durmo 6h, mas acordo cansado.',
    },
    us: {
      question:
        'How many hours do you usually sleep per night? Do you feel rested when you wake up?',
      type: 'text',
      placeholder: 'Ex: I sleep 7h, yes; I sleep 6h, but wake up tired.',
    },
  },
  {
    id: '11',
    'pt-br': {
      question:
        'Como você avalia seu nível de estresse no dia a dia (baixo, moderado, alto)?',
      type: 'text',
      placeholder: 'Ex: Moderado; Alto, devido ao trabalho.',
    },
    us: {
      question:
        'How do you rate your daily stress level (low, moderate, high)?',
      type: 'text',
      placeholder: 'Ex: Moderate; High, due to work.',
    },
  },
  {
    id: '12',
    'pt-br': {
      question:
        'Você praticava ou pratica alguma atividade física regularmente? Qual(is) e com que frequência?',
      type: 'text',
      placeholder: 'Ex: Academia 3x/semana; Corrida 2x/semana.',
    },
    us: {
      question:
        'Did you or do you regularly practice any physical activity? Which one(s) and how often?',
      type: 'text',
      placeholder: 'Ex: Gym 3x/week; Running 2x/week.',
    },
  },
  {
    id: '13',
    'pt-br': {
      question:
        'Você já teve alguma experiência negativa com atividade física no passado? Qual?',
      type: 'text',
      placeholder: 'Ex: Lesão no joelho na corrida; Não me adaptei à academia.',
    },
    us: {
      question:
        'Have you ever had any negative experience with physical activity in the past? Which one?',
      type: 'text',
      placeholder: "Ex: Knee injury while running; Didn't adapt to the gym.",
    },
  },
  {
    id: '14',
    'pt-br': {
      question:
        'Existe alguma modalidade de exercício que você tem preferência ou alguma que não goste de fazer?',
      type: 'text',
      placeholder: 'Ex: Gosto de dança, não gosto de levantamento de peso.',
    },
    us: {
      question: 'Is there any exercise modality you prefer or any you dislike?',
      type: 'text',
      placeholder: 'Ex: I like dancing, I dislike weightlifting.',
    },
  },
  {
    id: '15',
    'pt-br': {
      question:
        'Você tem alguma dificuldade específica (física ou de tempo) que possa afetar sua participação nos exercícios?',
      type: 'text',
      placeholder:
        'Ex: Problemas de horário; Dor no ombro ao levantar o braço.',
    },
    us: {
      question:
        'Do you have any specific difficulty (physical or time-related) that might affect your participation in exercises?',
      type: 'text',
      placeholder: 'Ex: Scheduling issues; Shoulder pain when lifting arm.',
    },
  },
  {
    id: '16',
    'pt-br': {
      question:
        'Há algo mais que você gostaria de nos informar sobre sua saúde ou histórico que seja relevante para o treino?',
      type: 'text',
      placeholder: 'Campo livre para informações adicionais.',
    },
    us: {
      question:
        'Is there anything else you would like to inform us about your health or history that is relevant for training?',
      type: 'text',
      placeholder: 'Free text field for additional information.',
    },
  },
]
