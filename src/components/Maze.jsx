import React, { useState, useEffect, useRef } from 'react';
import FunnyCandle from './FunnyCandle'; // Đảm bảo bạn đã tạo file FunnyCandle.jsx cùng thư mục

// --- DỮ LIỆU CỨNG ---
const names = [
    "Thuý Anh", "Kỳ Anh", "Việt Anh", "Phương Anh", "Bắc", "Cúc", "Dung", 
    "Đăng", "Hà", "Hiệp", "Hồng", "Nguyễn Huy", "Dương Hương", "Kiều", 
    "Lan", "Hoàng Ly", "Nguyễn Ly", "Trà Mai", "Xuân Mai", "Minh", "Nam", 
    "Niên", "Nguyễn Phương", "Vũ Phương", "Thanh", "Thành", "Thu", "Thùy", 
    "Thúy", "Trưởng", "Tuyên", "Tuyết"
];

// --- BỘ CÂU HỎI MỚI (ĐÃ SỬA LỖI KHAI BÁO BIẾN & NGOẶC) ---
const questionsData = [
    {
        "q": "Trong câu thơ 'Xuân giang xuân thủy tiếp xuân thiên', xét về mặt ngữ pháp và chú thích sách giáo khoa, từ 'xuân' đóng vai trò là:",
        "o": [
            "Danh từ chỉ thời gian làm chủ ngữ cho các thực thể giang, thủy, thiên.",
            "Trạng ngữ chỉ bối cảnh không gian mùa xuân tại chiến khu Việt Bắc.",
            "Định ngữ cho các danh từ, dùng để chỉ khí sắc và sức sống của thiên nhiên.",
            "Động từ chỉ sự vận động nối tiếp nhau giữa các mảng không gian đêm rằm."
        ],
        "c": 2
    },
    {
        "q": "Chữ 'viên' trong cụm 'nguyệt chính viên' (phiên âm) được chú thích nhằm thể hiện ý niệm gì sâu sắc nhất?",
        "o": [
            "Sự tròn trịa tuyệt đối của hình khối vầng trăng rằm tháng Giêng.",
            "Sự hội tụ đầy đủ của các thành viên trong hội nghị quân sự bí mật.",
            "Ý niệm về một sức sống đang ở độ căng tràn và viên mãn.",
            "Sự kết thúc của một chu kỳ thời gian trong ngày làm việc của lãnh tụ."
        ],
        "c": 2
    },
    {
        "q": "Tại sao nói hình ảnh 'yên ba thâm xứ' trong thơ Hồ Chí Minh có sự khác biệt về tư thế so với thơ cổ điển?",
        "o": [
            "Trong thơ cổ nó gợi nỗi sầu nhân thế, trong thơ Bác nó gợi nỗi buồn chiến tranh.",
            "Trong thơ cổ nó là cảnh giả tưởng, trong thơ Bác nó là cảnh tả thực hoàn toàn.",
            "Trong thơ cổ con người thường bất lực trước khói sóng, trong thơ Bác con người chủ động bàn việc quân giữa khói sóng.",
            "Trong thơ cổ nó chỉ xuất hiện vào buổi chiều, trong thơ Bác nó xuất hiện vào nửa đêm."
        ],
        "c": 2
    },
    {
        "q": "Xét về sự vận động của hình tượng thơ, nhận định nào sau đây là SAI khi nói về bài thơ Nguyên tiêu?",
        "o": [
            "Vận động từ không gian vũ trụ mênh mông về không gian con người cụ thể.",
            "Vận động từ ánh sáng trăng rằm đến sự đầy ắp của trăng trên thuyền.",
            "Vận động từ trạng thái thưởng ngoạn thiên nhiên sang trạng thái lo âu về quân sự.",
            "Vận động từ thời điểm trăng vừa tròn đến thời điểm nửa đêm khuya."
        ],
        "c": 2
    },
    {
        "q": "Chú thích chỉ ra chữ 'mãn' được dùng như một động từ. Việc lựa chọn từ loại này giúp hình ảnh ánh trăng mang sắc thái gì?",
        "o": [
            "Tĩnh lặng và lan tỏa đều khắp không gian sông nước Việt Bắc.",
            "Chủ động tràn xuống và làm đầy ắp con thuyền như một thực thể hữu hình.",
            "Phản chiếu vẻ lấp lánh và âm thanh ngân vang trên mặt nước đêm khuya.",
            "Che lấp các khoảng không gian trống trải trên con thuyền của người chiến sĩ."
        ],
        "c": 1
    },
    {
        "q": "Điểm 'bẫy' nhất khi so sánh giữa bản 'Dịch thơ' và 'Nguyên tác' ở câu cuối là gì?",
        "o": [
            "Bản dịch thơ dùng từ 'khuya' thay cho 'nửa đêm' làm sai lệch mốc thời gian.",
            "Bản dịch thơ dùng từ 'bát ngát' làm mất đi sự chật hẹp của con thuyền.",
            "Chữ 'ngân' (dịch thơ) thiên về ánh sáng/âm thanh, còn chữ 'mãn' (nguyên tác) thiên về khối lượng/sức chứa.",
            "Bản dịch thơ dùng thể thơ lục bát làm mất đi tính trang trọng của thể thất ngôn."
        ],
        "c": 2
    },
    {
        "q": "Thủ pháp 'vẽ mây nảy trăng' trong bài thơ này được thực hiện thông qua việc:",
        "o": [
            "Miêu tả chi tiết những đám mây khói trên dòng sông xuân để gợi trăng.",
            "Dùng sức xuân lan tỏa của giang, thủy, thiên để tôn vinh vị thế của vầng trăng rằm.",
            "Dùng sự vắng lặng của nơi thâm xứ để làm nổi bật tiếng bàn bạc việc quân.",
            "Dùng hình ảnh con thuyền nhỏ bé để đối lập với bầu trời xuân bao la."
        ],
        "c": 1
    },
    {
        "q": "Cụm từ 'dạ bán' (nửa đêm) đóng vai trò gì trong cấu trúc tâm trạng của nhân vật trữ tình?",
        "o": [
            "Đánh dấu sự kết thúc của một cảm hứng thơ ca lãng mạn.",
            "Khẳng định cường độ làm việc tận tụy và phong thái ung dung giữa thời điểm chuyển giao.",
            "Thể hiện sự mệt mỏi của người chiến sĩ sau những giờ bàn việc quân căng thẳng.",
            "Là cái cớ để nhà thơ tìm đến vẻ đẹp của trăng sau khi đã hết việc."
        ],
        "c": 1
    },
    {
        "q": "Nhận định nào sau đây chỉ rõ sự kết hợp giữa 'chất thép' và 'chất tình' một cách chính xác nhất?",
        "o": [
            "Chất thép nằm ở thể thơ tứ tuyệt, chất tình nằm ở hình ảnh ánh trăng rằm.",
            "Chất thép nằm ở việc phê phán kẻ thù, chất tình nằm ở tình yêu sông nước.",
            "Chất thép nằm ở bản lĩnh bàn việc quân, chất tình nằm ở tâm hồn giao hòa cùng thiên nhiên.",
            "Chất thép nằm ở khói sóng mịt mù, chất tình nằm ở con thuyền chở đầy trăng."
        ],
        "c": 2
    },
    {
        "q": "Từ 'tiếp' trong câu thơ thứ hai gắn kết ba danh từ nào để tạo nên không gian vô biên?",
        "o": [
            "Xuân giang - Xuân nhật - Xuân thiên.",
            "Xuân giang - Xuân thủy - Xuân thiên.",
            "Xuân giang - Xuân ba - Xuân thiên.",
            "Xuân giang - Xuân thuyền - Xuân thiên."
        ],
        "c": 1
    },
    {
        "q": "Trong câu 'Yên ba thâm xứ đàm quân sự', mối liên hệ giữa không gian và hoạt động con người là:",
        "o": [
            "Đối lập gay gắt giữa sự tĩnh lặng của ngoại cảnh và sự ồn ào của việc quân.",
            "Cách biệt hoàn toàn nhằm bảo mật cho cuộc họp quan trọng của lãnh đạo.",
            "Hài hòa tuyệt đối: không gian thâm nghiêm làm tôn lên tính chất thiêng liêng của việc nước.",
            "Tương hỗ: ánh trăng giúp con người nhìn rõ các bản đồ quân sự trên thuyền."
        ],
        "c": 2
    },
    {
        "q": "Nhận định nào sau đây là SAI khi nói về phong cách cổ điển trong Nguyên tiêu?",
        "o": [
            "Sử dụng thể thơ thất ngôn tứ tuyệt bằng chữ Hán chuẩn mực.",
            "Sử dụng các thi liệu ước lệ: trăng rằm, khói sóng, con thuyền.",
            "Sử dụng cái tôi cá nhân lẻ loi, sầu muộn trước vũ trụ bao la.",
            "Sử dụng bút pháp chấm phá, gợi nhiều hơn tả trong bức tranh thiên nhiên."
        ],
        "c": 2
    },
    {
        "q": "Tại sao có thể nói hình ảnh 'trăng đầy thuyền' là một sự vận động từ bóng tối ra ánh sáng?",
        "o": [
            "Vì lúc đầu trăng bị khói che khuất, lúc sau trăng mới hiện ra rạng rỡ.",
            "Vì lúc đầu bàn việc quân trong tối, lúc sau về nhà mới có ánh sáng trăng.",
            "Vì ánh trăng tràn ngập thuyền gợi niềm tin thắng lợi, xua tan cái mịt mù của khói sóng.",
            "Vì con thuyền đi từ nơi không có trăng đến nơi có ánh trăng rằm rực rỡ nhất."
        ],
        "c": 2
    },
    {
        "q": "Sự khác biệt về bối cảnh địa lý giữa bài thơ Mộ (Chiều tối) và Nguyên tiêu là:",
        "o": [
            "Mộ diễn ra ở Việt Bắc, Nguyên tiêu diễn ra ở Quảng Tây (Trung Quốc).",
            "Mộ diễn ra trên đường đi lao ở Trung Quốc, Nguyên tiêu diễn ra tại chiến khu Việt Bắc.",
            "Cả hai bài đều diễn ra tại chiến khu Việt Bắc nhưng thời điểm khác nhau.",
            "Mộ diễn ra trên sông nước, Nguyên tiêu diễn ra ở vùng núi rừng hiểm trở."
        ],
        "c": 1
    },
    {
        "q": "Ý nghĩa nhân văn sâu sắc nhất của bài thơ Nguyên tiêu nằm ở:",
        "o": [
            "Việc miêu tả thành công vẻ đẹp của đêm rằm tháng Giêng năm 1948.",
            "Việc khẳng định tài năng sử dụng ngôn ngữ cổ điển bậc thầy của Hồ Chí Minh.",
            "Việc khẳng định phong thái ung dung, tự tại và bản lĩnh của người chiến sĩ cách mạng.",
            "Việc kêu gọi mọi người hãy biết tận hưởng vẻ đẹp của thiên nhiên ngay cả khi có chiến tranh."
        ],
        "c": 2
    }
];

// --- CẤU HÌNH GIAN LẬN (MULTI TARGET) ---
const HATED_PERSON = ["Tuyết","Cúc","Hiệp","Dung","Thùy","Hồng","Hà"]; 
const HATED_CHANCE = 0.2; // 30% khả năng trúng

const Maze = () => {
  const [rooms, setRooms] = useState([]);
  const [robotPos, setRobotPos] = useState(null);
  const [status, setStatus] = useState('IDLE'); 
  const [displayedName, setDisplayedName] = useState(''); 
  const [isDeciphering, setIsDeciphering] = useState(false); 
  const [killPhase, setKillPhase] = useState('NAME'); 
  const [currentQuest, setCurrentQuest] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [questionQueue, setQuestionQueue] = useState([]);
  const [logText, setLogText] = useState('SYSTEM READY...');
  const [currentScore, setCurrentScore] = useState(0); 
  const [leaderboard, setLeaderboard] = useState([]); 
  const [showLeaderboard, setShowLeaderboard] = useState(false); 
  const [visitedIndices, setVisitedIndices] = useState(new Set()); // Lưu vết xước
  const autoNextTimer = useRef(null);

  useEffect(() => {
    let gridData = [...names];
    if (gridData.length < 20) gridData = [...gridData, ...gridData];
    setRooms(gridData);
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    setQuestionQueue(shuffled);
    return () => clearTimeout(autoNextTimer.current);
  }, []);

  if (!rooms || rooms.length === 0) return <div style={{color:'lime'}}>LOADING SYSTEM...</div>;

  const getUniqueQuestion = () => {
      let queue = [...questionQueue];
      // Nếu hết câu hỏi thì nạp lại và trộn thứ tự câu hỏi
      if (queue.length === 0) queue = [...questionsData].sort(() => Math.random() - 0.5);
      
      const rawQ = queue[0];

      // --- BẮT ĐẦU LOGIC TRỘN ĐÁP ÁN (SHUFFLE OPTIONS) ---
      // 1. Tạo mảng tạm lưu nội dung đáp án kèm dấu hiệu nhận biết đáp án đúng
      const optionsWithStatus = rawQ.o.map((opt, index) => ({
          text: opt,
          isCorrect: index === rawQ.c
      }));

      // 2. Trộn ngẫu nhiên mảng tạm này
      const shuffledOptions = optionsWithStatus.sort(() => Math.random() - 0.5);

      // 3. Tạo object câu hỏi mới với thứ tự đáp án đã trộn
      const nextQ = {
          ...rawQ,
          o: shuffledOptions.map(item => item.text), // Mảng text mới
          c: shuffledOptions.findIndex(item => item.isCorrect) // Tìm index mới của đáp án đúng
      };
      // --- KẾT THÚC LOGIC TRỘN ---

      setQuestionQueue(queue.slice(1));
      return nextQ;
  };

  const pickTarget = () => {
    const availableHatedIndices = [];
    rooms.forEach((name, index) => {
        if (HATED_PERSON.includes(name)) availableHatedIndices.push(index);
    });

    if (availableHatedIndices.length > 0 && Math.random() < HATED_CHANCE) {
        const randomIndex = Math.floor(Math.random() * availableHatedIndices.length);
        return availableHatedIndices[randomIndex];
    }
    return Math.floor(Math.random() * rooms.length);
  };

  const startHunt = () => {
    if (status !== 'IDLE') return;
    setStatus('SCANNING');
    setKillPhase('NAME'); 
    setAnswerStatus(null);
    setDisplayedName('');
    setCurrentScore(0); 
    setVisitedIndices(new Set()); 
    setLogText("INITIATING HYPER-SCAN...");
    
    const finalTargetIndex = pickTarget(); 
    let currentIdx = Math.floor(Math.random() * rooms.length);
    let steps = 0;
    const maxSteps = 60; 
    
    // --- TỐC ĐỘ 30ms (SIÊU NHANH) ---
    const scanInterval = setInterval(() => {
      currentIdx = Math.floor(Math.random() * rooms.length);
      setRobotPos(currentIdx);
      setVisitedIndices(prev => new Set(prev).add(currentIdx)); // Để lại vết xước
      steps++;
      
      if(steps % 3 === 0) setLogText(`SCANNING SECTOR ${Math.floor(Math.random()*999)}...`);
      
      if (steps > maxSteps) {
        clearInterval(scanInterval);
        
        // --- LOGIC HỎA MÙ ---
        let fakeTargetIndex;
        do { fakeTargetIndex = Math.floor(Math.random() * rooms.length); } while (fakeTargetIndex === finalTargetIndex);
        
        setRobotPos(fakeTargetIndex);
        setVisitedIndices(prev => new Set(prev).add(fakeTargetIndex));
        setLogText(`⚠️ SUSPICIOUS ACTIVITY: ${rooms[fakeTargetIndex]}...`);

        setTimeout(() => {
            setLogText(`🔒 LOCKING TARGET: ${rooms[fakeTargetIndex]} [CONFIRMING...]`);
            setTimeout(() => {
                setLogText("❌ ERROR: FALSE POSITIVE! RE-ACQUIRING...");
                setTimeout(() => {
                    setRobotPos(finalTargetIndex);
                    setTimeout(() => { triggerKill(finalTargetIndex); }, 200); 
                }, 300);
            }, 1000); 
        }, 1000); 
      }
    }, 30); 
  };

  const triggerKill = (index) => {
    setStatus('KILLED');
    const realName = rooms[index];
    const nextQ = getUniqueQuestion();
    setCurrentQuest(nextQ);
    setIsDeciphering(true);
    setLogText(`DECRYPTING TARGET ID...`);
    let scrambleCount = 0;
    const maxScrambles = 20; 
    const scrambleInterval = setInterval(() => {
        let fakeBinary = "";
        for(let i=0; i < realName.length * 2; i++) fakeBinary += Math.random() > 0.5 ? "1" : "0";
        setDisplayedName(fakeBinary);
        scrambleCount++;
        if (scrambleCount >= maxScrambles) {
            clearInterval(scrambleInterval);
            setDisplayedName(realName);
            setIsDeciphering(false);
            setLogText(`TARGET LOCKED: ${realName}`);
            setTimeout(() => { setKillPhase('QUESTION'); setLogText("QUEST MODE ACTIVATED"); }, 2000);
        }
    }, 80); 
  };

  const handleAnswer = (optionIndex) => {
      setKillPhase('RESULT');
      if (autoNextTimer.current) clearTimeout(autoNextTimer.current);
      if (optionIndex === currentQuest.c) {
          const newScore = currentScore + 1;
          setCurrentScore(newScore);
          setAnswerStatus('CORRECT');
          setLogText(`CORRECT! AUTO-NEXT IN 2S...`);
          autoNextTimer.current = setTimeout(() => { nextQuestionSamePerson(); }, 2000);
      } else {
          setAnswerStatus('WRONG');
          setLogText("ANSWER INCORRECT. GAME OVER.");
          addToLeaderboard(displayedName, currentScore);
      }
  };

  const addToLeaderboard = (name, score) => {
      setLeaderboard(prev => {
          const newList = [...prev, { name, score }];
          return newList.sort((a, b) => b.score - a.score);
      });
  };

  const nextQuestionSamePerson = () => {
      const nextQ = getUniqueQuestion();
      setCurrentQuest(nextQ);
      setAnswerStatus(null);
      setKillPhase('QUESTION'); 
      setLogText("NEXT QUESTION LOADED...");
  };

  const resetSystem = () => {
      if (autoNextTimer.current) clearTimeout(autoNextTimer.current);
      setStatus('IDLE');
      setRobotPos(null);
      setDisplayedName('');
      setLogText('SYSTEM READY...');
      setKillPhase('NAME');
      setAnswerStatus(null);
      setCurrentScore(0);
      setVisitedIndices(new Set()); 
  };

  return (
    <div className="maze-screen">
      {/* --- ADDED: Nến ở màn hình chính --- */}
      <FunnyCandle />

      <h1 className="hud-title">HỆ THỐNG TRUY QUÉT</h1>

      <div className="maze-grid" style={{opacity: killPhase === 'NAME' || status !== 'KILLED' ? 1 : 0.1}}>
        {rooms.map((name, idx) => {
            let cellClass = "room-cell";
            if (robotPos === idx) {
                cellClass += " room-scanned";
            } else if (visitedIndices.has(idx)) {
                cellClass += " room-trace";
            }
            if (status === 'KILLED' && robotPos === idx) cellClass += " room-killed"; 
            
            return <div key={idx} className={cellClass} id={`room-${idx}`}>{name}</div>;
        })}
        {robotPos !== null && (
            <div className={`robot-crosshair ${status === 'KILLED' ? 'crosshair-kill' : ''}`}
                style={{
                    top: (document.getElementById(`room-${robotPos}`)?.offsetTop || 0) + ((document.getElementById(`room-${robotPos}`)?.offsetHeight || 0) / 2),
                    left: (document.getElementById(`room-${robotPos}`)?.offsetLeft || 0) + ((document.getElementById(`room-${robotPos}`)?.offsetWidth || 0) / 2),
                }}
            ></div>
        )}
      </div>

      <div className="scan-log">_LOG: {logText}</div>
      
      {status === 'KILLED' && (
        <>
            {killPhase === 'NAME' && (
                <div className="result-alert">
                    <div className="alert-title">MỤC TIÊU</div>
                    <div className={`alert-name ${isDeciphering ? 'glitch-text' : 'final-text'}`}>
                        {displayedName}
                    </div>
                </div>
            )}
            {(killPhase === 'QUESTION' || killPhase === 'RESULT') && currentQuest && (
                <div className="fullscreen-mode">
                    <div className="score-badge">ĐIỂM SỐ: {currentScore}</div>
                    <div className="player-indicator">NGƯỜI CHƠI: {displayedName}</div>
                    
                    {killPhase === 'QUESTION' && (
                        <div className="big-quest-container">
                            <div className="big-quest-text">{currentQuest.q}</div>
                            <div className="big-options-grid">
                                {currentQuest.o.map((opt, idx) => (
                                    <button key={idx} className="big-option-btn" onClick={() => handleAnswer(idx)}>
                                        <span className="opt-prefix">{['A', 'B', 'C', 'D'][idx]}.</span> {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {killPhase === 'RESULT' && (
                        <div className="big-result-container">
                            {answerStatus === 'CORRECT' ? (
                                <>
                                    <h1 className="big-success-text">CHÍNH XÁC!</h1>
                                    <div className="big-correct-note" style={{color: 'var(--color-scan)', marginTop:'10px'}}>+1 ĐIỂM</div>
                                    <div style={{marginTop: '30px', color: '#fff', fontSize: '1.5rem', animation: 'pulse 1s infinite'}}>⏳ ĐANG TỰ ĐỘNG CHUYỂN CÂU HỎI...</div>
                                </>
                            ) : (
                                <>
                                    <h1 className="big-fail-text">SAI RỒI!</h1>
                                    <div className="big-correct-note">ĐÁP ÁN ĐÚNG LÀ: <br/><span style={{color: '#fff', fontSize: '3rem', fontWeight:'bold'}}>{currentQuest.o[currentQuest.c]}</span></div>
                                    <div style={{marginTop: '20px', color: '#ffd700', fontSize: '1.5rem'}}>KẾT THÚC: {currentScore} ĐIỂM (ĐÃ LƯU BẢNG VÀNG)</div>
                                    <div className="big-result-buttons">
                                        <button className="hud-btn" style={{borderColor: 'white', color: 'white', padding: '20px 50px'}} onClick={resetSystem}>NGƯỜI TIẾP THEO ➜</button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
      )}

      {status === 'IDLE' && (
        <>
             <button className="hud-btn" onClick={() => setShowLeaderboard(true)} style={{position: 'absolute', top: '30px', left: '30px', borderColor: '#ffd700', color: '#ffd700', boxShadow: '0 0 10px rgba(255,215,0,0.3)', zIndex: 20}}>🏆 BXH</button>
            <button className="hud-btn" onClick={startHunt} style={{position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10}}>BẮT ĐẦU TRUY LÙNG</button>
        </>
      )}

      {showLeaderboard && (
          <div className="leaderboard-overlay">
              <div className="leaderboard-box">
                  <h2 className="leaderboard-title">BẢNG VÀNG THÀNH TÍCH</h2>
                  <div className="leaderboard-list">
                      {leaderboard.length === 0 ? (
                          <div style={{color:'#666', fontSize: '1.5rem', margin:'40px 0'}}>CHƯA CÓ DỮ LIỆU...<br/><span style={{fontSize: '1rem'}}>(Hãy chơi để ghi danh)</span></div>
                      ) : (
                          <table className="rank-table">
                              <thead><tr><th style={{width: '100px'}}>HẠNG</th><th>TÊN</th><th style={{textAlign: 'right'}}>ĐIỂM</th></tr></thead>
                              <tbody>
                                  {leaderboard.map((item, index) => (
                                      <tr key={index} className={`rank-row rank-${index + 1}`}>
                                          <td>#{index + 1}</td><td>{item.name}</td><td style={{textAlign: 'right'}}>{item.score}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      )}
                  </div>
                  <button className="btn-close-lb" onClick={() => setShowLeaderboard(false)}>ĐÓNG BẢNG</button>
              </div>
          </div>
      )}
    </div>
  );
};

export default Maze;


