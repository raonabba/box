# 박스 레벨업 GM

압축을 풀고 바로 업로드할 수 있는 정적 웹앱 버전입니다.

## 포함 기능
- 5종 동물 캐릭터 선택
- 장비 장착 / 해제
- 인바디 수동 입력 및 CSV 업로드
- 인바디 기반 능력치 자동 계산
- 코치 인증코드 검증
- PR 등록, XP, 레벨, 랭킹
- localStorage 저장

## 바로 실행
- 압축 해제 후 `index.html` 을 브라우저에서 열면 실행됩니다.

## GitHub 업로드
1. 새 저장소 생성
2. 압축 해제한 파일 업로드
3. 커밋

## Vercel 배포
1. GitHub 저장소를 Vercel에 Import
2. Framework Preset은 Other / Static으로 두고 배포
3. 별도 환경변수 없이 동작

## 테스트용 코치 인증코드
- COACH-KIM-2026
- BOX-RX-MASTER
- WOD-VERIFY-777

## CSV 형식
헤더는 아래처럼 맞춰주세요.

```csv
date,weight,muscle,fatPercent
2026-03-23,72,37.4,12
```
