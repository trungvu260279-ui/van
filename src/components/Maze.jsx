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

// --- BỘ CÂU HỎI MỚI (15 CÂU VỀ NGUYÊN TIÊU) ---
// --- BỘ CÂU HỎI MỚI (ĐÃ CÂN CHỈNH ĐỘ KHÓ & BẪY CÂU CHỮ) ---
const questionsData = [
    // --- LOẠI 1: BẪY "SONG SINH" (NHÌN GIỐNG HỆT NHAU, SAI 1 TỪ CUỐI) ---
    {
        q: "Nếu hiểu chữ 'hồng' (Mộ) chỉ là tính từ chỉ màu sắc thay vì động từ (nổi lửa) thì sai lệch lớn nhất là gì?",
        o: [
            "Làm mất đi vẻ đẹp cổ điển và tính ước lệ của thơ Đường.", // Nhiễu
            "Mất đi sự vận động của hình tượng thơ từ bóng tối ra ánh sáng.", // ĐÚNG (Ánh sáng)
            "Mất đi sự vận động của hình tượng thơ từ bóng tối ra màn đêm.", // SAI (Giống câu trên, thay 'ánh sáng' bằng 'màn đêm')
            "Làm giảm đi tính nhạc của bài thơ.", // Nhiễu
        ],
        c: 1
    },
    {
        q: "Hình ảnh 'cánh chim' trong bài 'Mộ' và 'người tù' có sự tương phản nào?",
        o: [
            "Cánh chim tự do về rừng - Người tù bị giải đi vô định.", // ĐÚNG
            "Cánh chim tự do về rừng - Người tù được tha bổng về nhà.", // SAI (Giống vế đầu, sai vế sau)
            "Cánh chim mệt mỏi - Người tù khỏe khoắn.", // Nhiễu
            "Chim bay ngược gió - Người đi xuôi gió.", // Nhiễu
        ],
        c: 0
    },
    {
        q: "Tại sao nói bài 'Nguyên tiêu' có sự kết hợp giữa chiến sĩ và thi nhân?",
        o: [
            "Vì Bác bàn việc quân xong thì ngắm trăng làm thơ.", // Nhiễu
            "Vì trong cảnh khói sóng việc quân, vẫn có trăng tràn đầy thuyền.", // ĐÚNG
            "Vì trong cảnh khói sóng việc quân, vẫn có súng đạn đầy thuyền.", // SAI (Giống cấu trúc, thay 'trăng' bằng 'súng đạn')
            "Vì Bác vừa đánh giặc vừa viết văn.", // Nhiễu
        ],
        c: 1
    },
    {
        q: "Sự vận động thời gian trong bài 'Mộ' đi theo chiều hướng nào?",
        o: [
            "Từ chiều tối đến đêm khuya, từ buồn sang vui.", // ĐÚNG
            "Từ chiều tối đến đêm khuya, từ vui sang buồn.", // SAI (Ngược vế sau)
            "Từ sáng sớm đến chiều tà.", 
            "Thời gian ngưng đọng bất biến.", 
        ],
        c: 0
    },

    // --- LOẠI 2: ĐỘ DÀI NGẮN LỘN XỘN (GÂY NHIỄU TÂM LÝ) ---
    {
        q: "Việc dịch 'Sơn thôn thiếu nữ' thành 'Cô em xóm núi' (Mộ) gây ra hạn chế gì lớn nhất?",
        o: [
            "Mất trang trọng.", // Ngắn - ĐÚNG (Súc tích)
            "Làm mất đi vẻ đẹp hiện đại, khỏe khoắn và tư thế chủ động của người lao động trong nguyên tác.", // Dài - Nhiễu (Nghe rất hay nhưng sai bản chất 'hiện đại')
            "Sai ngữ pháp.", // Ngắn - Nhiễu
            "Làm nhân vật già đi.", // Ngắn - Nhiễu
        ],
        c: 0
    },
    {
        q: "Điệp từ 'xuân' 3 lần trong 'Nguyên tiêu' có tác dụng gì?",
        o: [
            "Gợi sức sống lan tỏa, kết nối không gian thành khối thống nhất.", // Dài - ĐÚNG
            "Tăng tính nhạc.", // Ngắn - Nhiễu
            "Nhấn mạnh nỗi buồn mùa xuân.", // Ngắn - Nhiễu
            "Tạo nhịp điệu dồn dập, hối hả như bước chân hành quân của người chiến sĩ.", // Dài - Nhiễu
        ],
        c: 0
    },
    {
        q: "Chữ 'Quyện' trong 'Mộ' nếu dịch là 'trôi nhẹ' thì mất đi ý nghĩa gì?",
        o: [
            "Sự mệt mỏi.", // Ngắn - Nhiễu
            "Sự gắn bó, vấn vương của chòm mây với bầu trời, ẩn dụ cho nỗi lòng Bác.", // Dài - ĐÚNG
            "Vẻ đẹp thiên nhiên hùng vĩ, tráng lệ của núi rừng lúc chiều tà.", // Dài - Nhiễu
            "Sự lạnh lẽo.", // Ngắn - Nhiễu
        ],
        c: 1
    },

    // --- LOẠI 3: ĐỘ DÀI Y HỆT NHAU (KHÓ ĐOÁN MÒ, PHẢI ĐỌC KỸ) ---
    {
        q: "Bản dịch câu 'Yên ba thâm xứ' thành 'Giữa dòng bàn bạc' thiếu sót điều gì?",
        o: [
            "Không gian bí mật, thâm nghiêm của việc quân.", // ĐÚNG
            "Không gian lãng mạn, trữ tình của người thi sĩ.", // (Độ dài tương đương)
            "Không gian ồn ào, náo nhiệt của buổi thắng trận.", // (Độ dài tương đương)
            "Không gian rộng lớn, bao la của dòng sông Lô.", // (Độ dài tương đương)
        ],
        c: 0
    },
    {
        q: "Hình ảnh 'Nguyệt mãn thuyền' (Trăng đầy thuyền) biểu thị sự chuyển hóa nào?",
        o: [
            "Từ con thuyền việc quân thành con thuyền thi ca.", // ĐÚNG
            "Từ con thuyền nhỏ bé thành con thuyền vĩ đại.", 
            "Từ con thuyền chiến đấu thành con thuyền du lịch.", 
            "Từ con thuyền ẩn nấp thành con thuyền công khai.", 
        ],
        c: 0
    },
    {
        q: "Bút pháp cổ điển thể hiện rõ nhất ở điểm nào trong hai bài thơ?",
        o: [
            "Sử dụng thi liệu ước lệ và bút pháp chấm phá.", // ĐÚNG
            "Sử dụng ngôn ngữ đời thường và tả thực chi tiết.", 
            "Sử dụng thể thơ tự do và nhịp điệu phá cách.", 
            "Sử dụng hình ảnh con người làm trung tâm bức tranh.", 
        ],
        c: 0
    },
    {
        q: "Điểm chung về 'thi pháp' của Hồ Chí Minh trong hai bài thơ là gì?",
        o: [
            "Luôn vận động hướng về sự sống và ánh sáng.", // ĐÚNG
            "Luôn tập trung miêu tả nỗi buồn và bóng tối.", 
            "Luôn sử dụng điển cố điển tích cực kỳ khó hiểu.", 
            "Luôn đề cao vai trò cá nhân hơn là cộng đồng.", 
        ],
        c: 0
    },

    // --- CÁC CÂU HỖN HỢP KHÁC ---
    {
        q: "Câu 'Kim dạ nguyên tiêu nguyệt chính viên' nhấn mạnh điều gì?",
        o: [
            "Vẻ đẹp tròn đầy viên mãn của trăng rằm.", // ĐÚNG
            "Nỗi buồn man mác khi trăng sắp tàn.", 
            "Sự cô đơn của con người dưới trăng.", 
            "Ánh sáng chói chang làm lu mờ sao.", 
        ],
        c: 0
    },
    {
        q: "Yếu tố nào làm cân bằng lại sự lạnh lẽo trong thơ Bác?",
        o: [
            "Hơi ấm của sự sống con người.", // ĐÚNG
            "Sự ồn ào của tiếng chim kêu.", // Nhiễu (Chim kêu chỉ gợi buồn)
            "Màu sắc sặc sỡ của hoa lá.", // Nhiễu
            "Ánh nắng gay gắt của mặt trời.", // Nhiễu
        ],
        c: 0
    },
    {
        q: "Trong bài 'Mộ', hình ảnh 'lò than rực hồng' có vai trò gì?",
        o: [
            "Xua tan cái lạnh và bóng tối.", // ĐÚNG
            "Báo hiệu trời đã sáng hẳn.", // Nhiễu
            "Thể hiện sự nghèo khó.", // Nhiễu
            "Làm nền cho cô gái xuất hiện.", // Nhiễu
        ],
        c: 0
    },
    {
        q: "Từ 'mạn mạn' (Mộ) dịch là 'lững lờ' thể hiện tâm thế gì?",
        o: [
            "Ung dung tự tại.", // ĐÚNG
            "Buồn bã chán chường.", // Nhiễu
            "Vội vã gấp gáp.", // Nhiễu
            "Sợ hãi lo âu.", // Nhiễu
        ],
        c: 0
    },
    {
        q: "Vị thế của nhân vật trữ tình trong 'Mộ' và 'Nguyên tiêu' khác nhau thế nào?",
        o: [
            "Người tù bị động >< Lãnh tụ chủ động.", // ĐÚNG
            "Người dân thường >< Quan lại phong kiến.", 
            "Người đi đường >< Người ngồi nhà.", 
            "Nạn nhân >< Kẻ chiến thắng.", 
        ],
        c: 0
    },
    {
        q: "Bản dịch 'Trăng ngân đầy thuyền' (Nguyên tiêu) thêm yếu tố nào sai nguyên tác?",
        o: [
            "Âm thanh (Ngân).", // ĐÚNG
            "Ánh sáng (Sáng).", 
            "Màu sắc (Vàng).", 
            "Cảm xúc (Vui).", 
        ],
        c: 0
    },
    {
        q: "Quan niệm thời gian phương Đông trong 'Nguyên tiêu' thể hiện qua đâu?",
        o: [
            "Trăng tròn là điềm lành khởi đầu vận hội mới.", // ĐÚNG
            "Trăng tròn là dấu hiệu của sự kết thúc.", 
            "Trăng tròn báo hiệu mùa màng thất bát.", 
            "Trăng tròn gợi nhớ quê hương cũ.", 
        ],
        c: 0
    },
    {
        q: "Chất 'thép' trong 'Mộ' nằm ở đâu?",
        o: [
            "Bản lĩnh vượt lên hoàn cảnh.", // ĐÚNG
            "Lời lẽ đanh thép tố cáo.", 
            "Hành động phá ngục.", 
            "Vũ khí mang theo người.", 
        ],
        c: 0
    },
    {
        q: "Không gian trong 'Nguyên tiêu' vận động ra sao?",
        o: [
            "Từ vũ trụ bao la thu về con thuyền.", // ĐÚNG
            "Từ con thuyền mở rộng ra vũ trụ.", 
            "Từ bờ sông này sang bờ sông kia.", 
            "Từ mặt đất bay lên bầu trời.", 
        ],
        c: 0
    }
];

// --- CẤU HÌNH GIAN LẬN (MULTI TARGET) ---
const HATED_PERSON = ["Kỳ Anh", "Hiệp"]; 
const HATED_CHANCE = 0.5; // 50% khả năng trúng

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
      if (queue.length === 0) queue = [...questionsData].sort(() => Math.random() - 0.5);
      const nextQ = queue[0];
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
                    {/* --- ADDED: Nến ở màn hình câu hỏi --- */}
                    

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