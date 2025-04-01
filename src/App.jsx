import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const API_BASE = 'https://api.3tierwebtest.shop';

  const fetchCount = async () => {
    try {
      const res = await fetch(`${API_BASE}/counter`);
      const text = await res.text();
      const parsed = parseInt(text);
      setCount(parsed);
    } catch (e) {
      alert('카운트를 불러오는 데 실패했습니다.');
      console.error(e);
    }
  };

  const updateCount = async (type) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/counter/${type}`, {
        method: 'POST'
      });
      const parsed = parseInt(await res.text());
      setCount(parsed);
    } catch (e) {
      alert(`${type === 'up' ? '증가' : '감소'}에 실패했습니다.`);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>✅ S3 정적 웹 호스팅 성공</h1>
      <p>이 페이지는 GitActions를 통해 자동 배포되고 있습니다.</p>

      <h2>🔥 현재 카운트: {count}</h2>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => updateCount('up')} disabled={loading}>
          🔼 증가
        </button>
        <button onClick={() => updateCount('down')} disabled={loading} style={{ marginLeft: '1rem' }}>
          🔽 감소
        </button>
        <button onClick={fetchCount} disabled={loading} style={{ marginLeft: '1rem' }}>
          🔄 새로고침
        </button>
      </div>
    </div>
  );
}

export default App;