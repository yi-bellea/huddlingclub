# 프로젝트 서브에이전트 연결

- 프로젝트의 제품·기술 규칙은 `Codex.md`와 `docs/prd.md`에서 확인한다.
- 사용자가 Figma URL을 제공하거나 Figma 디자인의 코드 구현을 요청하면 `.codex/agents/figma-implementer.toml`의 `figma_implementer`에게 Figma 자료 수집과 구현 작업을 위임한다. 단순히 URL만 제공한 경우에는 구현 범위를 먼저 확인한다. 큰 Figma MCP 응답은 부모 에이전트로 복사하지 않는다.
- 사용자가 토큰 확인, 토큰 동기화, 토큰 비교 또는 이에 해당하는 영어 요청을 하면 `.codex/agents/token-checker.toml`의 `token_checker`에게 비교를 위임한다. 수정은 사용자의 명시적 요청 또는 비교 결과를 본 뒤의 승인에 따른다.
- 두 에이전트 모두 자료가 없거나 지침이 모호하면 추측하지 말고 필요한 사항을 사용자에게 묻는다.
