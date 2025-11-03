import { useEffect, useState } from "react";

export default function ApiConnection() {
  const [endpoint, setEndpoint] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedEndpoint = localStorage.getItem("admin_api_endpoint") ?? "";
    const savedKey = localStorage.getItem("admin_api_key") ?? "";
    setEndpoint(savedEndpoint);
    setApiKey(savedKey);
  }, []);

  const testConnection = async () => {
    if (!endpoint) {
      setMessage("엔드포인트를 입력해주세요");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      // 실제 API 호출 위치. 데모로 600ms 지연 후 성공/실패 랜덤 처리
      await new Promise((r) => setTimeout(r, 600));
      const ok = Math.random() > 0.2;
      if (ok) {
        setStatus("success");
        setMessage("연결에 성공했습니다");
      } else {
        throw new Error("연결 실패");
      }
    } catch (e) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "오류가 발생했습니다");
    }
  };

  const save = () => {
    localStorage.setItem("admin_api_endpoint", endpoint);
    localStorage.setItem("admin_api_key", apiKey);
    setMessage("저장되었습니다");
    setStatus("success");
  };

  return (
    <div className="max-w-xl space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          API Endpoint
        </label>
        <input
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="https://api.example.com"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          API Key
        </label>
        <input
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="sk_..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-black disabled:opacity-60"
          onClick={save}
          disabled={!endpoint}
        >
          저장
        </button>
        <button
          className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:opacity-60"
          onClick={testConnection}
          disabled={!endpoint || status === "loading"}
        >
          연결 테스트
        </button>
        {status !== "idle" && (
          <span
            className={`text-sm ${
              status === "success"
                ? "text-green-600"
                : status === "error"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {status === "loading" ? "확인 중..." : message}
          </span>
        )}
      </div>
    </div>
  );
}
