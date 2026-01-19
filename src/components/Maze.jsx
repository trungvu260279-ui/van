import React, { useState, useEffect, useRef } from 'react';

// --- DỮ LIỆU CỨNG ---
const names = [
    "Thuý Anh", "Kỳ Anh", "Việt Anh", "Phương Anh", "Bắc", "Cúc", "Dung", 
    "Đăng", "Hà", "Hiệp", "Hồng", "Nguyễn Huy", "Dương Hương", "Kiều", 
    "Lan", "Hoàng Ly", "Nguyễn Ly", "Trà Mai", "Xuân Mai", "Minh", "Nam", 
    "Niên", "Nguyễn Phương", "Vũ Phương", "Thanh", "Thành", "Thu", "Thùy", 
    "Thúy", "Trưởng", "Tuyên", "Tuyết"
];

// --- BỘ CÂU HỎI MỚI (15 CÂU VỀ NGUYÊN TIÊU) ---
const questionsData = [
    { 
        q: "Trong câu thơ \"Xuân giang xuân thủy tiếp xuân thiên\", việc lặp lại 3 lần điệp từ \"xuân\" mang lại hiệu quả nghệ thuật gì?", 
        o: ["Gợi sự lạnh lẽo, hiu hắt của núi rừng Việt Bắc.", "Gợi tả sức sống tràn trề, sự giao hòa không ranh giới.", "Nhấn mạnh sự thay đổi nhanh chóng của thời gian.", "Thể hiện nỗi nhớ quê hương da diết."], 
        c: 1 // Đáp án B
    },
    { 
        q: "Hình ảnh \"nguyệt chính viên\" (trăng vừa đúng độ tròn đầy) phản ánh điều gì về cảnh sắc thiên nhiên?", 
        o: ["Vẻ đẹp viên mãn, căng tràn và tươi sáng nhất.", "Ánh trăng đang mờ dần do sương mù che phủ.", "Gợi sự bắt đầu của một chu kỳ mới đầy gian khổ.", "Thể hiện sự tàn lụi, héo úa của thời gian."], 
        c: 0 // Đáp án A
    },
    { 
        q: "Tại sao địa điểm bàn việc quân lại được tác giả chọn là \"yên ba thâm xứ\" (nơi khói sóng thăm thẳm)?", 
        o: ["Miêu tả sự cô độc và lạc lối của con người.", "Đây là vị trí thuận lợi nhất để tấn công.", "Tạo không gian thâm nghiêm, tĩnh lặng, hệ trọng.", "Khẳng định sự tách biệt giữa thiên nhiên và chiến tranh."], 
        c: 2 // Đáp án C
    },
    { 
        q: "Hình ảnh \"nguyệt mãn thuyền\" trong câu thơ cuối gợi lên điều gì về kết quả cuộc họp?", 
        o: ["Sự mệt mỏi, kiệt sức của các chiến sĩ.", "Sự cô đơn, tĩnh lặng của con thuyền.", "Niềm tin lạc quan, sự viên mãn và thành công rạng rỡ.", "Sự bế tắc, chưa tìm được lối ra."], 
        c: 2 // Đáp án C
    },
    { 
        q: "Theo chú thích, từ \"mãn\" được sử dụng như một động từ nhằm diễn tả điều gì?", 
        o: ["Ánh trăng đang tràn xuống và làm đầy ắp con thuyền.", "Sự biến mất dần của ánh sáng.", "Ánh trăng đang đứng yên, tỏa sáng cố định.", "Tiếng vang vọng của ánh trăng."], 
        c: 0 // Đáp án A
    },
    { 
        q: "Mối tương quan giữa \"chiến sĩ\" và \"nghệ sĩ\" trong câu \"Yên ba thâm xứ đàm quân sự\" là gì?", 
        o: ["Tách biệt hoàn toàn, xong việc quân mới làm thơ.", "Chiến sĩ phải hy sinh tâm hồn nghệ sĩ.", "Hòa quyện làm một: làm cách mạng giữa không gian thơ mộng.", "Tư cách nghệ sĩ lấn át tư cách chiến sĩ."], 
        c: 2 // Đáp án C
    },
    { 
        q: "Việc lựa chọn thể thơ Thất ngôn tứ tuyệt mang phong vị Đường thi có ý nghĩa gì?", 
        o: ["Nhằm che giấu các thông tin quân sự nhạy cảm.", "Tạo vẻ đẹp cổ điển nhưng chứa nội dung hiện đại.", "Thể hiện sự cũ kỹ trong tư duy sáng tác.", "Chứng tỏ khả năng sử dụng chữ Hán bậc thầy."], 
        c: 1 // Đáp án B
    },
    { 
        q: "Hình ảnh \"trăng đầy thuyền\" ở cuối bài thơ là biểu tượng cho điều gì?", 
        o: ["Sự đối lập giữa con người và vũ trụ.", "Tâm hồn phóng khoáng, ung dung và niềm tin chiến thắng.", "Sự ám ảnh về bóng tối và khó khăn.", "Nỗi buồn thầm kín vì gánh vác việc nước."], 
        c: 1 // Đáp án B
    },
    { 
        q: "So sánh \"Dịch nghĩa\" và \"Dịch thơ\" câu 4: Chữ \"ngân\" và chữ \"mãn\" khác nhau thế nào?", 
        o: ["\"Ngân\" lột tả độ nặng tốt hơn \"mãn\".", "Hai từ hoàn toàn tương đương.", "\"Mãn\" gợi trăng tràn đầy (hữu hình), \"ngân\" gợi vang xa.", "\"Mãn\" gợi sự buồn bã, \"ngân\" gợi sự tươi vui."], 
        c: 2 // Đáp án C
    },
    { 
        q: "Nhận xét nào đúng nhất về sự vận động không gian trong bài thơ Nguyên tiêu?", 
        o: ["Từ không gian bao la sang không gian cụ thể con thuyền.", "Từ sông nước hẹp sang bầu trời rộng mở.", "Không gian hoàn toàn tĩnh tại.", "Từ nơi ánh sáng trăng rằm sang nơi bóng tối."], 
        c: 0 // Đáp án A
    },
    { 
        q: "Thủ pháp \"Thi trung hữu họa\" (trong thơ có họa) thể hiện rõ nhất qua chi tiết nào?", 
        o: ["Việc liệt kê các mốc thời gian cụ thể.", "Phối hợp mảng màu, ánh sáng: sắc xuân, khói sóng, trăng.", "Mô tả chi tiết các chiến lược quân sự.", "Cách ngắt nhịp đều đặn của thể thơ."], 
        c: 1 // Đáp án B
    },
    { 
        q: "Ý nghĩa từ \"chính\" trong \"nguyệt chính viên\" phản ánh quan điểm thẩm mỹ nào?", 
        o: ["Coi trọng tính chính xác tuyệt đối của thiên văn.", "Trân trọng khoảnh khắc vẻ đẹp hoàn mỹ, viên mãn nhất.", "Yêu thích vẻ đẹp dở dang, chưa hoàn thiện.", "Sự lo âu khi cái đẹp đạt đến đỉnh cao."], 
        c: 1 // Đáp án B
    },
    { 
        q: "Tư thế \"quy lai\" (trở về) dưới ánh trăng phản ánh phong thái nào của người lãnh đạo?", 
        o: ["Vội vàng, khẩn trương vì sợ địch phát hiện.", "Ung dung, tự tại, làm chủ hoàn cảnh, giao hòa thiên nhiên.", "Mệt mỏi sau một ngày gánh vác trọng trách.", "Trầm tư, tách biệt hoàn toàn khỏi ngoại cảnh."], 
        c: 1 // Đáp án B
    },
    { 
        q: "Sự kết hợp giữa không gian \"yên ba\" (cổ điển) và hoạt động \"đàm quân sự\" (hiện đại) mang giá trị gì?", 
        o: ["Mong muốn thoát ly thực tại gian khổ.", "\"Hiện đại hóa\" thơ cổ, khẳng định kháng chiến giữa vẻ đẹp.", "Chứng minh sự đối lập gay gắt giữa thiên nhiên và chiến tranh.", "Làm cho bài thơ trở nên khó tiếp cận."], 
        c: 1 // Đáp án B
    },
    { 
        q: "Nhận định nào chính xác nhất về giá trị tư tưởng tổng quát của bài thơ?", 
        o: ["Tác phẩm tả cảnh thuần túy, không có chính trị.", "Sức mạnh niềm tin cách mạng hòa quyện tình yêu thiên nhiên.", "Lời kêu gọi nhân dân tham gia kháng chiến.", "Sự bi quan, lo lắng về tương lai kháng chiến."], 
        c: 1 // Đáp án B
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