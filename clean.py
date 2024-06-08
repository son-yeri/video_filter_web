import pandas as pd
from tqdm.contrib import tenumerate
import os

#dtats 폴더 안에 엑셀 파일 하나의 리스트로 가져와서 사용하기
path = 'datas'
excel_files = [f for f in os.listdir(path) if f.endswith('.xlsx') or f.endswith('.xls')]
excel_files.sort()


df = pd.DataFrame()

# 각 엑셀 파일을 순회하면서 'video_id' 열의 데이터를 추출합니다.
for _, file in tenumerate(excel_files):
    file_path = os.path.join(path, file)
    _df = pd.read_excel(file_path, index_col=0)

    df = pd.concat([df, _df], ignore_index=True)

# === 중복 제거 ===
# video_ids = df['video_id'].tolist()
# unique_video_ids = list(set(video_ids))

cleaned_df = df.drop_duplicates(['video_id'], keep='first')
""" video_id 기준으로 중복 제거한 테이블 """

print("중복된 행이 %d개 제거됨" % (len(df) - len(cleaned_df)))

cleaned_df.to_excel("cleaned.xlsx", index=False)