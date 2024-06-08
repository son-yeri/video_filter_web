# NOTE: 유튜브에서 데이터 가져오는 코드
# NOTE: get_transcription.py에 있는 데이터 가져오는 코드(실행 코드) 여기로 옮기고 (함수화/클래스화 하기)
# NOTE: 다 옮기고 실행 되는 지 확인하고나서 keywords 폴더랑 이 파일 같이 깃허브에 올리세요.
# NOTE: get_transcription.py에 불필요한 코드 다 제거됐는지 확인하고 올리기.

# 코드 분리 후 푸시

# 중복 제거 -> 빈 데이터(결측치) 제거
# 불용어 제거 (ko-stopwords.json 참조)
# 토큰화
# 임베딩

# 48시간 이내.

from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound
from dataclasses import dataclass
import pandas as pd
from glob import glob
from search import search
import os
from pytube import YouTube
from get_transcription import *


def data_save():
    dataset_path = os.path.join(os.path.dirname(__file__), "datas")
    """ 데이터셋 저장 경로 """
    
    # 폴더 없으면 생성
    if not os.path.isdir(dataset_path):
        os.makedirs(dataset_path, exist_ok=True)
    return dataset_path


    
    
def search_retry(keyword, limit, patience):
    search_results = []

    for attempt in range(patience):
        try:
            results = search(keyword, limit)
            search_results.extend(results)
            #올바르게 완료되면 -> 종료
            break
        except:
            #오류 발생 시:
            #시도 횟수가 인내 횟수를 초과 -> 종료
            if attempt + 1 >= patience:
                break
            #그렇지 않은 경우 -> 다음 시도
            continue
    return search_results
    
    
        
#ID 중복제거 함수
def Dedupe(video_ids):
    unique_video_ids = list(set(video_ids))
    """ 중복 제거된 영상 ID들"""
    transcriptions = {}
    """ ID-자막 key-value pair"""
    for video_id in unique_video_ids:
        transcription = get_transcription(video_id)
        transcriptions[video_id] = transcription.merged_text
    return transcriptions





def Data_Cleaning(keyword, unique_video_ids, search_results, transcriptions):
    data = {
        "keyword": [],
        "video_id": [],
        "title": [],
        "text": [],
        }
    
    # 개별 영상 ID에 대해 데이터 정리
    for video_id in unique_video_ids:
        _data = list(filter(lambda video: video.video_id == video_id, search_results))[0]
        """ 검색 결과 데이터 """
        transcription = transcriptions[video_id]
        """ 자막 데이터 """

        data['keyword'].append(keyword)
        data['video_id'].append(_data.video_id)
        data['title'].append(_data.title)
        data['text'].append(transcription)
    return data


def organize(data, dataset_path, idx, keyword_idx):
    # 정제는 이후에 할 것이기 때문에 정리라고 함
    print("데이터 정리 완료")
    df_path = os.path.join(dataset_path, "data-%d-%d.xlsx" % (idx, keyword_idx))
    save_df(data, df_path)

    







def read_keywords(file_path: str) -> list:
    with open(file_path, 'r', encoding='utf-8') as file:
        return [line.strip() for line in file.readlines()]


keywords_path = os.path.join(
    os.path.dirname(__file__),
    "keywords"
)
keywords_filepaths = glob(os.path.join(keywords_path, "*.txt"))

def save_df(data: dict, path: str):
    df = pd.DataFrame(data)
    df.to_excel(path)

    print('"%s" 검색 결과 저장 완료 (경로: %s)' % (keyword, df_path))
                

if __name__ == '__main__':
    limit = 2000


    for idx, file in enumerate(keywords_filepaths):
        keywords = read_keywords(file)

        for keyword_idx, keyword in enumerate(keywords):
            # 오류 -> 즉시 다음 키워드 검색으로 이동
            # n회까지는 봐줌 (일시적인 오류의 가능성 배제)
            
            search_results: list[YouTube] = []
            patience: int = 3
            """ 허용 횟수 """

            print("=== 검색 시작 ===")
            print("검색어: %s" % keyword)


            video_ids = [video.video_id for video in search_results]
            """ 영상 ID들 """
           
    
          
    
    

            # 정제는 이후에 할 것이기 때문에 정리라고 함
            print("데이터 정리 완료")
            df_path = os.path.join(dataset_path, "data-%d-%d.xlsx" % (idx, keyword_idx))
            save_df(data, df_path)
