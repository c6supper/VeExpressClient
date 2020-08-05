export class QServerODataSourceConf  {
    protected static readonly SORT_FIELD_KEY = '$orderby';
    protected static readonly SORT_DIR_KEY = '';
    protected static readonly PAGER_PAGE_KEY = '';
    protected static readonly PAGER_LIMIT_KEY = '';
    protected static readonly FILTER_FIELD_KEY = '$filter';
    protected static readonly TOTAL_KEY = '@odata.count';
    protected static readonly DATA_KEY = 'value';

    endPoint: string;
    sortFieldKey: string;
    sortDirKey: string;
    pagerPageKey: string;
    pagerLimitKey: string;
    filterFieldKey: string;
    totalKey: string;
    dataKey: string;

    constructor(endPoint) {
        this.endPoint = endPoint ? endPoint : '';
        this.sortFieldKey = QServerODataSourceConf.SORT_FIELD_KEY;
        this.sortDirKey = QServerODataSourceConf.SORT_DIR_KEY;
        this.pagerPageKey = QServerODataSourceConf.PAGER_PAGE_KEY;
        this.pagerLimitKey = QServerODataSourceConf.PAGER_LIMIT_KEY;
        this.filterFieldKey = QServerODataSourceConf.FILTER_FIELD_KEY;
        this.totalKey = QServerODataSourceConf.TOTAL_KEY;
        this.dataKey = QServerODataSourceConf.DATA_KEY;
    }
}
