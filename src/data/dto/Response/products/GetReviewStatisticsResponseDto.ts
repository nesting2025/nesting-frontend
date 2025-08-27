export interface GetReviewStatisticsResponseDto {
    totalCount: number;
    averageScore: number;
    surveyStatistics: {
        satisfaction: {
            EXCELLENT: number;
            GOOD: number;
            NORMAL: number;
        },
        originalComparison: {
            SAME: number;
            DIFFERENT: number;
            GOOD: number;
        },
        recommend: {
            RECOMMEND: number;
            NORMAL: number;
            SOSO: number;
        }
    }
}