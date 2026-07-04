/* ==========================================================
   景雪チャンネル公式サイト
   script.js

   JavaScriptはこのファイルに今後も追記していきます。
========================================================== */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

/* ==========================================================
   ① 必要なHTML要素を取得する
========================================================== */

/*
    ダークモードボタンを取得します。

    HTMLでは

    <button id="darkModeBtn">

    となっているため、

    getElementById()で取得できます。
*/

const darkModeBtn = document.getElementById("darkModeBtn");

/* ==========================================================
   ダークモード切替
========================================================== */

darkModeBtn.addEventListener("click", function () {

    // light-modeクラスを付けたり外したりする
    document.body.classList.toggle("light-mode");

    // 現在ライトモードか判定
    const isLightMode =
        document.body.classList.contains("light-mode");

    if (isLightMode) {

        localStorage.setItem("theme", "light");

        darkModeBtn.textContent = "Light";

    } else {

        localStorage.setItem("theme", "dark");

        darkModeBtn.textContent = "Dark";

    }

});


/* ==========================================================
   ② LocalStorageから設定を取得する
========================================================== */

/*
    LocalStorageとは

    ブラウザ内にデータを保存できる仕組みです。

    例えば

    ・ダークモード
    ・ログイン状態
    ・設定

    などを保存できます。
*/

const savedTheme = localStorage.getItem("theme");



/* ==========================================================
   ③ 保存されているテーマを反映する
========================================================== */

/*
    前回ライトモードだった場合は

    bodyへ

    light-mode

    を付与します。
*/

if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    /*
        ボタンの表示も変更
    */

    darkModeBtn.textContent = "Dark";
    
    }
    
/* ==========================================================
   ③-2 スクロールアニメーション
========================================================== */

/*
    アニメーション対象を取得します。

    HTMLで

    class="fade-up"

    が付いている要素が対象になります。
*/

const fadeElements =
    document.querySelectorAll(".fade-up");



/*
    画面内へ入ったか判定する関数
*/

function showOnScroll() {

    /*
        全要素を順番に確認します。
    */

    fadeElements.forEach(function (element) {

        /*
            要素の位置を取得します。
        */

        const elementTop =
            element.getBoundingClientRect().top;



        /*
            画面の高さを取得します。
        */

        const windowHeight =
            window.innerHeight;



        /*
            画面の85%付近まで来たら表示
        */

        if (elementTop < windowHeight * 0.85) {

            element.classList.add("show");

        }

    });

}



/*
    スクロールした時に実行
*/

window.addEventListener("scroll", showOnScroll);



/*
    ページを開いた瞬間にも実行

    一番上にある要素も表示されます。
*/

showOnScroll();

/* ==========================================================
   ③-3 トップへ戻るボタン
========================================================== */

/*
    ボタンをJavaScriptで作成します。

    HTMLへ直接書かなくても
    JavaScriptから作ることができます。
*/

const backToTopButton =
    document.createElement("button");



/*
    ボタンのID
*/

backToTopButton.id = "backToTop";



/*
    ボタンに表示する文字
*/

backToTopButton.textContent = "↑";



/*
    bodyの最後へ追加
*/

document.body.appendChild(backToTopButton);



/*
    スクロール量を監視します。
*/

window.addEventListener("scroll", function () {

    /*
        300px以上スクロールしたら表示
    */

    if (window.scrollY > 300) {

        backToTopButton.style.display = "block";

    }

    else {

        backToTopButton.style.display = "none";

    }

});



/*
    ボタンを押した時
*/

backToTopButton.addEventListener("click", function () {

    /*
        一番上まで
        スムーズスクロール
    */

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/* ==========================================================
   ③-4 ギャラリー画像拡大表示
========================================================== */

/*
    モーダル本体を作成
*/

const imageModal =
    document.createElement("div");

imageModal.id = "imageModal";



/*
    拡大画像
*/

const modalImage =
    document.createElement("img");



/*
    閉じるボタン
*/

const closeModal =
    document.createElement("span");

closeModal.id = "closeModal";

closeModal.textContent = "×";



/*
    モーダルへ追加
*/

imageModal.appendChild(closeModal);

imageModal.appendChild(modalImage);



/*
    bodyへ追加
*/

document.body.appendChild(imageModal);



/*
    ギャラリー画像を取得
*/

const galleryImages =
    document.querySelectorAll(".gallery img");



/*
    全画像へクリックイベント追加
*/

galleryImages.forEach(function(image){

    image.addEventListener("click",function(){

        /*
            押した画像を表示
        */

        modalImage.src = image.src;

        modalImage.alt = image.alt;

        imageModal.style.display = "flex";

    });

});



/*
    閉じるボタン
*/

closeModal.addEventListener("click",function(){

    imageModal.style.display = "none";

});



/*
    背景クリックでも閉じる
*/

imageModal.addEventListener("click",function(event){

    /*
        背景だけクリックした場合
    */

    if(event.target===imageModal){

        imageModal.style.display="none";

    }

});

/* ==========================================================
   ③-5 ハンバーガーメニュー
========================================================== */

/*
    Headerを取得
*/

const header =
    document.querySelector("header");

/*
    ナビゲーション取得
*/

const navigation =
    document.querySelector("nav");

/*
    ハンバーガーボタン作成
*/

const menuButton =
    document.createElement("button");

/*
    ボタンID
*/

menuButton.id = "menuButton";

/*
    アイコン
*/

menuButton.textContent = "Menu";

/*
    Headerへ追加
*/

header.appendChild(menuButton);

/*
    ボタンを押した時
*/

menuButton.addEventListener("click",function(){

    /*
        openクラスを付け外し
    */

    navigation.classList.toggle("open");

});

/*
    ナビリンクを押したら閉じる
*/

const navLinks =
    document.querySelectorAll("nav a");

navLinks.forEach(function(link){

    link.addEventListener("click",function(){

        navigation.classList.remove("open");

    });

});
/* ==========================================
   来場者数カウンター
========================================== */

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