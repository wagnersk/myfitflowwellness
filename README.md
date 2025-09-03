# MyFitFlowWellness – Aplicativo de Bem-Estar e Saúde Integral

**MyFitFlowWellness** é um aplicativo mobile desenvolvido em **React Native** com **Expo** e **TypeScript**, projetado para acompanhamento de **hábitos saudáveis, treinos físicos e métricas de bem-estar**. O app está disponível em **Português** e **Inglês**, o objetivo é oferecer uma experiência completa de **monitoramento de saúde** e servir como **projeto de portfólio**.

---

## 🚀 Tecnologias Utilizadas

- **React Native 0.79.5** + **Expo 53**
- **TypeScript 5.8**
- **Firebase 11.10** (Auth, Firestore)
- **React Navigation** (stack, bottom-tabs)
- **Zustand / Redux** (gerenciamento de estado, opcional)
- **Victory Native + Skia** para dashboards gráficos
- **Lottie** para animações
- **React Hook Form** para formulários
- **Styled Components 6.1** para estilos
- **Async Storage** para persistência local

---

## 🛠️ Funcionalidades

- 📋 **Cadastro e autenticação de usuários** (Firebase Auth)  
- 🏃 **Monitoramento de atividades físicas**
- 🌐 **Suporte multiplataforma** (iOS / Android)  
- 🎨 **UI moderna** com animações, gradientes e gráficos interativos  



## 📸 Screenshots

### 📸 Telas do App

## 📸 Screenshots

### 📸 Telas do App

| 🏠 Tela Login | 🏠 Tela Inicial | ✍️ Tela de Treino (Lista) |
|---------------|----------------|--------------------------|
| ![Tela Login](https://github.com/user-attachments/assets/75198778-4590-4ca1-b481-ed4f37e14e81) | ![Tela Inicial](https://github.com/user-attachments/assets/f9b1ea7e-c5b8-4aa7-979f-c57adb9fd998) | ![Treino Lista](https://github.com/user-attachments/assets/3b66db34-0e70-4657-b443-b97fb5dfab06) |

| 📊 Tela Detalhes | 📊 Tela do Treino Principal | 📈 Preferências 1 |
|-----------------|----------------------------|------------------|
| ![Detalhes Treino](https://github.com/user-attachments/assets/7e55925c-fd23-4065-a602-b4bb582e9556) | ![Treino Principal](https://github.com/user-attachments/assets/31fb44b5-3d4c-4f0f-a4d1-f913ea72cf5c) | ![Preferências 1](https://github.com/user-attachments/assets/0518dfa5-dc34-4514-96ff-d51c0356121a) |

| 📈 Preferências 2 |
|------------------|
| ![Preferências 2](https://github.com/user-attachments/assets/61c99734-4f1e-4087-b4aa-d8cf5deeb04d) |

---

## 📂 Estrutura do Projeto

/myfitflowwellness
┣ 📂 src/              # Hooks, components, screens, services, store
┣ 📂 assets/           # Imagens, fonts
┣ 📂 android/ios/      # Configurações nativas
┣ 📜 App.tsx
┣ 📜 firebase-config.ts
┣ 📜 package.json
┣ 📜 tsconfig.json
┣ 📜 babel.config.js
┣ 📜 app.json
┗ 📜 README.md


---

## ▶️ Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/wagnersk/myfitflowwellness.git
cd myfitflowwellness
npm install
npx expo start

## 🧹 Boas Práticas e Qualidade

- Lint com **ESLint** (`@rocketseat/eslint-config`)  
- Type checking com **TypeScript**  
- Estrutura organizada em `src/` (hooks, components, services, store)  

---

## 🩺 Troubleshooting

- **Expo SDK mismatch** → rode `expo doctor`  
- **Erro Firebase** → verifique credenciais e regras do Firestore/Auth  
- **Android Studio** → abra o AVD antes de `npm run android`  
- **iOS** → rode `npx pod-install` ou abra Xcode  
- **Problemas com libs nativas** → siga documentação das libs para compatibilidade com Expo SDK 53  

---

## 📚 Referências

- [Expo Docs](https://docs.expo.dev/)  
- [React Native](https://reactnative.dev/)  
- [Firebase Docs](https://firebase.google.com/docs)  
- [React Navigation](https://reactnavigation.org/)  
- [Victory Native](https://formidable.com/open-source/victory/docs/native/)  

---

## 👤 Autor

**Wagner Sobreira**  
🔗 [LinkedIn](https://www.linkedin.com/in/wagner-sobreira/)  

---

## 🎯 Objetivo do Projeto

O **MyFitFlowWellness** foi criado como **projeto de portfólio** para demonstrar:  

- Integração avançada com **Firebase** (Auth e Firestore) para gerenciamento de usuários e dados  
- Registro de **atividades físicas**  
- Criação de experiências interativas e modernas de **UI/UX** com Lottie, Blur, Gradients e animações suaves  
- Boas práticas de desenvolvimento mobile com **TypeScript**, **React Native 0.79** e **Expo 53**  - Criação de experiências ricas de **UI/UX** com gráficos e efeitos visuais  
- Filtro próprio com integração ao instagram com a logo do aplicativo 
- Api própria feita com o proprio firebase para ter os treinos
- Suporte multilíngue: **Português** e **Inglês**  

---

## 📜 Licença

Este projeto é de uso pessoal e portfólio, sem fins comerciais.
