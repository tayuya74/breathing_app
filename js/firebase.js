// Генерация/получение ID пользователя
function getUserId() {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = 'user-' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('userId', userId);
  }
  return userId;
}

// Сохранение сеанса (асинхронная функция)
async function saveSession(durationMinutes, cycles) {
  const userId = getUserId();

  try {
    // Добавляем запись о сеансе
    await firebase.firestore.addDoc(firebase.firestore.collection(firebase.db, 'users', userId, 'sessions'), {
      date: new Date(),
      duration: durationMinutes,
      cycles: cycles
    });

    // Обновляем общую статистику
    const userRef = firebase.firestore.doc(firebase.db, 'users', userId);
    await firebase.firestore.setDoc(userRef, {
      lastSession: new Date(),
      totalDuration: firebase.firestore.increment(durationMinutes),
      totalSessions: firebase.firestore.increment(1),
      totalCycles: firebase.firestore.increment(cycles)
    }, { merge: true });

    console.log("Статистика успешно сохранена!");
    return true;
  } catch (error) {
    console.error("Ошибка при сохранении:", error);
    return false;
  }
}

// Загрузка статистики
async function loadStats() {
  const userId = getUserId();
  try {
    const userRef = firebase.firestore.doc(firebase.db, 'users', userId);
    const docSnap = await firebase.firestore.getDoc(userRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Ошибка загрузки:", error);
    return null;
  }
}

// Проверка подключения
async function checkFirebaseConnection() {
  try {
    const testRef = firebase.firestore.doc(firebase.db, 'connection_test', 'test');
    await firebase.firestore.setDoc(testRef, { timestamp: new Date() });
    console.log("Firebase подключен успешно!");
    return true;
  } catch (error) {
    console.error("Ошибка подключения к Firebase:", error);
    return false;
  }
}

// Вызовите эту функцию при загрузке страницы
document.addEventListener("DOMContentLoaded", async () => {
  const connected = await checkFirebaseConnection();
  if (connected) {
    await updateStatsUI();
  } else {
    alert("Ошибка подключения к серверу статистики");
  }
});