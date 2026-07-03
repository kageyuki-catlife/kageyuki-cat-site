import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* =========================
   Firebase設定
========================= */
const firebaseConfig = {
  apiKey: "AIzaSyCABotf4RdPcT1EM0igf4TrERmCq12Cp1Q",
  authDomain: "cat-kageyukichanel.firebaseapp.com",
  projectId: "cat-kageyukichanel",
  storageBucket: "cat-kageyukichanel.firebasestorage.app",
  messagingSenderId: "495349176568",
  appId: "1:495349176568:web:f1b5f959e0f52acc91430d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* =========================
   日付キー
========================= */
const todayKey = new Date()
  .toISOString()
  .split("T")[0]
  .replaceAll("-", "");

/* =========================
   Firestore参照
========================= */
const totalRef = doc(db, "site", "visitorCounter");
const dailyRef = doc(db, "daily", todayKey);

/* =========================
   カウント処理（重要）
========================= */
async function updateAll() {
  try {
    // 総訪問者
    await updateDoc(totalRef, {
      count: increment(1)
    });

    // 今日データがなければ作成
    const snap = await getDoc(dailyRef);

    if (!snap.exists()) {
      await setDoc(dailyRef, { count: 0 });
    }

    // 今日カウント
    await updateDoc(dailyRef, {
      count: increment(1)
    });

  } catch (e) {
    console.error("count error:", e);
  }
}

/* =========================
   表示処理
========================= */
async function showCounts() {
  try {
    const totalSnap = await getDoc(totalRef);
    const todaySnap = await getDoc(dailyRef);

    document.getElementById("visitor-total").textContent =
      totalSnap.data()?.count ?? 0;

    document.getElementById("visitor-today").textContent =
      todaySnap.data()?.count ?? 0;

  } catch (e) {
    console.error("show error:", e);
  }
}

/* =========================
   実行（ここが重要）
========================= */
updateAll();
showCounts();