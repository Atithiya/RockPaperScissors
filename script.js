// ตัวแปร score เอาไว้ข้างนอกฟังก์ชั่นเพื่อให้มันคำนวณครั้งสุดท้าย

// ดึงข้อมูลที่มีชื่อ "score" จาก Local Storage ของเบราวเซอร์.
// JSON.parse(...) เพื่อแปลงข้อมูล JSON นี้เป็นอ็อบเจ็กต์ของ JavaScript.
// ||: นี่เป็นตัวดำเนินการ OR (logical OR) ที่ใช้เลือกค่าเมื่อมีค่าเป็นจริง (truthy) หรือเลือกค่าทางด้านขวาเมื่อค่าทางด้านซ้ายเป็นเท็จ (falsy).
const score = JSON.parse(localStorage.getItem("score")) || {
    // ค่าเริ่มต้นที่จะถูกใช้ถ้าไม่สามารถดึงข้อมูล "score" จาก Local Storage ได้หรือข้อมูลที่ถูกดึงมาไม่ใช่ JSON ที่ถูกแปลงเป็นอ็อบเจ็กต์ ในกรณีนี้, เราจะใช้อ็อบเจ็กต์ที่มีค่าเริ่มต้น 0 สำหรับทุกคุณสมบัติ (wins, losses, ties) เพื่อใช้ในการสร้างตัวแปร score.
    wins: 0,
    losses: 0,
    ties: 0,
  };
  //เรียกใช้ฟังกช์อัพเดทคะแนนแบบ real time
  updateScoreElement();
  
  //   playGame(รับพารามิเตอร์)
  function playGame(playerMove) {
    // 1.เมื่อเรียกใช้ playGame(playerMove)
    // 2.ไปเรียกใช้ pickComputerMove() ต่อ => ไปดูที่ pickComputerMove()
    const computerMove = pickComputerMove();
  
    let result = "";
    // 7. computermove เป็นหิน => user กดอะไรมาถ้ากด กรรไกร => เจอหิน => ก็แพ้
    // ถ้าเลือกหิน => ให้ไปดูต่อว่า computer มันสุ่มอะไรออกมาได้ ; เงื่อนไขข้ออื่นๆก็เหมือนกัน
    if (playerMove === "scissors") {
      if (computerMove === "rock") {
        //8.ก็เก็บค่าที่แพ้ใน result
        result = "You lose.";
      } else if (computerMove === "paper") {
        result = "You win.";
      } else if (computerMove === "scissors") {
        result = "Tie.";
      }
    } else if (playerMove === "paper") {
      if (computerMove === "rock") {
        result = "You win.";
      } else if (computerMove === "paper") {
        result = "Tie.";
      } else if (computerMove === "scissors") {
        result = "You lose.";
      }
    } else if (playerMove === "rock") {
      if (computerMove === "rock") {
        result = "Tie.";
      } else if (computerMove === "paper") {
        result = "You lose.";
      } else if (computerMove === "scissors") {
        result = "You win.";
      }
    }
    // 8.2 Update the score
    if (result === "You win.") {
      score.wins += 1;
    } else if (result === "You lose.") {
      score.losses += 1;
    } else if (result === "Tie.") {
      score.ties += 1;
    }
    localStorage.setItem("score", JSON.stringify(score));
  
    // เรียกใช้ function => update ตลอดบนpage แบบ realtime
    updateScoreElement();
    // เข้าถึง class .js-result
    document.querySelector(".js-result").innerHTML = result;
    // เข้าถึง class .js-move
    document.querySelector(
      ".js-move"
    ).innerHTML = `You  <img src="images/${playerMove}-emoji.png" class="move-icon" />
        <img src="images/${computerMove}-emoji.png" class="move-icon" /> Computer`;
  
    //9. ทำงานต่อที่ alert
  }
  
  function updateScoreElement() {
    // update ตลอดบนpage แบบ realtime
    document.querySelector(
      ".js-score"
    ).innerHTML = `Wins ${score.wins} , Losses ${score.losses} ,Ties ${score.ties}`;
  }
  
  // 3.มาทำงานที่pickComputerMove() ต่อ
  function pickComputerMove() {
    // 4.สุ่มเลขไปเก็บที่ randomNumber
    const randomNumber = Math.random();
  
    let computerMove = "";
    //5.สุ่มเลขโดนอะไร เช่น โดนหิน
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = "rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = "paper";
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = "scissors";
    }
    // 6.ส่งค่า หิน ออกไป
    return computerMove;
  }
  