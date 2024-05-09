import type { Result } from './result_type';

export interface PerformanceMetric {
	/** 검색 소요 시간 (단위: ms) */
	search_time: number;
	/** 필터 소요 시간 (단위: ms) */
	filter_time: number;
	/**
	 * 데이터 생성 시간 (ISO String)
	 *
	 * - Date 객체에 입력하여 사용합니다.
	 */
	date: string;
	/** 당시 필터링 키워드 */
	filter_keywords: string[];
	/** 검색어 */
	search_keyword: string;

	/** 필터링된 영상 정보 */
	filtered: Result[];
	/** 모든 영상 정보 */
	all: Result[];

	/** 요청 ID */
	request_id: string;
}
