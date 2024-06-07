from search import search
from get_transcription import get_transcription

import pandas as pd

keyword : str= "사과"
""" 검색어 """
limit: int = 100
""" 검색 결과 수 제한 """
languages: list[str] = ['ko', 'en']
""" 언어 정보 """

# 검색
search_results = search(keyword, limit)

# ID만 가져오기
video_ids = [video.video_id for video in search_results]
video_titles = [video.title for video in search_results]
video_descriptions = [video.description for video in search_results]
""" '간단한 설명' 데이터들 """

# 자막 가져오기; 병합된 자막 정보만 추출 
transcriptions = [get_transcription(video_id, languages).merged_text for video_id in video_ids]

# 데이터 저장
_dict = {
  "ID": video_ids,
  "Title": video_titles,
  "Description": video_descriptions,
  "Transcription": transcriptions
}

# 데이터 저장
df = pd.DataFrame(_dict)
df.to_excel("data.xlsx", index=False)

print(df)
