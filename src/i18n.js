import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { app } from './firebase/config';

const db = firebase.firestore();

// Función para cargar traducciones desde Firebase
const loadTranslations = async (lng) => {
  try {
    const docRef = db.collection('translations').doc(lng);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      return docSnap.data();
    }
    return {};
  } catch (error) {
    console.error('Error cargando traducciones:', error);
    return {};
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: await loadTranslations('en')
      },
      es: {
        translation: await loadTranslations('es')
      }
    },
    fallbackLng: 'es',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 