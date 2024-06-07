from pytube.contrib.search import Search
from pytube import YouTube



def search(keyword: str, limit: int = 15) -> list[YouTube]:
    """검색 함수

    Args:
        keyword (str): 검색 키워드
        limit (int, optional): 최소 검색 결과 수. Defaults to 15.
    """
    _search = Search(keyword)    
    # NOTE: 시1발 이거 results 안 받아오면 다음 데이터 못 가져옴 개빡치네
    results: list[YouTube] = [*_search.results] # type: ignore


    if len(results) >= limit:
        return results

    while True:
        if len(results) >= limit:
            break
        _search.get_next_results()
        partial_results: list[YouTube] = _search.results if hasattr(_search, "results") else [] # type: ignore
        results = [*results, *partial_results]

    return results

if __name__ == '__main__':
    result = search("애국가", limit=50)
    print(result)
    for idx, r in enumerate(result):
        print(idx, r.video_id, r.author, r.title, r.description)