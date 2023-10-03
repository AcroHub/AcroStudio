class ApiFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    search(){
        const keyword = this.queryString.keyword ? { // if keyword exists
            name: {
                $regex: this.queryString.keyword, // search for keyword
                $options: 'i' // case insensitive
            }
        } : { // if keyword does not exist

        };
        this.query = this.query.find({...keyword});

        return this;
    }

    filter(){
        // ...this.queryString? Because we want to copy the query string
        const queryCopy = {...this.queryString}; // Copy query string

        // Remove fields from query
        const removeFields = ['keyword', 'page', 'limit'];
        removeFields.forEach(el => delete queryCopy[el]);

        // Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultPerPage * (currentPage - 1); 
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;