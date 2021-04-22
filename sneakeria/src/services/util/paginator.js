
module.exports = function(data, operator) {

    const getPageParamsFromOperatorString = () => {
        let operatorParams = operator.split("&");
        let pageParams = operatorParams.reduce((acc, cv) => {
            const page = /_page=\d+/g;
            const limit = /_limit=\d+/g;    
            if (page.test(cv)) {
                acc.pageCurrent = parseInt(cv.match(/\d+/g)[0], 10);
            } else if (limit.test(cv)) {
                acc.contentLimit = parseInt(cv.match(/\d+/g)[0], 10);
            }
            return acc;
        }, {}); 
        return pageParams;
    }

    const getPageParamsFromOperatorObject = () => {
        const { _page, _limit } = operator;
        let pageParams = { pageCurrent: _page, contentLimit: _limit}
        return pageParams;
    }

    const pageParams = typeof operator === 'string' ? getPageParamsFromOperatorString() : getPageParamsFromOperatorObject();

    const { pageCurrent, contentLimit } = pageParams;


    //pag op {pageCurrent: 1, contentLimit: 48} (2) ["_page=1", "_limit=48"]

    const contentCount = data.length;
    const getContentStart = () => {
        if (pageCurrent == 1) {
            return 0;
        } else {
            if (pageCurrent * contentLimit > contentCount) {
                return (
                    contentLimit -
                    (contentLimit - contentCount) +
                    (contentLimit - contentCount)
                );
            } else {
                return pageCurrent * contentLimit;
            }
        }
    };

    const contentStart = getContentStart();

    const contentEnd =
        contentStart + contentLimit > contentCount
            ? contentCount
            : contentStart + contentLimit;

    const pageCount = Math.ceil(contentCount / contentLimit);
    const pagePrevious = pageCurrent > 1 ? pageCurrent - 1 : 1;
    const pageNext =
        pageCurrent < pageCount ? pageCurrent + 1 : pageCount;

    return {
        pageCount,
        pageCurrent,
        pageNext,
        pagePrevious,
        contentLimit,
        contentCount,
        contentStart,
        contentEnd,
    };
};