export const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';  // Устанавливаем английский язык
  
    // Выбираем голос, если доступен
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang === 'en-US' || voice.lang.startsWith('en'));
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
  
    window.speechSynthesis.speak(utterance);
  };
  