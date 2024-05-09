/**
 * 검색 결과 인터페이스
 */
export interface Result {
	/** 영상 제목*/
	title: string;
	/** 영상 설명 */
	description: string;
	/**
	 * 해시 태그들
	 *
	 * 예시: `["사과", "건강", "사과의 비밀"]` &rarr; `#사과` `#건강` `#사과의_비밀`
	 */
	hashes: string[];
	/** 썸네일 이미지 URL */
	thumbnail: string;

	/** 영상 ID */
	video_id: string;
	/** 영상 URL */
	video_url: string;
}
